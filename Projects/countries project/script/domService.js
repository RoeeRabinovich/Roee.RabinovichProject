import { countries, reset, search } from "./countriesService.js";
const cardsContainer = document.getElementById("cards");
//an event listener for the search bar, if the search bar is empty  show every country ,else show the searched value.
document.getElementById("search-input").addEventListener("input", (event) => {
  reset();
  cardsContainer.innerHTML = "";
  if (!event.target.value || event.target.value === "") {
    createCards();
  } else {
    search(event.target.value);
    createCards();
  }
});
//Generating a card for each country
const generateCard = (country) => {
  const card = document.createElement("div");
  card.className = "card m-2 col-sm-12 col-md-3";

  const cardImg = document.createElement("img");
  cardImg.src = country.flags.png;
  cardImg.className = "card-img-top img mt-2 border rounded shadow";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = country.name.common;

  const population = document.createElement("p");
  population.className = "card-text";
  population.innerText = `population: ${country.population}`;

  const region = document.createElement("p");
  region.className = "card-text";
  region.innerText = `Region: ${country.region}`;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  let heartIcon = document.createElement("i");
  heartIcon.className = "fa fa-heart text-dark";

  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("text-danger");
    heartIcon.classList.toggle("text-dark");

    const likedItemsArr = JSON.parse(localStorage.getItem("liked")) || [];
    if (heartIcon.classList.contains("text-danger")) {
      //add to likes
      likedItemsArr.push(country);
    } else {
      //remove from likes - find the country index
      for (let i = 0; i < likedItemsArr.length; i++) {
        if (likedItemsArr[i].name.common === country.name.common) {
          likedItemsArr.splice(i, 1);
          break;
        }
      }
    }

    localStorage.setItem("liked", JSON.stringify(likedItemsArr));
  });
  //a for loop checking if a country is liked or not.
  const likedItemsArr = JSON.parse(localStorage.getItem("liked")) || [];
  for (let i = 0; i < likedItemsArr.length; i++) {
    if (likedItemsArr[i].name.common === country.name.common) {
      heartIcon.classList.add("text-danger");
      heartIcon.classList.remove("text-dark");
      break;
    }
  }

  cardFooter.appendChild(heartIcon);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(population);
  cardBody.appendChild(region);

  card.appendChild(cardImg);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  const cardsContainer = document.getElementById("cards");
  cardsContainer.appendChild(card);
};

const createCards = () => {
  for (const country of countries) {
    generateCard(country);
  }
};
export { createCards };
