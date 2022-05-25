<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">As a user when registering in any way, must by default set Column ‘verified’ false, then after creating it in the database, the app will send an email with has verification link, this link contains the id of this user and token to check if he or not. when clicked above this link will change the status of the user from false to true, to be verified</p>
  
## Code use JS

[Code use JS - Express](https://github.com/AhmedQeshta/verification-email-nodejs)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
