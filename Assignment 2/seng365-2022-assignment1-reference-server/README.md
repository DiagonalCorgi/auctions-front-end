# SENG365 2022 Assignment 1 API Reference Server

# Overview 
The full implementation for the Assignment 1 API has been provided here to help you work on the second assignment.
We expect your website to work with this API (it will be tested as such), so it is suggested to use this and not your own implementation. 

Feel free to explore this code-base to learn more about express and TypeScript.
If you encounter any issues please reach out to Morgan English (morgan.english@canterbury.ac.nz).

## Running locally

1. Use `npm install` to populate the `node_modules/` directory with up-to-date packages
2. Create a file called `.env`, following the instructions in the section below
3. Go to https://dbadmin.csse.canterbury.ac.nz and create a database with the name that you set in the `.env` file
2. Run `npm run start` or `npm run debug` to start the server
3. The server will be accessible on `localhost:4941`

### `.env` file
Create a `.env` file in the root directory of this project including the following information (note that you will need to create the database first in phpMyAdmin):

```
SENG365_MYSQL_HOST=db2.csse.canterbury.ac.nz
SENG365_MYSQL_USER={your usercode}
SENG365_MYSQL_PASSWORD={your password}
SENG365_MYSQL_DATABASE={a database starting with your usercode then an underscore}
```

For example:
```
SENG365_MYSQL_HOST=db2.csse.canterbury.ac.nz
SENG365_MYSQL_USER=abc123
SENG365_MYSQL_PASSWORD=password
SENG365_MYSQL_DATABASE=abc123_s365
```