// In your library
import React, { createContext, useContext } from 'react';



// Define the type of the styles prop
interface Styles {
    [key: string]: string;
  }
  

// Define the context
const StyleContext = createContext<Styles>({});


// Define the type of the provider props
interface StyleProviderProps {
    styles?: Styles;
    children: ReactNode;
  }
  

// Define the provider component
export const StyleProvider: React.FC<StyleProviderProps> = ({ styles = {}, children }) => {
   
  return (
      <StyleContext.Provider value={{styles}}>
        {children}
      </StyleContext.Provider>
    );
  };
  
  // Define a custom hook for using the context
export const useStyle = (): Styles => {
    return useContext(StyleContext);
  };