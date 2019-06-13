const middlewareObj = {};
const Campground = require("../models/campground");
const Comment = require("../models/comment");

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");//else just redirect to login
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        req.flash("error", "comment not found");
        //res.redirect("/campgrounds");
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");

          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.checkCampOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundcamp) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundcamp.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");

          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");

    res.redirect("back");
  }
}

module.exports = middlewareObj;