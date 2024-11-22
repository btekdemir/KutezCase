import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(0); // Group index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const visibleCount = 4; // Number of items visible at a time

  useEffect(() => {
    // Fetch products from the backend
    fetch("https://kutez-6f23a344b049.herokuapp.com/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSlideChange = (index) => {
    setCurrentGroup(index); // Update the current group index when the carousel changes
  };

  const handleSliderChange = (value) => {
    setCurrentGroup(value); // Update group index when the slider changes
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  // Total groups for the slider
  const totalGroups = Math.ceil(products.length / visibleCount);

  return (
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <h1
        style={{
          fontFamily: "Avenir Book, sans-serif",
          fontSize: "36px",
          fontWeight: "normal",
          marginTop: "100px",
          marginBottom: "50px",
        }}
      >
        Product List
      </h1>

      {/* Carousel */}
      <div style={{ position: "relative", width: "100%" }}>
        <Carousel
          showThumbs={false}
          infiniteLoop={false}
          swipeable
          showStatus={false}
          useKeyboardArrows
          emulateTouch
          centerMode={false} // Disable centering to prevent partial items
          selectedItem={currentGroup} // Sync carousel with slider
          onChange={handleSlideChange}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                onClick={onClickHandler}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "15px",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ❮
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                onClick={onClickHandler}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ❯
              </button>
            )
          }
          showIndicators={false}
        >
          {Array.from({ length: totalGroups }, (_, groupIndex) => (
            <div
              key={groupIndex}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {products
                .slice(
                  groupIndex * visibleCount,
                  groupIndex * visibleCount + visibleCount
                )
                .map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>
          ))}
        </Carousel>

        {/* Custom Sliding Bar */}
        <div
          style={{
            position: "relative",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <style>
            {`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 200px; /* Increase width 2x */
                height: 10px; /* Match height to the sliding frame */
                background: #888; /* Thumb color */
                border-radius: 5px; /* Rounded corners */
                cursor: pointer;
              }
              input[type="range"]::-moz-range-thumb {
                width: 200px; /* Increase width 2x */
                height: 10px; /* Match height to the sliding frame */
                background: #888; /* Thumb color */
                border-radius: 5px; /* Rounded corners */
                cursor: pointer;
              }
              input[type="range"]::-ms-thumb {
                width: 200px; /* Increase width 2x */
                height: 10px; /* Match height to the sliding frame */
                background: #888; /* Thumb color */
                border-radius: 5px; /* Rounded corners */
                cursor: pointer;
              }
            `}
          </style>
          <input
            type="range"
            min="0"
            max={totalGroups - 1} // Number of groups
            value={currentGroup}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            style={{
              width: "80%",
              appearance: "none",
              height: "10px",
              borderRadius: "5px",
              background: "linear-gradient(to right, #d3d3d3, #999)",
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
