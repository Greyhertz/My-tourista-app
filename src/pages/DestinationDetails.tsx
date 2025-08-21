import { useLocation, useParams } from 'react-router-dom';

export default function DestinationDetails() {
  const { state } = useLocation();
  const { city } = useParams();

  // Add more detailed error handling
  if (!state) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">
          No Data Available
        </h1>
        <p className="text-gray-600">
          It looks like you navigated here directly. Please search for a
          destination first.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-background-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { hotels, images, location } = state;

  // Add safety checks for data
  const safeHotels = Array.isArray(hotels) ? hotels : [];
  const safeImages = Array.isArray(images) ? images : [];
  const safeLocation = location || {};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        🏙️ {city || safeLocation.city || 'Unknown Location'}
      </h1>

      {safeLocation.city && (
        <p className="mb-6 text-gray-600 text-center">
          🗺️ {safeLocation.city}
          {safeLocation.state && `, ${safeLocation.state}`}
          {safeLocation.country && `, ${safeLocation.country}`}
        </p>
      )}

      {/* Images Section */}
      {safeImages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            📸 Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {safeImages.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt={`View ${i + 1} of ${city || safeLocation.city}`}
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotels Section */}
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        🏨 Nearby Hotels
      </h2>

      {safeHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safeHotels.map((hotel, i) => {
            const properties = hotel.properties || {};
            return (
              <div
                key={properties.place_id || i}
                className="p-4 bg-white dark:bg-gray-800 border rounded-lg shadow-sm"
              >
                {/* Hotel Image */}
                {hotel.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={hotel.imageUrl}
                      alt={`${properties.name || 'Hotel'} image`}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <h3 className="text-lg font-bold text-blue-500 mb-2">
                  {properties.name || 'Unnamed Hotel'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📍{' '}
                  {properties.address_line2 ||
                    properties.formatted ||
                    properties.address_line1 ||
                    'No address available'}
                </p>
                {properties.categories && (
                  <p className="text-xs text-gray-500 mt-1">
                    {properties.categories.join(', ')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center p-8">
          No hotels found for this location.
        </p>
      )}
    </div>
  );
}
