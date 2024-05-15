import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';
import '@bbva-web-components/bbva-button-default';

import css from './detail-page-styles';

import '../../elements/ui-pokemon-detail/ui-pokemon-detail';

export class DetailPage extends CellsPage {
  static get is() {
    return 'detail-page';
  }

  static get properties() {
    return {
      params: { type: Object },
    };
  }

  static styles = [ css ];

  constructor() {
    super();
    this.showComponent = false;
  }

  onPageEnter() {    
    this.showComponent = true;
    this.requestUpdate();
  }

  onPageLeave() {
    this.showComponent = false;
    this.requestUpdate();
  }

  updated() {
    this._validatePokemonData();

  }

  render() {    
    return html `
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main text="Detail Page"></bbva-header-main>
        </div>
        <div slot="app__main">
          ${ this.params.id && this.showComponent ? html `
            <ui-pokemon-detail
              id="${ this.params.id }"
            >
              <bbva-button-default
                @click="${ this._handleNavigation }"
                text="Evolutions"                
              ></bbva-button-default>
            </ui-pokemon-detail>
          ` : "" }
        </div>
      </cells-template-paper-drawer-panel>
    `;
  }

  async _handleNavigation() {
    const idEvolutions = {};
    const evolutions = [ ...await this._getPokemonEvolutions() ];

    for (const id in evolutions) {
      idEvolutions[`evl${ parseInt(id) + 1 }`] = evolutions[id]?.id;
    }

    this.navigate(`evolutions`, idEvolutions);
  }

  async _getPokemonEvolutions() {
    const { nextEvolutions } = this._validatePokemonData();    
    return nextEvolutions;
  }

  _validatePokemonData() {
    const pokemonId = this.params?.id;
    const evolutions = localStorage.getItem('evolutions') ? JSON.parse(localStorage.getItem('evolutions')) : {};
    if (evolutions?.id !== pokemonId) {
      return this.navigate('home');
    };
    if (!evolutions?.nextEvolutions) {
      this._disableButton();
    };
    return evolutions;
  }

  _disableButton() {
    const button = this.shadowRoot.querySelector('bbva-button-default');
    button?.setAttribute('disabled', true);
  }

}
customElements.define(DetailPage.is, DetailPage);
