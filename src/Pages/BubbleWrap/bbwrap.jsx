import React, { useState } from 'react';
import './styleb.css';
import popSound from '../../assets/pop.mp3';

const Bbwrap = () => {
  const numBubbles = 100; // 5x5 grid
  const [poppedBubbles, setPoppedBubbles] = useState(Array(numBubbles).fill(false));

  const handlePop = (index) => {
    setPoppedBubbles((prev) => {
      const newBubbles = [...prev];
      if (!newBubbles[index]) {
        newBubbles[index] = true;
        new Audio(popSound).play(); // Play sound on first pop only
      }
      return newBubbles;
    });
  };

  const resetBubbles = () => {
    setPoppedBubbles(Array(numBubbles).fill(false)); // Reset all bubbles to unpopped state
  };

  return (
    <div className="App_bubble">
        <div className="bubble-container">
            <div className="reset-title">
                <h1>Bubble<br/> Bopple</h1>
                <div className="Test_border" onClick={resetBubbles}>Reset</div>
            </div>
        <div className="bubble-wrap">
            {Array.from({ length: numBubbles }).map((_, index) => (
            <div
                key={index}
                className={`bubble ${poppedBubbles[index] ? 'popped' : ''}`}
                onClick={() => handlePop(index)}
            >
                {poppedBubbles[index] && <span className="pop-animation">💥</span>}
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default Bbwrap;
