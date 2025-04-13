import React from "react";
// import { fetchPromotions } from "../../dashboard/promotions/actions/Actions";
// import ClientOfferCard from "./component/ClientOfferCard";

export default async function AdminOffersPage() {
  // const promotions = await fetchPromotions(); // Fetch promotions on the server

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        عروض محدودة، فرص ذهبية!
      </h1>

      {/* Promotions List */}
      <div className="space-y-6">
        {/* {promotions.map((promotion) => (
          <ClientOfferCard key={promotion.id} promotion={promotion} />
        ))} */}
      </div>
    </div>
  );
}
