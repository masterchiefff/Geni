import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Phone, Mic, Grid, VolumeX, PhoneOff, X, Volume2 } from 'lucide-react';

export default function CallWidget() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  // Toggle keypad or call
  const toggleCall = () => {
    if (isCallActive) {
      setIsCallActive(false);
      setPhoneNumber('');
    } else {
      setIsKeypadOpen(!isKeypadOpen);  // Toggle keypad if no call active
    }
  };

  // Handle keypad click (append to phone number)
  const handleKeypadClick = (value: string) => {
    setPhoneNumber((prev) => prev + value);
  };

  // Clear the last digit from the phone number
  const handleClear = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  // Check if phone number is valid (example: must be 10 digits)
  const isValidPhoneNumber = (phone: string) => {
    return /^\d{10}$/.test(phone);
  };

  // Handle making the call
  const handleCall = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      setIsCallActive(true);
      setIsKeypadOpen(false);  // Close the keypad when the call starts
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  // Handle keyboard input for the number
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isKeypadOpen && !isCallActive) {
        if (e.key >= '0' && e.key <= '9') {
          setPhoneNumber((prev) => prev + e.key);
        } else if (e.key === 'Backspace') {
          setPhoneNumber((prev) => prev.slice(0, -1));
        } else if (e.key === 'Enter') {
          handleCall();
        }
      }
    },
    [isKeypadOpen, isCallActive]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8">
      {/* Call button */}
      <Button
        variant="primary"
        className={`rounded-full bg-green-500 text-white hover:bg-green-600 w-16 h-16 flex items-center justify-center shadow-lg ${isCallActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
        onClick={toggleCall}
      >
        {isCallActive ? <Phone className="w-8 h-8" /> : <Grid className="w-8 h-8" />}
      </Button>

      {/* Keypad for entering number */}
      {isKeypadOpen && !isCallActive && (
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white rounded-lg shadow-lg p-4 w-64">
          <div className="mb-4">
            <Input
              value={phoneNumber}
              readOnly
              className="text-right text-xl bg-gray-800 border-none text-white"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
              <Button
                key={key}
                variant="ghost"
                className="text-white text-xl h-12"
                onClick={() => handleKeypadClick(key)}
              >
                {key}
              </Button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="ghost" className="text-white" onClick={handleClear}>
              <X className="w-6 h-6" />
            </Button>
            <Button variant="primary" className="bg-green-500 hover:bg-green-600" onClick={handleCall}>
              <Phone className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Call in progress */}
      {isCallActive && (
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white rounded-lg shadow-lg p-4 w-64">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-400">Calling</p>
            <p className="text-xl font-bold">{phoneNumber}</p>
          </div>
          <div className="flex justify-around items-center">
            <Button
              variant="ghost"
              className="text-white flex flex-col items-center"
              onClick={() => setIsMuted(!isMuted)}
            >
              <Mic className={`w-6 h-6 ${isMuted ? 'text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              className="text-white flex flex-col items-center"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6 text-green-500" /> : <VolumeX className="w-6 h-6" />}
            </Button>
            <Button
              variant="ghost"
              className="text-white flex flex-col items-center"
              onClick={() => {
                setIsCallActive(false);
                setPhoneNumber('');
              }}
            >
              <PhoneOff className="w-6 h-6 text-red-500" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
