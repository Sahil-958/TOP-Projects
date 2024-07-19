import "./style.scss";
import { home } from "./home";
import { menu } from "./menu";
import { about } from "./about";
import { functions } from "lodash";

const buttons = document.querySelectorAll("button");
const content = document.getElementById("content");
about();
function clearContent() {
  content.innerHTML = "";
}

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.target.id;
    clearContent();
    if (id === "home") {
      home();
    } else if (id === "menu") {
      menu();
    } else if (id === "about") {
      about();
    }
  });
});
