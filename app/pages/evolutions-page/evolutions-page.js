import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';

import css from './evolutions-page-styles';

import '../../elements/ui-pokemon-detail/ui-pokemon-detail';

export class EvolutionsPage extends CellsPage {
  static get is() {
    return 'evolutions-page';
  }

  static get properties() {
    return {
      params: { type: Object },
      ids: { type: Array, attribute: false },
    };
  }

  static styles = [ css ];

  constructor() {
    super();
    this.ids = [];    
  }

  onPageEnter() {
    this.ids = this._getEvolutionsIds(this.params);    
  }

  onPageLeave() {
    this.ids = [];    
  }

  render() {
    return html `
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main text="Evolutions Page"></bbva-header-main>
        </div>

        <div slot="app__main">          
          <div class="pokemon-container">
            ${ this.ids.length !== 0 ? this.ids.map(id => html `
              <ui-pokemon-detail
                class="pokemon"              
                id="${ id }"
              ></ui-pokemon-detail>                        
            `) : ""}
          </div>
        </div>
      </cells-template-paper-drawer-panel>
    `;
  }

  _getEvolutionsIds(params = {}) {
    return Object.entries(params).map(item => parseInt(item[1])) || [];
  }
}
customElements.define(EvolutionsPage.is, EvolutionsPage);
