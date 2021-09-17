import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";



function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        axios.get('https://614075c35cb9280017a11300.mockapi.io/items').then(res => {
            setItems(res.data)
        })
        axios.get('https://614075c35cb9280017a11300.mockapi.io/cart').then(res => {
            setCartItems(res.data)
        })
    }, [])
    
    const onAddToCart = (obj) => {
        axios.post('https://614075c35cb9280017a11300.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, obj])
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }
    
    const onRemoveItem = (id) => {
        axios.delete(`https://614075c35cb9280017a11300.mockapi.io/cart/${id}`)
        setCartItems(prev => prev.filter((item) => item.id !== id))
    }


    return (
        <div className='wrapper clear'>

            {
                cartOpened
                && <Drawer cartItems={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}

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
