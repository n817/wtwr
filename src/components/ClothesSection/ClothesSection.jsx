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
        <h3 className="clothes__title">Your items</h3>
        <button className="clothes__add-button">+ Add new</button>
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
