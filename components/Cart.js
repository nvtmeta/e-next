import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";

const Cart = () => {
  const {
    totalQuantities,
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    toggleCartItemQty,
    onRemove,
  } = useStateContext();
  const cartRef = useRef();
  return (
    <>
      <div className="cart-wrapper" ref={cartRef}>
        <div className="cart-container">
          <button
            className="cart-heading"
            onClick={() => setShowCart(false)}
            type="button"
          >
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">{totalQuantities}</span>
          </button>

          {cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href="/">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setShowCart(false);
                  }}
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}

          <div className="product-container">
            {cartItems.length >= 1 &&
              cartItems.map((item) => {
                console.log(item);
                return (
                  <div className="product" key={item?._id}>
                    <img
                      className="cart-product-image"
                      src={urlFor(item?.image[0])}
                    />
                    <div className="item-desc">
                      <div className="flex top">
                        <h5>{item.name}</h5>
                        <h4>${item.price}</h4>
                      </div>
                      <div className="flex bottom">
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() => toggleCartItemQty(item._id, "dec")}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.qty}</span>
                          <span
                            className="minus"
                            onClick={() => toggleCartItemQty(item._id, "inc")}
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                        <button
                          className="remove-item"
                          onClick={() => {
                            onRemove(item, item._id);
                          }}
                          type="button"
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                      <div className="cart-bottom">
                        <div className="total">
                          <h3>Subtotal:</h3>
                          <h3>{totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                          <button className="btn" onClick="" type="button">
                            Pay with Stripe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
