import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import ThemeProvider from "./ThemeProvider";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
