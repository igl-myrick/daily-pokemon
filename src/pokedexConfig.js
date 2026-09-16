import { Pokedex } from "pokeapi-js-wrapper";

const options = {
  cacheImages: true,
  swLocation: "../public"
}

const pokedex = await Pokedex.init(options);

export default pokedex;