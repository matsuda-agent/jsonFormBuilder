
import React , {useState, createContext, useContext, useEffect, useMemo} from 'react'

const DependantFieldContext = createContext();

export const DependantFieldProvider = ({ children }) => {
  const [dependantFields, setDependantFields] = useState({});

  const setDependantField = (fieldName, value) => {
    setDependantFields(prev => ({ ...prev, [fieldName]: value }));
  };

  return (
    <DependantFieldContext.Provider value={{ dependantFields, setDependantField }}>
      {children}
    </DependantFieldContext.Provider>
  );
};

export const useDependantField = () => useContext(DependantFieldContext);