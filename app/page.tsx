import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@/components/carousel";

export default async function Home() {  
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 5,
  })

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className=" w-[90%] mx-auto my-auto bg-gradient-to-r from-emerald-200 to-rose-300 py-6 rounded-xl">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
          <div className="flex-1 space-y-2 text-center">
            <h2 className="text-4xl font-bold text-gray-800">Welcome to Ecommify</h2>
            <p className="text-lg text-gray-600">Explore latest trends at unbeatable price</p>
            <Button asChild variant={"default"} className="mt-8 py-6">
              <Link href="/products">Browse all products</Link>
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <Carousel products={products.data} />
          </div>
        </div>
      </section>
    </div>
  );
}
