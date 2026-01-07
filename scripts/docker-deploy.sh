#!/bin/bash
# =============================================================================
# Script de déploiement Docker Hub avec validation
# Usage: ./scripts/docker-deploy.sh [tag] [--skip-validation]
# Exemples:
#   ./scripts/docker-deploy.sh              # Version auto depuis package.json/git
#   ./scripts/docker-deploy.sh 1.9.0        # Version explicite
#   ./scripts/docker-deploy.sh --skip-validation  # Sans tests
# =============================================================================

set -e

# Configuration
DOCKER_USER="sopequenotech"
IMAGE_NAME="ds-angular-showcase"
FULL_IMAGE="$DOCKER_USER/$IMAGE_NAME"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Parsing arguments
SKIP_VALIDATION=false
TAG=""

for arg in "$@"; do
  case $arg in
    --skip-validation) SKIP_VALIDATION=true ;;
    *) TAG="$arg" ;;
  esac
done

# Fonction pour déterminer la version
get_version() {
  # 1. Argument explicite
  if [ -n "$TAG" ]; then
    echo "$TAG"
    return
  fi

  # 2. Git tag exact
  local git_tag
  git_tag=$(git describe --tags --exact-match 2>/dev/null | sed 's/^v//')
  if [ -n "$git_tag" ]; then
    echo "$git_tag"
    return
  fi

  # 3. Version package.json (librairie ds-angular)
  local pkg_file="projects/ds-angular/package.json"
  if command -v jq &> /dev/null && [ -f "$pkg_file" ]; then
    local pkg_version
    pkg_version=$(jq -r .version "$pkg_file")
    if [ "$pkg_version" != "null" ] && [ -n "$pkg_version" ]; then
      echo "$pkg_version"
      return
    fi
  fi

  # 4. Fallback
  echo "latest"
}

log() { echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1"; }
success() { echo -e "${GREEN}✓${NC} $1"; }
error() { echo -e "${RED}✗${NC} $1"; exit 1; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }

# Header
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   Deploiement Docker Hub - ds-angular-showcase${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

START_TIME=$(date +%s)
VERSION=$(get_version)

log "Image: $FULL_IMAGE"
log "Version: $VERSION"
log "Validation: $( [ "$SKIP_VALIDATION" = true ] && echo 'desactivee' || echo 'activee' )"
echo ""

# Étape 1: Validation (si activée)
if [ "$SKIP_VALIDATION" = false ]; then
  log "Validation pre-build..."

  log "  -> Tests unitaires..."
  if npm run test:headless --silent; then
    success "  Tests passes"
  else
    error "  Tests echoues. Utilisez --skip-validation pour bypasser."
  fi

  log "  -> Build librairie..."
  if npm run build:lib --silent; then
    success "  Build lib reussi"
  else
    error "  Build lib echoue."
  fi

  echo ""
fi

# Étape 2: Build + Push multi-plateforme (amd64 + arm64)
log "Build et push multi-plateforme..."
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag "$FULL_IMAGE:$VERSION" \
  --tag "$FULL_IMAGE:latest" \
  --push \
  .
success "Build et push termines (amd64 + arm64)"
echo ""

# Résumé
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   Deploiement reussi !${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "   Image: $FULL_IMAGE"
echo "   Tags:  $VERSION, latest"
echo "   Duree: ${DURATION}s"
echo ""
echo "   Commande pull:"
echo "   docker pull $FULL_IMAGE:$VERSION"
echo ""
