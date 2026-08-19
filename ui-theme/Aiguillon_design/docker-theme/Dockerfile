FROM nginx:1.27-alpine
COPY docker-theme/nginx.conf /etc/nginx/conf.d/default.conf
COPY theme /usr/share/nginx/html/theme
COPY assets /usr/share/nginx/html/assets
RUN base64 -d /usr/share/nginx/html/assets/backgrounds/bandeau-gauche-bleu.png.base64 \
    > /usr/share/nginx/html/assets/backgrounds/bandeau-gauche-bleu.png \
    && rm /usr/share/nginx/html/assets/backgrounds/bandeau-gauche-bleu.png.base64
EXPOSE 8080
