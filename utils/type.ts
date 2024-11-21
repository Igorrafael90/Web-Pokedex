export interface PokemonList {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    order: number;
    url: string;
    varieties:{
      is_default: true;
        pokemon:{
          name: string;
          url: string;
        }
    }[];
    sprites: {
      front_default: string;
      back_default: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    flavor_text_entries:{
      flavor_text: string;
        language:{
          name: string;
        }
    }[]
  }