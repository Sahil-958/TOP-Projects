export const about = () => {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  p.textContent =
    "I don't feel like creating a restro project tho i just did it just to verify my webpack and modules learnings, but wait for ToDo project, it's gonna be awesome";
  h1.textContent = "About";
  div.appendChild(h1);
  div.appendChild(p);
  document.getElementById("content").replaceChildren(div);
};
