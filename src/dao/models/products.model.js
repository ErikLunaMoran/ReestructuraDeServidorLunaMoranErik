import mongoose from "mongoose";

const autoCollection = "products";

const autoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const autoModel = mongoose.model(autoCollection, autoSchema);
export { autoModel };
