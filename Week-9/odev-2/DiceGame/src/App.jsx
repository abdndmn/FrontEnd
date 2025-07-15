import { useState } from 'react';
import './App.css';

import dice1 from './assets/dice1.png';
import dice2 from './assets/dice2.png';
import dice3 from './assets/dice3.png';
import dice4 from './assets/dice4.png';
import dice5 from './assets/dice5.png';
import dice6 from './assets/dice6.png';

function App() {
  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

  const [image, setNewImage] = useState(diceImages[0]);
  const [image2, setNewImage2] = useState(diceImages[1]);
  const [message, setMessage] = useState('Welcome Dice Game! 🎲');
  const [rolling, setRolling] = useState(false);
  const [player1Name, setPlayer1Name] = useState('Change Name');

  const rollDice = () => {
    setRolling(true);

    const intervalId = setInterval(() => {
      const randomNum1 = Math.floor(Math.random() * 6);
      const randomNum2 = Math.floor(Math.random() * 6);
      setNewImage(diceImages[randomNum1]);
      setNewImage2(diceImages[randomNum2]);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);

      const finalNum1 = Math.floor(Math.random() * 6);
      const finalNum2 = Math.floor(Math.random() * 6);

      setNewImage(diceImages[finalNum1]);
      setNewImage2(diceImages[finalNum2]);

      console.log(finalNum1, finalNum2);

      if (finalNum1 > finalNum2) {
        setMessage(`${player1Name} Wins! 🏆`);
      } else if (finalNum1 < finalNum2) {
        setMessage('PC Wins! 🏆');
      } else {
        setMessage("It's a Draw! 🤝");
      }

      setRolling(false);
    }, 2000);
  };

  return (
    <div className="App handlee-regular pt-5">
      <center>
        <h1 className="pt-5 draw">{message}</h1>

        <div className="container pt-5">
          <div className="row justify-content-center pt-5">
            <div className="col-2 ps-5 ms-2 playerC">
              {player1Name}
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="form-control mt-2"
                style={{ textAlign: 'center' }}
              />
            </div>

            <div className="col-3 ps-5 playerC">Player 2 (PC)</div>
          </div>

          <div className="pt-4">
            <img className="square" src={image} alt="Player 1 Dice" />
            <div style={{ width: '5px', display: 'inline-block' }}></div>
            <img className="square" src={image2} alt="Player 2 Dice" />
          </div>
        </div>

        <div className="pt-4">
          <button
            style={{
              backgroundColor: '#00CB96',
              borderColor: '#00CB96',
              height: '6vh',
            }}
            type="button"
            onClick={rollDice}
            className="btn btn-light w-25"
            disabled={rolling}
          >
            <i className="bi bi-shuffle" style={{ color: 'white' }}></i>
          </button>
        </div>

        <div className="pt-5">www🎲 Dicee Game 🎲com</div>
      </center>
    </div>
  );
}

export default App;
