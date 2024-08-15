"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MongoDBItem } from "@/types/MongoDBItem";
import ItemCard from "@/components/ItemCard";

export default function SearchResultsClient() {
  const [items, setItems] = useState<MongoDBItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchResults = async () => {
      const imageUrl = searchParams.get("imageUrl");
      const name = searchParams.get("name");

      if (!imageUrl || !name) {
        setError("Missing image URL or item name");
        setIsLoading(false);
        return;
      }

      try {
        const apiUrl = "http://127.0.0.1:8000/api/similarity_search"; // Update this with your actual API URL
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_url: imageUrl,
            text_query: name,
            top_k: 12, // You can adjust this number
          }),
        });

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

  const maxItems = 24; // Set the maximum number of items to display
  const displayedItems = items.slice(0, maxItems);

  if (isLoading) {
    return <div className="text-center py-10">Loading similar items...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayedItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
