import { userInfo } from "os";

//Setting up and grabbing required data
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");

//Saving userInputs to a variable
var liriSelector = process.argv[2];
var userInput = process.argv[];
var input = "";
for (var i = 3; i < userInput.length; i++) {
    if (i>3 && i<userInput.length) {
        inputs = input + "+" + userInput[i];
    } else {
        x = x + userInput[i];
    }
}

//switch case for user inputs selector
switch(liriSelector) {
    case "my-tweets":

    break;

    case "spotify-this-song":

    break;

    case "movie-this":

    break;

    case "do-what-it-says":

    break;

    default:
        console.log("Please use a command: my-tweets, spitify-this-song, movie-this, or do-what-it-says")
    break;
}

function displayTwitter() {

}

function displaySpotify() {

}

function displayMovie() {

}

function doWhat() {
    
}