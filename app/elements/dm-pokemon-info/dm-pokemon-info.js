import { LitElement } from 'lit-element';

export class DmPokemonInfo extends LitElement {
  
  static get properties() {
    return {
      id: { type: Number },
      URL: { type: String },
    };
  }

  constructor() {
    super();    
    this.URL = 'https://pokeapi.co/api/v2/pokemon';
  }

  async getPokemonInfo() {
    try {
      const { name, sprites: { other } } = await this.fetchData(`${ this.URL }/${ this.id }`);
      return ({name, image: other['official-artwork']?.front_default});      
    } catch (error) {
      console.log(error);
    };
  }

  async fetchData(URL = "") {
    try {
      const data = await fetch(URL);
      return await data.json();
    } catch (error) {
      console.log(error);
    };
  }

}
customElements.define('dm-pokemon-info', DmPokemonInfo);
