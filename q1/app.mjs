import mongoose from "mongoose";
const MealSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snack"],
  },
  description: { type: String, required: true },
});

mongoose.model("Meal", MealSchema);
const Meal = mongoose.model("Meal");
mongoose.connect("mongodb://localhost:27018/test");

import express from "express";

const app = express();
import url from "url";
import path from "path";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// TODO add middleware and route handlers here
app.use(express.static("public"));
app.use("/api", express.json());

app.post("/api/meals", async (req, res) => {
  const { type, description } = req.body;

  const meal = new Meal(req.body);
  try {
    await meal.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Database Error" });
  }
  res.status(200).json({ msg: "Meal Succesfully Created", id: meal._id });
});

app.listen(3000);
