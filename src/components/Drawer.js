import React, {useContext, useState} from "react";
import Info from "./Info";
import {AppContext} from "../context";

const Drawer = ({onClose, onRemove, cartItems = []}) => {
    const { setCartItems } = useContext(AppContext)

    const [isComplete, setIsComplete] = useState(false)

    const onClickOrder = () => {
      setIsComplete(true)
        setCartItems([])
    }
    return (
        <div className="overlay">
            <div className="drawer justify-between">
                <h2 className='d-flex justify-between mb-30'>
                    Корзина
                    <img onClick={onClose} className='removeBtn cu-p' src="/img/btn-remove.svg" alt="close"/>
                </h2>

                {
                    cartItems.length > 0 ?
                        <div className="d-flex flex-column flex">
                            <div className="items">
                                {
                                    cartItems.map((obj) => (
                                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                            <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                                 className="flex cartItemImg"></div>
                                            <div className='mr-20 flex'>
                                                <p className='mb-5'>{obj.title}</p>
                                                <b>{obj.price} руб.</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)} className='removeBtn'
                                                 src="/img/btn-remove.svg" alt="remove"/>
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

                                <button onClick={onClickOrder} className='greenButton'>
                                    Оформить заказ <img src="/img/arrow.svg" alt="arrow"/>
                                </button>
                            </div>
                        </div>
                        :
                        <Info
                            title={isComplete ? 'Заказ оформлен!' :'Корзина пустая'}
                            description={isComplete
                                ? 'Ваш заказ #18 скоро будет передан курьерской доставке'
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                            image={isComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
                        />

                }


            </div>
        </div>
    )
}

export default Drawer