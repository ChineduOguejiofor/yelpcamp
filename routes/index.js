const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//root route
router.get('/', function (req, res) {
  res.render("landing");
});

//======================================================
//AUTH ROUTES
//SIGN UP ROUTES
//========================================================
router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", function (req, res) {
  const newUser = new User({ username: req.body.username });

  req.body.password
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to St. Benjamin " + user.username);

      res.redirect("/campgrounds");
    });
  });

});


//======================================================
//LOGIN ROUTES
//========================================================
router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function (req, res) { });

//LogOut route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged Out");
  res.redirect("/campgrounds");
});

//middle ware to check if a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");//else just redirect to login
}
module.exports = router;
