import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
// import { useTravelPreferences } from './PreferenceContext';

//define action
type LangAction =
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'TRANSLATE_START'; payload: string }
  | { type: 'TRANSLATE_SUCCESS'; payload: string }
  | { type: 'TRANSLATE_ERROR'; payload: string };

//define state
type LangState = {
  currentLang: string;
  lastTranslation: string;
  loading: boolean;
  error: string | null;
};

const initialLangState: LangState = {
  currentLang: 'en',
  lastTranslation: '',
  loading: false,
  error: null,
};

// Reducer Function
function languageReducer(state: LangState, action: LangAction): LangState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, currentLang: action.payload };
    case 'TRANSLATE_START':
      return { ...state, loading: true, error: null };
    case 'TRANSLATE_SUCCESS':
      return { ...state, loading: false, lastTranslation: action.payload };
    case 'TRANSLATE_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Define Context type
type LangContextType = {
  state: LangState;
  dispatch: React.Dispatch<LangAction>;
  translate: (
    text: string,
    target?: string,
    source?: string
  ) => Promise<string>;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

// lang provider
export function LangProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(languageReducer, initialLangState);
  const translate = async (
    text: string,
    target: string = state.currentLang,
    source: string = 'en'
  ): Promise<string> => {
    dispatch({
      type: 'TRANSLATE_START',
      payload: '',
    });
    try {
      const res = await fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source,
          target,
          format: 'text',
        }),
      });

      if (!res.ok) {
        console.log(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const translated = data?.translatedText ?? '';
      dispatch({ type: 'TRANSLATE_SUCCESS', payload: translated });
      return translated;
    } catch (err: any) {
      const msg = err?.message ?? 'Failed to translate';
      dispatch({ type: 'TRANSLATE_ERROR', payload: msg });
      return '';
    }
  };
  return (
    <LangContext.Provider value={{ state, dispatch, translate }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within a LangProvider');

  return context;
}
