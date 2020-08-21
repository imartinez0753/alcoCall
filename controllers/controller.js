var express = require("express");
var path = require("path");

var router = express.Router();

var userInfo = require("../models/userInfo.js");
const bcrypt = require("bcryptjs");

// Create all our routes and set up logic within those routes where required.
router.get("/api", function (req, res) {
  userInfo.all(function (result) {
    res.json(result);
  });
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/../views/layout/", "signIn.html"));
  // res.render("index", object);
});

router.get("/liquor_search.html", function (req, res) {
  res.sendFile(
    path.join(__dirname + "/../views/layout/", "liquor_search.html")
  );
  // res.render("index", object);
});

router.get("/bars.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/../views/layout/", "bars.html"));
  // res.render("index", object);
});

router.get("/beerSearch.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/../views/layout/", "beersearch.html"));
});

router.get("/random.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/../views/layout/", "random.html"));
});

router.get("/AlcoholReferences.html", function (req, res) {
  res.sendFile(
    path.join(__dirname + "/../views/layout/", "AlcoholReferences.html")
  );
});

router.get("/index.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/../views/layout/", "index.html"));
});
router.get("/signIn.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/../views/layout/", "signIn.html"));
});

router.post("/api/userInfo", function (req, res) {
  // console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    userInfo.create(
      ["userName", "DOB", "password"],
      [req.body.userName, req.body.DOB, hash],
      function (result) {
        res.json(result);
      }
    );
  });
});

module.exports = router;
