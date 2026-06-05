import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  clothingItems,
  handleCardClick,
  onLogOut,
  onProfileChange,
}) {
  return (
    <section className="profile">
      <SideBar onLogOut={onLogOut} onProfileChange={onProfileChange} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}
