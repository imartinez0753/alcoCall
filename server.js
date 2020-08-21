//Dependencies

var express = require("express");

var PORT = process.env.PORT || 8000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Import routes and give the server access to them.
var routes = require("./controllers/controller.js");

app.use(routes);

app.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
});
