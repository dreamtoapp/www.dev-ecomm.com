"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Bell,
  Mail,
  Newspaper,
  Package,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { toast } from 'sonner';

import { pusherClient } from '@/lib/pusherSetting';
import { cn } from '@/lib/utils';

import { Button } from '../../../../../components/ui/button';
import { notifcationMsg } from './action/msgCounter';
import NotifyDialog from './action/NotifyDiaolg';

export default function PusherNotify() {
  const [msgCounter, setMsgCounter] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const channelRef = useRef(pusherClient.subscribe("admin"));
  const hasInteracted = useRef(false);
  const isAudioEnabledRef = useRef(isAudioEnabled);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    isAudioEnabledRef.current = isAudioEnabled;
  }, [isAudioEnabled]);

  useEffect(() => {
    const audio = new Audio('/notification.mp3');
    audioRef.current = audio;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = useCallback(async () => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);

    if (newState && !hasInteracted.current) {
      try {
        await audioRef.current?.play();
        audioRef.current?.pause();
        hasInteracted.current = true;
      } catch (err) {
        console.error('Audio initialization failed:', err);
        toast.error('Click to enable audio');
        setIsAudioEnabled(false);
      }
    }
  }, [isAudioEnabled]);

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

  const handleNewOrder = useCallback((data: { message: string; type?: string }) => {
    console.log('New order data:', data); // Debugging: Log the data object

    setMsgCounter(prev => prev + 1);

    if (isAudioEnabledRef.current && hasInteracted.current && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.warn);
    }

    // Determine the icon and background color based on the message type
    const { icon, bgColor } = (() => {
      switch (data.type) {
        case 'order':
          return {
            icon: <Package className="w-4 h-4 animate-bounce" />,
            bgColor: 'bg-gradient-to-r from-green-500 to-green-700',
          };
        case 'contact':
          return {
            icon: <Mail className="w-4 h-4 animate-bounce" />,
            bgColor: 'bg-gradient-to-r from-blue-500 to-blue-700',
          };
        case 'news':
          return {
            icon: <Newspaper className="w-4 h-4 animate-bounce" />,
            bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-700',
          };
        default:
          console.warn('Unknown message type:', data.type); // Debugging: Warn about unknown types
          return {
            icon: <Bell className="w-4 h-4 animate-bounce" />,
            bgColor: 'bg-gradient-to-r from-gray-500 to-gray-700',
          };
      }
    })();

    toast.success(
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-white">{data.message}</span>
      </div>,
      {
        duration: 5000,
        position: 'top-right',
        className: `border-0 shadow-lg ${bgColor}`, // Apply dynamic background color
      }
    );
  }, []);

  useEffect(() => {
    const channel = channelRef.current;
    channel.bind("new-order", handleNewOrder);
    return () => {
      channel.unbind("new-order", handleNewOrder);
      pusherClient.unsubscribe("admin");
    };
  }, [handleNewOrder]);

  return (
    <div className="fixed top-7 left-8 z-50 flex gap-3 items-center">
      {/* Audio Toggle */}
      <Button
        aria-label={isAudioEnabled ? "Mute notifications" : "Unmute notifications"}
        onClick={toggleAudio}
        size="icon"
        className={cn(
          "relative h-11 w-11 rounded-full transition-all",
          "bg-gradient-to-br hover:scale-105",
          isAudioEnabled
            ? "from-green-400 to-teal-500 hover:shadow-green-400/30"
            : "from-red-400 to-pink-500 hover:shadow-red-400/30",
          "shadow-lg hover:shadow-md"
        )}
      >
        {isAudioEnabled ? (
          <Volume2 className="w-5 h-5 animate-fade-in" />
        ) : (
          <VolumeX className="w-5 h-5 animate-fade-in" />
        )}
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full border border-gray-200" />
      </Button>

      {isOpen && <NotifyDialog counter={100} isOpen={isOpen}
        setIsOpen={setIsOpen} />}

      {/* Notifications Bell */}
      <Button
        aria-label="Notifications"
        size="icon"
        className={cn(
          "relative h-11 w-11 rounded-full transition-all",
          "bg-gradient-to-br from-purple-500 to-pink-500",
          "hover:scale-105 hover:from-purple-600 hover:to-pink-600",
          "shadow-lg hover:shadow-purple-400/30"
        )}
        onClick={() => { setIsOpen(true) }}
      >
        <Bell className="w-5 h-5" />
        {msgCounter > 0 && (
          <span className={cn(
            "absolute -top-1 -right-1 bg-red-500 text-white text-xs",
            "font-bold rounded-full w-5 h-5 flex items-center justify-center",
            "animate-ping-once"
          )}>
            {Math.min(msgCounter, 99)}{msgCounter > 99 && '+'}
          </span>
        )}
      </Button>
    </div>
  );
}