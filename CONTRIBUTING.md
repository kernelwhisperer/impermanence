# Contributing

## Prerequisites

```sh
npm -v
# 8.4.0
node -v
# v16.13.2
```

```sh
sudo apt update && sudo apt -y upgrade
sudo apt install libnss3-dev libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 -y
```

## Getting started

```sh
npm i
npm start
```

## Build for production

```sh
npm run build
```

Run `./packages/electron/out/make/squirrel.windows/x64/Impermanence-0.1.0 Setup.exe`.

## Create a release

```sh
npm run version <major|minor|patch>
```
