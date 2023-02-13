import { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const RoomsContext = createContext();

export const RoomsContextProvider = (props) => {

    const [filtered, setFiltered] = useState();

    return (
        <RoomsContext.Provider
        value={{
            filtered,
            setFiltered,

            }}
        >
            {props.children}
        </RoomsContext.Provider>
    )

}