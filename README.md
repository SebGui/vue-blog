# my-vue-blog

A simple multilingual, responsive CRUD post manager with login interface and rights over posts.
Passwords are ciphered with salt, for the simplicity of testing, as of now, creating account doesn't require email, so please don't forget you password :)

## Project setup
```
npm install
```

### Run local DB
```
npx json-server --watch ./data/db.json
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
