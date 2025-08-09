"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {useForm} from "react-hook-form";

type Product = { id: number; title: string, images: string[] };

type ProductObject = {
  price: number
  title: string
  image: string
  description: string
  categoryId: number
}

export default function ProductsPage() {
  const modalRef = React.useRef<HTMLDialogElement>(null)
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({} as Product);
  const { register, handleSubmit } = useForm<ProductObject>()
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products/")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => console.log("Offline mode: showing cached data if available"))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: ProductObject) => {
    const { image, price, categoryId, ...payload } = data

    const dataPayload = {
      ...payload,
      images: [image],
      price: Number(price),
      categoryId: Number(categoryId),
    }

    setCreateLoading(true)
    try {
      await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        body: JSON.stringify(dataPayload),
      })
      .then((res) => res.json())
      .then(setProduct)

      modalRef?.current?.close()
    } catch (error) {
      console.log(error);
    } finally {
      setCreateLoading(false)
    }
  }

  return (
    <main className="p-5 w-full">
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-2xl">Product List (Offline-Ready)</h1>
        <div className="flex gap-4 items-center">
          <Link href="/" className="p-3 rounded-lg text-green-700 font-bold">Home Page</Link>
          <button
            onClick={()=> modalRef?.current?.showModal()}
            className="p-3 btn btn-warning rounded-lg">
            Create Product
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-4 mt-5">
        {products.map((p) => (
          <li key={p.id}>
            <div className="flex gap-3 items-center">
              <span>{p.id}</span>
              <span>{p.title}</span>
              <img width={100} height={100} src={p.images[0]} alt="product image" />
            </div>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-28 w-28"></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-28 w-28"></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-28 w-28"></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-28 w-28"></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-28 w-28"></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-28 w-28"></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-28 w-28"></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-28 w-28"></div>
          </div>
        </div>
      )}
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create new product</h3>
          <div className="">
            <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
              <input {...register('title', { required: true })} type="text" placeholder="Title" className="input" />
              <input {...register('price', { required: true })} type="number" placeholder="Price" className="input" />
              <input {...register('description', { required: true })} type="text" placeholder="Description" className="input" />
              <input {...register('categoryId', { required: true })} type="number" placeholder="CategoryId" className="input" />
              <input {...register('image', { required: true })} type="text" placeholder="Image Address" className="input" />
              <button type="submit" className="btn btn-primary rounded-lg" disabled={createLoading}>
                {createLoading && <span className="loading loading-spinner"></span>}
                Submit
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" disabled={createLoading}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
}
