export async function fetchTravelBlogs(limit = 20) {
  const response = await fetch(
    `https://dev.to/api/articles?tag=travel&per_page=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch travel blogs');
  }
  return response.json();
}
