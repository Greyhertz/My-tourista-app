
interface TouristcardProps {
  entry: {
    img: {
      src: string;
      alt: string;
    };
    country: string;
    googleMapsLink: string;
    title: string;
    dates: string;
    text: string;
  };
} 

export default function Touristcard(props: TouristcardProps) {
  // const entry = useLoaderData<TouristcardProps['entry']>()
  const DataList = [
    {
      img: {
        src: "https://images.unsplash.com/photo-1705072933934-84a6c0288659?q=80&w=1606&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Mount Fuji",
      },
      title: "Mount Fuji",
      country: "Japan",
      googleMapsLink: "https://goo.gl/maps/2v1x5Z3g7kz",
      dates: "10 Jun, 2025 - 20 Jun, 2025",
      text: 'Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). It is an active stratovolcano that last erupted in 1707 and is a UNESCO world heritage site. The mlountain is located on Honshu Island and is a popular destination for touorists and hikers'
    },
    {
      img: {
        src: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: "Mount Fuji",
      },
      title: "Sydney Opera House",
      country: "Australia",
      googleMapsLink: "https://maps.app.goo.gl/Zr17SCrsJeCEKMD36",
      dates: "10 Jun, 2025 - 20 Jun, 2025",
      text: "The Sydney Opera House is a multi-venue performing arts center located in sydney, australia. It is one of the most famous and distinctive buildings of the 20th century, designed by Danish architect JOrn Utzon.The building was completed in 1973, and its a symbol of sydney and Australia is a symbol of sydney and Australia."
    },
  
    {
      img: {
        src: 'https://images.unsplash.com/photo-1661345441183-d3d10b1f4e97?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: "Geirangerfjord",
      },
      title: "Geirangerfjord",
      country: "Norway",
      googleMapsLink: "https://maps.app.goo.gl/fhkJuBhmFDv47tiB7",
      dates: "10 Jun, 2025 - 20 Jun, 2025",
      text: "The Geirangere Fjord is fjord in the sunnmore region of More og Ramsdal country, Norway. It is located in the Stranda Municipaliity."
    },
  ];

  
  return (
   
<div className="z-0 dark:bg-gray-900">
      {DataList.map((data, index) => (
         
        <article key={index} className="card dark:bg-gray-900">
    
          <div className="main-image-container">
            <img
              className="main-image"
              src={data.img.src}
              alt={data.img.alt}
            />
          </div>
          <div className="journal-info">
            <div className="location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="#d41616"
                viewBox="0 0 256 256"
              >
                <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
              </svg>
              <span>{data.country}</span>
              <a href={data.googleMapsLink} className="link hover:underline">
                View on google maps
              </a>
            </div>
            <div className="desc">
              <h2>{data.title}</h2>
              <p className="date">{data.dates}</p>
              <p className="text">{data.text}</p>
              {/* <div className="container mx-auto px-4">{entryData}</div> */}
            </div>
          </div>
        </article>
      ))
      }
    </div>
     
  
    
    
  )
        
        
          
}

    
   
  
