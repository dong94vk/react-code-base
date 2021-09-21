# Box-Social ReactJS

## You should learn about
- [ReactJS](https://reactjs.org/)
- [React-Redux](https://redux.js.org/basics/usage-with-react)
- [Typescript](https://www.typescriptlang.org/)
- Webpack

## How to develop in local env

### install
[NodeJs](https://nodejs.org/en/)


## Create Local Development-Environment
### Clone Repository
```
$ git clone https://gitlab.bongdapro.vn/root/boxreactjs
```
### Install packages
```
$ cd boxreactjs
$ yarn install
```
### Setting alias to localhost
```
 vim /etc/hosts
 ```
 Add following hosts.
 ```
 # Initial host
127.0.0.1       box-dev.studio
```
### Setting ENVIRONMENT_VARS
```
$ cd webpack/dev && cp .env.sample .env
$ vim .env
# rewrite your env vars
```
### Starting the Development Server
```
$ yarn start
```

## Development Style Guide

1 MergeRequest should have 1 feature.
Please fill following template in MergeRequest's description.

```
## Summary
* Write `Why these change?`

## What is Change
* Write `What did you do?` from technical inspect

## How to use
* Write `How to check your change?`
* Write the url in local env if it is.

## Tested
* [ ] Write `What kind of tests did you do?`

## TODO
* Write `What is your next step?`
```

## Coding Style Guide

!! [here](./docs/STYLEGUIDE.md)