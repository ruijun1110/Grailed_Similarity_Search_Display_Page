import { Suspense } from "react";
import SearchResultsClient from "@/components/SearchResultsClient";

export default function SearchResults() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h2 className="text-xl font-semibold mb-6">Search Results</h2> */}
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResultsClient />
      </Suspense>
    </div>
  );
}
