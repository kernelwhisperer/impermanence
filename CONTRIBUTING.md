# Contributing

## Prerequisites

```sh
npm -v
# 8.4.0
node -v
# v16.13.2
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

1. Edit version in electron package
2. Create a new tag and push it

```sh
git tag -a v0.1.0 -m "Release 0.1.0"
git puh origin v0.1.0
```
