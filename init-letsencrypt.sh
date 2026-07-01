#!/bin/sh
# One-time bootstrap for the Let's Encrypt certificate.
# Run this once on the server after cloning and filling in .env.
set -e

# Load DOMAIN and CERTBOT_EMAIL from .env
if [ ! -f .env ]; then
  echo "ERROR: .env not found. Copy .env.example to .env and fill it in."
  exit 1
fi
export $(grep -v '^#' .env | grep -E '^(DOMAIN|CERTBOT_EMAIL)=' | xargs)

if [ -z "$DOMAIN" ] || [ -z "$CERTBOT_EMAIL" ]; then
  echo "ERROR: DOMAIN and CERTBOT_EMAIL must be set in .env"
  exit 1
fi

COMPOSE="docker compose -f docker-compose.prod.yml"
CERT_PATH="/etc/letsencrypt/live/$DOMAIN"

echo "### Building images ..."
$COMPOSE build

echo "### Creating a temporary self-signed certificate so Nginx can start ..."
$COMPOSE run --rm --entrypoint "\
  sh -c 'mkdir -p $CERT_PATH && \
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout $CERT_PATH/privkey.pem \
    -out    $CERT_PATH/fullchain.pem \
    -subj   /CN=localhost'" certbot

echo "### Starting Nginx (web) ..."
$COMPOSE up -d web

echo "### Removing the temporary certificate ..."
$COMPOSE run --rm --entrypoint "\
  sh -c 'rm -rf /etc/letsencrypt/live/$DOMAIN \
              /etc/letsencrypt/archive/$DOMAIN \
              /etc/letsencrypt/renewal/$DOMAIN.conf'" certbot

echo "### Requesting the real Let's Encrypt certificate for $DOMAIN ..."
$COMPOSE run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    -d $DOMAIN \
    --email $CERTBOT_EMAIL \
    --agree-tos --no-eff-email --non-interactive \
    --force-renewal" certbot

echo "### Reloading Nginx with the real certificate ..."
$COMPOSE exec web nginx -s reload

echo "### Bringing up the full stack ..."
$COMPOSE up -d

echo "Done. Visit https://$DOMAIN"
