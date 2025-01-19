import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import "./index.css";
import {BrowserRouter} from 'react-router-dom';
import UserContext from "./context/UserContext";
import CaptainContext from "./context/CaptainContext";
import SocketProvider from './context/SocketContext.jsx';

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CaptainContext>
      <UserContext>
        <SocketProvider>
            <BrowserRouter>
               <App/>
            </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </CaptainContext>
  </React.StrictMode>
)