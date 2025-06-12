// 👷 Loader for ContactUs
export async function contactLoader() {
  return {
    supportEmail: "support@mytouristapp.com",
    phone: "+1 (123) 456-7890",
    office: "Travel Center, New York, NY 10001"
  };
}

export async function nameLoader(params: { id: string, name: { first: string, last: string } }) {
  return {
    id: params.id,
    name: `${params.name.first} ${params.name.last}`,
    description: "Sample Description"
  };
}
