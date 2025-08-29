export async function translateText(
  text: string,
  targetLang: string,
  sourceLang = 'en'
) {
  const res = await fetch('https://libretranslate.com/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: sourceLang, // "en" or "auto"
      target: targetLang, // e.g. "es"
      format: 'text',
    }),
  });

  const data = await res.json();
  return data.translatedText;
}
