import axios from "axios";
import { useState } from "react";

const useProducts = () => {
  const [productItem, setProductItem] = useState([]);

  const getProducts = async (input) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product?keywords=${input}`
      );
      console.log(response.data.data);
      setProductItem(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      if (productItem) {
        const newProducts = productItem.filter((item) => {
          return item.id !== productId;
        });
        setProductItem(newProducts);
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return {
    productItem,
    setProductItem,
    getProducts,
    deleteProduct,
  };
};

export default useProducts;
