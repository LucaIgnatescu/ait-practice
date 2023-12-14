const form = document.querySelector("form");
const body = document.querySelector("body");

console.log(form);

form.onsubmit = async (event) => {
  event.preventDefault();

  const type = document.querySelector("#type").value;
  const description = document.querySelector("#description").value;

  const {id} = await fetch("/api/meals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, description }),
  }).then((res) => res.json());

  form.remove();
  const infoNode = document.createElement('p');
  infoNode.innerText = `Meal saved as ${id}`;

  body.appendChild(infoNode);
};
