// Welcome.tsx
import { Button } from '@/components/ui/button';
import { useLang } from '@/context/LangContext';

export function Welcome() {
  const { lang, switchLang } = useLang();

  return (
    <div className="p-6 text-xl font-semibold">
      <Button onClick={switchLang}>
        {lang === 'en' ? 'Switch to French' : 'Switch to English'}
      </Button>
      {lang === 'en'
        ? 'Welcome to the Travel App 🌍'
        : "Bienvenue sur l'application de voyage 🌍"}
    </div>
  );
}
