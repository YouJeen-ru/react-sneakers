import React, {useState} from "react";
import Info from "./Info";

import axios from "axios";
import {useCart} from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({onClose, onRemove}) => {
    const { cartItems, setCartItems, totalPrice } = useCart()
    const [isComplete, setIsComplete] = useState(false)
    const [orderId, setOrderID] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const onClickOrder = async () => {
       try {
           setIsLoading(true)
           const { data } = await axios.post('https://614075c35cb9280017a11300.mockapi.io/orders', {
               items: cartItems,
           })

           setOrderID(data.id)
           setIsComplete(true)
           setCartItems([])

           for (let i = 0; i < cartItems.length; i++) {
               const item = cartItems[i]
               await axios.delete('https://614075c35cb9280017a11300.mockapi.io/cart/' + Number(item.id))
               delay(1000)
           }

       } catch (e) {
           alert("Ошибка при создании заказа :(")
       }
       setIsLoading(false)
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
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{Math.round((totalPrice / 100) * 5)} руб. </b>
                                    </li>
                                </ul>

                                <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>
                                    Оформить заказ <img src="/img/arrow.svg" alt="arrow"/>
                                </button>
                            </div>
                        </div>
                        :
                        <Info
                            title={isComplete ? 'Заказ оформлен!' :'Корзина пустая'}
                            description={isComplete
                                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                            image={isComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
                        />

                }


            </div>
        </div>
    )
}

export default Drawer