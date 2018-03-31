//import { userInfo } from "os";

//Setting up and grabbing required data
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");

//Saving userInputs to a variable
var liriSelector = process.argv[2];
var userInput = process.argv;
var input = [];



//getting user search criteria after the selector
for (var i = 3; i < userInput.length; i++) {
    debugger;
    input.push(userInput[i]);
}

//switch case for user inputs selector
switch (liriSelector) {
    case "my-tweets":

        break;

    case "spotify-this-song":

        break;

    case "movie-this":
        displayMovie();
        break;

    case "do-what-it-says":

        break;

    default:
        console.log("Please use a command: my-tweets, spitify-this-song, movie-this, or do-what-it-says")
        break;
}

function displayTwitter() {
    //Get and display latest 20 tweets

}

function displaySpotify() {
    //Shows artists, song's name, preview link of song from spotify, and album
    //If no song provided then default to 'The Sign' by Ace of Base

}

function displayMovie() {
    //Will return Title of Movie, Year of release, IMDB rating, Rotten Tomatoes Rating, Country produced, Language, Plot, Actors
    //If no movie provided defaults to 'Mr. Nobody'
    var movieName = input
    if (!process.argv[3]) {
        movieName = "Mr.+Nobody"
    }
    request("http://www.omdbapi.com/?t=" + movieName + "&y=plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {

        //If no errors and a 200 response code, successful request
        if (!error && response.statusCode === 200) {
            console.log("The title is: " + JSON.parse(body).Title);
            console.log("The year released was: " + JSON.parse(body).Year);
            console.log("The IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The Rotten Tomatoes Rating is: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot:" + JSON.parse(body).Plot);
            console.log("Actors:" + JSON.parse(body).Actors);
        }
        else {
            console.log("Error: " + error);
        }
    })

}

// function doWhat() {
//     //will use the text from random.txt file for a spotify-this-song command
//     fs.readFile("random.txt", "utf-8", function(error, data){

//         //Check for errors and log if error is encountered
//         if (error) {
//             return console.log(error);
//         }

//         displaySpotify(data);
//     })
// }