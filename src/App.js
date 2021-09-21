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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get('https://614075c35cb9280017a11300.mockapi.io/cart')
            const favoritesResponse = await axios.get('https://614075c35cb9280017a11300.mockapi.io/favorites')
            const ItemsResponse = await axios.get('https://614075c35cb9280017a11300.mockapi.io/items')

            setIsLoading(false)

            setCartItems(cartResponse.data)
            setFavorites(favoritesResponse.data)
            setItems(ItemsResponse.data)
        }

        fetchData()
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
        setCartItems(prev => prev.filter((item) =>Number(item.id) !== Number(id)))
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://614075c35cb9280017a11300.mockapi.io/favorites/${obj.id}`)
                setFavorites(prev => prev.filter((item) => Number(item.id) !== Number(obj.id))) // ? удаление и на UI и на DB
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
                    cartItems={cartItems}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavorite={onAddToFavorite}
                    onAddToCart={onAddToCart}
                    isLoading={isLoading}
                />
            </Route>

            <Route path='/favorites' exact>
                <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
            </Route>
        </div>
    );
}

export default App;
