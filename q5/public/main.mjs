const button = document.querySelector("#button");
const body = document.querySelector("body");

button.onclick = () => {
  console.log("clicked");
  fetch("/api/movies")
    .then((res) => res.json())
    .then((data) => JSON.parse(data))
    .then((data) => {
      data.forEach(({ title, year }) => {
        const movie = document.createElement("p");
        movie.innerText = `${title}-${year}`;
        body.appendChild(movie);
      });
    });
};
