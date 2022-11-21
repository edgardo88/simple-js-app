let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';


    let pokemonListElement = document.querySelector('.pokemon-list');
    function getModalContainer() {
        return document.querySelector('#modal-container');
    }
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        //creating a list item (pokemons) with a button
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        // add button to list item and add item(pokemon) to the pokemon list elements in index.html
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        // listens to clicks on pokemon button to show more details
        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        })
    };

    //adding Load list function for task
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.height = details.height;
            item.types = details.types;
            item.imageUrl = details.sprites.front_default;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);
        });
    };


    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';

        let title = document.createElement('h1');
        title.innerText = pokemon.name;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrl;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = "Height: " + pokemon.height;

        let pokemonTypes = document.createElement('p');
        pokemonTypes.innerText = "Type: " + pokemon.types;

        modal.appendChild(closeButtonElement);
        modal.appendChild(title);
        modal.appendChild(pokemonImage);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes);
        modalContainer.appendChild(modal);

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        })

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        let modalContainer = getModalContainer();
        modalContainer.classList.remove('is-visible');
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


