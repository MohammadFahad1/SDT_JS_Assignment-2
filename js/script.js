const loadData = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((res) => res.json())
    .then((data) => displayData(data.drinks));
};

const displayData = (data) => {
  const container = document.getElementById("product-container");
  data.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("style", "width: 16rem;");
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
        <button type="button" class="btn btn-outline-success">Add to Cart</button>
        <button type="button" class="btn btn-outline-danger">Details</button>
    </div>`;
    container.appendChild(div);
  });
};

loadData();
