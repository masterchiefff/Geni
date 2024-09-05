import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState, AppDispatch } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Phone, Mic, Grid, VolumeX, PhoneOff } from 'lucide-react';
import {
  toggleCall,
  handleDial,
  clearDialedNumber,
  toggleKeypad,
  initiateCall,
  setCallWidgetState,
} from '@/store/callWidgetSlice';

const CallWidget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCallActive, isKeypadVisible, dialedNumber, isCalling } = useSelector(
    (state: RootState) => state.callWidget
  );

  const loadStateFromLocalStorage = () => {
    const savedState = JSON.parse(localStorage.getItem('callWidgetState') || '{}');
    dispatch(setCallWidgetState(savedState));
  };

  const saveStateToLocalStorage = () => {
    const state = {
      isCallActive,
      isKeypadVisible,
      dialedNumber,
      isCalling,
    };
    localStorage.setItem('callWidgetState', JSON.stringify(state));
  };

  // API Call: Dial Number
  const dialNumberApi = async (number: string) => {
    try {
      const response = await axios.post('/api/dial', { number });
      console.log('Dial response:', response.data);
    } catch (error) {
      console.error('Error dialing number:', error);
    }
  };

  // API Call: Initiate Call
  const initiateCallApi = async (number: string) => {
    try {
      const response = await axios.post('/api/call', { number });
      console.log('Call initiated:', response.data);
      dispatch(initiateCall());
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  };

  useEffect(() => {
    loadStateFromLocalStorage();
    const handleKeyDown = (event: KeyboardEvent) => {
      const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '#'];
      if (validKeys.includes(event.key)) {
        dispatch(handleDial(event.key));
        dialNumberApi(event.key);
      }

      if (event.key === 'Backspace') {
        dispatch(clearDialedNumber());
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    saveStateToLocalStorage();
  }, [isCallActive, isKeypadVisible, dialedNumber, isCalling]);

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8">
      {/* Main Call Button */}
      <Button
        variant="primary"
        className={`rounded-full bg-green-500 text-white hover:bg-green-600 w-16 h-16 flex items-center justify-center shadow-lg ${isCallActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
        onClick={() => dispatch(toggleCall())}
      >
        <Grid className="w-6 h-6" />
      </Button>

      {/* Expanded Call Area */}
      {isCallActive && (
        <div
          className={`absolute transition-all bottom-0 right-20 duration-500 ease-in-out bg-gray-900 text-white rounded-lg shadow-lg p-4 w-72 transform origin-bottom ${
            isCallActive ? 'scale-100' : 'scale-0'
          }`}
        >
          {!isCalling ? (
            <>
              {/* Keypad */}
              <div className="relative">
                {/* Keypad Screen */}
                <div className="bg-gray-700 rounded-lg p-2 text-center text-lg mb-4">
                  {dialedNumber || 'Enter number'}
                </div>

                {/* Keypad Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                    <Button
                      key={key}
                      variant="ghost"
                      className="bg-gray-800 text-white border border-gray-600 rounded-full py-4 flex items-center justify-center"
                      onClick={() => {
                        dispatch(handleDial(key));
                        dialNumberApi(key); 
                      }}
                    >
                      {key}
                    </Button>
                  ))}
                </div>

                {/* Call button */}
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    className="bg-gray-700 text-white w-full mr-2 rounded-full"
                    onClick={() => dispatch(clearDialedNumber())}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    className="bg-green-500 text-white w-full rounded-full"
                    onClick={() => initiateCallApi(dialedNumber)} // Send API request on call
                  >
                    <Phone className="w-5 h-5" />
                    <span className="ml-2">Call</span>
                  </Button>
                </div>

                {/* Controls at the bottom */}
                {/* <div className="flex justify-around items-center mt-4">
                  <Button
                    variant="ghost"
                    className="text-white rounded-full p-2 bg-gray-800"
                    onClick={() => dispatch(toggleKeypad())}
                  >
                    <Grid className="w-6 h-6" />
                  </Button>
                </div> */}
              </div>
            </>
          ) : (
            <>
              {/* Display Dialed Number & End Call */}
              <div className="text-center text-xl font-bold mb-4">Calling...</div>

              <div className="text-center text-xl mb-4">{dialedNumber || 'No dialed Number...'}</div>
              {/* Controls at the bottom */}
              <div className="flex justify-around items-center mt-4">
                <Button variant="ghost" className="text-white rounded-full p-2 bg-gray-800">
                  <Mic className="w-6 h-6" />
                </Button>
                <Button
                  variant="primary"
                  className="bg-red-500 text-white rounded-full flex items-center justify-center"
                  onClick={() => dispatch(toggleCall())}
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
                <Button variant="ghost" className="text-white rounded-full p-2 bg-gray-800">
                  <VolumeX className="w-6 h-6" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CallWidget;