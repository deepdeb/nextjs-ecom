"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore()


  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  if (total === 0 || items.length === 0) {
    return (
      <div className="flex flex-col items-center mt-8 space-y-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="text-xl mt-8">No products in your cart...</p>
        <Button asChild variant="outline">
          <Link href='/products'>Shop</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="px-10">
      <h1 className="text-center my-8 text-3xl font-bold">Your Cart</h1>
      <Card className="max-w-xl mx-auto p-6">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {items.map((item, key) => (
              <li key={key} className="flex justify-between items-center border-b pb-4 mb-4">

                <div className="flex items-center space-x-4">
                  <Image
                    src={item.imageUrl!}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded border p-1"
                  />
                  <div>
                    <span className="block font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => removeItem(item.id)} variant="outline">-</Button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <Button onClick={() => addItem({ ...item, quantity: 1 })} variant="outline">+</Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-lg font-semibold flex justify-between pt-4">
            <span>Total:</span>
            <span>${(total / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className="max-w-xl mx-auto mt-10 flex flex-col space-y-2">
        <input type="hidden" name="items" value={JSON.stringify(items)}/>
        <Button type="submit" className="w-full" variant={"default"}>Proceed to payment</Button>
        <Button className="w-full" onClick={clearCart} variant={"default"}>Clear cart</Button>
      </form>
    </div>
  );
}