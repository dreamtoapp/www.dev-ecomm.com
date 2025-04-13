// "use client";

import React from "react";
import { Separator } from "@/components/ui/separator";

import QuickLinks from "./QuickLinks";
import Newsletter from "./Newsletter";
import SocialMedia from "./SocialMedia";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import AboutUs from "./AboutUs";

interface FooterProps {
  aboutus?: string;
  email?: string;
  phone?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  companyName?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;

}

const Footer = ({
  aboutus,
  email,
  phone,
  address,
  latitude,
  longitude,
  facebook,
  instagram,
  twitter,
  linkedin,
  companyName
}: FooterProps) => {

  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AboutUs aboutus={aboutus} companyName={companyName} />
          <QuickLinks />
          <ContactInfo
            email={email}
            phone={phone}
            address={address}
            latitude={latitude}
            longitude={longitude}
          />

          <Newsletter />
        </div>

        <Separator className="my-6" />

        <SocialMedia facebook={facebook}
          instagram={instagram}
          twitter={twitter}
          linkedin={linkedin} />

        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
