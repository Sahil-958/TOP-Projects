export const home = () => {
  const div = document.createElement("div");
  const h1 = document.createElement("h1")
  h1.textContent = "Home";
  div.appendChild(h1);
  document.getElementById("content").replaceChildren(div);
};
