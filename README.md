# Xablaum API

This is an API to supply for another project. It is developped in `node.js` using `express`. This is a project created to study and learn express and should not be used as a operating finished product, but you are invited to learn everything you can from it.

## Requirements

As previously said, this is developped in node, so the requirements to build this project is a installation of node. We're using current LTS version of node (v16.15.1). You will also need `npm` as a package manager installed.

## Build

You can build this API locally in you machine by cloning this repo with command

```shell
git clone https://github.com/GabrielCmrg/projeto14-xablaum-back.git
```

Going to the repo directory and running

```shell
npm install
```

After this, you will need to create an file called .env in project's root directory and fill with the variables provided in .env.example. After all this steps are done you can finally run your API with the command.

```shell
npm start
```

## Features

This API counts with the following routes

### Authentication

#### Sign-up

You can sign-up to this API by making a POST request to route `/sign-up` with a object like

```js
{
  name, // string and required
  email, // string with email format and required
  password, // string and required
  confirmPassword, // string, required and should be equal to password key
}
```

If everything is ok, it will return status code 201. If any key is improperly passed it will return status code 422. If the email is already being used it will return status code 409. If anything breaks internally it will return status code 500.

#### Login

You can login to this API after creating an account on above route and by making a POST request to `/login` with a object like

```js
{
  email, // string with email format and required
  password, // string and required
}
```

If everything is ok, it will return status code 200. If any key is improperly passed it will return status code 422. If information given is not on database it will return status code 401. If anything breaks internally it will return status code 500.

### Products

#### Create new product

You can create a new product and insert it on database by making a POST request to `/create-new-product` with a object like

```js
{
  name, // string and required
  oldPrice, // number and required
  newPrice, // number and required
  image, // string with URI format and required
  description, // string and required
}
```

If everything is ok, it will return status code 201. If any key is improperly passed it will return status code 422. If anything breaks internally it will return status code 500.
