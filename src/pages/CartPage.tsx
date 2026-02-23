import { useCart } from '@/hooks/use-cart';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingBag } from 'lucide-react';

export function CartPage() {
  const { items, isLoading, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Start exploring destinations and add items to your cart
        </p>
        <Button onClick={() => navigate('/destinations')}>
          Browse Destinations
        </Button>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button variant="outline" onClick={() => clearCart()}>
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.itemImage}
                    alt={item.itemName}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.itemName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.destinationName}
                    </p>
                    {item.checkIn && item.checkOut && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(item.checkIn).toLocaleDateString()} -{' '}
                        {new Date(item.checkOut).toLocaleDateString()}
                      </p>
                    )}
                    {item.guests && (
                      <p className="text-sm text-muted-foreground">
                        {item.guests} guest{item.guests > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${(item.totalPrice / 100).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
              </div>
            <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}