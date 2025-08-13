
// // Array of tourist destination background images

// import React, {useEffect, useState} from "react";
// const backgroundImages = [
//   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//   "https://media.istockphoto.com/id/2119799972/photo/spring-evening-view-of-the-eiffel-tower-in-paris.webp?a=1&b=1&s=612x612&w=0&k=20&c=0a1gxJfUcshqSRkHW_sQ-9NPDh9o3c8ExpB0YG67RVk=80",
//   "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Eiffel Tower, Paris
//   "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Statue of Liberty, NYC
//   "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Big Ben, London
//   "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Colosseum, Rome
//   "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Santorini, Greece
//   "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Taj Mahal, India
//   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Machu Picchu, Peru
//   "https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Sydney Opera House, Australia
//   "https://images.unsplash.com/photo-1705072933934-84a6c0288659?q=80&w=1606&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Fuji mountain, Japan
//   "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Sydney Opera House, Australia
// ];

// export default function Background() {
//   const [currentBgIndex, setCurrentBgIndex] = useState(0);


//    useEffect(() => {
//       const interval = setInterval(() => {
//         setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
//       }, 10000);
//       return () => clearInterval(interval);
//     }, []);
 
//   return (
//     <>
//      {/* Background Images with Smooth Transitions */ }
  
//       {backgroundImages.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out h-[600px] ${
//             index === currentBgIndex ? "opacity-100" : "opacity-0"
//           }`}
//           style={{ backgroundImage: `url('${image}')` }}
//         />
//       ))}</>
//    )
 

// }