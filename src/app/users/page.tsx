"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type User = { id: number; name: string, avatar: string };

export default function UsersPage() {
  const modalRef = React.useRef<HTMLDialogElement>(null)
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/users/")
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => console.log("Offline mode: showing cached data if available"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-5 w-full">
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-2xl">User List (Offline-Ready)</h1>
        <div className="flex gap-4 items-center">
          <Link href="/" className="p-3 rounded-lg text-green-700 font-bold">Home Page</Link>
          <button
            onClick={()=> modalRef?.current?.showModal()}
            className="p-3 btn btn-info rounded-lg">
            Create User
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-4 mt-5">
        {users.map((p) => (
          <li key={p.id}>
            <div className="flex gap-3 items-center">
              <img width={100} height={100} src={p.avatar} alt="user image" />
              <span>{p.id}</span>
              <span>{p.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
}
