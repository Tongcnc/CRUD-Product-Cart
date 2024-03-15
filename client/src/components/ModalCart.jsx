/* eslint-disable react/prop-types */
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";

function ModalCart({ product, setProduct }) {
  // delete (x)
  const deleteCart = (productId) => {
    const newProduct = [...product];
    newProduct.splice(productId, 1);
    setProduct(newProduct);
  };

  // Button (+)
  const addQuantity = (productId) => {
    const newProduct = [...product];
    if (newProduct[productId].quanityCart < newProduct[productId].quanity) {
      newProduct[productId].quanityCart = newProduct[productId].quanityCart + 1;
    }
    setProduct(newProduct);
  };

  // Button (-)
  const subtractQuantity = (productId) => {
    const newProduct = [...product];
    if (newProduct[productId].quanityCart > 0) {
      newProduct[productId].quanityCart = newProduct[productId].quanityCart - 1;
    }
    setProduct(newProduct);
  };

  // Total Price
  const totalPrice = product.reduce(
    (acconulator, currentValue) =>
      acconulator + currentValue.quanityCart * currentValue.price,
    0
  );
  return (
    <section className="flex flex-col gap-3 absolute top-28 right-0 bg-white h-full w-[30%] p-8">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>
      {product.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-white flex justify-between shadow-lg rounded-xl p-6"
          >
            <div className="flex gap-6">
              <img
                src={`http://localhost:5000/images/` + item.image}
                alt={item.product}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium ">{item.product}</p>
                <p className="text-xl font-semibold text-slate-400 mt-4">
                  {item.price}฿
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <button
                onClick={() => {
                  deleteCart(index);
                }}
              >
                <IoIosCloseCircleOutline size={25} />
              </button>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    subtractQuantity(index);
                  }}
                >
                  <AiFillMinusCircle size={25} />
                </button>
                <p>{item.quanityCart}</p>
                <button
                  onClick={() => {
                    addQuantity(index);
                  }}
                >
                  <IoMdAddCircle size={25} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="text-2xl font-bold mt-4 bg-black text-white p-6 w-full rounded-lg flex justify-between">
        <h2>Total Price</h2>
        <h2>{totalPrice}฿</h2>
      </div>
    </section>
  );
}

export default ModalCart;
