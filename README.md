# Hive MQTT Webclient project

#### This application was built using VueJS version 3 with the composition API, Vite as a build tool, NPM as package manager and was containerized using Docker. Vitest was used for unit test purpose.

#### Note: Required version of NodeJS is v14

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Docker

### Build Image

```
docker build -t hive-mqtt-webclient .
```

### Run

```
docker run -it -p 8080:80 hive-mqtt-webclient
```

Navigate to http://localhost:8080/ to access the application
