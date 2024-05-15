import { LitElement } from 'lit-element';

import { DmEvolutionsNumber } from '../dm-evolutions-number/dm-evolutions-number';

export class DmPokemonEvolutions extends LitElement {
  static get is() {
    return 'dm-pokemon-evolutions';
  }
  
  static get properties() {
    return {
      URL: { type: String },
      next: { type: String },
      previous: { type: String },
      count: { type: Number },
      offset: { type: Number },
      pokemonEvolutions: { type: Array },
    };
  }

  constructor() {
    super();
    this.offset = 0,
    this.URL = `https://pokeapi.co/api/v2/evolution-chain`;    
    this.pokemonEvolutions = [];    
  }

  async getPokemonEvolutions() {
    try {
      const {count, next, previous, results} = await this.fetchData(this.URL);
      this.count = count;
      this.previous = previous;
      this.next = next;      
      this.results = results;
      const pokemonsData = await this.getPokemonEvolutionsData();
      this.pokemonEvolutions = this.getPokemonInfoData(pokemonsData);
      return this.pokemonEvolutions;
    } catch (error) {
      console.log(error);
    };
  }

  async getPokemonEvolutionsData() {
    const pokemons = [];
    for (const { url } of this.results) {
      pokemons.push(
        await this.getEvolutionsNumber(url)
      );
    };
    return pokemons;
  }

  async getPokemonInfoData(pokemons = []) {
    const pokemonsInfo = [];
    for (const pokemon of pokemons) {
      pokemonsInfo.push(
        this._getBaseEvolution(pokemon)
      );
    };
    return pokemonsInfo;
  }

  _getBaseEvolution({0: basePokemon, ...rest} = []) {
    const pokemonInfo = {
      ...basePokemon
    };
    if (Object.entries(rest).length !== 0) {
      pokemonInfo.nextEvolutions = Object.entries(rest).map(evl => evl[1]);
    };
    return pokemonInfo;
  }

  async _handleNextPage() {    
    if (this.next !== null) {
      this.URL = this.next;
      return await this.getPokemonEvolutions();
    };
  }

  async _handlePrevPage() {    
    if (this.previous !== null) {
      this.URL = this.next === null ? 'https://pokeapi.co/api/v2/evolution-chain/?offset=520&limit=20' : this.previous;
      return await this.getPokemonEvolutions();
    };
  }

  async _handleIndexPage(i = 0) {
    const index = (i - 1) * 20;
    this.URL = `https://pokeapi.co/api/v2/evolution-chain/?offset=${ index }&limit=20`;
    return await this.getPokemonEvolutions();    
  }
  
  async _handleFirstPage() {
    this.URL = `https://pokeapi.co/api/v2/evolution-chain`;
    return await this.getPokemonEvolutions();    
  }
  
  async _handleLastPage() {
    this.URL = `https://pokeapi.co/api/v2/evolution-chain/?offset=540&limit=1`;
    return await this.getPokemonEvolutions();    
  }

  async fetchData (URL = '') {
    try {
      const data = await fetch(URL);
      return await data.json()
    } catch (error) {
      console.log(error);
    };
  }

  async getEvolutionsNumber(url = '') {
    this.pokemonInfoService = new DmEvolutionsNumber();
    this.pokemonInfoService.URL = url;
    return await this.pokemonInfoService.getPokemonEvolutions();
  }
}
customElements.define(DmPokemonEvolutions.is, DmPokemonEvolutions);
