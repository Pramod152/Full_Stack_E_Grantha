const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, `name must be filled`],
    trim: true,
  },
  lastName: {
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

  subscribedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],

  isAdmin: {
    type: Boolean,
    default: false,
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

const User = mongoose.model("User", schema);

module.exports = User;
