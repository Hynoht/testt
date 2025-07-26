'use client'; 

import { useEffect, useState } from 'react';
import lottie from 'lottie-web';


const LottieAnimation = ({
  animationData,
  size = 300, 
  loop = true, 
  autoplay = true, 
  speed = 1, 
  onComplete = null,
  controls = false,
}) => {
  const [animationInstance, setAnimationInstance] = useState(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById('lottie'),
      animationData: animationData,
      renderer: 'svg',
      loop: loop,
      autoplay: autoplay,
      speed: speed,
      onComplete: onComplete,
    });

    setAnimationInstance(animation);

    return () => animation.destroy();
  }, [animationData, loop, autoplay, speed, onComplete]);

  const playAnimation = () => {
    if (animationInstance) {
      animationInstance.play();
    }
  };

  const stopAnimation = () => {
    if (animationInstance) {
      animationInstance.stop();
    }
  };

  const restartAnimation = () => {
    if (animationInstance) {
      animationInstance.stop();
      animationInstance.goToAndStop(0, true);
      animationInstance.play();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        id="lottie"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></div>

      {controls && (
        <div className="mt-4">
          <button
            onClick={playAnimation}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400 transition mr-2"
          >
            Play
          </button>
          <button
            onClick={stopAnimation}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-400 transition mr-2"
          >
            Stop
          </button>
          <button
            onClick={restartAnimation}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default LottieAnimation;
