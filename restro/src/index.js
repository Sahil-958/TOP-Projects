const content = document.getElementById("content");
//create html for a hotel home page with using JS only
//
//create a div element
const div = document.createElement("div");
div.setAttribute("class", "hotel");
content.appendChild(div);

//create a h1 element
const h1 = document.createElement("h1");
h1.textContent = "Hotel California";
div.appendChild(h1);

//create a p element
const p = document.createElement("p");
p.textContent =
  "Welcome to the Hotel California. Such a lovely place. Such a lovely face.";
div.appendChild(p);

//create a img element
const img = document.createElement("img");
img.src = "hotel.jpg";
img.setAttribute("alt", "Hotel California");
div.appendChild(img);

//create a button element
const button = document.createElement("button");
button.textContent = "Book Now";
div.appendChild(button);

//create a footer element
const footer = document.createElement("footer");
footer.textContent = "© 2021 Hotel California";
content.appendChild(footer);
