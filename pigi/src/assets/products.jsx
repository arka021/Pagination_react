import React, { useState, useEffect } from "react";

function ProductCard({ image, title }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <span className="text-gray-800 font-semibold text-center">{title}</span>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPages, setCurrrentPages] = useState(1);
  const totalPage = products.length;
  const items = 10;
  const NoOfPages = Math.ceil(totalPage / items);
  let numbers = Array.from({ length: NoOfPages }, (value, index) => index);
  const end = currentPages * items;
  const start = end - items;
  var currentItem = products.slice(start, end);
  // console.log(numbers);
  async function fetchData() {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=84");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return !products.length ? (
    <h1 className="text-center text-xl text-gray-600">No product found</h1>
  ) : (
    <div>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">A Simple Pagination</h2>

        <ul className="flex list-none space-x-1">
          <li>
            <button
              href="#"
              class="px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-l"
            >
              &laquo;
            </button>
          </li>
          {numbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => setCurrrentPages(number + 1)}
                href="#"
                className={`px-3 py-1 border rounded ${
              currentPages === number + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
              >
                {number}
              </button>
            </li>
          ))}

          <li>
            <button
              href="#"
              class="px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-r"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
      <br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <h1 className="text-3xl font-bold text-center mb-6">Pagination</h1>
        {currentItem.map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
