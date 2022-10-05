import "./index.css";

function Card({ card, fliped, flipCard, id, disable }) {
  const handleClick = () => {
    if (!disable) flipCard(id);
  };
  return (
    <div className="card" onClick={handleClick}>
      <img src={fliped ? card : "img/tux.png"} alt="card" />
    </div>
  );
}

export default Card;
