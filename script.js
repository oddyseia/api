// API'den veri çekme
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(response => response.json()) // verilerin json formata dönüşmesi
  .then(data => {
    // pokemon isimlerini çekme
    const pokemons = data.results;

    // her pokemon için ayrı ayrı işlem
    pokemons.forEach((pokemon, index) => {
      const pokemonIndex = index + 1;
      const pokemonInfoUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;

      // her pokemon için ayrı ayrı API'den veriyi çekme
      fetch(pokemonInfoUrl)
        .then(response => response.json())
        .then(data => {
          // kart içeriğini oluşturma
          const kart = document.createElement('div');
          kart.className = 'kart';

          const kartResim = document.createElement('img');
          kartResim.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
          kartResim.alt = `Pokemon ${pokemonIndex}`;
          kart.appendChild(kartResim);

          const kartIcerik = document.createElement('div');
          kartIcerik.className = 'kart-icerik';

          const kartBaslik = document.createElement('h2');
          kartBaslik.textContent = data.name;
          kartIcerik.appendChild(kartBaslik);

          const kartParagraf = document.createElement('p');
          kartParagraf.textContent = `ID: ${data.id}`;
          kartIcerik.appendChild(kartParagraf);

          const kartParagraf2 = document.createElement('p');
          kartParagraf2.textContent = `Türler: ${data.types.map(type => type.type.name).join(', ')}`;
          kartIcerik.appendChild(kartParagraf2);

          kart.appendChild(kartIcerik);
          document.getElementById('pokemon-kartları').appendChild(kart);
        })
    });
  })