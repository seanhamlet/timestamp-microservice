# Timestamp Microservice API

## Information

This is a microservice API project for [FreeCodeCamp](https://www.freecodecamp.com/seanmhamlet) that will accept a 
Unix timestamp or natural language date and return a JSON response with the date formatted as both. 

### Requirements
1. A user can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
2. If it contains either, it returns both the Unix timestamp and the natural language form of that date.
3. If it does not contain a date or Unix timestamp, it returns `null` for those properties.

### Usage
```
https://limitless-gorge-65663.herokuapp.com/October%203,%202016
```
```
https://limitless-gorge-65663.herokuapp.com/1475452800
```

### Sample Response
```javascript
{
  "unix": 1475452800, 
  "natural": "October 3, 2016"
}
```

### Running this project

Simply launch it with node using `npm run start` or `node server.js`.
