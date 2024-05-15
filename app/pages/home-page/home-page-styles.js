import { css } from 'lit-element';

export default css `
  :host {
    display: block;
  }

  bbva-core-spinner {
    grid-column: 1/5;
  }

  bbva-web-navigation-pagination {    
    margin: 1.2rem;
    grid-column: 1/4;
  }

  @media (min-width: 768px) {
    [slot="app__main"] {
      min-height: 115vh;
      display: grid;
      grid-template-columns: repeat(3, 14.7rem);      
    }
  }

  @media (min-width: 1024px) {   
    [slot="app__main"] {
      grid-template-columns: repeat(4, 14.7rem);      
    }

    bbva-core-spinner {
      grid-column: 1/6;
    }

    bbva-web-navigation-pagination {    
      margin: 1.2rem 0 1.2rem 3rem;
      grid-column: 1/5;
    }
  }

  @media (min-width: 1230px) {
    [slot="app__main"] {
      grid-template-columns: repeat(5, 15.6rem);
    }

    bbva-web-navigation-pagination {          
      grid-column: 1/6;
    }
  }

  @media (min-width: 2560px) {
    [slot="app__main"] {
      grid-template-columns: repeat(5, 31.5rem);
    }
  }
`;