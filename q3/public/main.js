const sock = io();

let classrooms = [];

const render = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  classrooms
    .filter(({ available }) => available)
    .forEach(({ name }) => {
      const room = document.createElement("p");
      room.innerText = name;
      room.addEventListener("click", () => {
        sock.emit("booked", name);
      });
      main.appendChild(room);
    });
};

sock.on("connection", (rooms) => {
  classrooms = rooms;
  render();
});

sock.on("update", (update) => {
  classrooms = update;
  render();
});
