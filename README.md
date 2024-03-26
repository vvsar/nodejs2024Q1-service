# Home Library Service

## Prerequisites

Please make sure all necessary applications are installed on your PC (Git, NodeJS, Docker etc.).

## Downloading

Clone my repository:

```
git clone https://github.com/vvsar/nodejs2024Q1-service.git
```

Move to the target branch:

```
git checkout develop-2
```

## Installing NPM modules

```
npm install
```

## Set up environment variables

Create .env file:

```
cp .env.example .env
```

## Running application

```
docker-compose up
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
