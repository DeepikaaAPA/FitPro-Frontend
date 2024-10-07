import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, resetCart } from "../../features/cartSlice"; // Adjust the path as needed
import instance from "../../services/instance";
import { toast ,ToastContainer} from "react-toastify";

function Cart() {
  const cart = useSelector((state) => state.cart);

  console.log(cart);
  const dispatch = useDispatch();

  const handleRemove = (index) => {
    dispatch(removeFromCart(index));
  };
  const handleCheckout=async()=>{
   const response=await instance.post("/trainer/book",{cart})
   toast(" Classes booked successfully. ")
   dispatch(resetCart())
  }

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.selectedSlots.length * item.trainer.price,
      0
    );
  };

  return (
    <div className="p-4 m-5 border ">
      <ToastContainer></ToastContainer>
      <h2 className="text-5xl mb-4 text-blue-400 text-center"><span className="fa fa-shopping-cart text-green-400"></span> My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex justify-center">
        <div >
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex bg-blue-50 p-5 justify-between gap-5 m-5"
            >
              <div className="mb-2  text-gray-500 ">
              <p className="text-blue-400 capitalize"> 
                  <strong>{item.trainer.firstname + " " + item.trainer.lastname}</strong> 
                </p>
                <p>
                  <strong>Date:</strong> {item.selectedDate}
                </p>
                <p>
                  <strong>Slots:</strong> {item.selectedSlots.join(", ")}
                </p>
                <p>
                  <strong>Price per slot:</strong>Rs.  {item.trainer.price} 
                </p>
              </div>
              <div>
                <p className="text-green-700">
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
        
        </div>
        <div className="m-5">
          <div className="mt-4">
            <h3 className="text-2xl m-5 text-right p-5 bg-blue-50 border ">
              <strong>Total Amount:
              <span className="text-green-800 px-3"> <i className="fa fa-inr"></i>{calculateTotal()}</span></strong>
            </h3>
          </div>
          <div className="mt-4">
            <h3 className=" text-center px-5">
              <button
                className=" text-2xl rounded p-2 bg-yellow-400 "
                onClick={handleCheckout}
              >
                Pay & Checkout
              </button>
            </h3>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
