"use client";

import dynamic from 'next/dynamic';
import React from "react";

// Dynamic import for Map (potentially heavy component)
const Map = dynamic(() => import('../../GoogleMap'), {
  ssr: false,
  loading: () => <div>Loading map…</div>,
});

const ContactInfo = ({
  email,
  phone,
  address,
  latitude,
  longitude,
}: {
  email?: string;
  phone?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}) => {
  const hasMapData = latitude && longitude;

  return (
    <div className="text-center sm:text-right">
      <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
      <p className="text-muted-foreground text-sm">{email}</p>
      <p className="text-muted-foreground text-sm">{phone}</p>
      <p className="text-muted-foreground text-sm">{address}</p>
      {/* Professional Button to Open Dialog */}
      <Map latitude={latitude ? parseFloat(latitude) : null} longitude={longitude ? parseFloat(longitude) : null} />
    </div>
  );
};

export default ContactInfo;
