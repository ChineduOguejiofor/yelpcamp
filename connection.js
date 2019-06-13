const mongoose = require("mongoose");

//connect to mongodb
mongoose.connect("mongodb://localhost/testaroo");

mongoose.connection.once("open", function () {
  console.log('Connection has been established');

}).on('error', function (error) {
  console.log('Connection error:', error);

}); 