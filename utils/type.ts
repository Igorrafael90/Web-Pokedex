export interface PokemonList {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    url: string;
    sprites: { //COloca do black and white animated
      front_default: string;
      back_default: string;
      versions:{
        'generation-v': {
            'black-white':{
              animated:{
                front_default: string;
                back_default: string;
              }
            }
        }
      }
    };
    types: {
        type: {
            name: string;
        };
    }[];
  }