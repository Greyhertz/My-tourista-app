export async function translateText(text: string, targetLang: string) {
  const res = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text',
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Translation failed: ${res.status}`);
  }

  const data = await res.json();
  return data.translatedText;
}