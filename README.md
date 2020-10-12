## Docker Commands


docker-compose up --build -d 
  - downloads and runs the images on each container inside the docker-compose.yaml

docker-compose run --rm composer install
  - download all the packages inside the ./src/composer.json

docker-compose run --rm npm install
  - download all the packages inside the ./src/package.json

docker-compose run --rm artisan migrate
  - run the migration file inside ./src/database (need to setup the env first before migrating)

## Codebase

./src folder contains the laravel source code
