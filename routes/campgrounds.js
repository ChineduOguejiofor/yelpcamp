const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");


router.get('/', function (req, res) {
  //fect from db
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campground/index", { campgrounds: allCampgrounds });
    }
  })
});

router.post('/', middleware.isLoggedIn, function (req, res) {
  // res.send("you hit the post rount");
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description;
  const author = {
    id: req.user.id,
    username: req.user.username
  };
  const newCamp = { name: name, image: image, description: desc, author: author };
  //Pass the campground to the database
  Campground.create(newCamp, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  })


});

router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campground/new");
});


//SHOW more info about a camp 
router.get("/:id", function (req, res) {
  //find the campground with provided id
  //render show template

  Campground.findById(req.params.id).populate("comments").exec(function (err, foundcamp) {
    if (err) {
      console.log(err);
    } else {
      //console.log(foundcamp);

      res.render("campground/show", { campground: foundcamp });
      //res.send("you jave reached the sow pages");


    }
  });
});
//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampOwnership, function (req, res) {
  Campground.findById(req.params.id, function (err, foundcamp) {
    res.render("campground/edit", { campground: foundcamp });
  });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampOwnership, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCamp) {
    if (err) {
      console.log('There was an err');
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});
//DELETE ROUTE
router.delete("/:id", middleware.checkCampOwnership, function (req, res) {
  Campground.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");

    }
  });
});




module.exports = router;
