# Welcome to Products order app!

> This web application was created to fulfill Web Technology module’s requirements and does not represent an actual company or service
> >>>>>>>>>>>>>> *refer-defer-wt-cw-2020-2021, #12786*

This application shows how a simple ordering app can be built using contemporary JS both in client and backend. The app contains logic of CRUD operations against *Product*, CR operations for *Category*, *Order* entities.

## Tools needed

- Git - VCS technology for maintaining the versions of source code
- Node.js - Server-side scripting language using JS
- Any PC browser - Chrome, Opera, Mozilla Firefox and etc.

## Project structure
```
+-- assets
|   +-- *.css
|   +-- *.js
+-- conf
|   +-- cnstants.js
+-- data
|   +-- category.json
|   +-- *.json
+-- router
|   +-- category.js
|   +-- *.js
+-- util
|   +-- random-generator.js
+-- views
|   +-- template.pug
|   +-- product.pug
|   +-- *.pug
+-- app.js
+-- package.json
```

## Steps for running the app

- Clone the project source code
```bash
git clone https://github.com/00012786Doniyorkhon/refer-defer-wt-cw-2020-2021.git
```
- initialize the directory condition for npm
```npm
npm install
```
- download used dependencies
```npm
npm i express express-validator pug body-parser
```
- run the app
```npm
node ./app.js
```
The application will be accessible at: `http://localhost:3113/`

## Public contribution
[Products order app (Github source code)](https://github.com/00012786Doniyorkhon/refer-defer-wt-cw-2020-2021)

## Demo 
[Live site](https://quark-fresh-orchid.glitch.me)
[Code](https://glitch.com/edit/#!/quark-fresh-orchid)