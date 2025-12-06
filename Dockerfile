# =============================================================================
# DOCKERFILE - Storybook ds-angular
# Build multi-stage : Node.js (build) + nginx (serve)
# =============================================================================

# -----------------------------------------------------------------------------
# STAGE 1 : Build Storybook
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances (legacy-peer-deps pour compatibilité Angular 20)
RUN npm ci --prefer-offline --no-audit --legacy-peer-deps

# Copier les sources nécessaires
COPY angular.json tsconfig.json ./
COPY .storybook/ ./.storybook/
COPY projects/ ./projects/

# Build Storybook
RUN npm run build-storybook

# -----------------------------------------------------------------------------
# STAGE 2 : Serve avec nginx
# -----------------------------------------------------------------------------
FROM nginx:alpine AS production

# Supprimer la config nginx par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier le build Storybook
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Configuration nginx personnalisée pour SPA
RUN echo 'server { \
    listen 80; \
    listen [::]:80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml; \
}' > /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
