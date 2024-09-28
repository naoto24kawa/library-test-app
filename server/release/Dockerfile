FROM ubuntu:22.04

WORKDIR /var/www/html

ENV DEBIAN_FRONTEND="noninteractive"
ENV TZ="Asia/Tokyo"
ENV PORT="8000"

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get install -y gnupg curl ca-certificates zip unzip git sqlite3 libcap2-bin libpng-dev python2 dnsutils librsvg2-bin fswatch \
    && curl -sS 'https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x14aa40ec0831756756d7f66c4f4ea0aae5267a6c' | gpg --dearmor | tee /etc/apt/keyrings/ppa_ondrej_php.gpg > /dev/null \
    && echo "deb [signed-by=/etc/apt/keyrings/ppa_ondrej_php.gpg] https://ppa.launchpadcontent.net/ondrej/php/ubuntu jammy main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
    && apt-get update \
    && apt-get install -y php8.2-cli php8.2-dev \
       php8.2-pdo php8.2-mysql \
       php8.2-sqlite3 php8.2-gd php8.2-imagick \
       php8.2-curl \
       php8.2-imap php8.2-mbstring \
       php8.2-xml php8.2-zip php8.2-bcmath php8.2-soap \
       php8.2-intl php8.2-readline \
       php8.2-ldap \
       php8.2-msgpack php8.2-igbinary php8.2-redis php8.2-swoole \
       php8.2-memcached php8.2-pcov php8.2-xdebug \
    && apt-get install -y mysql-client \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN setcap "cap_net_bind_service=+ep" /usr/bin/php8.2

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

COPY . /var/www/html
COPY release/php.ini /etc/php/8.2/cli/conf.d/99-custom.ini

COPY .env.production /var/www/html/.env

RUN composer install \
  && chmod -R 777 storage public bootstrap

EXPOSE $PORT

CMD ["sh", "-c", "\
    php artisan config:clear && \
    php artisan route:clear && \
    php artisan config:cache && \
    php artisan route:cache && \
    php -S 0.0.0.0:${PORT} -t public \
"]