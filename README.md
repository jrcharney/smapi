# smapi

Homework Challenge 18: SMAPI (Social Media API)

Due February 27, 2023

[![Screenshot](./smapi-screenshot.png)](smapi.herokuapp.org/)

## User Story

```text
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptable Criteria

```text
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## TODO List

- [ ] Use Mongoose models to sync a MongoDB database
- [ ] Use Insomnia to run `GET` routes to return data in `JSON` format. This should read data. Screenshot!
- [ ] Test data for `POST` routes in Insomnia.  This should add data.  Screenshot!
- [ ] Test data for `PUT` routes in Insomnia. This should update data. Screenshot!
- [ ] Test data for `DELETE` routes in Insomnia. This should remove data. Screenshot!


## Note: MongoDB does NOT support Windows Subsystem for Linux

If you like using WSL, you're probably not not going to like what is on [this page](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/).

You have two options:

1. Install MongoDB for Windows
2. Use a dedicated Linux system

Fortunately, I have the second item.
