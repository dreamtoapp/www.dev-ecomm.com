"use client";
import dynamic from "next/dynamic";
import React from "react";

const SkeletonLoader = () => <div className="animate-pulse">Loading...</div>;

const CategoryList = dynamic(() => import("../homepage/component/category/CategoryList"), {
  loading: SkeletonLoader,
});
const CheckUserActivation = dynamic(() => import("../homepage/component/CheckUserActivation"), {
  loading: SkeletonLoader,
});
const CheckUserLocation = dynamic(() => import("../homepage/component/CheckUserLocation"), {
  loading: SkeletonLoader,
});

// Props for each wrapper
export function CategoryListClient(props: React.ComponentProps<typeof CategoryList>) {
  return <CategoryList {...props} />;
}

export function CheckUserActivationClient(props: React.ComponentProps<typeof CheckUserActivation>) {
  return <CheckUserActivation {...props} />;
}

export function CheckUserLocationClient(props: React.ComponentProps<typeof CheckUserLocation>) {
  return <CheckUserLocation {...props} />;
}
