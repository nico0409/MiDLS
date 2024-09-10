import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';

const initialState = { status: AppState.currentState, foreground: true };

export const useAppState = () => {
  const [appState, setAppState] = useState(initialState);

  useEffect(() => {
    const appStateChange = (nextAppState:any) => {
      const newStatus = { ...appState, status: nextAppState };
      if (
        !(appState.status.match(/inactive|background/)
        || nextAppState === 'active')
      ) {
        newStatus.foreground = false;
      }
      setAppState(newStatus);
    }

    AppState.addEventListener('change', appStateChange);
    return () => {
      AppState.removeEventListener('change', appStateChange);
    };
  }, []);

  return appState;
};