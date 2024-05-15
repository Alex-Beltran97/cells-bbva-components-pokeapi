import { LitElement, html } from 'lit-element';
import '@bbva-web-components/bbva-list-bullet';
import '@bbva-web-components/bbva-progress-bar-default';

import css from './ui-pokemon-detail-styles';
import { DmPokemonInfo } from '../dm-pokemon-info/dm-pokemon-info';
import { capitalizer } from '../utils';

export class UiPokemonDetail extends LitElement {
  static get is() {
    return 'ui-pokemon-detail';
  }

  static styles = [ css ];

  static get properties() {
    return {      
      pokemonData: { type: String },
      id: { type: Number },
      name: { type: String, attribute: false },
      image: { type: String, attribute: false },
      types: { type: String, attribute: false },
      height: { type: Number, attribute: false },
      weight: { type: Number, attribute: false },
      stats: { type: Array, attribute: false }
    };
  }

  constructor() {
    super();
    this.id = 0;
    this.name = '';
    this.image = '';    
    this.types = [];    
    this.height = 0;    
    this.weight = 0;    
    this.stats = [];
  }

  async firstUpdated() {
    await this._getPokemonInfo();
  }

  render() {
    return html `
      <figure class="detail-item image-pokemon">
        <img src="${ this.image }" alt="${ this.name }" />
      </figure> 
      <div class="detail-item detail-info">
        <h2>${ capitalizer(this.name) }</h2>
        <h3>Type: ${ this.types }</h3>
        ${ this._progressBarsComponent() }
        <ul class="w-h">
          <bbva-list-bullet>
            Height: ${ this.height } cm
          </bbva-list-bullet>
          <bbva-list-bullet>
            Weight: ${ this.weight } g
          </bbva-list-bullet>
        </ul>
        <slot></slot>        
      </div>
    `;
  }

  _progressBarsComponent() {
    const accessibilityVariantColors = [
      'default', 'success', 'warning', 'danger', 'without shadow', 'danger'
    ];
    return html `
      <ul>
        ${ this.stats.map(({name, base_stat}, index) => html `
          <bbva-list-bullet>${ name }</bbva-list-bullet>
          <bbva-progress-bar-default
            class="${ accessibilityVariantColors[index] }"
            accessibility-text="${ accessibilityVariantColors[index] } progress bar"
            current-value="${ base_stat }"
            max-value="100"
          >
          </bbva-progress-bar-default>
        `) }
      </ul>
    `;
  }

  async _getPokemonInfo() {    
    const pokemonInfo = new DmPokemonInfo();
    const url = `${ pokemonInfo.URL }/${ this.id }`;
    const { name, sprites, types, height, weight, stats } = await pokemonInfo.fetchData(url);
    this.name = name;
    this.image = this._getImageUrl(sprites);    
    this.types = this._getTypes(types);
    this.height = height;
    this.weight = weight;
    this.stats = this._getStatsInfo(stats); 
  }

  _getImageUrl({ other } = {}) {
    return other['official-artwork'].front_default;
  }

  _getTypes(types = [] ) {
    return types.map(({type: { name }}) => capitalizer(name)).join(" | ");
  }

  _getStatsInfo(stats = []) {
    return stats.map(({base_stat, stat: {name}}) => ({base_stat, name: name.toUpperCase()}));
  }
}
customElements.define(UiPokemonDetail.is, UiPokemonDetail);
