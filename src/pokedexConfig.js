import { Pokedex } from "pokeapi-js-wrapper";

const options = {
  cacheImages: true,
  swLocation: "/"
}

const pokedex = await Pokedex.init(options);

export default pokedex;