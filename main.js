const API_URL = 'https://swapi.dev/api/people/';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function displayCharacters() {
    const charactersContainer = document.getElementById('characters');
    const characters = await fetchData(API_URL);

    characters.results.forEach(async character => {
        const { name, gender, birth_year } = character;

        // Fetch image for the character
        const imgResponse = await fetch(`https://starwars-visualguide.com/assets/img/characters/${getCharacterId(character)}.jpg`);
        const imgBlob = await imgResponse.blob();
        const imageUrl = URL.createObjectURL(imgBlob);

        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${imageUrl}" class="card-img-top" alt="${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">Gender: ${gender}</p>
                        <p class="card-text">Birth Year: ${birth_year}</p>
                    </div>
                </div>
            </div>
        `;
        charactersContainer.innerHTML += card;
    });
}

function getCharacterId(character) {
    const urlParts = character.url.split('/');
    return urlParts[urlParts.length - 2];
}

displayCharacters();
