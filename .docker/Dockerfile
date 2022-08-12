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


# useradd
RUN groupadd -g 1000 www && \
    useradd -s /bin/bash -u 1000 -N -g www -K MAIL_DIR=/dev/null -d /var/www www

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

ADD ./nginx/conf.d/ /etc/nginx/conf.d/
ADD ./nginx/nginx.conf /etc/nginx/nginx.conf

ADD ./php/8.0/php-fpm.d/www.conf /usr/local/etc/php-fpm.d/zzz-www.conf
ADD ./php/8.0/php.ini /etc/php7/php.ini
ADD ./php/8.0/php.ini /usr/local/etc/php/php.ini
ADD ./supervisor/supervisord.conf /etc/supervisord.conf
ADD ./supervisor/supervisor.d/ /etc/supervisor.d/

RUN mkdir /run/php-fpm8.0
RUN mkdir -p /run/nginx

RUN chown www:www -R /run/php-fpm8.0 && \
    chown www:www -R /var/lib/nginx

RUN ln -sf /dev/stdout /var/log/messages
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

WORKDIR /setup
COPY . /setup
RUN chmod 775 -R /setup
ENTRYPOINT ["/setup/first.sh"]
# CMD php artisan serve --host=0.0.0.0 --port=80