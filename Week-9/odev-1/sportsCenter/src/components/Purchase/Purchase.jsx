import React from "react";

const Purchase = () => {
  const products = [
    {
      name: "Kettlebell / 5kg",
      price: "59,99$",
      originalPrice: "89,99$",
      image: "/images/purchase1.jpg",
    },
    {
      name: "Treadmill / 5kg",
      price: "599,99$",
      originalPrice: "899,99$",
      image: "/images/purchase2.jpg",
    },
    {
      name: "Adjustable Dumbbell",
      price: "59,99$",
      originalPrice: "89,99$",
      image: "/images/purchase4.jpg",
    },
    {
      name: "KettleBell / 3kg",
      price: "599,99$",
      originalPrice: "899,99$",
      image: "/images/purchase3.jpg",
    },
  ];

  return (
    <div className="purchase">
      <div className="purchase-container">
        <h2>PURCHASE FROM US</h2>
        <div className="line"></div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus odit aut iste. Amet consectetur adipisicing elit
        </p>
        <div className="equipment-container">
          {products.map((product, index) => (
            <div className="equipment-card" key={index}>
              <img src={product.image} alt={product.name} />
              <div className="card-layer">
                <h4>{product.name}</h4>
                <p>
                  <span>{product.originalPrice}</span> / {product.price}
                </p>
                <p>
                  <i className="fa-cart-shopping"></i>Add To Cart
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Purchase;