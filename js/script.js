const productContainer = document.getElementById("product-container");
const loadData = () => {
  productContainer.innerHTML = "<h1>Loading...</h1>";
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cock")
    .then((res) => res.json())
    .then((data) => displayData(data.drinks));
};

const displayData = (data) => {
  productContainer.innerHTML = "";
  if (data == "no data found") {
    productContainer.innerHTML = `
    <h5 class="text-danger display-5">No Data Found</h5>`;
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
        <button type="button" class="btn btn-outline-success w-100" onclick="addToCart('${
          element.strGlass
        }', '${element.strDrinkThumb}', this)">Add to Cart</button>
        <button type="button" class="btn btn-outline-danger" id="details" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
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

let cartCount = 1;

const addToCart = (title, thumb, el) => {
  if (cartCount - 1 >= 7) {
    alert("You've reached the limit, you can only add 7 items");
  } else {
    const cartTable = document.getElementById("cart-table");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row" style="width: 10%; vertical-align: middle">${cartCount++}</th>
      <td style="width: 30%"><img src="${thumb}" class="card-img-top rounded-circle " alt="..."></td>
      <td style="width: 60%; vertical-align: middle">${title}</td>
    `;
    cartTable.appendChild(tr);
    el.innerText = "Already Selected";
    el.classList.remove("btn-outline-success");
    el.classList.add("btn-outline-secondary");
    el.setAttribute("disabled", true);
    document.getElementById("selected-items").innerText = cartCount - 1;
  }
};
