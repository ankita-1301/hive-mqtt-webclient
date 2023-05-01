# hive-mqtt-webclient-project

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

You will be able to access the app via localhost:8080
