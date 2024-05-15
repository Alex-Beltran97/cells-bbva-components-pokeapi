import { LitElement } from 'lit-element';

export class DmEvolutionsNumber extends LitElement {

  static get properties() {
    return {
      URL: { type: String },
      evolutions: { type: Array },
    };
  }

  constructor() {
    super();    
    this.evolutions = [];
  }

  async getPokemonEvolutions() {
    try {
      const { chain }  = await this.fetchData(this.URL);
      this._getPokemonInfo(chain);
      return this.evolutions;
    } catch(error) {
      console.log(error);
    };
  }

  _getPokemonInfo({ species, evolves_to = [] } = {}) {
    this.evolutions.push(
      this._getPokemonNameAndId(species)
    );    
    
    if (!evolves_to.length) return;   
    const {0: result} = evolves_to;
    this._getPokemonInfo(result);
  };

  _getPokemonNameAndId({name, url} = {}) {
    return ({name, id: this._getPokemonId(url)});    
  };

  _getPokemonId(url = '') {
    const urlSplited = url.split('/').filter(item => item);
    return +urlSplited[urlSplited.length - 1];
  };
  
  async fetchData(URL = '') {
    try {
      const data = await fetch(URL);
      return await data.json();
    } catch(error) {
      console.log(error);
    };
  }

}
customElements.define('dm-evolutions-number', DmEvolutionsNumber);
