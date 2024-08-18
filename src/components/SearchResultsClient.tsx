"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MongoDBItem } from "@/types/MongoDBItem";
import ItemCard from "@/components/ItemCard";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const EXTENSION_URL =
  process.env.NEXT_PUBLIC_EXTENSION_URL || "www.grailed.com";
const TOP_K = parseInt(process.env.NEXT_PUBLIC_TOP_K || "12");

export default function SearchResultsClient() {
  const [items, setItems] = useState<MongoDBItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noParam, setNoParam] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchResults = async () => {
      const imageUrl = searchParams.get("imageUrl");
      const name = searchParams.get("name");

      if (!imageUrl || !name) {
        setError("Please use the search extension to search for items");
        setIsLoading(false);
        setNoParam(true);
        return;
      }

      try {
        const apiUrl = `${API_URL}/search`; // Update this with your actual API URL
        const response = await fetch(
          `${apiUrl}?image_url=${encodeURIComponent(
            imageUrl
          )}&text_query=${encodeURIComponent(name)}&top_k=${encodeURIComponent(
            TOP_K
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            //   body: JSON.stringify({
            //     image_url: imageUrl,
            //     text_query: name,
            //     top_k: TOP_K,
            //   }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(
            `An error occurred while fetching similar items: ${err.message}`
          );
        } else {
          setError("An unknown error occurred while fetching similar items");
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  const maxItems = 50; // Set the maximum number of items to display
  const displayedItems = items.slice(0, maxItems);

  if (isLoading) {
    return <div className="text-center py-10">Loading similar items...</div>;
  }

  if (error && noParam) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-center py-20 text-slate-500 text-xl">{error}</div>
        <button className="bg-black rounded py-2 px-3 hover:bg-slate-500">
          <Link href={EXTENSION_URL} className="text-white text-sm">
            Visit Extension Page
          </Link>
        </button>
      </div>
    );
  }

  if (error) {
    <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
