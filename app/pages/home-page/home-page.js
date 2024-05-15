import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';
import '@bbva-web-components/bbva-button-default';
import '@bbva-web-components/bbva-web-navigation-pagination/bbva-web-navigation-pagination';
import '@bbva-web-components/bbva-core-spinner/bbva-core-spinner';

import css from './home-page-styles';

import '../../elements/ui-pokemon-card/ui-pokemon-card.js';
import '../../elements/dm-pokemon-evolutions/dm-pokemon-evolutions.js'


export class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }

  static styles = [ css ];

  static get properties() {
    return {
      pokemons: { type: Array },
      pages: { type: Number, attribute: false },
      currentPage: { type: Number, attribute: false },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
    this.results = 0;
    this.currentPage = 1;
  }

  async firstUpdated() {
    this.pokemonEvolutions = this.shadowRoot.querySelector('#pokemon-evolutions');
    this.pokemons = await this.pokemonEvolutions.getPokemonEvolutions();    
    this.results = this.pokemonEvolutions.count;    
  }

  render() {
    return html `
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main text="Home Page"></bbva-header-main>
        </div>

        <div slot="app__main">
          ${ this.pokemons.length === 0 ? html `
            <bbva-core-spinner with-mask=""></bbva-core-spinner>            
          ` : this.pokemons.map(({id, name, nextEvolutions}) => html `
            <ui-pokemon-card
              id="${ id }"
              name="${ name }"                          
              @click="${ () => this._handleNavigation({id, nextEvolutions}) }"
            ></ui-pokemon-card>
          `) }
          <bbva-web-navigation-pagination
            current-page="${ this.currentPage }"
            pages="28"
            results="${ this.results }"
            visible-pages="10"
            visible-result="${ this.pokemons.length }"
            @back-click="${ this._handlePrevPage }"      
            @next-click="${ this._handleNextPage }"      
            @number-click="${ (e) => this._handleIndexPage(e.detail) }"
            @first-click="${ this._handleFirstPage }"
            @end-click="${ this._handleLastPage }"
          >
          </bbva-web-navigation-pagination>
        </div>

        <div slot="app__transactional">
          <dm-pokemon-evolutions id="pokemon-evolutions"></dm-pokemon-evolutions>
        </div>
      </cells-template-paper-drawer-panel>
    `;
  }

  async _handleNextPage() {
    this.pokemons = [];
    if (!this.pokemonEvolutions.next) return;
    this.pokemons = await this.pokemonEvolutions._handleNextPage();    
  }

  async _handlePrevPage() {
    this.pokemons = [];
    if (!this.pokemonEvolutions.previous) return;
    this.pokemons = await this.pokemonEvolutions._handlePrevPage();    
  }

  async _handleIndexPage(index = 0) {
    this.pokemons = [];
    this.pokemons = await this.pokemonEvolutions._handleIndexPage(index);
  }

  async _handleFirstPage() {
    this.pokemons = [];
    this.pokemons = await this.pokemonEvolutions._handleFirstPage();
  }

  async _handleLastPage() {
    this.pokemons = [];
    this.pokemons = await this.pokemonEvolutions._handleLastPage();
  }

  _handleNavigation({id, nextEvolutions}) {
    localStorage.setItem('evolutions', JSON.stringify({id, nextEvolutions}));
    this.navigate(`detail`, { id });    
  }
}
customElements.define(HomePage.is, HomePage);