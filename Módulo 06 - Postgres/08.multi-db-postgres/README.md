docker ps -a
docker rm xxx
docker rmi idDaImage


docker run 
    --name postgres 
    -e POSTGRES_USER=fabio 
    -e POSTGRES_PASSWORD=12345 
    -e POSTGRES_DB=heroes 
    -p 5432:5432 
    -d 
    postgres


    docker ps
    docker exec -it postgres /bin/bash

    
docker run 
    --name adminer
    -p 8080:8080
    --link postgres:postgres
    -d
    adminer

docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

docker run
    --name mongodb
    -p 27017:27017
    -e MONGO_INITDB_ROOT_USERNAME=admin
    -e MONGO_INITDB_ROOT_PASSWORD=12345
    -d
    mongo:4

docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=12345 -d mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost -u admin -p 12345 --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user:'fabio',pwd:'12345',roles: [{role: 'readWrite', db: 'heroes'}]})"

docker exec -it mongodb mongo --host localhost -u admin -p 12345 --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'fabio', pwd: '12345', roles: [{role: 'readWrite', db: 'herois'}]})"