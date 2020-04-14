## Backend Setup
Download [Docker Compose](https://docs.docker.com/compose/install/)

```
docker-compose build
docker-compose up
```


Setup the project within the docker container:

```
docker-compose run web sh -c "python src/manage.py migrate"
docker-compose run web sh -c "python src/manage.py createsuperuser"
```


Visit [http://localhost:8123](http//localhost:8123) to view the API
Visit [http://localhost:8888](http//localhost:8888) to access the [Adminer](https://www.adminer.org/) interface.

Adminer credentials:
```
System: postgreSQL
Server: db
Username: postgres
Password: password
Database: app
```


