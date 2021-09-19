import React, {useState} from "react";
import styles from './Card.module.scss'


const Card = ({id, title, price, imageUrl, onFavorite, onPlus, favorited = false}) => {

    const [isAdded, setIsAdded] = useState(true)
    const [isFavorite, setIsFavorite] = useState(favorited)

    const onClickPlus = () => {
        onPlus({title, price, imageUrl, id})
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({title, price, imageUrl, id})
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                     alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt=""/>
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus}
                     src={isAdded ? "/img/btn-plus.svg" : "/img/btn-cheked.svg"} alt=""/>
            </div>
        </div>
    )
}

export default Card