import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Phone, Mic, Grid, VolumeX, PhoneOff, X, Volume2 } from 'lucide-react';
import {
  toggleCall,
  handleDial,
  clearDialedNumber,
  toggleKeypad,
  initiateCall,
  setCallWidgetState,
  receiveCall,
  endCall,
} from '@/store/callWidgetSlice';

export default function CallWidget(){
  const [isCallActive, setIsCallActive] = useState(false)
  const [isKeypadOpen, setIsKeypadOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleCall = () => {
    if (isCallActive) {
      setIsCallActive(false)
      setIsKeypadOpen(false)
      setPhoneNumber('')
    } else {
      setIsKeypadOpen(!isKeypadOpen)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAgent(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewAgent(prev => ({ ...prev, [name]: value }))
  }

  const handleAddAgent = (e) => {
    e.preventDefault()
    const id = agents.length + 1
    setAgents(prev => [...prev, { id, ...newAgent }])
    setNewAgent({ name: '', email: '', role: '', status: 'Active' })
    setIsDialogOpen(false)
  }

  const handleDeleteAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id))
  }

  const handleKeypadClick = (value) => {
    setPhoneNumber(prev => prev + value)
  }

  const handleClear = () => {
    setPhoneNumber(prev => prev.slice(0, -1))
  }

  const handleCall = () => {
    if (phoneNumber) {
      setIsCallActive(true)
      setIsKeypadOpen(false)
    }
  }

  const handleKeyDown = useCallback((e) => {
    if (isKeypadOpen && !isCallActive) {
      if (e.key >= '0' && e.key <= '9') {
        setPhoneNumber(prev => prev + e.key)
      } else if (e.key === 'Backspace') {
        setPhoneNumber(prev => prev.slice(0, -1))
      } else if (e.key === 'Enter') {
        handleCall()
      }
    }
  }, [isKeypadOpen, isCallActive])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8">
      <Button
        variant="primary"
        className={`rounded-full bg-green-500 text-white hover:bg-green-600 w-16 h-16 flex items-center justify-center shadow-lg ${isCallActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
        onClick={toggleCall}
      >
        {isCallActive ? <Phone className="w-8 h-8" /> : <Grid className="w-8 h-8" />}
      </Button>
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
              {/* <span className="text-xs mt-1">Mute</span> */}
            </Button>
            <Button
              variant="ghost"
              className="text-white flex flex-col items-center"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6 text-green-500" /> : <VolumeX className="w-6 h-6" />}
              {/* <span className="text-xs mt-1">Speaker</span> */}
            </Button>
            <Button
              variant="ghost"
              className="text-white flex flex-col items-center"
              onClick={() => {
                setIsCallActive(false)
                setPhoneNumber('')
              }}
            >
              <PhoneOff className="w-6 h-6 text-red-500" />
              {/* <span className="text-xs mt-1">End Call</span> */}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

