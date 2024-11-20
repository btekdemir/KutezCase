import React, { useState } from "react";

function ProductCard({ product }) {
  const { name, price, popularityScore, images } = product;
  const [selectedColor, setSelectedColor] = useState("yellow");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Function to render stars based on the popularity score
  const renderStars = (score) => {
    const fullStars = Math.floor(score); // Number of full stars
    const halfStar = score % 1 !== 0; // Check if a half-star is needed
    const emptyStars = 5 - Math.ceil(score); // Remaining empty stars

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} style={{ color: "#E6CA97", fontSize: "18px" }}>
          ★
        </span>
      );
    }

    // Add half star if needed
    if (halfStar) {
      stars.push(
        <span key="half" style={{ color: "#E6CA97", fontSize: "18px" }}>
          ☆
        </span>
      );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: "#D9D9D9", fontSize: "18px" }}>
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "left", // Align all content to the left
        fontFamily: "Avenir Book, sans-serif",
        maxWidth: "300px", // Ensure a consistent card width
        margin: "auto", // Center the card horizontally in its parent
      }}
    >
      {/* Product Image */}
      <img
        src={images[selectedColor]}
        alt={`${name} - ${selectedColor}`}
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      {/* Product Details */}
      <h3
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "500", // Medium font
          fontSize: "15px",
          marginBottom: "5px",
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400", // Regular font
          fontSize: "15px",
          margin: "5px 0",
        }}
      >
        ${price} USD
      </p>

      {/* Color Picker */}
      <div style={{ margin: "10px 0", display: "flex", gap: "8px" }}>
        <button
          onClick={() => handleColorChange("yellow")}
          style={{
            backgroundColor: "#E6CA97",
            border: selectedColor === "yellow" ? "2px solid black" : "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        ></button>
        <button
          onClick={() => handleColorChange("white")}
          style={{
            backgroundColor: "#D9D9D9",
            border: selectedColor === "white" ? "2px solid black" : "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        ></button>
        <button
          onClick={() => handleColorChange("rose")}
          style={{
            backgroundColor: "#E1A4A9",
            border: selectedColor === "rose" ? "2px solid black" : "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        ></button>
      </div>
      <p
        style={{
          fontFamily: "Avenir Book, sans-serif",
          fontSize: "12px",
          color: "black", // Changed color to black
          marginBottom: "10px",
        }}
      >
        {selectedColor === "yellow"
          ? "Yellow Gold"
          : selectedColor === "white"
          ? "White Gold"
          : "Rose Gold"}
      </p>

      {/* Star Rating */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex" }}>{renderStars(popularityScore)}</div>
        <span
          style={{
            fontFamily: "Avenir Book, sans-serif",
            fontSize: "14px",
            color: "#333",
          }}
        >
          {popularityScore}/5
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
