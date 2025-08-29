import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  type ReactNode,
} from 'react';

//define action
type LangAction = { type: "SET_LANGUAGE";  payload:string}

//define state 
type LangState = { currentLang: string };

// type LangContextType = {
//   lang: LangType;
//   switchLang: () => void;
// };

const initialLangState: LangState = { currentLang: 'en' }

// Reducer Function

function languageReducer(state: LangState, action: LangAction)
{
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {...state, currentLang: action.payload};
    default:
      return state;
  }
}

const LangContext = createContext<{
  state: LangState;
  dispatch: React.Dispatch<LangAction>;
}>({ state: initialLangState, dispatch: () => {} })

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useCart must be used within a cart provider');
  return context;
}

export function LangProvider({ children }: { children: ReactNode }) {
 const [state, dispatch] = useReducer(languageReducer, initialLangState)
  //implement switch function

  // const switchLang = () => {
  //   setLang(prev => (prev === 'en' ? 'fr' : 'en'));
  // };



  return (
    <LangContext.Provider value={{ state, dispatch}}>
      {children}
    </LangContext.Provider>
  );
}
