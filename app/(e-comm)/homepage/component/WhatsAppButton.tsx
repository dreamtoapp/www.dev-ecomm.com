"use client"; // Mark as a Client Component

import {
  useEffect,
  useState,
} from 'react'

import { FaWhatsapp } from 'react-icons/fa' // Import WhatsApp icon

export default function WhatsAppButton({ whatsapp }: { whatsapp?: string }) {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the user is on a mobile device
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/iphone|ipad|ipod|android/.test(userAgent));
  }, []);

  // WhatsApp link with a welcome message
  const phoneNumber = whatsapp; // Replace with your WhatsApp number
  const welcomeMessage = "Hello! I need help with my order."; // Replace with your welcome message
  const whatsappLink = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      welcomeMessage
    )}`
    : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(welcomeMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
      >
        <FaWhatsapp className="w-8 h-8" /> {/* WhatsApp icon */}
      </a>
    </div>
  );
}
