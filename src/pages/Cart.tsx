// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import {
//   ShoppingCart,
//   Plus,
//   Minus,
//   Trash2,
//   Upload,
//   Package,
//   Link,
// } from 'lucide-react';

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// };

// // FIXED: Memoized CartItem with proper click handlers
// const CartItem = React.memo(
//   ({
//     item,
//     onUpdateQuantity,
//     onRemove,
//   }: {
//     item: Product;
//     onUpdateQuantity: (id: number, change: number) => void;
//     onRemove: (id: number) => void;
//   }) => {
//     const itemTotal = useMemo(
//       () => item.price * item.quantity,
//       [item.price, item.quantity]
//     );

//     // FIXED: Memoize click handlers to prevent function recreation
//     const handleDecrease = useCallback(() => {
//       onUpdateQuantity(item.id, -1);
//     }, [item.id, onUpdateQuantity]);

//     const handleIncrease = useCallback(() => {
//       onUpdateQuantity(item.id, 1);
//     }, [item.id, onUpdateQuantity]);

//     const handleRemove = useCallback(() => {
//       onRemove(item.id);
//     }, [item.id, onRemove]);

//     return (
//       <div className="p-6 hover:bg-gray-50 transition-colors">
//         <div className="flex items-center gap-4">
//           {/* Product Image */}
//           <div className="flex-shrink-0">
//             {item.image ? (
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-20 h-20 object-cover rounded-lg border-2 border-gray-100 shadow-sm"
//               />
//             ) : (
//               <div className="w-20 h-20 bg-gray-200 rounded-lg border-2 border-gray-100 shadow-sm flex items-center justify-center">
//                 <Package className="w-8 h-8 text-gray-400" />
//               </div>
//             )}
//           </div>

//           {/* Product Details */}
//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg font-semibold text-gray-900 truncate">
//               {item.name}
//             </h3>
//             <p className="text-2xl font-bold text-blue-600 mt-1">
//               ${item.price.toFixed(2)}
//             </p>
//           </div>

//           {/* Quantity Controls */}
//           <div className="flex items-center gap-3">
//             <Button
//               variant="outline"
//               size="sm"
//               className="w-8 h-8 p-0 rounded-full border-gray-300 hover:bg-gray-100"
//               onClick={handleDecrease}
//             >
//               <Minus className="w-4 h-4" />
//             </Button>

//             <span className="w-12 text-center font-semibold text-lg text-gray-700">
//               {item.quantity}
//             </span>

//             <Button
//               variant="outline"
//               size="sm"
//               className="w-8 h-8 p-0 rounded-full border-gray-300 hover:bg-gray-100"
//               onClick={handleIncrease}
//             >
//               <Plus className="w-4 h-4" />
//             </Button>
//           </div>

//           {/* Item Total & Remove */}
//           <div className="flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-xl font-bold text-gray-900">
//                 ${itemTotal.toFixed(2)}
//               </p>
//             </div>

//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
//               onClick={handleRemove}
//             >
//               <Trash2 className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// CartItem.displayName = 'CartItem';

// // FIXED: Proper CartSummary component
// const CartSummary = React.memo(
//   ({ total, itemCount }: { total: number; itemCount: number }) => (
//     <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-b-lg">
//       <Separator className="mb-4" />
//       <div className="flex justify-between items-center mb-6">
//         <span className="text-xl font-semibold text-gray-700">Total:</span>
//         <span className="text-3xl font-bold text-green-600">
//           ${total.toFixed(2)}
//         </span>
//       </div>

//       <div className="flex gap-3">
//         <Button
//           variant="outline"
//           className="flex-1 border-gray-300 hover:bg-gray-100 font-semibold py-3"
//         >
//           Continue Shopping
//         </Button>
//         <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
//           Proceed to Checkout
//         </Button>
//       </div>
//     </div>
//   )
// );

// CartSummary.displayName = 'CartSummary';

// const CartComponent = () => {
//   const [inputMethod, setInputMethod] = useState<'upload' | 'url'>('upload');
//   const [tempUrl, setTempUrl] = useState('');
//   const [product, setProduct] = useState<Omit<Product, 'id' | 'quantity'>>({
//     name: '',
//     price: 0,
//     image: '',
//   });
//   const [cart, setCart] = useState<Product[]>([]);

//   // Load cart from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem('shopping-cart');
//     if (savedCart) {
//       try {
//         const parsedCart = JSON.parse(savedCart);
//         setCart(parsedCart);
//       } catch (error) {
//         console.error('Error loading cart from localStorage:', error);
//       }
//     }
//   }, []);

//   // Save cart to localStorage
//   useEffect(() => {
//     if (cart.length > 0) {
//       localStorage.setItem('shopping-cart', JSON.stringify(cart));
//     } else {
//       localStorage.removeItem('shopping-cart');
//     }
//   }, [cart]);

//   // FIXED: Memoized calculations
//   const cartStats = useMemo(() => {
//     const itemCount = cart.length;
//     const total = cart.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     return { itemCount, total };
//   }, [cart]);

//   // FIXED: Memoize form validation
//   const isFormValid = useMemo(() => {
//     return (
//       product.name.trim() !== '' && product.price > 0 && product.image !== ''
//     );
//   }, [product.name, product.price, product.image]);

//   // FIXED: Stable functions with NO dependencies
//   const addToCart = useCallback(
//     (newProduct: Omit<Product, 'id' | 'quantity'>) => {
//       if (!newProduct.name || newProduct.price <= 0) return;

//       setCart(prev => {
//         const existing = prev.find(item => item.name === newProduct.name);
//         if (existing) {
//           return prev.map(item =>
//             item.name === newProduct.name
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           );
//         }
//         return [
//           ...prev,
//           {
//             ...newProduct,
//             id: Date.now(),
//             quantity: 1,
//           },
//         ];
//       });
//     },
//     []
//   ); // No dependencies = stable function

//   const removeFromCart = useCallback((id: number) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== id));
//   }, []); // No dependencies = stable function

//   const updateQuantity = useCallback((id: number, change: number) => {
//     setCart(prev =>
//       prev
//         .map(item => {
//           if (item.id === id) {
//             const newQuantity = item.quantity + change;
//             return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
//           }
//           return item;
//         })
//         .filter(item => item.quantity > 0)
//     );
//   }, []); // No dependencies = stable function

//   // FIXED: Memoized input handlers
//   const handleProductNameChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setProduct(prev => ({ ...prev, name: e.target.value }));
//     },
//     []
//   );

//   const handleProductPriceChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setProduct(prev => ({ ...prev, price: Number(e.target.value) }));
//     },
//     []
//   );

//   const handleFileUpload = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files && e.target.files[0]) {
//         const reader = new FileReader();
//         reader.onload = ev => {
//           setProduct(prev => ({
//             ...prev,
//             image: ev.target?.result as string,
//           }));
//         };
//         reader.readAsDataURL(e.target.files[0]);
//       }
//     },
//     []
//   );

//   // FIXED: Stable URL submit handler
//   const handleUrlSubmit = useCallback(() => {
//     if (tempUrl.trim()) {
//       setProduct(prev => ({
//         ...prev,
//         image: tempUrl.trim(),
//       }));
//       setTempUrl('');
//     }
//   }, [tempUrl]); // Only depend on tempUrl

//   const handleAddProduct = useCallback(() => {
//     addToCart(product);
//     setProduct({ name: '', price: 0, image: '' });
//   }, [addToCart, product]); // Depend on both addToCart and product

//   const clearImage = useCallback(() => {
//     setProduct(prev => ({ ...prev, image: '' }));
//     setTempUrl('');
//   }, []);

//   // FIXED: Method toggle handlers
//   const handleUploadMethod = useCallback(() => {
//     setInputMethod('upload');
//   }, []);

//   const handleUrlMethod = useCallback(() => {
//     setInputMethod('url');
//   }, []);

//   const handleTempUrlChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setTempUrl(e.target.value);
//     },
//     []
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8">
//       {/* Add Product Form */}
//       <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
//             <Package className="w-6 h-6 text-blue-600" />
//             Add New Product
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Image Upload */}
//             <div className="space-y-3">
//               <Label className="text-sm font-semibold text-gray-700">
//                 Product Image
//               </Label>

//               {/* Method Toggle */}
//               <div className="flex gap-2 mb-3">
//                 <Button
//                   variant={inputMethod === 'upload' ? 'default' : 'outline'}
//                   size="sm"
//                   onClick={handleUploadMethod}
//                   className="flex-1"
//                 >
//                   <Upload className="w-4 h-4 mr-2" />
//                   Upload
//                 </Button>
//                 <Button
//                   variant={inputMethod === 'url' ? 'default' : 'outline'}
//                   size="sm"
//                   onClick={handleUrlMethod}
//                   className="flex-1"
//                 >
//                   <Link className="w-4 h-4 mr-2" />
//                   URL
//                 </Button>
//               </div>

//               {/* Image Input */}
//               {inputMethod === 'upload' ? (
//                 <div className="relative">
//                   {product.image ? (
//                     <div className="w-full h-40 rounded-lg overflow-hidden border-2 border-gray-200">
//                       <img
//                         src={product.image}
//                         alt="Product preview"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50/50 hover:bg-blue-100/50 transition-colors cursor-pointer group">
//                       <div className="text-center">
//                         <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
//                         <p className="text-sm text-blue-600 font-medium">
//                           Click to upload image
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           PNG, JPG up to 10MB
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     onChange={handleFileUpload}
//                   />
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <Input
//                     type="url"
//                     placeholder="https://example.com/image.jpg"
//                     value={tempUrl}
//                     onChange={handleTempUrlChange}
//                     className="border-gray-200 focus:border-blue-400"
//                   />
//                   <Button onClick={handleUrlSubmit} disabled={!tempUrl.trim()}>
//                     Set
//                   </Button>
//                 </div>
//               )}

//               {product.image && (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={clearImage}
//                   className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                 >
//                   Clear Image
//                 </Button>
//               )}
//             </div>

//             {/* Product Details */}
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="name"
//                   className="text-sm font-semibold text-gray-700"
//                 >
//                   Product Name
//                 </Label>
//                 <Input
//                   id="name"
//                   value={product.name}
//                   placeholder="Enter product name..."
//                   className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
//                   onChange={handleProductNameChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="price"
//                   className="text-sm font-semibold text-gray-700"
//                 >
//                   Price
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                     $
//                   </span>
//                   <Input
//                     id="price"
//                     value={product.price || ''}
//                     type="number"
//                     step="0.01"
//                     placeholder="0.00"
//                     className="pl-8 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
//                     onChange={handleProductPriceChange}
//                   />
//                 </div>
//               </div>

//               <Button
//                 onClick={handleAddProduct}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
//                 disabled={!isFormValid}
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add to Cart
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Shopping Cart */}
//       <Card className="shadow-xl border-0 bg-white">
//         <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
//           <CardTitle className="flex items-center justify-between text-2xl font-bold text-gray-800">
//             <div className="flex items-center gap-2">
//               <ShoppingCart className="w-6 h-6 text-gray-700" />
//               Shopping Cart
//             </div>
//             <Badge
//               variant="secondary"
//               className="bg-blue-100 text-blue-800 px-3 py-1"
//             >
//               {cartStats.itemCount} items
//             </Badge>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//           <div className="space-y-0">
//             {cart.length === 0 ? (
//               <div className="p-12 text-center">
//                 <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-xl text-gray-500 font-medium">
//                   Your cart is empty
//                 </p>
//                 <p className="text-gray-400 mt-2">
//                   Add some products to get started!
//                 </p>
//               </div>
//             ) : (
//               cart.map((item, index) => (
//                 <div key={item.id}>
//                   <CartItem
//                     item={item}
//                     onUpdateQuantity={updateQuantity}
//                     onRemove={removeFromCart}
//                   />
//                   {index < cart.length - 1 && <Separator />}
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Cart Summary */}
//           {cart.length > 0 && (
//             <CartSummary
//               total={cartStats.total}
//               itemCount={cartStats.itemCount}
//             />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CartComponent;
