const mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment");

const data = [
  {
    name: "Can you hear me",
    image: "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Well tell me if you can"
  },
  {
    name: "Save my Guitar",
    image: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "This is a nice Desc"
  },
  {
    name: "Oldies",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "This is a nice Desc"
  },
];

function seedDB() {
  //remove all campground

  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log('Removed Campground');
    // data.forEach(function (seed) {
    //   Campground.create(seed, function (err, newCampground) {
    //     if (err) {
    //       console.log(err);

    //     } else {
    //       Comment.create({
    //         text: "This is a nice comment",
    //         author: "Hommie"
    //       }, function (err, comment) {
    //         if (err) {
    //           console.log(err);

    //         } else {
    //           newCampground.comments.push(comment);
    //           newCampground.save();
    //           console.log('add a new campground');

    //         }
    //       });

    //     }
    //   })
    // })

  });
}

module.exports = seedDB;
