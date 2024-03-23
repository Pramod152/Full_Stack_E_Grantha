const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `./config.env` });

const port = process.env.PORT || 3000;

// mongoose.connect("mongodb://127.0.0.1:27017/E-Grantha").then(() => {
//   console.log(`connecction successful`);
// });
mongoose
  .connect(
    "mongodb+srv://egranntha:6fnPEegOKxrofXzg@e-grantha-db.v4bbumj.mongodb.net/E-Grantha"
  )
  .then(() => {
    console.log(`Connection Successful`);
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
