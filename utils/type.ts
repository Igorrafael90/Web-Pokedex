export interface PokemonList {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    url: string;
    sprites: {
      front_default: string;
      back_default: string;
      other:{
        home: {
            front_default: string;
            back_default: string;
        }
      }
    };
    types: {
        type: {
            name: string;
        };
    }[];
  }