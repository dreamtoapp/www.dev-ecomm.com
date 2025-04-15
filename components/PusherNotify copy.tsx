"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Bell,
  Volume2,
  VolumeX,
} from 'lucide-react'; // Import icons for toggle
import { toast } from 'sonner';

import { pusherClient } from '@/lib/pusherSetting';

import {
  notifcationMsg,
} from '../app/dashboard/(dashboard)/component/pusherNotifaction/action/msgCounter';
import { Button } from './ui/button';

export default function PusherNotify() {
  const [msgCounter, setMsgCounter] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const channelRef = useRef(pusherClient.subscribe("admin"));
  const hasInteracted = useRef(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false); // Default to disabled
  const isAudioEnabledRef = useRef(isAudioEnabled); // Ref to track audio state

  // Sync the ref with the state
  useEffect(() => {
    isAudioEnabledRef.current = isAudioEnabled;
  }, [isAudioEnabled]);

  // Audio initialization
  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // Toggle audio enable/disable
  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
    if (!hasInteracted.current && audioRef.current) {
      hasInteracted.current = true;
      // Play/pause to unlock audio for future use
      audioRef.current.play().catch(() => { }).finally(() => {
        audioRef.current?.pause();
      });
    }
  };

  // Fetch initial notification count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await notifcationMsg();
        setMsgCounter(count);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchCount();
  }, []);

  // Pusher event handler
  const handleNewOrder = useCallback((data: { message: string }) => {
    setMsgCounter(prev => prev + 1);

    // Play sound only if audio is enabled
    if (isAudioEnabledRef.current && hasInteracted.current && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn('Audio playback failed:', err);
      });
    }

    toast.success(
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-white">{data.message}</span>
      </div>,
      {
        duration: 5000,
        position: 'top-right',
        className: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
        icon: <Bell className="w-5 h-5 animate-bounce" />,
      }
    );
  }, []); // No dependency on `isAudioEnabled`

  // Pusher subscription management
  useEffect(() => {
    const channel = channelRef.current;
    channel.bind("new-order", handleNewOrder);

    return () => {
      channel.unbind("new-order", handleNewOrder);
      pusherClient.unsubscribe("admin");
    };
  }, [handleNewOrder]); // `handleNewOrder` is stable

  return (
    <div className="fixed top-7 left-8 z-50 space-y-4">
      {/* Audio Toggle Button */}
      <Button
        aria-label={isAudioEnabled ? "Disable Audio" : "Enable Audio"}
        onClick={toggleAudio}
        className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-lg px-4 py-2 shadow-md transition-transform hover:scale-105 flex items-center gap-2"
      >
        {isAudioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        {isAudioEnabled ? "Disable Audio" : "Enable Audio"}
      </Button>

      {/* Notifications Button */}
      <Button
        aria-label="Notifications"
        className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full p-3 shadow-lg transition-transform hover:scale-105"
      >
        <Bell className="w-6 h-6" />
        {msgCounter > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {Math.min(msgCounter, 99)}{msgCounter > 99 && '+'}
          </span>
        )}
      </Button>
    </div>
  );
}