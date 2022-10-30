#!/usr/bin/env sh
set -eu

envsubst '${BACKEND_HOST} ${BACKEND_PORT}' < /etc/nginx/conf.d/default.conf.tpl > /etc/nginx/conf.d/default.conf

exec "$@"