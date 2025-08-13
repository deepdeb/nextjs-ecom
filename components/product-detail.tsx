"use client"

import Stripe from "stripe"
import Image from "next/image"
import { Button } from "./ui/button"
import { useCartStore } from "@/store/cart-store"

interface Props {
  product: Stripe.Product
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore()
  const price = product.default_price as Stripe.Price
  const cartItem = items.find(item => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  const onAddItem = () => {

    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1
    })
  }

  const onRemoveItem = () => {
    removeItem(product.id)
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[500px] p-4">
      {/* Image Section */}
      {product.images && product.images[0] && (
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
          />
        </div>
      )}

      {/* Product Info Section */}
      <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          {product.description && (
            <p className="text-gray-600 mb-4">{product.description}</p>
          )}

          {price && price.unit_amount && (
            <p className="text-xl text-gray-800 font-semibold mb-6">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={onRemoveItem} variant="outline">-</Button>
          <span className="text-lg font-medium">{quantity}</span>
          <Button onClick={onAddItem} variant="outline">+</Button>
        </div>
      </div>
    </div>
  )
}
