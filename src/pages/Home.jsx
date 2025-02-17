import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Posts</h1>

            {/* Search Bar */}
            <div className="flex justify-center mb-6">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="border px-6 py-3 text-left">ID</th>
                            <th className="border px-6 py-3 text-left">Title</th>
                            <th className="border px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}>
                                <td className="border px-6 py-3 text-gray-700">{item.id}</td>
                                <td className="border px-6 py-3 text-gray-800">{item.title}</td>
                                <td className="border px-6 py-3 text-center">
                                    <a href={`/item/${item.id}`} className="text-blue-600 hover:text-blue-800 font-semibold transition">
                                        Read More
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-3">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1} 
                    className={`px-4 py-2 rounded-lg text-white transition ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700"}`}
                >
                    Previous
                </button>
                <span className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages} 
                    className={`px-4 py-2 rounded-lg text-white transition ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
