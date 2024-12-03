// Import statements
import { navbar, getLocation } from "./navbar.js";
import { footer } from "./footer.js";

// Navbar setup
document.getElementById("footer").innerHTML = footer();

// Cart functionality
const menuToggle = document.querySelector("#toggle");

menuToggle.addEventListener("click", () => {
  console.log("clicked me");
  const div = document.getElementById("cart_space");
  div.style.visibility = "visible";

  const content = `
    <div class="cart-box">
      <button id="closedCart">╳</button>
      <div class="whole-cart-window hide">
        <h2>Your cart</h2>
        <div class="cart-wrapper" id="cartAdd"></div>
        <div class="checkout"><button id="kcheckoutBtn">BUY NOW</button></div>
      </div>
    </div>`;
  div.innerHTML = content;

  const wholeCartWindow = document.querySelector(".whole-cart-window");
  if (wholeCartWindow.classList.contains("hide"))
    wholeCartWindow.classList.remove("hide");

  const closedCart = document.querySelector("#closedCart");
  closedCart.addEventListener("click", () => {
    console.log("close this");
    wholeCartWindow.classList.add("hide");
    div.style.visibility = "hidden";
    window.location.href = "./index.html";
  });

  let cart_page_details = JSON.parse(localStorage.getItem("cart_Item")) || [];
  console.log(cart_page_details);
  let cartAdd = document.getElementById("cartAdd");

  cart_page_details.forEach(function (el, index) {
    let div = document.createElement("div");
    div.setAttribute("class", "cart-item");

    let eachCross = document.createElement("h3");
    eachCross.innerText = "╳";
    eachCross.addEventListener("click", function () {
      cart_page_details.splice(index, 1);
      localStorage.setItem("cart_Item", JSON.stringify(cart_page_details));
      window.location.reload();
    });

    let image = document.createElement("img");
    image.src = el.image;
    image.setAttribute("id", "cart-image");

    let div1 = document.createElement("div");

    let price = document.createElement("h3");
    price.innerText = "Price : " + el.price;
    price.setAttribute("id", "cart-price");

    let title = document.createElement("h1");
    title.innerText = el.discription;
    title.setAttribute("id", "cart-title");

    div1.append(title, price);
    div.append(image, div1, eachCross);
    cartAdd.append(div);
  });

  document
    .querySelector("#kcheckoutBtn")
    .addEventListener("click", function () {
      window.location.href = "html/payments.html";
    });
});
