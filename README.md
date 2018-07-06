# WOT

## Steps

### Create network for keycloak-possu to communicate

    docker network create keycloak-network

### Start postgres

    docker run -d --name possu_for_keycloak --net keycloak-network -e POSTGRES_DB=keycloak -e POSTGRES_USER=keycloak -e POSTGRES_PASSWORD=password postgres

### Start keycloak

    docker run -p 8080:8080 --name keycloak-demo --net keycloak-network -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=password -e DB_ADDR=possu_for_keycloak jboss/keycloak

### Configure keycloak

- Login to http://localhost:8080
- Create Realm `demo-realm`
- Create user `demo-user` (Just force password creation)
- Create client `demo-client`
- Click `Authorization enabled` for the demo-client

### Configure client

Go to admin UI demo-realm -> demo-client -> installation and copy config to keykloack.json in this folder

    npm install
    npm start

### Demo

- Go to http://localhost:3000
- Get public data and try to get protected data
