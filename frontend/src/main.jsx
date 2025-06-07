import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import './custom-slick.css';
import "slick-carousel/slick/slick.css";
// import 'remixicon/fonts/remixicon.css'
import '../node_modules/remixicon/fonts/remixicon.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </StrictMode>,
)
