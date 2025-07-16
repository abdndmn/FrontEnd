import React from "react";

function ProductCard({ product, quantity, onBuy, onSell, isBuyDisabled, isSellDisabled }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} width="120" />
      <h3>{product.name}</h3>
      <p>${product.price.toLocaleString()}</p>
      <div>
        <button onClick={() => onSell(product.id)} disabled={isSellDisabled}>
          Sell
        </button>
        <span> {quantity} </span>
        <button onClick={() => onBuy(product.id)} disabled={isBuyDisabled}>
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
