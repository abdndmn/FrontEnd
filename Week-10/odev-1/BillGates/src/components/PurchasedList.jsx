import React from "react";

function PurchasedList({ products, purchases }) {
  const purchasedItems = products.filter(p => purchases[p.id] > 0);

  if (purchasedItems.length === 0) return null;

  return (
    <div>
      <h2>Purchased Items</h2>
      <ul>
        {purchasedItems.map((product) => (
          <li key={product.id}>
            {purchases[product.id]} x {product.name} = $
            {(product.price * purchases[product.id]).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PurchasedList;
