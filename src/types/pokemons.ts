export interface PokemonsResponse {
	data: Data;
}

export interface Data {
	pokemons: Pokemon[];
}

export interface Pokemon {
	name: string;
	id: number;
}
