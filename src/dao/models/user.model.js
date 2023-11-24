import mongoose from "mongoose";

const userCollection = "personas";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export { userModel };

/* const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,

  role: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario",
  },
}); */
