import React, {useState} from 'react';
import style from './card.module.scss';
import {BsFillPencilFill, BsHeart, BsHeartFill, BsXCircle} from 'react-icons/bs'

function Card(props) {

    const [user, setUser] = useState('admin');
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    const likeArea = <>
        <div className={style.likes}>
            <button>
                {/*<BsHeartFill/>*/}
                <BsHeart/>
            </button>
        </div>
    </>

    const adminArea = <>
        <div className={style.adminPanel}>
            <button>
                <BsXCircle/>
            </button>
            <button>
                <BsFillPencilFill/>
            </button>
        </div>
    </>

    return (
        <div className={style.card}>
            <div className={`${style.media} ${showMore && style.disable}`}>
                <div className={style.background}>
                    {user === 'user' ? likeArea : adminArea}
                    <div className={style.price}>
                        <span>$350</span>
                    </div>
                </div>
            </div>
            <div className={`${style.content} ${showMore && style.active}`}>
                <div className={style.contentWrapper}>
                    <div className={style.info}>
                        <div className={style.title}>Paris</div>
                        <div className={style.dates}>12 Feb - 14 Feb, 2021</div>
                    </div>
                    <div className={style.moreInfo}>
                        <button onClick={toggleShowMore}>{showMore ? 'Less details' : 'More Details'}</button>
                    </div>
                </div>
                {showMore &&
                <div className={style.description}>
                    Paris is the capital and most populous city of France, with an estimated population of 2,175,601
                    residents as of 2018, in an area of more than 105 square kilometres (41 square miles). more than
                    105 square kilometres (41 square miles).
                </div>}
            </div>
        </div>
    );
}

export default Card;