import React, { useState, useEffect } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
export { ConfettiCannon };

export const Confetti = ({ shot }) => {
  const [oldShot, setOldShot] = useState(!shot);

  useEffect(() => {
    setOldShot(shot);
  }, [shot, setOldShot]);
  return (
    <>
      {shot === oldShot && (
        <>
          <ConfettiCannon
            count={100}
            origin={{ x: 0, y: 0 }}
            fadeOut={true}
            autoStartDelay={10}
            explosionSpeed={2000}
            fallSpeed={3000}
            colors={['#fad67f', '#e0ad42', '#ffeb77', '#ae0217']}
          />
          <ConfettiCannon
            count={100}
            origin={{ x: 400, y: 0 }}
            fadeOut={true}
            autoStartDelay={10}
            explosionSpeed={2000}
            fallSpeed={3000}
            colors={['#fad67f', '#e0ad42', '#ffeb77', '#ae0217']}
          />
        </>
      )}
    </>
  );
};
