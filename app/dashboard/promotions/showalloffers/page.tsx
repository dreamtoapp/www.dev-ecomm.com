import React from "react";

function page() {
  return <div></div>;
}

export default page;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import {
//   fetchPromotions,
//   removePromotion,
//   togglePromotionStatus,
// } from "../actions/Actions";
// import OfferTemplate from "./component/offerCard";
// import { Trash, Trash2 } from "lucide-react";

// // Define the Promotion interface
// interface Promotion {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl?: string | null;
//   active: boolean;
//   productIds: string[];
// }

// export default function AdminOffersPage() {
//   const [promotions, setPromotions] = useState<Promotion[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch promotions on page load
//   useEffect(() => {
//     const loadPromotions = async () => {
//       try {
//         const data = await fetchPromotions();
//         setPromotions(data);
//       } catch (error) {
//         console.error("Error fetching promotions:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadPromotions();
//   }, []);

//   // Toggle promotion activation status
//   const handleToggleStatus = async (promotionId: string, active: boolean) => {
//     try {
//       await togglePromotionStatus(promotionId, active);
//       const updatedPromotions = await fetchPromotions();
//       setPromotions(updatedPromotions);
//     } catch (error) {
//       console.error("Error toggling promotion status:", error);
//     }
//   };

//   // Remove a promotion
//   const handleRemovePromotion = async (promotionId: string) => {
//     try {
//       await removePromotion(promotionId);
//       const updatedPromotions = await fetchPromotions();
//       setPromotions(updatedPromotions);
//     } catch (error) {
//       console.error("Error removing promotion:", error);
//     }
//   };

//   if (isLoading) {
//     return <div className="container mx-auto p-6">Loading promotions...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Manage Promotions</h1>

//       {/* Promotions List */}
//       <div className="space-y-8">
//         {promotions.map((promotion, index) => (
//           <div key={promotion.id}>
//             {/* Promotion Card */}
//             <Card className="shadow-md rounded-lg border border-gray-200">
//               <OfferTemplate
//                 id={promotion.id}
//                 title={promotion.title}
//                 description={promotion.description}
//                 imageUrl={promotion.imageUrl || ""}
//               />
//               <CardContent className="pt-4">
//                 <div className="flex justify-between items-center mt-4">
//                   <Badge variant={promotion.active ? "default" : "secondary"}>
//                     {promotion.active ? "نشط" : "غير نشط"}
//                   </Badge>
//                   <div className="flex items-center gap-2">
//                     <Switch
//                       checked={promotion.active}
//                       onCheckedChange={(checked) =>
//                         handleToggleStatus(promotion.id, checked)
//                       }
//                     />
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => handleRemovePromotion(promotion.id)}
//                     >
//                       <Trash2 />
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Controls Below the Card */}

//             {/* Separator Between Cards */}
//             {index < promotions.length - 1 && (
//               <hr className="border-t border-gray-200 my-6" />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
