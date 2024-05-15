import { css } from 'lit-element';

export default css `
  :host {
    display: block;
  }

  .pokemon-img {
    box-shadow: 0 0 10px -8px #fff;
    border-radius: 2rem;
    padding: 1rem;
    cursor: pointer;
  }

  .pokemon-img:hover {
    box-shadow: 8px 8px 16px lightgray;
  }

  .pokemon-img img {
    width: 100%;
  }
  .pokemon-img .pokemon-name {
    text-align: center; 
    font-weight: 700;
  }

  @media (min-width:768px) {
    .pokemon-img {
      width: 11.697rem;
    }
  }

  @media (min-width: 1230px) {
    .pokemon-img {
      width: 11.697rem;
    }
  }

  @media (min-width: 2560px) {
    .pokemon-img {
      width: 25.697rem;
      font-size: 2rem;
    }
  }
`;