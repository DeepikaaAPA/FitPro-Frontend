import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../features/cartSlice"; // Adjust the path as needed
import instance from "../../services/instance";

function Cart() {
  const cart = useSelector((state) => state.cart);

  console.log(cart);
  const dispatch = useDispatch();

  const handleRemove = (index) => {
    dispatch(removeFromCart(index));
  };
  const handleCheckout=async()=>{
   const response=await instance.post("/trainer/book",{cart})
  }

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.selectedSlots.length * item.trainer.price,
      0
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex bg-blue-50 p-5 justify-between items-center m-5"
            >
              <div className="mb-2  text-gray-500 ">
                <p>
                  <strong>Date:</strong> {item.selectedDate}
                </p>
                <p>
                  <strong>Slots:</strong> {item.selectedSlots.join(", ")}
                </p>
                <p>
                  <strong>Price per slot:</strong> {item.trainer.price} USD
                </p>
              </div>
              <div>
                <p>
                  <strong>Price:</strong> <i className="fa fa-inr"></i>
                  {item.selectedSlots.length * item.trainer.price}
                </p>
                <button
                  onClick={() => handleRemove(index)}
                  className="p-2 bg-red-500 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-xl text-right px-5">
              <strong>Total Amount:</strong> <i className="fa fa-inr"></i>
              {calculateTotal()}
            </h3>
          </div>
          <div className="mt-4">
            <h3 className=" text-center px-5">
              <button
                className=" rounded p-2 bg-yellow-100 "
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
