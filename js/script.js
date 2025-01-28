const productContainer = document.getElementById("product-container");
const loadData = () => {
  productContainer.innerHTML = "<h1>Loading...</h1>";
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((res) => res.json())
    .then((data) => displayData(data.drinks));
};

const displayData = (data) => {
  productContainer.innerHTML = "";
  if (data == "no data found") {
    productContainer.innerHTML = `<div class="alert alert-warning w-100" role="alert">
    <h5>No Data Found</h5>
</div>`;
  } else {
    data.forEach((element) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.setAttribute("style", "width: 17.5rem;");
      div.innerHTML = `<img src="${
        element.strDrinkThumb
      }" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.strGlass}</h5>
    <p class="card-text">Category: ${element.strCategory}</p>
    <p class="card-text">Instructions: ${element.strInstructions.slice(
      0,
      15
    )}...</p>
    <div class="actions">
        <button type="button" class="btn btn-outline-success" id="addToCart">Add to Cart</button>
        <button type="button" class="btn btn-outline-danger" id="details">Details</button>
    </div>`;
      productContainer.appendChild(div);
    });
  }
};

loadData();

const search = () => {
  productContainer.innerHTML = "<h1>Loading...</h1>";
  const searchText = document.getElementById("search-text").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.drinks));
};

document.getElementById("search-button").addEventListener("click", search);

const addToCart = () => {
  const addToCart = document.getElementById("addToCart");
  addToCart.addEventListener("click", () => {
    const cart = document.getElementById("cart");
    const div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("style", "width: 17.5rem;");
    div.innerHTML = `<img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>`;
    cart.appendChild(div);
  });
};
