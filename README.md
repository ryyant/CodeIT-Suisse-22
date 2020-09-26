These instruction are to help you solve a test challenge "Calculate Square". Instruction to this test challenge can be found at https://calculate-square.herokuapp.com/instructions

## Step by step
- Make sure you have node env setup on your local machine
- As per the instruction you have to implement a post endpoint `/square`
- Go to `app.js` in this template and you will find `/square` endpoint refers to implementation in `./routes/square` file
- Go to `square.js` in routes folder
- in this file a default post method in implemented (denoted by `/`). 
- write your implementation in this method. This method will be the entry point when you submit your solution for evaluation
- You need to follow similar approach for actual challenges. Define the end  point as per instruction for each challenge and then submit your application for evaluation

# nodejs-template

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

A `POST /square` endpoint is implemented here to solve an example challenge [Calculate Square](https://calculate-square.herokuapp.com/instructions). You can use the example as a starting point to implement endpoints for other challenges.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed. 

```sh
$ git clone https://gitlab.com/CodeITSuisseTemplates/nodejs-template.git # or clone your own fork
$ cd nodejs-template
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

If you run the following `curl` command to send a request to your app, you should be able to see in your logs something like the example below.

```sh
$ curl -d '{ "input": 2 }' -H 'Content-Type: application/json' http://localhost:5000/square
```

```
Request: POST /square at ...
Request Body:
{
	"input": 2
}
Response Body:
4
Response: 200 0.275 ms 
```

## Deploying to Heroku

Make sure you have [Heroku CLI](https://cli.heroku.com/) installed and run this in the project folder.

```
$ heroku create
$ git push heroku main
$ heroku open
```

**or**

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
