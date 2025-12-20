#!/bin/bash
# =============================================================================
# Script de déploiement Docker Hub
# Usage: ./scripts/docker-deploy.sh [tag]
# Exemple: ./scripts/docker-deploy.sh 1.8.0
# =============================================================================

set -e

DOCKER_USER="sopequenotech"
IMAGE_NAME="ds-angular-showcase"
TAG="${1:-latest}"
FULL_IMAGE="$DOCKER_USER/$IMAGE_NAME"

echo "🐳 Déploiement Docker Hub"
echo "========================="
echo "Image: $FULL_IMAGE"
echo "Tag: $TAG"
echo ""

# Build
echo "📦 Build de l'image..."
docker compose build showcase

# Tag
echo "🏷️  Tagging..."
docker tag design-system-showcase:latest "$FULL_IMAGE:$TAG"
docker tag design-system-showcase:latest "$FULL_IMAGE:latest"

# Push
echo "🚀 Push vers Docker Hub..."
docker push "$FULL_IMAGE:$TAG"
docker push "$FULL_IMAGE:latest"

echo ""
echo "✅ Déploiement terminé !"
echo "   docker pull $FULL_IMAGE:$TAG"
