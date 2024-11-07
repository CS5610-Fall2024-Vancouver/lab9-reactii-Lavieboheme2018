import React, { useState, useEffect } from 'react';

const PostProduct = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });

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

  // Function to add a new product
  const addProduct = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newProduct.title,
          price: parseFloat(newProduct.price),
          description: newProduct.description,
        }),
      });

      const addedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      setNewProduct({ title: '', price: '', description: '' }); // Reset the form
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  return (
    <div>
      <h1>Product List</h1>
      <h2>Add New Product</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newProduct.title}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={handleInputChange}
      />
      <button onClick={addProduct}>Add Product</button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.title}</strong>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostProduct;
