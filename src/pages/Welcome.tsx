// TranslationExample.tsx
import React, { useEffect, useState } from 'react';
import { useLang } from '@/context/LangContext';
import { translateText } from '@/api/Lang'; // your libretranslate fn

export default function Welcome() {
  const { state, dispatch } = useLang();
  const [translated, setTranslated] = useState('Hello world');

  // Whenever language changes, translate the text
  useEffect(() => {
    async function doTranslate() {
      const result = await translateText('Hello world', state.currentLang);
      setTranslated(result);
    }
    doTranslate();
  }, [state.currentLang]);

  return (
    <div className="p-4 space-y-4">
      {/* Language Selector */}
      <select
        value={state.currentLang}
        onChange={e =>
          dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })
        }
        className="border rounded p-2"
      >
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
      </select>

      {/* Translated text */}
      <p className="text-xl font-semibold">{translated}</p>
    </div>
  );
}
