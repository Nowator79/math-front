import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './Settings';
import reportWebVitals from './reportWebVitals';
import { DataUserProvider } from './DataUserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
	<DataUserProvider>
		<App />
	</DataUserProvider>
  </React.StrictMode>
);

reportWebVitals();
