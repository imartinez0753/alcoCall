// var orm = require("../../config/orm.js");
// import bcrypt from "bcryptjs";
// bcrypt.hash("my password", "my salt", (err, hash) => {
//   // Store hash password in DB
// });
// const hash = bcrypt.hashSync('my password', 'my salt');
const bcrypt = require("bcryptjs");

function DOBuserInfo() {
  var DOB = $("<div>");
  DOB.addClass("form-group");
  var DOBLable = $("<lable>");
  DOBLable.attr("for", "DOB");
  DOBLable.text("Date of birth");
  var DOBInput = $("<input>");
  DOBInput.attr({ type: "date", id: "DOB" });
  DOBInput.addClass("form-control");
  $("#form").append(DOB);
  $("#form").append(DOBLable);
  $("#form").append(DOBInput);
}
function userNameInfo() {
  var userName = $("<div>");
  userName.addClass("form-group");
  var userNameLable = $("<lable>");
  userNameLable.attr("for", "userName");
  userNameLable.text("User Name");
  var userNameInput = $("<input>");
  userNameInput.attr({ input: "userName", id: "userName" });
  userNameInput.addClass("form-control");
  $("#form").append(userName);
  $("#form").append(userNameLable);
  $("#form").append(userNameInput);
}
function submit() {
  var submitBtn = $("<button>");
  submitBtn.attr({ type: "submit", id: "submit" });
  submitBtn.addClass("btn btn-primary");
  submitBtn.text("Submit");
  $("#form").append(submitBtn);
}
function submit2() {
  var submitBtn = $("<button>");
  submitBtn.attr({ type: "submit", id: "submit2" });
  submitBtn.addClass("btn btn-primary");
  submitBtn.text("Submit");
  $("#form").append(submitBtn);
}
function passwordInfo() {
  var password = $("<div>");
  password.addClass("form-group");
  var passwordLable = $("<lable>");
  passwordLable.attr("for", "password");
  passwordLable.text("password");
  var passwordInput = $("<input>");
  passwordInput.attr({ type: "password", id: "password" });
  passwordInput.addClass("form-control");
  $("#form").append(password);
  $("#form").append(passwordLable);
  $("#form").append(passwordInput);
}
function signUp() {
  $("#form").empty();
  userNameInfo();
  passwordInfo();
  DOBuserInfo();
  submit();
  $("body").on("click", function (event) {
    if (event.target.matches("#submit")) {
      event.preventDefault();
      console.log("submit");
      var newUserName = {
        userName: $("#userName").val().trim(),
        DOB: $("#DOB").val().trim(),
        password: $("#password").val().trim()
      };

      $.get("/api", function (data) {
        // console.log(data[0].userName);
        for (i = 0; i < data.length; i++) {
          if (data[i].userName === $("#userName").val().trim()) {
            return alert("That username is already in use");
          }
        }

        if (
          newUserName.userName === "" ||
          newUserName.DOB === "" ||
          newUserName.password === ""
        ) {
          return alert("all fields must be filled out");
        }
        if (moment().diff($("#DOB").val().trim(), "years") < 21) {
          return alert("sorry you're too young to enjoy booze!");
        } else {
          //========================================================================

          //========================================================================

          // console.log("logged in as " + " " + $("#userName").val().trim());
          $.ajax("/api/userInfo", {
            type: "POST",
            data: newUserName
          }).then(function () {
            console.log("success");
          });
          //hash
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUserName.password, salt, (err, hash) => {
              if (err) throw err;
              //set password to hash
              newUserName.password = hash;
            })
          );
          alert("created an account, please sign in.");
          signIn();
        }
      });
    }
  });
}
function signIn() {
  $("#form").empty();
  userNameInfo();
  passwordInfo();
  submit2();
  $("body").on("click", function (event) {
    if (event.target.matches("#submit2")) {
      event.preventDefault();
      console.log("submit");
      var newUserName = {
        userName: $("#userName").val().trim(),
        password: $("#password").val().trim()
      };

      $.get("/api", function (data) {
        if (newUserName.userName === "" || newUserName.password === "") {
          return alert("all fields must be filled out");
        }
        // console.log(data[0].userName);
        for (i = 0; i < data.length; i++) {
          if (
            data[i].userName === $("#userName").val().trim() &&
            data[i].password !== $("#password").val().trim()
          ) {
            alert("incorrect username and password combination");
          } else {
            //render new html

            window.location.replace("index.html");
          }
        }
      });
    }
  });
}
$(document).ready(function () {
  $(".dropdown-item").on("click", function () {
    if ($(this).text() === "sign up") {
      signUp();
      console.log("signUp");
    } else {
      console.log("signIn");
      signIn();
    }
  });
});
