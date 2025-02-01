# FAQ Management API

### Ongoing work:

- Creating a front-end for a more pleasant experience

## Overview

A MERN-based application to manage FAQs in multiple languages, translated by Google Transplate API, and added support of WYSIWYG editor for rich-text formatting, and Redis for caching and quicker responses.

## Features

- REST APIs for CRUD operations of FAQs.
- Answers stored in WYSIWYG-friendly format.
- Caching with Redis for performance.
- Translation to multiple languages with Google Translate.
- Full testing and linting coverage.

## Tech Stack

### Server Side:

- [**Node.js**](https://nodejs.org/en): Backend runtime environment.
- [**Express.js**](https://expressjs.com/): Web framework for Node.js.
- [**Mongoose**](https://mongoosejs.com/): MongoDB ORM for handling database operations.
- [**jsdom**](https://www.npmjs.com/package/jsdom): To parse the strings into a DOM and travel through it. **(Read point 1 of Notes for explanation.)**
- [**Google Translate API X**](): A free and unlimited API for Google Translate.
- [**Redis**](https://redis.io/): In-memory data store for caching.
- [**Mocha**](https://mochajs.org/): Simple testing framework for Node.js.
- [**Chai**](https://www.chaijs.com/): An assertion library that pairs well with Mocha.
- [**ESLint**](https://eslint.org/): Standard linting library for JavaScript and JSX.

## Prerequistes

Make sure you have following installed or setup:

- **Git**: to clone the repository.
- **Node** and **NPM**: install and set up to run applications.
- **MongoDB**: a setup cluster and a MongoDB connection URI.
- **Redis**: installed and set up to run in the background.

## Installation

1. Run the following commands:

```
git clone https://github.com/RajBhanani/BharatFD-Submission-JavaScript
```
```
cd BharatFD-Submission-JavaScript/server
```
```
npm install
```

2. Open the .env and set it up like .env.sample but with your credentials.
3. Open another terminal to start up a Redis server
   Firstly, run `redis-cli ping` to check if the Redis server is already on.
   If you get a reply saying `PONG`, the server is on and you can proceed to the next step. If not, run `sudo service redis-server start`. You may be prompted to type the password for the user. Enter it and run the same ping command again to confirm that the server is one.
4. In the original terminal, run `npm start` to start the server. If all is set up properly, you will receive a similar log in the terminal:

```
MongoDB connected
Host is ac-gu86s0d-shard-(some gibberish).mongodb.net
⚙️  Server is running at port 3000
```

## API Endpoints

Once the server starts, you can hit endpoints to perform CRUD operations on the FAQs.
Here is a description of all them:

### 1. Fetch all FAQs

```
http://localhost:3000/api/v1/faqs
```
- Method: GET
- Request Parameters: none
- Request Body: none
- Response Type: Array of Objects

### 2. Fetch one FAQ by ID

```
http://localhost:3000/api/v1/faqs/:id
```
- Method: GET
- Request Parameters: ID of the required FAQ
- Request Body: none
- Response Type: Object

### 3. Create an FAQ

```
http://localhost:3000/api/v1/faqs/create
```
- Method: POST
- Request Parameters: none
- Request Body: Object containing a question key and an answer key
- Response Type: Newly created object, pre save (Read point 2 of Notes)

### 4. Update an FAQ

```
http://localhost:3000/api/v1/faqs/update
```
- Method: PUT
- Request Parameters: none
- Request Body: Object containing ID of the FAQ to be changed and a sub-Object containing the changes
- Response Type: Updated object, pre save (Read point 2 of Notes)

### 5. Delete an FAQ

```
http://localhost:3000/api/v1/faqs/delete
```
- Method: DELETE
- Request Parameters: none
- Request Body: Object containing to ID of the FAQ to be deleted
- Response Type: Confirmation message

### 6. Fetch one or all FAQs in another language

```
http://localhost:3000/api/v1/faqs?lang={languageCode}
```
```
http://localhost:3000/api/v1/faqs/:id?lang={languageCode}
```

- Method: GET
- Request Parameters: Language code ["hi" (Hindi), "gu" (Gujarati), "mr" (Marathi), or "bn" (Bengali)] and if needed, ID
- Request Body: none
- Response Type: Array of Objects or one Object

## Notes

1. Directly translating the strings caused many of the HTML tags and attributes to be translated to, hence disrupting the WYSIWYG editor. To counter this, the strings need to be parsed into a JavaScript DOM and the tree needs to be walked through recursively until the last child is reached and go bottom-up, translating only the text content of each element and leaving the tags alone. In the end, the entire DOM tree is once again converted to a string, which is then saved into the database.
2. Because of how mongoose works, the newly created object is returned before the middleware to translate and store the FAQs is ran, hence the actual time to commit the data to the database is a few miliseconds longer than the time to return the response from the create and update APIs. This is largely due to the fact that parsing and translating the FAQs is a slow process, dependent on third-party libraries like jsdom and google-translate-api-x.
3. All the responses and errors from the APIs are standardised and will always have the same format. Refer their respective files in `server/src/utils` for a reference.

## Contributing

All contributions to help fix the above mentioned caveats or any other issues are welcomed!
Please do the following if you want to contribute:
- Fork the repository and clone it to your local machine.
- Create a new branch (`git checkout -b feature/your-feature-name`).
- Make your changes.
- Commit your changes (`git commit -m 'feat: add new feature'`).
- Push to your branch (`git push origin feature/your-feature-name`).
- Create a pull request.

This README provides everything needed to understand, install, and use the project. Let me know if you need any modifications!
