import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader } from "lucide-react"; // Import Lucide icons

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item details: ", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <Loader className="animate-spin text-blue-500" size={60} />
    </div>
  );

  if (!item) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="text-center text-red-600 font-semibold text-lg">
        Item not found
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {/* Back Button */}
      <div className="mb-4">
        <a href="/" className="flex items-center text-blue-500 hover:text-blue-700 font-semibold">
          <ArrowLeft className="mr-2" /> Back to Posts
        </a>
      </div>

      {/* Card with Item Details */}
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{item.title}</h1>
        <p className="text-lg text-gray-700">{item.body}</p>
      </div>

      {/* Footer or Additional Info */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        <p>&copy; 2025 All Rights Reserved</p>
      </div>
    </div>
  );
};

export default ItemDetails;
