"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Product = { id: number; title: string, images: string[] };

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products/")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => console.log("Offline mode: showing cached data if available"));
  }, []);

  return (
    <main>
      <h1>Product List (Offline-Ready)</h1>
      <ul className="flex flex-col gap-4">
        {products.map((p) => (
          <li key={p.id}>
            <div className="flex gap-3 items-center">
              <span>{p.id}</span>
              <span>{p.title}</span>
              <Image width={200} height={200} objectFit="cover" src={p.images[0]} alt="product image" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
