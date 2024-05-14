# Suported Environments
The repo supports 2 different environments:
- development environment, the backend interface is 'http://localhost:3001', need run loacl backend environemnt.
- production environment, the backend interface is 'https://asteroids.dev.mediasia.cn'

# Structure
## assets
To store fonts and icons

## components
To store common componets and logic components
- customModal: common modal component
- header: header component
- map: the left of main page of right
- menu: menu component for tab switch
- minners: to store all logic components of main page
- svgIcon: common svg icon component

## http
Definie the request interceptor, response interceptor and request methods(get, post, delete, put)

## pages
Pages component

## router
To store router

## socket
Define Websocket serve

## type
Define interface

## utils
Public method class

# Launch in dev env
To launch the project in development mode, use yarn or npm to install node modules, run script:
```
npm install
npm run start
```

# Launch in prod env
To launch the project in prodcution mode, use yarn or npm to install, run script:
```
npm install
npm run start:prod
```

# Build 
Build code for production mode, run script:
```
npm run build:prod: 
```
