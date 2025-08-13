"use client";

import Stripe from "stripe"
import { Card, CardContent, CardTitle } from "./ui/card"
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    products: Stripe.Product[]
}

export const Carousel = ({ products }: Props) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [products.length])

    const currentProduct = products[currentIndex];
    const price = currentProduct.default_price as Stripe.Price;

    return (
        <Card className="w-md mx-auto my-8 rounded-xl shadow-lg bg-white">
            {currentProduct.images && currentProduct.images[0] && (
                <div className="relative h-64 w-full">
                    <Image
                        src={currentProduct.images[0]}
                        alt={currentProduct.name}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            )}
            <CardContent className="p-6">
                <CardTitle className="text-2xl font-bold mb-2">{currentProduct.name}</CardTitle>
                {price && price.unit_amount && (
                    <p className="text-lg text-gray-700 font-semibold">
                        ${(price.unit_amount / 100).toFixed(2)}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}