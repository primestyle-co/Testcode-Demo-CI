FROM php:8.0.16-fpm-alpine3.15
RUN apk update && apk upgrade
RUN apk upgrade --update
RUN apk add \
    nginx \
    icu-dev \
    oniguruma-dev \
    autoconf automake libtool nasm \
    pcre-dev g++ gcc make sudo \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    openrc supervisor rsyslog \
    shadow \
    tzdata \
    git
RUN docker-php-ext-install intl pdo_mysql mbstring exif zip sockets opcache bcmath \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable opcache

# RUN apt-get update -y && apt-get install -y libmcrypt-dev openssl libmcrypt-dev zip unzip pdo_mysql
# RUN docker-php-ext-install pdo mbstring
COPY --from=composer /usr/bin/composer /usr/bin/composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# RUN docker-php-ext-install pdo mbstring
# WORKDIR /app
# COPY . /app
# COPY .env.example /app/.env
# COPY --from=builder /app/vendor /app/vendor
# RUN chmod 755 /app/.docker/setup.sh
# RUN sh /app/.docker/setup.sh
# CMD php artisan serve --host=0.0.0.0 --port=80

# RUN chmod 755 /app/.docker/first.sh
# RUN chmod 777 -R /app/.docker

WORKDIR /setup
COPY . /setup
RUN chmod 775 -R /setup
ENTRYPOINT ["/setup/first.sh"]
# CMD php artisan serve --host=0.0.0.0 --port=80