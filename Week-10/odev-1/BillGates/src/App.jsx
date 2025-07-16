import React, { useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import PurchasedList from "./components/PurchasedList";

function App() {
  const [balance, setBalance] = useState(100000000000);
  const [purchases, setPurchases] = useState({});

  const handleBuy = (id) => {
    const product = products.find((p) => p.id === id);
    if (balance >= product.price) {
      setBalance(balance - product.price);
      setPurchases({ ...purchases, [id]: (purchases[id] || 0) + 1 });
    }
  };

  const handleSell = (id) => {
    if ((purchases[id] || 0) > 0) {
      const product = products.find((p) => p.id === id);
      setBalance(balance + product.price);
      setPurchases({ ...purchases, [id]: purchases[id] - 1 });
    }
  };

  return (
    <div className="app">
      <h1>Spend Bill Gates' Money</h1>
      <h2>Balance: ${balance.toLocaleString()}</h2>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={purchases[product.id] || 0}
            onBuy={handleBuy}
            onSell={handleSell}
            isBuyDisabled={balance < product.price}
            isSellDisabled={!purchases[product.id]}
          />
        ))}
      </div>

      <PurchasedList products={products} purchases={purchases} />
    </div>
  );
}

export default App;
