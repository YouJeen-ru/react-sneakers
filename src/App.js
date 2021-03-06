import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import {Route} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import {AppContext} from "./context"
import Orders from "./pages/Orders";


function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
           try {
               const [cartResponse, favoritesResponse, ItemsResponse] = await Promise.all([
                   axios.get('https://614075c35cb9280017a11300.mockapi.io/cart'),
                   axios.get('https://614075c35cb9280017a11300.mockapi.io/favorites'),
                   axios.get('https://614075c35cb9280017a11300.mockapi.io/items')
               ])


               setIsLoading(false)

               setCartItems(cartResponse.data)
               setFavorites(favoritesResponse.data)
               setItems(ItemsResponse.data)
           } catch (e) {
               alert('Ошибка при запросе данных')
               console.log(e)
           }
        }

        fetchData()
    }, [])

    const onAddToCart = async (obj) => {

        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://614075c35cb9280017a11300.mockapi.io/cart/${findItem.id}`)
            } else {
                setCartItems(prev => [...prev, obj])
                const {data} = await axios.post('https://614075c35cb9280017a11300.mockapi.io/cart', obj)
                setCartItems(prev => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (e) {
            alert('Ошибка при добавления товара в корзину ')
            console.log(e)

        }
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://614075c35cb9280017a11300.mockapi.io/cart/${id}`)
            setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(id)))
        } catch (e) {
            alert('Ошибка при удалении товара из корзину ')
            console.log(e)
        }

    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://614075c35cb9280017a11300.mockapi.io/favorites/${obj.id}`)
                setFavorites(prev => prev.filter((item) => Number(item.id) !== Number(obj.id))) // ? удаление и на UI и на DB
            } else {
                const {data} = await axios.post(`https://614075c35cb9280017a11300.mockapi.io/favorites`, obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (e) {
            alert('Не удалось добавить в закладки!')
            console.log(e)
        }

    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }


    return (
        <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems}}>
            <div className='wrapper clear'>


                   <Drawer cartItems={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>

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
                    <Favorites/>
                </Route>

                <Route path='/orders' exact>
                    <Orders/>
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
