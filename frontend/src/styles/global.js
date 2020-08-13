import { createGlobalStyle } from 'styled-components';

import backgroundImg from '../assets/background.svg';

export default createGlobalStyle`
	* {
		box-sizing: border-box;
		outline: 0;
	}

	body {
		background: #f0f0f5 url(${backgroundImg}) no-repeat 80% top;
		margin: 0;
		padding: 0;
		-webkit-font-smoothing: antialiased;
	}

	body, input, button {
		font-family: 'Roboto Slab', serif;
		font-size: 16px;
	}

	#root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

	h1, h2, h3, h4, h5, h6, strong {
		font-weight: 500;
	}

	button {
		cursor: pointer;
	}

`;
