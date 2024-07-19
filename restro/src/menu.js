export const menu = () => {
  const div = document.createElement("div");
  const h1 = document.createElement("h1")
  h1.textContent = "Menu";
  div.appendChild(h1);
  document.getElementById("content").replaceChildren(div);
};
