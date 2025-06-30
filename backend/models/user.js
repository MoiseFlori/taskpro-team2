const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [64, "Password must be at most 64 characters"],
      validate: {
        validator: (v) => !/\s/.test(v),
        message: "Password cannot contain spaces",
      },
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [32, "Name must be at most 32 characters"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [
        function () {
          return this.verify === false;
        },
        "Verify token is required",
      ],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model("user", userSchema);

module.exports = User;
