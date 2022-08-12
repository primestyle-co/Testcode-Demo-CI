#!/bin/sh

cd /app/

check=$((0))

if [ ! -f ".env" ]; then
	check=$(($check+1))
	cp .env.example .env
fi

# if [ ! -d "vendor" ]; then
# 	check=$(($check+1))
# 	composer install
# 	# php artisan cache:clear
# 	# php artisan config:clear
# 	# php artisan route:clear
# 	# php artisan view:clear
# fi

# if [ $check -eq 2 ]; then
# 	php artisan key:generate
# 	php artisan migrate
# fi
	#php artisan migrate

# php artisan serve --host=0.0.0.0 --port=80
/usr/bin/supervisord