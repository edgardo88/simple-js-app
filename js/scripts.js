let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

    let pokemonListElement = $('.pokemon-list');

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        //creating a list item (pokemons) with a button
        let listItem = $('<li class="list-group-item border-0"></li>');

        let button = $(
            '<button class="pokemon-button .btn" data-target="#pokemon-modal" data-toggle="modal">' +
            pokemon.name +
            '</button>'
        );
        // add button to list item and add item(pokemon) to the pokemon list elements in index.html
        listItem.append(button);
        pokemonListElement.append(listItem);
        // listens to clicks on pokemon button to show more details
        button.on('click', function () {
            showDetails(pokemon);
        });
    }

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
            });
        })
            .catch(function (e) {
                console.error(e);
            });
    }
    // fetching and loading pokemon details from api
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                //now to add details to the item
                item.height = details.height;
                item.types = details.types.map(function (item) {
                    return item.type.name;
                });
                item.abilities = [];
                for (var i = 0; i < details.abilities.length; i++) {
                    item.abilities.push(details.abilities[i].ability.name);
                }
                item.imageUrl = details.sprites.front_default;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // Function that enables the showing of details on click
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }


    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalBody.empty();
        modalTitle.text(pokemon.name);

        let height = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let image = $('<img class="pokemon-img" src="' + pokemon.imageUrl + '" />');
        let types = $('<p>' + 'Types: ' + pokemon.types + '</p>');
        let abilities = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

        // appends the above elements to the modal body
        modalBody.append(image);
        modalBody.append(height);
        modalBody.append(types);
        modalBody.append(abilities);
    };


    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        showDetails: showDetails,
    };
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


