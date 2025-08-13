"use client"

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const { items } = useCartStore()
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return (
        <>
            <nav className="flex items-center justify-between px-6 py-6 bg-gray-800 text-white shadow-md sticky top-0 z-50">
                <div className="text-2xl font-bold">
                    <Link href="/" className="hover:text-blue-400 transition-colors">E-commify</Link>
                </div>
                <div className="hidden md:flex space-x-6 text-lg">
                    <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
                    <Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link>
                    <Link href="/checkout" className="hover:text-blue-400 transition-colors">Checkout</Link>
                </div>

                {/* Right: Cart Icon */}
                <div className="relative flex items-center space-x-4">
                    <Link href="/checkout" className="relative">
                        <ShoppingCartIcon className="w-6 h-6 hover:text-blue-400 transition-colors" />
                        {cartCount > 0 &&
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                                {cartCount}
                            </span>}
                    </Link>
                    <Button className="md:hidden" variant="ghost" onClick={() => setMobileOpen(prev => !prev)}>
                        {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
                    </Button>
                </div>
            </nav>
            {
                mobileOpen && (
                    <div className="absolute top-16 left-0 w-full bg-gray-800 text-white z-50 flex flex-col items-start space-y-4 px-6 py-4 md:hidden">
                        <Link href="/" onClick={() => setMobileOpen(false)} className="hover:text-blue-400 transition-colors">Home</Link>
                        <Link href="/products" onClick={() => setMobileOpen(false)} className="hover:text-blue-400 transition-colors">Products</Link>
                        <Link href="/checkout" onClick={() => setMobileOpen(false)} className="hover:text-blue-400 transition-colors">Checkout</Link>
                    </div>
                )
            }
        </>
    )
}