const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  User = require("./models/user"),
  flash = require("connect-flash"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local");
const PORT = process.env.PORT || 3000

//seedDB = require("./seed");

const commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

//seedDB();//seed db ie remove all contents
//mongoose.connect("mongodb://localhost/yelp_camp");
mongodb://knight:<password>@yelpcamp-shard-00-00-pszhu.mongodb.net:27017,yelpcamp-shard-00-01-pszhu.mongodb.net:27017,yelpcamp-shard-00-02-pszhu.mongodb.net:27017/test?ssl=true&replicaSet=yelpcamp-shard-0&authSource=admin&retryWrites=true&w=majority
//mongoose.connect("mongodb://knight:yelppass@yelpcamp-pszhu.mongodb.net/test?retryWrites=true&w=majority");

mongoose.connect("mongodb://knight:yelppass@yelpcamp-shard-00-00-pszhu.mongodb.net:27017,yelpcamp-shard-00-01-pszhu.mongodb.net:27017,yelpcamp-shard-00-02-pszhu.mongodb.net:27017/test?ssl=true&replicaSet=yelpcamp-shard-0&authSource=admin&retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATIONS
app.use(require("express-session")({
  secret: "Forgive,Save,Help me more",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// app.listen(3000, function () {
//   console.log('Server started on 3000');
// });

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
