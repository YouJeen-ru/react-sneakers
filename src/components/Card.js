import React from "react";


const Card = ({ title, price, imageUrl }) => {
  return (
      <div className="card">
          <div className='favorite'>
              <img src="/img/heart-liked.svg" alt="Unliked"/>
          </div>
          <img width={133} height={112} src={imageUrl} alt=""/>
          <h5>{title}</h5>
          <div className='d-flex justify-between align-center'>
              <div className='d-flex flex-column'>
                  <span>Цена:</span>
                  <b>{price} руб.</b>
              </div>
              <button className='button'>
                  <img width={11} height={11} src="/img/plus.svg" alt=""/>
              </button>
          </div>
      </div>
  )
}

export default Card