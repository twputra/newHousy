import React, { useContext, useEffect } from "react";
import RoutesPage from "./components/Routes";
import { RoomsContextProvider } from "./context/filterContext";

function App() {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  return (
    <>
    <RoomsContextProvider>
      <RoutesPage />
    </RoomsContextProvider>
    </>
  );
}

export default App;
