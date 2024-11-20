import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current carousel position
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the backend
    fetch("http://127.0.0.1:8000/products")
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
    setCurrentIndex(index); // Update the current index when the slider moves
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      {/* Header */}
      <h1
        style={{
          fontFamily: "Avenir Book, sans-serif",
          fontSize: "36px",
          fontWeight: "normal", // No bold
          marginTop: "100px",
          marginBottom: "50px", // Space between header and carousel
        }}
      >
        Product List
      </h1>

      {/* Carousel */}
      <div style={{ position: "relative", width: "100%" }}>
        <Carousel
          showThumbs={false}
          infiniteLoop={false} // Ensure we stop at the last slide
          swipeable
          showStatus={false}
          useKeyboardArrows
          emulateTouch
          centerMode
          centerSlidePercentage={25} // Each slide takes 25% of the width (4 products visible)
          dynamicHeight={false}
          selectedItem={currentIndex} // Sync with slider position
          onChange={handleSlideChange} // Update the currentIndex when the carousel changes
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
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
          renderArrowNext={(onClickHandler, hasNext, label) =>
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
          showIndicators={false} // Disable default indicators
        >
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                padding: "0 10px", // Margin between images
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </Carousel>

        {/* Custom Slider */}
        <div
  style={{
    position: "relative",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {/* Inline <style> for Thumb */}
  <style>
    {`
      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        width: 200px; /* Increased width (4 times larger) */
        height: 10px; /* Reduced height to fit the slider */
        background: #888; /* Thumb color */
        border-radius: 5px; /* Slightly rounded corners */
        cursor: pointer;
      }
      input[type="range"]::-moz-range-thumb {
        width: 200px; /* Increased width (4 times larger) */
        height: 10px; /* Reduced height to fit the slider */
        background: #888; /* Thumb color */
        border-radius: 5px; /* Slightly rounded corners */
        cursor: pointer;
      }
      input[type="range"]::-ms-thumb {
        width: 200px; /* Increased width (4 times larger) */
        height: 10px; /* Reduced height to fit the slider */
        background: #888; /* Thumb color */
        border-radius: 5px; /* Slightly rounded corners */
        cursor: pointer;
      }
    `}
  </style>
  <input
    type="range"
    min="0"
    max={products.length - 4}
    value={currentIndex}
    onChange={(e) => handleSlideChange(Number(e.target.value))}
    style={{
      width: "80%",
      appearance: "none",
      height: "10px",
      borderRadius: "5px",
      background: "linear-gradient(to right, #d3d3d3, #999)", // Slider track
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
