import { css } from 'lit-element';

export default css `
  :host {
    display: flex;
    align-items: Center;
    justify-content: Center;
    flex-direction: column;
    flex-flow: row wrap;    
  }

  .detail-item {
    margin: 0 1.25rem;
    width: 95%;
    height: 50vh;
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
    padding: 29px;
    font-size: .78rem;
    height: 492px;    
  }

  ul {    
    padding: 0;
  }

  ul bbva-list-bullet {
    --_list-bullet-color: #ddd;
    font-weight: bold;
  }

  .w-h bbva-list-bullet {
    --_list-bullet-icon-color: #ddd;
  }

  ul bbva-progress-bar-default {
    width: 90%;
    margin-left: 2.5rem;    
  }

  @media (min-width: 768px) {
    .detail-item {
      width: 583px;
      height: 521px;
    }

    .detail-info {
      width: 531px;      
    }
  }

  @media (min-width: 1230px) {
    .detail-item {
      margin: 2rem 1.25rem 0;
    }
  }
`;