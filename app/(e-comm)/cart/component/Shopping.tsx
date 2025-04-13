"use client";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";

function Shopping() {
  const router = useRouter();
  return (
    <div className="bg-white   shadow-lg p-4 flex justify-center z-50 rounded-b-3xl">
      <Button
        className="w-full max-w-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-transform duration-300 ease-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg py-3"
        onClick={() => router.push("/")}
      >
        متابعة التسوق
      </Button>
    </div>
  );
}

export default Shopping;
