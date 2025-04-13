// app/(ecommerce)/layout.tsx
import { TooltipProvider } from "../../components/ui/tooltip";
import { companyInfo } from "./homepage/actions/companyDetail";
import Fotter from "../../components/ecomm/Fotter/Fotter";
import Header from "../../components/ecomm/Header/Header";
import { auth } from "../../auth";
import getSession from "../../lib/getSession";

export default async function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const companyData = await companyInfo();
  // const session = await auth()
  const session = await getSession();

  return (
    <TooltipProvider>
      {/* Header is shared across all e-commerce pages */}
      <Header session={session} />
      <main className="container mx-auto p-4 min-h-screen">{children}</main>
      <Fotter
        companyName={companyData?.fullName}
        aboutus={companyData?.bio}
        email={companyData?.email}
        phone={companyData?.phoneNumber}
        address={companyData?.address}
        latitude={companyData?.latitude}
        longitude={companyData?.longitude}
        facebook={companyData?.facebook}
        instagram={companyData?.instagram}
        twitter={companyData?.twitter}
        linkedin={companyData?.linkedin}

      />
    </TooltipProvider>
  );
}
