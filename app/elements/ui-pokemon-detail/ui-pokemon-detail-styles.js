import { css } from 'lit-element';

export default css `
  :host {
    display: flex;
    align-items: Center;
    justify-content: Center;    
    flex-flow: row wrap;
  }

  .detail-item {
    margin: 0;
    margin-top: 1rem;
    width: 20rem;
  }

  .image-pokemon {    
    display: flex;
    align-items: Center;
    justify-content: Center;
  }

  .image-pokemon img {
    width: 100%;
  }

  .detail-info {
    font-size: .78rem;
    padding-right: 1rem;
  }

  @media (min-width: 1024px) {
    .detail-item {
      margin: .5rem 1rem 0;
      width: 72%;
    }
  }
`;