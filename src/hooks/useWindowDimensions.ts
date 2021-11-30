import { useState, useEffect } from 'react';

interface IWindow {
  width: number;
  height: number;
}

function getWindowDimensions(): IWindow {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions(): IWindow {
  const [windowDimensions, setWindowDimensions] = useState<IWindow>(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
