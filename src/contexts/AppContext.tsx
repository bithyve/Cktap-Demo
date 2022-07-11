import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface AppContextInterface {
  cvc: string;
  setCvc: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextInterface>({
  cvc: '',
  setCvc: state => {},
});

function AppProvider({ children }: { children: React.ReactNode }) {
  const [cvc, setCvc] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        cvc,
        setCvc,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
