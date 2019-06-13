
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

// const george = new Cat({
//   name: "abiola",
//   age: 25,
//   temperament: "collected"
// });

// george.save(function (err, cat) {
//   if (err) {
//     console.log('Something went wrong');

//   } else {
//     console.log('WE just saved your data');
//     console.log(cat);



//   }
// });


Cat.find({}, function (err, cats) {
  if (err) {
    console.log('Oh crap Error');

  } else {
    console.log('Here are all your cats');
    console.log(cats);


  }
})