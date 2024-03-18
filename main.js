import "./style.css";

const boardGames = [
  {
    name: "Talisman: Kingdom Hearts",
    price: "79,95",
    stars: 5,
    reviews: 1452,
    seller: "Games Workshop",
    image: "/assets/talisman-kingdom-hearts.png",
  },
  {
    name: "Rummikub",
    price: 19.99,
    stars: 4.7,
    reviews: 789,
    seller: "Goliath",
    image: "/assets/Rummikub.webp",
  },
  {
    name: "Bahamas",
    price: 10.99,
    stars: 4.7,
    reviews: 1023,
    seller: "Tranjis Games",
    image: "/assets/bahamas.webp",
  },
  {
    name: "Dobble Harry Potter",
    price: 15.99,
    stars: 4.7,
    reviews: 1103,
    seller: "Spot it! Game",
    image: "/assets/Dobble-Harry-Potter.png",
  },
  {
    name: "Hombres lobo de Castronegro",
    price: 10.99,
    stars: 4,
    reviews: 875,
    seller: "Zygomatic",
    image: "/assets/lobos de castronegro.png",
  },
  {
    name: "UNO Flip",
    price: 11.99,
    stars: 4.6,
    reviews: 652,
    seller: "Mattel Games",
    image: "/assets/Uno flip.webp",
  },
  {
    name: "Arre Unicornio",
    price: 14.95,
    stars: 3.9,
    reviews: 1346,
    seller: "Cerebrer Games",
    image: "/assets/arre-unicornio.jpg",
  },
  {
    name: "Misión Cumplida",
    price: 9.95,
    stars: 3,
    reviews: 921,
    seller: "Zacatrus",
    image: "/assets/mision-cumplida.png",
  },
  {
    name: "Cluedo Harry Potter",
    price: 40.5,
    stars: 4.7,
    reviews: 1103,
    seller: "Games Workshop",
    image: "/assets/Cluedo-Harry-Potter-White-Edition.png",
  },
  {
    name: "Mortal",
    price: 13.5,
    stars: 3,
    reviews: 986,
    seller: "Atomo Games",
    image: "/assets/el-mortal.jpg",
  },
  {
    name: "Twister",
    price: 18.79,
    stars: 4.7,
    reviews: 632,
    seller: "Hasbro Gaming",
    image: "/assets/Twister.jpg",
  },
  {
    name: "Virus",
    price: 16.0,
    stars: 4.9,
    reviews: 987,
    seller: "Tranjis Games",
    image: "/assets/virus-juego-de-mesa.jpg",
  },
];

const SELLERS = [];

let SELLER = "";

const filterDiv = document.querySelector("#filter");

const filter = () => {
  const filtered = [];

  for (const boardGame of boardGames) {
    if (SELLER === boardGame.seller || SELLER === "") {
      filtered.push(boardGame);
    }
  }
  printGames(filtered);
};

const fillSeller = (boardGames) => {
  SELLERS.splice(0);
  for (const boardGame of boardGames) {
    if (!SELLERS.includes(boardGame.seller)) {
      SELLERS.push(boardGame.seller);
    }
  }
};

fillSeller(boardGames);

const createSelectSeller = () => {
  const selectDiv = document.createElement("section");

  const selectSeller = document.createElement("select");
  const selectDescription = document.createElement("h3");

  const optionAll = document.createElement("option");
  optionAll.value = "";
  optionAll.textContent = "All Sellers";
  selectSeller.appendChild(optionAll);

  for (const seller of SELLERS) {
    const option = document.createElement("option");
    option.value = seller;
    option.textContent = seller;
    selectSeller.appendChild(option);
  }

  selectDiv.id = "selectSeller";
  selectDescription.textContent = "Filter by Seller";

  filterDiv.appendChild(selectDiv);
  selectDiv.appendChild(selectDescription);
  selectDiv.appendChild(selectSeller);

  selectSeller.addEventListener("change", (event) => {
    SELLER = event.target.value;
    filter();
  });
};

const printGames = (filteredGames) => {
  const divGames = document.querySelector("#products");
  const ulGames = document.createElement("ul");
  divGames.innerHTML = "";

  divGames.appendChild(ulGames);

  for (const boardGame of filteredGames) {
    const liGames = document.createElement("li");
    ulGames.appendChild(liGames);

    const gameName = document.createElement("h3");
    const gamePrice = document.createElement("p");
    const gameStars = document.createElement("div");
    const gameReviews = document.createElement("p");
    const gameSeller = document.createElement("p");
    const divGameImg = document.createElement("div");
    const gameImg = document.createElement("img");

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("div");
      star.className = "star";
      if (i <= boardGame.stars) {
        star.classList.add("filled");
      }
      gameStars.appendChild(star);
    }

    divGameImg.classList.add("img-container");
    gameImg.src = boardGame.image;
    gameName.textContent = boardGame.name;
    gamePrice.textContent = `${boardGame.price} €`;
    gameStars.classList.add("stars");
    gameReviews.textContent = "👁️ " + boardGame.reviews;
    gameSeller.textContent = boardGame.seller;

    liGames.appendChild(divGameImg);
    divGameImg.appendChild(gameImg);
    liGames.appendChild(gameName);
    liGames.appendChild(gamePrice);
    liGames.appendChild(gameStars);
    liGames.appendChild(gameReviews);
    liGames.appendChild(gameSeller);
  }
};

const setUpInputPrice = () => {
  const inputDiv = document.createElement("section");

  const inputDescription = document.createElement("h3");

  const inputPrice = document.createElement("input");

  const searchButton = document.createElement("button");

  inputDiv.id = "inputPrice";
  inputDescription.textContent = "Filter by Price";
  inputPrice.type = "number";
  inputPrice.placeholder = "Set a price";
  searchButton.id = "searchButton";
  searchButton.textContent = "🔍";

  filterDiv.appendChild(inputDiv);
  inputDiv.appendChild(inputDescription);
  inputDiv.appendChild(inputPrice);
  inputDiv.appendChild(searchButton);

  searchButton.addEventListener("click", () => filterByPrice());
};

const clearFilters = () => {
  SELLER = "";
  document.querySelector("#selectSeller").value = "All Sellers";
  document.querySelector("#inputPrice input").value = "All Sellers";
  filter();
};

const setUpClearFiltersButton = () => {
  const clearFiltersButton = document.createElement("button");

  clearFiltersButton.addEventListener("click", clearFilters);

  clearFiltersButton.textContent = "🧹 ";
  filterDiv.appendChild(clearFiltersButton);
};

const filterByPrice = () => {
  const priceInput = document.querySelector("input");
  const price = parseFloat(priceInput.value);

  const filtered = boardGames.filter((game) => {
    return parseFloat(game.price) < price;
  });

  printGames(filtered);
};

createSelectSeller();
setUpInputPrice();
setUpClearFiltersButton();
filterByPrice();
printGames(boardGames);
