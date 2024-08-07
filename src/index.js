import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { UserProvider } from "./context/UserContext";

const stripePromise = loadStripe("your-publishable-key-here");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Elements stripe={stripePromise}>
    <UserProvider>
      <App />
    </UserProvider>
  </Elements>
);
