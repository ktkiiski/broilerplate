# Webpack 2 + TypeScript + SASS boilerplate

This is a boilerplate for creating projects that use Webpack 2 to compile a TypeScript application and SASS stylesheets into a ES5 JavaScript and CSS.

To apply this template:

```bash
git remote add template https://github.com/ktkiiski/ts-sass-boilerplate.git
git fetch template
git merge template/master
```

Remember to add your project metadata to the [`package.json`](./package.json), for example, `name`, `author`, `description`.

## Setup

You need to install the required node packages:

```bash
npm install
```

## Run locally

To run the app locally, start the local HTTP server and the build watch process:

```bash
npm run watch
```

Then navigate your browser to http://0.0.0.0:1111/

The web page is automatically reloaded when the app is re-built.

## Build

The built files are placed to a `dist` folder, located at the root of your project.
To build the files for development, run:

```bash
npm run build:dev
```

To build for production:

```bash
npm run build:prod
```