import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import React, { useState } from "react";
import { api } from "../api/api";

export default function ProductPortal({ product, onClose }) {
  if (!product) return null;
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/70 flex justify-center p-20 z-50">
        <div className="bg-white p-6 w-auto shadow-lg relative">
            <button
            onClick={onClose}
            className="text-right w-full text-gray-600 hover:text-black text-xl"
            >
            ✕
            </button>
            <div className="flex flex-row gap-4 h-full">
                <div className="flex flex-col gap-4">
                    {product.images.map((img, index) => (
                        <img
                            onClick={() => setSelectedImage(img)}
                            key={index}
                            src={`http://127.0.0.1:5000${img}`}
                            alt={`${product.name} ${index + 1}`}
                            className={`w-30 h-50 object-cover ${
                                selectedImage==img
                                ? "border-b-1"
                                : ""
                            }`}
                        />
                    ))}
                </div>
                <div className="">
                    <img
                        src={`http://127.0.0.1:5000${selectedImage}`}
                        className="w-125 h-160 object-cover"

                    />
                </div>
                <div className="flex flex-col gap-8 w-75">
                    <h1 className="p-2">{product.name}</h1>
                    <p className="p-2">{product.price} PLN</p>
                    <button onClick={() =>api.post(
                        "/cart",
                        { product_id: product.id, quantity: 1 },
                        { withCredentials: true }
                    )}
                    className="bg-black text-white p-2 hover:bg-white hover:text-black border-1 border-black duration-300">
                        Add to Bag
                    </button>
                    <Link to={`/products/${product.id}`} className="border-b-1 hover:border-b-2 text-center">View Full Item Information</Link>
                </div>
            </div>
        </div>
    </div>,
    document.body
  );
}
