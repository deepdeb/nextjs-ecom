"use client"

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
    const { clearCart } = useCartStore()
    useEffect(() => {
        clearCart()
    }, [])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-gray-700 mb-6">Thankyou for your purchase. Your order is being processed.</p>

                <Link href={'/products'} className="inline-block bg-green-600 hover:bg-green-700 py-2 px-4 text-white rounded-sm transition font-medium">
                    Continue shopping
                </Link>
            </div>
        </div>
    )
}