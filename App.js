import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Clock from './app/screens/Clock';
import Effects from './app/screens/Effects';
import Emoji from './app/screens/Emoji';
// import PaintBoard from './app/screens/PaintBoard';
import PythoN from './app/screens/PythoN';
import PixelPebble from './app/screens/PixelPebble';
import Config from './app/screens/Config';
import Bt from './app/screens/Bt';
import WIP from './app/screens/WIP';
import ColorPallet from './app/Components/ColorPallet';

const Stack = createNativeStackNavigator();

export default function App() {

  // globalstate management
  const [userName, setUserName] = useState('');
  const [lampState, setLampState] = useState(false);
  const [ledColor, setColor] = useState('#ffffff');
  const [numberColor, setNumberColor] = useState('#ffffff');
  const [bgOrNumber, setBgOrNumber] = useState(false);
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [brushOn, setBrushOn] = useState(false);
  const [btStat, setBtStat] = useState(false);
  const initialState = [];
  const [ledArray, setLedArray] = useState(initialState);
  const [reRender, setReRender] = useState(false);
  const [screen, setScreen] = useState('');

  const GlobalState = {
    userName,
    setUserName,
    lampState,
    setLampState,
    ledColor,
    setColor,
    numberColor,
    setNumberColor,
    bgOrNumber,
    setBgOrNumber,
    brushColor,
    setBrushColor,
    brushOn,
    setBrushOn,
    ledArray,
    setLedArray,
    reRender,
    setReRender,
    screen,
    setScreen,
  };

  // navigation
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}}>
          {props => <Login {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="ColorPallet" options={{headerShown: false}}>
          {props => <ColorPallet {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Clock" options={{headerShown: false}}>
          {props => <Clock {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Effects" options={{headerShown: false}}>
          {props => <Effects {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Emoji" options={{headerShown: false}}>
          {props => <Emoji {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="WIP" options={{headerShown: false}}>
          {props => <WIP {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="PythoN" options={{headerShown: false}}>
          {props => <PythoN {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="PixelPebble" options={{headerShown: false}}>
          {props => <PixelPebble {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Config" options={{headerShown: false}}>
          {props => <Config {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Bt" options={{headerShown: false}}>
          {props => <Bt {...props} GlobalState={GlobalState} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
