const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, `name must be filled`],
    trim: true,
  },

  email: {
    type: String,
    reuired: [true, `name must be filled`],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "provide valid email"],
  },

  password: {
    type: String,
    require: [true, `please provide a passord`],
    minlength: 4,
    // select: false,
  },
  conformPassword: {
    type: String,
    require: [true, `please provide a passord`],
    minlength: 4,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

schema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, "mynameisrajeshrajpandey");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log(token);

    return token;
  } catch (err) {
    console.log(err);
  }
};

//// pre ==>> hash password before saving it

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.conformPassword = undefined;
  }
  next();
});

const Admin = mongoose.model("Admin", schema);
module.exports = Admin;
