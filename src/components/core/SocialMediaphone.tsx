import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Battery,
  Wifi,
  Heart,
  ThumbsUp,
  Send,
  Play,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  ArrowLeft,
  Camera,
  Video,
  Image,
  CheckCheck,
  Phone,
} from 'lucide-react';

const SocialMediaPhone = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    { type: 'whatsapp', name: 'WhatsApp', color: '#25D366' },
    { type: 'facebook', name: 'Facebook', color: '#1877F2' },
    { type: 'youtube', name: 'YouTube', color: '#FF0000' },
    { type: 'instagram', name: 'Instagram', color: '#E4405F' },
    { type: 'twitter', name: 'Twitter/X', color: '#000000' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen(prev => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentScreenData = screens[currentScreen];

  const WhatsAppScreen = () => (
    <div className="h-full bg-background flex flex-col">
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        <ArrowLeft className="w-5 h-5" />
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-[#075E54] font-bold">
          TM
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-white">TravelMate Support</p>
          <p className="text-xs opacity-80 text-white">Online</p>
        </div>
        <Video className="w-5 h-5" />
        <Phone className="w-5 h-5" />
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="flex justify-center">
          <span className="text-xs  px-3 py-1 rounded-full ">
            Today
          </span>
        </div>

        <div className="flex gap-2">
          <div className="bg-background rounded-lg p-3 max-w-[70%] shadow-lg">
            <p className="text-sm">Hi! Welcome to TravelMate</p>
            <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="bg-background rounded-lg p-3 max-w-[70%] shadow-lg">
            <p className="text-sm">How can we help plan your adventure?</p>
            <p className="text-xs text-gray-500 mt-1">10:31 AM</p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <div className="bg-[#DCF8C6] rounded-lg p-3 max-w-[70%] shadow">
            <p className="text-sm text-black">I'd love to explore Bali!</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <p className="text-xs text-gray-600">10:32 AM</p>
              <CheckCheck className="w-4 h-4 text-[#53BDEB]" />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="bg-background rounded-lg p-3 max-w-[70%] shadow">
            <p className="text-sm">
              Great choice! We have amazing packages for Bali
            </p>
            <p className="text-xs text-gray-500 mt-1">10:33 AM</p>
          </div>
        </div>
      </div>

      <div className="bg-background p-3 flex items-center gap-2 border-t">
        <Camera className="w-5 h-5 text-gray-500" />
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-foreground text-sm outline-none w-full"
          />
        </div>
        <Send className="w-5 h-5 text-[#075E54]" />
      </div>
    </div>
  );

  const FacebookScreen = () => (
    <div className="h-full bg-background flex flex-col">
      <div className="bg-background px-4 py-3">
        <h1 className="text-xl font-bold text-[#1877F2]">facebook</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              TM
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">TravelMate</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>

          <p className="text-sm mb-3">
            Discover paradise in Bali! Book now and get 20% off. Limited offer!
            <span className="text-[#1877F2]"> #TravelMate #Bali</span>
          </p>
        
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800"
            alt="Bali"
            className="w-full rounded-lg"
          />

          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-[#1877F2] fill-[#1877F2]" />
              <span className="text-xs text-gray-600">2.3K</span>
            </div>
            <span className="text-xs text-gray-600">156 comments</span>
          </div>

          <div className="flex items-center justify-around mt-3 pt-3 border-t">
            <button className="flex items-center gap-2 text-gray-600">
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Comment</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600">
              <Share2 className="w-5 h-5" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const YouTubeScreen = () => (
    <div className="h-full bg-white flex flex-col">
      <div className="bg-white px-4 py-3 border-b flex items-center gap-2">
        <Play className="w-6 h-6 text-red-600 fill-red-600" />
        <span className="font-bold text-lg">YouTube</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800"
            alt="Travel"
            className="w-full aspect-video object-cover"
          />7
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs">
            15:42
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2">
            Top 10 Travel Destinations 2024 | TravelMate Guide
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
            <span>524K views</span>
            <span>•</span>
            <span>1 day ago</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              TM
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">TravelMate</p>
              <p className="text-xs text-gray-600">1.2M subscribers</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Subscribe
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">42K</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const InstagramScreen = () => (
    <div className="h-full bg-white flex flex-col">
      <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
        <h1 className="font-bold text-xl">TravelMate</h1>
        <div className="flex gap-4">
          <Heart className="w-6 h-6" />
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3 flex items-center gap-3 border-b">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                TM
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">travelmate_official</p>
            <p className="text-xs text-gray-600">Bali, Indonesia</p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800"
          alt="Post"
          className="w-full aspect-square object-cover"
        />

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-4">
              <Heart className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
              <Send className="w-6 h-6" />
            </div>
            <Bookmark className="w-6 h-6" />
          </div>

          <p className="font-semibold text-sm mb-2">15,234 likes</p>
          <p className="text-sm">
            <span className="font-semibold">travelmate_official</span> Paradise
            found in Bali
            <span className="text-gray-500"> #Bali #Travel</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">2 HOURS AGO</p>
        </div>
      </div>
    </div>
  );

  const TwitterScreen = () => (
    <div className="h-full bg-white flex flex-col">
      <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">𝕏</span>
        </div>
        <h1 className="font-bold text-lg">For You</h1>
        <div className="w-8 h-8" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              TM
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">TravelMate</span>
                <span className="text-gray-500 text-sm">@travelmate · 3h</span>
              </div>

              <p className="text-sm mb-3">
                Ready for your next adventure? Discover hidden gems with
                TravelMate! AI-powered planning, curated experiences, 24/7
                support. Start exploring today!
              </p>

              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800"
                alt="Travel"
                className="w-full rounded-2xl border"
              />

              <div className="flex items-center justify-between mt-3 text-gray-600">
                <button className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">342</span>
                </button>
                <button className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">1.2K</span>
                </button>
                <button className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">5.4K</span>
                </button>
                <Bookmark className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreenData.type) {
      case 'whatsapp':
        return <WhatsAppScreen />;
      case 'facebook':
        return <FacebookScreen />;
      case 'youtube':
        return <YouTubeScreen />;
      case 'instagram':
        return <InstagramScreen />;
      case 'twitter':
        return <TwitterScreen />;
      default:
        return <WhatsAppScreen />;
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />

      <div className="relative w-[360px] h-[720px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
        <div className="w-full h-full m-0 rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 z-20 bg-background backdrop-blur-sm">
            <div className="flex justify-between items-center px-6 py-3">
              <span className="text-sm font-semibold">9:41</span>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="h-full pt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {screens.map((_, idx) => (
              <motion.div
                key={idx}
                animate={{
                  scale: idx === currentScreen ? 1.2 : 1,
                  opacity: idx === currentScreen ? 1 : 0.4,
                }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: screens[idx].color }}
              />
            ))}
          </div>

          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full z-30" />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPhone;
