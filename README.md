## Project structure ###
- All project data stores in src folder

### middlewares folder ###
Includes all middlewares that we want to pass directly into controller[^1].  
[^1]: As example check user token

### modules folder ###
This folder includes our main pieces of application (modules).  
Each of these folders should include inside their:
* Service
* Module
* Repository
* Model

### types folder ###

Includes general types and interfaces for entire application

### config folder
Includes configuration files that we might use to configure some of our libraries or code structure

### utils folder

Has utility items inside. In example classes what might help us to transform data or  
adapters for libraries that we want to use


## App.ts file

This file do some things: 
* Register our configs
* Register middlewares
* Register routes
* Stable connection to database
* Run the server

Afterwards app.ts calls in index.ts file as IIFE

## Instructions to run the project
1. You have to create .env file at the root level
2. You have to insert **DB_PASSWORD**, **DB_USERNAME**, **SALT_ROUNDS**, **TOKEN_SECRET_KEY** 
variables
3. Install dependencies by `npm install` / `yarn install` command
4. Build the project by `npm run build` / `yarn build` command 
5. Start project by `npm start` / `yarn start` command