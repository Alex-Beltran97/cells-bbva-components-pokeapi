import { css } from 'lit-element';

export default css `
  :host {
    display: block;
    align-items: center;
    justify-content: center;
  }
  
  [slot="app__main"] {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pokemon {
    text-align: start;
  }

  @media (min-width: 1024px) {
    .pokemon {
      width: 100%;
      flex-flow: nowrap;
    }
  }  
`;