import React from "react";

const Drawer = ({ onClose, cartItems= [] }) => {
    return (
        <div className="overlay">
            <div className="drawer justify-between">
                <h2 className='d-flex justify-between mb-30'>
                    Корзина
                    <img onClick={onClose} className='removeBtn cu-p' src="/img/btn-remove.svg" alt="close"/>
                </h2>

                <div className="items">
                    {
                        cartItems.map((obj) => (
                            <div className="cartItem d-flex align-center mb-20">
                                <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                     className="flex cartItemImg"></div>
                                <div className='mr-20 flex'>
                                    <p className='mb-5'>{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img className='removeBtn' src="/img/btn-remove.svg" alt="remove"/>
                            </div>
                        ))
                    }
                </div>

                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб. </b>
                        </li>
                        <li>
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>1074 руб. </b>
                        </li>
                    </ul>

                    <button className='greenButton'>
                        Оформить заказ <img src="/img/arrow.svg" alt="arrow"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Drawer