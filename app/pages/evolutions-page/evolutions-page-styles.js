import { css } from 'lit-element';

export default css `
  :host {
    display: block;
  }

  [slot="app__main"] {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pokemon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .pokemon {
    text-align: center;
  }

  @media (min-width: 1024px) {
    .pokemon {
      width: 48%;
    }
    
    .one-pokemon {
      width: 100%;      
      flex-flow: nowrap;
    }
  }
`;