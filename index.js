// index.js

/**
 * Required External Modules
*/

const express = require("express");
const path = require("path");
const fs = require('fs');



/**
 * App Variables
*/

const app = express();
const port = process.env.PORT || "8000";
const host = process.env.host || "127.0.0.1";
const tabsize = 4;
const JSONFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, "json/people.json")));
const JSONString = {
    "type": "STRING",
    "people": [
        {
            "first": "Emily",
            "middle": "Elizabeth",
            "last": "Hanson",
            "hobbies": [
                "archery", 
                "rafting", 
                "shogi"
            ],
            "age": 44,
            "children": [
                {
                    "first": "Richard",
                    "middle": "William",
                    "age": 17
                },
                {
                    "first": "George",
                    "middle": "Thomas",
                    "age": 14
                },
                {
                    "first": "May",
                    "middle": "Florence",
                    "age": 11
                }
            ]
        },
        {
            "first": "Florence",
            "middle": "M",
            "last": "Wyatt",
            "hobbies": [
                "scuba diving", 
                "travel"
            ],
            "age": 31,
            "children": [
                {
                    "first": "Ivy",
                    "middle": "Francis",
                    "age": 6
                },
                {
                    "first": "Frederick",
                    "middle": "William",
                    "age": 9
                }
            ]
        }
    ]
};



/**
 * App Configuration
*/

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));



/**
 * Route Definitions
*/

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/pretty/file", (req, res) => {
    //var response = JSON.parse(fs.readFileSync('json/people.json'));

    res.render("data-pretty-print", { title: "Pretty Print JSON File", heading: "Pretty Print JSON from file", data: JSON.stringify(JSONFile, null, tabsize) });
});

app.get("/pretty/string", (req, res) => {
    res.render("data-pretty-print", { title: "Pretty Print JSON String", heading: "Pretty Print JSON from string", data: JSON.stringify(JSONString, null, tabsize) });
});

app.get("/raw/file", (req, res) => {
    //var response = JSON.parse(fs.readFileSync('json/people.json'));

    res.render("data-raw", { title: "Raw JSON File", heading: "Raw JSON from file", data: JSON.stringify(JSONFile, null, tabsize) });
});

app.get("/raw/string", (req, res) => {
    res.render("data-raw", { title: "Raw JSON String", heading: "Raw JSON from string", data: JSON.stringify(JSONString, null, tabsize) });
});



/**
 * Server Activation
*/

app.listen(port, () => {
    console.log(`Listening to requests on http://${host}:${port}`);
});