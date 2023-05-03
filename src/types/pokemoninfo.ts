export interface PokemonInfoResponse {
	data: PokemonInfoData;
}

export interface PokemonInfoData {
	pokemon_v2_pokemon: PokemonV2Pokemon[];
	pokemon_v2_pokemontype: PokemonV2Pokemontype[];
}

export interface PokemonV2Pokemon {
	name: string;
	pokemon_v2_pokemonstats: PokemonV2Pokemonstat[];
	height: number;
	weight: number;
}

export interface PokemonV2Pokemonstat {
	base_stat: number;
	stat_id: number;
}

export interface PokemonV2Pokemontype {
	pokemon_v2_type: PokemonV2Type;
}

export interface PokemonV2Type {
	name: string;
}
