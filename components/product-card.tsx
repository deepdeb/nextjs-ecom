import Link from "next/link"
import Stripe from "stripe"
import { Card } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface Props {
  product: Stripe.Product
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
<Link href={`/products/${product.id}`}>
  <Card className="border rounded-lg p-4 flex flex-col gap-4 hover:shadow-md transition">
    {product.images?.[0] && (
      <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
    )}

    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">{product.name}</h3>
      {product.description && (
        <p className="text-sm text-gray-600 line-clamp-1" title={product.description}>{product.description}</p>
      )}
    </div>

    <div className="mt-auto flex items-center justify-between text-sm">
      {price?.unit_amount && (
        <span className="font-semibold">${(price.unit_amount / 100).toFixed(2)}</span>
      )}
      <Button variant="outline" size="sm">View Details</Button>
    </div>
  </Card>
</Link>

  );
  
}