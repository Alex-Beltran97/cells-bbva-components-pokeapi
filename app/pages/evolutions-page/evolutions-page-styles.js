import { css } from 'lit-element';

export default css `
  :host {
    display: block;
  }

  .pokemon-container {    
    width: 96%;
    display: flex;
    align-items: center;
    justify-content: center;    
  }

  .pokemon {
    width: 50%;
  }
`;