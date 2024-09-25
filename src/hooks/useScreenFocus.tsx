import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

// Hook personalizado para manejar el estado de enfoque de la pantalla
const useScreenFocus = () => {
  const isFocused = useIsFocused();
  const [screenFocused, setScreenFocused] = useState(isFocused);

  useEffect(() => {
    setScreenFocused(isFocused); // Actualizar el estado cuando cambia el enfoque
  }, [isFocused]);

  return screenFocused; // Retorna el estado actualizado
};

export default useScreenFocus;