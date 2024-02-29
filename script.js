// API'den veri çekme
function openModal(pokemonIndex) {
  const pokemonInfoUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
  fetch(pokemonInfoUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("modal").style.display = "flex";

      const modalContent = document.getElementById("modalContent");
      const kartResim = document.createElement("img");
      kartResim.className = "modal-image";
      kartResim.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
      kartResim.alt = `Pokemon ${pokemonIndex}`;
      modalContent.appendChild(kartResim);

      const kartBaslik = document.createElement("div");
      kartBaslik.className = "modal-text bold";
      kartBaslik.textContent = data.name;
      modalContent.appendChild(kartBaslik);
    });
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = "";
}

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then((response) => response.json()) // verilerin json formata dönüşmesi
  .then((data) => {
    // pokemon isimlerini çekme
    const pokemons = data.results;

    // her pokemon için ayrı ayrı işlem
    pokemons.forEach((pokemon, index) => {
      const pokemonIndex = index + 1;
      const pokemonInfoUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;

      const kart = document.createElement("div");
      kart.className = "kart";
      kart.onclick = () => openModal(pokemonIndex);

      const kartResim = document.createElement("img");
      kartResim.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
      kartResim.alt = `Pokemon ${pokemonIndex}`;
      kart.appendChild(kartResim);

      const kartIcerik = document.createElement("div");
      kartIcerik.className = "kart-icerik";

      const kartBaslik = document.createElement("h2");
      kartBaslik.textContent = data.name;
      kartIcerik.appendChild(kartBaslik);
      kart.appendChild(kartIcerik);
      document.getElementById("pokemon-kartları").appendChild(kart);
      // her pokemon için ayrı ayrı API'den veriyi çekme
    });
  });
