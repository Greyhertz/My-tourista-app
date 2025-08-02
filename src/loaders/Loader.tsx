// 👷 Loader for ContactUs
export async function contactLoader() {
  return {
    supportEmail: 'support@mytouristapp.com',
    phone: '+1 (123) 456-7890',
    office: 'Travel Center, New York, NY 10001',
  };
}
// 👷 Loader that uses params
export async function contactLoaderWithParam({
  params,
}: {
  params: { officeId: string };
}) {
  // Example: fetch office info based on officeId param
  // Here we just mock the data
  const offices: Record<
    string,
    { supportEmail: string; phone: string; office: string }
  > = {
    ny: {
      supportEmail: 'ny-support@mytouristapp.com',
      phone: '+1 (212) 555-1234',
      office: 'Travel Center, New York, NY 10001',
    },
    la: {
      supportEmail: 'la-support@mytouristapp.com',
      phone: '+1 (310) 555-5678',
      office: 'Travel Center, Los Angeles, CA 90001',
    },
  };
  return (
    offices[params.officeId] || {
      supportEmail: 'support@mytouristapp.com',
      phone: '+1 (123) 456-7890',
      office: 'Travel Center, Default City, 00000',
    }
  );
}
