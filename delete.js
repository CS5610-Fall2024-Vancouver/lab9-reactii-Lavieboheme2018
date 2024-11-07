import React, { useState, useEffect } from 'react';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch initial list of products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to delete a product
  const deleteProduct = async (id) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });

      // Update local state to remove the deleted product
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.title}</span>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteProduct;
