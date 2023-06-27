import React, { createContext, useState } from 'react';

// import { Container } from './styles';

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [newInList, setNewInList] = useState('');
  const [newContact, setNewContact] = useState('');
  const [login, setLogin] = useState(false);

  const value = {
    newInList,
    setNewInList,
    newContact,
    setNewContact,
    login,
    setLogin
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;