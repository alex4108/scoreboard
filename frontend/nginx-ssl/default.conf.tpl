# This one config's nginx for SSL

server {

    listen       80;
    listen  [::]:80;
    server_name  localhost;

    return 301 https://$host$request_uri;

}
server {
    listen 443 ssl;
    listen [::]:443;
    server_name localhost;
    ssl_certificate /etc/nginx/certs/sslCert.pem;
    ssl_certificate_key /etc/nginx/certs/sslKey.pem;    
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass https://${BACKEND_HOST}:${BACKEND_PORT};
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
