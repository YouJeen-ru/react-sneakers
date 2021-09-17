import React from "react";

const Header = ({onClickCart}) => {
  return (
      <header className='d-flex justify-between p-40'>
          <div className='d-flex align-center'>
              <img width={40} height={40} src="/img/logo.png" alt="log"/>
              <div>
                  <h3 className='text-uppercase'>React Sneakers</h3>
                  <p className='opacity-5'>Магазин лучших кроссовок</p>
              </div>
          </div>
          <ul className='d-flex'>
              <li onClick={onClickCart} className='mr-30 cu-p'>
                  <img width={18} height={18} src="/img/cart.svg" alt="log"/>
                  <span>1205 руб.</span>
              </li>
              <li className='mr-20 cu-p'>
                  <img width={18} height={18} src="/img/heart.svg" alt="log"/>
              </li>
              <li>
                  <img width={18} height={18} src="/img/user.svg" alt="log"/>
              </li>
          </ul>
      </header>
  )
}

export default Header