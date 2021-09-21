import React, {useState} from "react";
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'


const Card = ({
                  id,
                  title,
                  price,
                  imageUrl,
                  onFavorite,
                  onPlus,
                  favorited = false,
                  added = false,
                  loading = false
              }) => {

    const [isAdded, setIsAdded] = useState(added)
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
            {
                loading ? (
                    <ContentLoader
                        speed={2}
                        width={155}
                        height={250}
                        viewBox="0 0 155 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
                        <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
                        <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
                        <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
                    </ContentLoader>
                ) : (
                    <>

                        <div className={styles.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                                 alt="Unliked"/>
                        </div>
                        <img width='100%' height={130} src={imageUrl} alt=""/>
                        <h5>{title}</h5>
                        <div className='d-flex justify-between align-center'>
                            <div className='d-flex flex-column'>
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            <img className={styles.plus} onClick={onClickPlus}
                                 src={isAdded ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"} alt=""/>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default Card