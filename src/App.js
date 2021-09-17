import React, {useEffect, useState} from 'react';

import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";



function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        fetch('https://614075c35cb9280017a11300.mockapi.io/items').then(res => {
            return res.json()
        }).then((json) => {
            setItems(json)
        })
    }, [])
    
    const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj])
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }


    return (
        <div className='wrapper clear'>

            {  cartOpened && <Drawer cartItems={cartItems} onClose={() => setCartOpened(false)}/>}

            <Header onClickCart={() => setCartOpened(true)}/>

            <div className="content p-40">
                <div className='d-flex align-center justify-between mb-40'>
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                    <div className='search-block d-flex'>
                        <img src="/img/search.svg" alt="search"/>
                        { searchValue && <img onClick={() => setSearchValue('')} className='clear cu-p' src="/img/btn-remove.svg" alt="clear"/> }
                        <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder='Поиск...'/>
                    </div>
                </div>

                <div className='d-flex  flex-wrap'>
                    {
                        items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((item, _i) => (
                            <Card
                                key={_i}
                                title={item.title}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                onFavorite={() => {}}
                                onPlus={(obj) => onAddToCart(obj)}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default App;
