"use client"

import Stripe from "stripe"
import { ProductCard } from "./product-card"
import { useState } from "react"

interface Props {
    products: Stripe.Product[]
}

export const ProductList = ({ products }: Props) => {

    const [searchTerm, setSearchTerm] = useState<string>("")

    const filteredProducts = products.filter(product => {
        const nameMatch = product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
        const descMatch = product?.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false

        return nameMatch || descMatch
    })

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="border border-gray-300 p-3 rounded-lg w-full mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                    return (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}