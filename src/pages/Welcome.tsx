// import { useBlog } from "@/context/BlogContex";

import { Button } from '@/components/ui/button';
import React from 'react';
import { useMemo, useState } from 'react';

// export default function Welcome() {
//   const { state, toggleLike, addPost } = useBlog();
//   const { posts, loading, error, liked } = state;

//   if (loading) return <p>Loading blogs...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="min-h-screen p-6 py-20 px-6 mt-20">
//       <h1 className="text-2xl font-bold mb-4">Travel Blogs</h1>
//       <button
//         className="mb-4 p-2 bg-blue-500 text-white rounded"
//         onClick={() =>
//           addPost({
//             id: Date.now(),
//             title: 'New Adventure',
//             excerpt: 'Just added a new blog post!',
//             image: 'https://source.unsplash.com/random/400x200?travel',
//             likes: 0,
//             slug: '',
//             category: '',
//             categoryName: '',
//             destination: '',
//             destinationName: '',
//             author: '',
//             publishedAt: '',
//             readTime: 0,
//             views: 0,
//             featured: false,
//           })
//         }
//       >
//         Add New Post
//       </button>

//       <div className="grid md:grid-cols-2 gap-4">
//         {posts.map(post => (
//           <div key={post.id} className="border p-4 rounded shadow">
//             <img
//               src={post.image}
//               alt={post.title}
//               className="w-full h-40 object-cover rounded mb-2"
//             />
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p className="text-gray-600">{post.excerpt}</p>
//             <button
//               className="mt-2 text-red-500"
//               onClick={() => toggleLike(post.id)}
//             >
//               {liked[post.id] ? '❤️' : '🤍'} {post.likes}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { Button } from '@/components/ui/button';
// import { useState, useMemo } from 'react';

// export function Welcome() {
//   const [count, setCount] = useState(0);

//   // Only recalculates if items change
//   const cartTotal = useMemo(() => calculateTotal([10, 20, 40], [1, 2, 3]), []);

//   function CartSummary({ total }: { total: number }) {
//     console.log('CartSummary re-rendered!');
//     return <h2>Total: ${total}</h2>;
//   }

//   function calculateTotal(items: number[], _p0: number[]) {
//     console.log('Calculating total...');
//     return items.reduce((a, b) => a + b, 2);
//   }

//   return (
//     <div className="min-h-screen p-6 py-20 px-6 mt-20">
//       <Button onClick={() => setCount(count + 1)} className=''>Increment: {count}</Button>
//       <CartSummary total={cartTotal} />
//     </div>
//   );
// }

// import { P } from 'node_modules/framer-motion/dist/types.d-Cjd591yU';
// import { useState, useMemo } from 'react';

// export function Welcome() {
//   const [count, setCount] = useState(0);
//   const [search, setSearch] = useState('');

//   // pretend this is a BIG list
//   const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//   // Expensive filtering (pretend it’s slow)
//   const filteredNumbers = useMemo(() => {
//     console.log('Filtering array...'); // Runs ONLY when 'search' changes
//     return numbers.filter(n => n.toString().includes(search));
//   }, [search]); // 👈 dependency = recalc only if 'search' changes

//   const checkValue = () => {
//   const num = Number(search); // convert string to number

//   if (isNaN(num)) {
//     return <p>Not a number</p>;
//   } else {
//     return <p>It is a number: {num}</p>;
//   }
// };

//   return (
//     <div className="min-h-screen p-6 py-20 px-6 mt-20">
//       <h1>useMemo with Arrays</h1>
//       <input
//         type="text"
//         placeholder="Search number..."
//         value={search}
//         onChange={ e => setSearch(e.target.value) }

//       />
//       { checkValue()}

//       <ul>
//         {filteredNumbers.map(n => (
//           <li key={n}>{n}</li>
//         ))}
//       </ul>

//       <button onClick={() => setCount(count + 1)}>Increase Count</button>
//       <p>Count: {count}</p>
//     </div>
//   );
// }

// export function Welcome() {
//   const products = [
//     { id: 1, name: 'Laptop', price: 1200 },
//     { id: 2, name: 'Phone', price: 800 },
//     { id: 3, name: 'Headphones', price: 200 },
//     { id: 4, name: 'Shoes', price: 150 },
//     { id: 5, name: 'Watch', price: 500 },
//   ];

//   const [search, setSearch] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [count, setCount] = useState(0);
//   // 👉 Your task: Use useMemo here
//   const filteredAndSorted = useMemo(() =>
//   {
//     console.log('Sorting array...');
//     // 1. Filter products by search text
//     const filtered = products.filter(product =>
//       product.name.includes(search)
//     );
//     // 2. Sort them by price based on sortOrder
//     return filtered.sort((a, b) =>
//       // Runs ONLY when 'search' or 'sortOrder' changes
//       sortOrder === 'asc' ? a.price - b.price : b.price - a.price

//     );
//   }, [search, sortOrder]); // 👈 dependency = recalc only if 'search' or 'sortOrder' changes

//   return (
//     <div className="min-h-screen p-6 py-20 px-6 mt-20">
//       <h1 className="text-xl font-bold mb-4">🛒 Product List</h1>

//       <input
//         type="text"
//         placeholder="Search products..."
//         className="border p-2 mr-2"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />

//       <select
//         value={sortOrder}
//         onChange={e => setSortOrder(e.target.value)}
//         className="border p-2"
//       >
//         <option value="asc">Sort by Price: Low → High</option>
//         <option value="desc">Sort by Price: High → Low</option>
//       </select>

//       <ul className="mt-4 space-y-2">
//         {filteredAndSorted.map(p => (
//           <li key={p.id} className="p-2 border rounded">
//             {p.name} - ${p.price}
//           </li>
//         ))}
//       </ul>

//       <Button onClick={ () => setCount(c => c + 1) }>Increase: { count }</Button>
//     </div>
//   );
// }

// 👶 Child component that displays a list of numbers
// const NumberList = React.memo(({ numbers }: { numbers: number[] }) => {
//   console.log('NumberList re-rendered'); // 👀 To track renders
//   return (
//     <ul>
//       {numbers.map(n => (
//         <li key={n}>{n}</li>
//       ))}
//     </ul>
//   );
// });

// export function Welcome()
// {
//   const originalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   const [count, setCount] = useState(0);
//   const [showEven, setShowEven] = useState<boolean | null>(null);
//   const [numbers, setNumbers] = useState(originalNumbers);
//   const [newNumber, setNewNumber] = useState<string>("");
//   // ✅ useMemo caches the filtered result
  
//   const filteredNumbers = useMemo(() =>
//   {
//     console.log('Filtering numbers...');
//     if (showEven === true) {
//       return numbers.filter((n) => n % 2 === 0);
//     } else if (showEven === false) {
//       return numbers.filter(n => n % 2 !== 0);
//     } else {
//       return numbers; // show all
//     }
//   }, [showEven, numbers]);

//   // ✅ Revert back to original numbers
//   function revert()
//   {
//     setNumbers(originalNumbers)
//     setShowEven(null); // reset filter
//   }
//   function addNumber() {
//     if (!newNumber) return;
//     setNumbers([...numbers, Number(newNumber)]);
//     setNewNumber(""); // clear input
//   }
  
//   function removeNumber(num: number) {
//     setNumbers(numbers.filter(n => n !== num));
//   }

//   return (
//     <div className="min-h-screen p-6 py-20 px-6 mt-20">
//       <h2>Count: {count}</h2>
//       <Button onClick={() => setCount(c => c + 1)}>Increment Count</Button>
//       <Button onClick={() => setShowEven(prev => !prev)}>
//         Toggle Numbers Type
//       </Button>
//       {/* <button onClick={() => setShowEven(false)}>Show Odd</button> 
//       <button onClick={() => setShowEven(true)}>Show Even</button> */}
//       {/* <button onClick={() => setShowEven(false)}>Show Odd</button> */}
//       <button onClick={revert}>Revert</button>
//       {/* 👇 Child only re-renders when `filteredNumbers` changes */}

//       <div style={{ marginTop: '10px' }}>
//         <input
//           type="number"
//           value={newNumber}
//           onChange={e => setNewNumber(e.target.value)}
//           placeholder="Add a number"
//         />
//         <button onClick={addNumber}>Add</button>
//       </div>
//       <ul style={{ marginTop: '20px' }}>
//         {filteredNumbers.map(n => (
//           <li key={n}>
//             {n} <button onClick={() => removeNumber(n)}>Remove</button>
//           </li>
//         ))}
//       </ul>

//     </div>
//   );
// }

// import { useState, useMemo } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

export function Welcome() {
  // Initial product list
  const [products] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Headphones', price: 200 },
    { id: 3, name: 'Backpack', price: 80 },
    { id: 4, name: 'Shoes', price: 150 },
  ]);

  // Cart state (empty initially)
  const [cart, setCart] = useState<Product[]>([]);
  const [product, setProduct] = useState('')
  // Add to cart
  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };
  
  // Remove from cart (first match only)
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Total price (expensive calculation -> useMemo)
  const totalPrice = useMemo(() => {
    console.log('Recalculating total...');
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <div className="min-h-screen p-6 py-20 px-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">🛒 Shopping Cart Simulation</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={product}
           onChange={e => setProduct(e.target.value)}
          placeholder="Enter product name"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      {/* Products */}
      <h2 className="text-xl font-semibold mb-2">Products</h2>
      <ul className="mb-6 space-y-2">
        {products.map(product => (
          <li
            key={product.id}
            className="flex justify-between   items-center bg-foreground text-background p-3 rounded"
          >
            <span>
              {product.name} - ${product.price}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </li>
        ))}
      </ul>

      {/* Cart */}
      <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {cart.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-foreground text-background shadow p-3 rounded"
            >
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Total */}
      <h3 className="text-lg font-bold">
        Total Price: <span className="text-blue-600">${totalPrice}</span>
      </h3>
    </div>
  );
}
