let pokemonRepository = (function () {
let pokemonList = [
	{	name: 'Venusaur', 
		height: 2,
		weight: 100, 
		types: ['grass' , 'poison']},
	
	{	name: 'Butterfree',
		height: 1.1,
		weight: 32,
		types: ['bug' , 'flying']},
	
	{	name: 'Jigglypuff',
		height: 0.5,
		weight: 5.5,
		types: ['fairy' , 'normal']},
];

function getAll() {
	return pokemonList;
}

function add(pokemon) {
	pokemonList.push(pokemon);
}

return {
	getAll: getAll,
	add: add
}
})();

// loop that iterates for Pokemons name and weight

for (let i = 0; i < pokemonList.length; i++) { //conditionals for weight
	if (pokemonList[i].weight > 40) { //If Pokemon weighs over 40 it states wow thats big
		document.write('<br>' + pokemonList[i].name + ' (weight: ' + pokemonList[i].weight + ') - Wow, that\'s big!')
	} else if (pokemonList[i].weight <= 40 && pokemonList[i].weight > 20) { //If Pokemon is between 20 and 40 it states thats a decent size
		document.write('<br>' + pokemonList[i].name + ' (weight: ' + pokemonList[i].weight + ') - intresting decent size.')
	} else	if (pokemonList[i].weight < 20) { //if Pokemon weighs under 20 it states awe thats tiny
		document.write('<br>' + pokemonList[i].name + ' (weight: ' + pokemonList[i].weight + ') - small')
	}}

	let pokemonList = pokemonRepository.getAll();

pokemonList.forEach(function(pokemon) {
    if (pokemon.height>1) {
        document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s big!' + '</p>')
    } else {
        document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + '</p>')

    }
});