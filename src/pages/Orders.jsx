import React, {useContext, useEffect, useState} from "react";
import Card from "../components/Card";
import axios from "axios";
import {AppContext} from "../context";


function Orders() {
    const { onAddToFavorite, onAddToCart } = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

        useEffect(() => {
            async function fetchData() {
                try {
                    const {data} = await axios.get('https://614075c35cb9280017a11300.mockapi.io/orders')
                    setOrders(data.reduce((prev, obj) => [...prev, obj.items], []).flat())
                    setIsLoading(false)
                } catch (e) {
                    alert('Ошибка при запросе заказов')
                }
            }
            fetchData()
        },[])




    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>

            </div>

            <div className='d-flex  flex-wrap'>
                {
                    ( isLoading ? [...Array(10)] : orders).map((item, _i) => (
                            <Card
                                key={_i}
                                loading={isLoading}
                                {...item}
                            />
                        ))
                }
            </div>

        </div>
    )
}

export default Orders