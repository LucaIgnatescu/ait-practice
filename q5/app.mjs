import express from "express";
import mongoose from "mongoose";
import hbs from "hbs";

try {
  await mongoose.connect("mongodb://127.0.0.1:27018/test");
  console.log("connected");
} catch (err) {
  console.error(err);
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  year: { type: Number, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

const app = express();
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.post("/movie/:slug", (req, res) => {
  const { slug } = req.params;

  const movie = Movies.find({ slug: slug });
  console.log(movie);

  res.render("movie-slug");
});

app.get("/movie/:slug", async (req, res) => {
  const { slug } = req.params;
  const movie = await Movie.findOne({ slug: slug });
  if (!movie) return res.redirect("/movie");
  res.render("movie-details", movie);
});

app.get("/movie", (req, res) => res.render("addMovie"));

app.post("/movie", async (req, res) => {
  const { title, year } = req.body;
  if (!title || !year) {
    return res.redirect("/movie");
  }
  const slug = title.toLowerCase().replaceAll(" ", "-");

  const newMovie = new Movie({ title, year, slug });
  try {
    await newMovie.save();
  } catch (err) {
    consolee.error(err);
    return res.redirect("/movie");
  }
  res.redirect(`/movie/${slug}`);
});

app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find({});
  console.log(movies);
  return res.json(JSON.stringify(movies));
})

app.listen(3000);
