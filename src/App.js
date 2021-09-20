import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {Route} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        axios.get('https://614075c35cb9280017a11300.mockapi.io/items').then(res => {
            setItems(res.data)
        })
        axios.get('https://614075c35cb9280017a11300.mockapi.io/cart').then(res => {
            setCartItems(res.data)
        })
        axios.get('https://614075c35cb9280017a11300.mockapi.io/favorites').then(res => {
            setFavorites(res.data)
        })
    }, [])

    const onAddToCart = (obj) => {

        try {
            if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                axios.post('https://614075c35cb9280017a11300.mockapi.io/cart', obj)
                setCartItems(prev => [...prev, obj])
            }
        } catch (e) {

        }
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://614075c35cb9280017a11300.mockapi.io/cart/${id}`)
        setCartItems(prev => prev.filter((item) => item.id !== id))
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://614075c35cb9280017a11300.mockapi.io/favorites/${obj.id}`)
                setFavorites(prev => prev.filter((item) => item.id !== obj.id)) // ? удаление и на UI и на DB
            } else {
                const { data } = await axios.post(`https://614075c35cb9280017a11300.mockapi.io/favorites`, obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (e) {
            alert('Не удалось добавить в закладки!')
        }

    }


    return (
        <div className='wrapper clear'>

            {
                cartOpened
                && <Drawer cartItems={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}

            <Header onClickCart={() => setCartOpened(true)}/>

            <Route path='/' exact>
                <Home
                    items={items}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavorite={onAddToFavorite}
                    onAddToCart={onAddToCart}
                />
            </Route>

            <Route path='/favorites' exact>
                <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
            </Route>
        </div>
    );
}

export default App;
