import React, {useEffect, useState} from 'react';

import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";



function App() {
    const [items, setItems] = useState([])
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        fetch('https://614075c35cb9280017a11300.mockapi.io/items').then(res => {
            return res.json()
        }).then((json) => {
            setItems(json)
        })
    }, [])


    return (
        <div className='wrapper clear'>

            {  cartOpened && <Drawer onClose={() => setCartOpened(false)}/>}

            <Header onClickCart={() => setCartOpened(true)}/>

            <div className="content p-40">
                <div className='d-flex align-center justify-between mb-40'>
                    <h1>Все кроссовки</h1>
                    <div className='search-block d-flex'>
                        <img src="/img/search.svg" alt="search"/>
                        <input type="text" placeholder='Поиск...'/>
                    </div>
                </div>

                <div className='d-flex  flex-wrap'>
                    {
                        items.map((obj) => (
                            <Card title={obj.title} price={obj.price} imageUrl={obj.imageUrl}/>
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default App;
