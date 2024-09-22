"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState({ destinations: [], products: [] });
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const { data: session } = useSession();
  const router = useRouter()



  const temp = session as any;

   useEffect(() => {
     if (!session){
        router.push('/login')
     }
   },[session])

  const fetchAutocompleteResults = async (searchTerm: string) => {
    if (abortController) {
      abortController.abort(); 
    }

    const controller = new AbortController();
    setAbortController(controller);

    const config = {
      headers: {
        Authorization: `Bearer ${temp?.accessToken}`,
      },
      signal: controller.signal,
    };

    try {
      const response = await axios.get(
        `https://dev.intraversewebservices.com/api/product/v1/package/auto-complete?q=${searchTerm}`,
        config
      );
      console.log('myresponse', response)
      setResults({
        destinations: response.data.data.destinations,
        products: response.data.data.products,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Autocomplete error:", error);
      }
    }
  };

  const debouncedFetch = useCallback(debounce(fetchAutocompleteResults, 300), [
    temp?.accessToken,
  ]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults({ destinations: [], products: [] }); 
      return;
    }
    debouncedFetch(searchTerm);
  }, [searchTerm, debouncedFetch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchTerm, date });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  console.log('search', searchTerm)
console.log("description", results);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex justify-center items-center flex-grow">
        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full"
        >
          <h2 className="text-2xl font-semibold mb-4">Search for Tours</h2>

          <div className="mb-4 relative">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search for a place or activity
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="e.g. Lagos, Nigeria"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            {searchTerm && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {results?.destinations?.length > 0 && (
                  <div className="p-2">
                    <h3 className="text-sm font-bold">Destinations</h3>
                    {results.destinations.map((destination: any) => (
                      <div
                        key={destination.destinationId}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <h4 className="text-sm font-medium">
                          {destination.destinationName}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Tags:{" "}
                          {destination.tags
                            .map((tag: any) => tag.tagName)
                            .join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {results?.products?.length > 0 && (
                  <div className="p-2">
                    <h3 className="text-sm font-bold">Products</h3>
                    {results.products.map((product: any) => (
                      <div
                        key={product.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <h4 className="text-sm font-medium">{product.name}</h4>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              When
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search for tours
          </button>
        </form>
      </div>
    </div>
  );
};



export default SearchForm;
