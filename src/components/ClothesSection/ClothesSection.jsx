import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  weatherData,
  handleCardClick,
}) {
  return (
    <div className="clothes">
      <div className="clothes__row">
        <p>Text</p>
        <button>BUTTON</button>
      </div>
      <ul className="clothes__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
