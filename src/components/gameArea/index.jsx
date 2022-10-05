import React, { useEffect, useState } from "react";
import Card from "../card";
import "./index.css";

const cards = [
  { src: "img/debian.png" },
  { src: "img/fedora.png" },
  { src: "img/freebsd.png" },
  { src: "img/mint.png" },
  { src: "img/redhat.png" },
  { src: "img/ubuntu.png" },
];

function GameArea() {
  const [cardState, setCardState] = useState();
  const [disable, setDisable] = useState(false);
  const [fliped, setFliped] = useState([]);
  const [guessed, setGuessed] = useState(0);

  const shufle = () => {
    let cardArr = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card, id) => ({ ...card, id, guessed: false }));

    setFliped([]);
    setGuessed(0);
    setCardState(cardArr);
  };

  const cardIsGuessed = (first) => {
    let newArr = cardState.map((item) => {
      if (item.src === first) {
        item.guessed = true;
      }
      return item;
    });

    setCardState(newArr);
    setGuessed((guessed) => guessed + 1);
  };

  const nextTurn = () => {
    setTimeout(() => {
      setFliped([]);
      setDisable(false);
    }, 1000);
  };

  const check = () => {
    if (fliped.length === 2) {
      setDisable(true);
      let first = cardState[fliped[0]].src;
      let second = cardState[fliped[1]].src;

      if (first === second) {
        cardIsGuessed(first);
      }

      nextTurn();
    }
  };

  const flipCard = (card) => {
    console.log(card)
    if (!fliped.includes(card) && !cardState[card].guessed) setFliped([...fliped, card]);
  };

  useEffect(() => check(), [fliped]);

  
  return (
    <>
      <button onClick={shufle}>{cardState ? "Restart" : "Start"}</button>
      <h1>
        {guessed === cards.length
          ? "You Won"
          : cardState
          ? `Left ${cards.length - guessed}`
          : "Card Match Game"}
      </h1>
      {cardState && (
        <div className="game-area">
          {cardState.map((card) => (
            <Card
              key={card.id}
              card={card.src}
              id={card.id}
              fliped={fliped.includes(card.id) || cardState[card.id].guessed}
              flipCard={flipCard}
              disable={disable}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default GameArea;
