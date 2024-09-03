
import React , {useState, createContext, useContext, useEffect, useMemo} from 'react'

const DependantFieldContext = createContext();

export const DependantFieldProvider = ({ children }) => {
  const [dependantFields, setDependantFields] = useState({});

  const setDependantField = (fieldName, value) => {
    setDependantFields(prev => ({ ...prev, [fieldName]: value }));
  };

  const removeDependantField = (fieldName) => {
    setDependantFields(prev => {
      const newFields = { ...prev };
      delete newFields[fieldName];
      return newFields;
    });
  };


  return (
    <DependantFieldContext.Provider value={{ dependantFields, setDependantField , removeDependantField }}>
      {children}
    </DependantFieldContext.Provider>
  );
};

export const useDependantField = () => useContext(DependantFieldContext);