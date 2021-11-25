import React, {useState} from 'react';
import style from './card.module.scss';
import {BsFillPencilFill, BsHeart, BsHeartFill, BsXCircle} from 'react-icons/bs'
import UserService from "../../services/UserService";
import {useAuth} from "../../hooks/useAuth.hook";

function Card({vacation}) {
    const {user} = useAuth();
    const {_id, destination, country, description, image, price, dateFrom, dateTo, followers} = vacation;
    const [use, setUser] = useState('user');
    const [showMore, setShowMore] = useState(false);

    const initialState = followers.includes(user.id);

    const [like, setLike] = useState(initialState);
    const [followersQty, setFollowersQty] = useState(followers.length);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    const toggleFollowing = async () => {
        const data = await UserService.toggleFollowing(_id, user.id);
        setLike(data.followers.includes(user.id));
        setFollowersQty(data.followers.length);
    }

    const likeArea = <>
        <div className={style.likes}>
            <span>{followersQty}</span>
            <button onClick={toggleFollowing}>
                {like ? <BsHeartFill/> :  <BsHeart/>}
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
                    {use === 'user' ? likeArea : adminArea}
                    <div className={style.price}>
                        <span>$ {price}</span>
                    </div>
                </div>
            </div>
            <div className={`${style.content} ${showMore && style.active}`}>
                <div className={style.contentWrapper}>
                    <div className={style.info}>
                        <div className={style.title}>
                            {destination}
                        </div>
                        <span className={style.subtitle}> {country}</span>
                        <div className={style.dates}>{dateFrom.slice(0, 10)} - {dateTo.slice(0, 10)}</div>
                    </div>
                    <div className={style.moreInfo}>
                        <button onClick={toggleShowMore}>{showMore ? 'Less details' : 'More Details'}</button>
                    </div>
                </div>
                {showMore &&
                <div className={style.description}>
                    {description}
                </div>}
            </div>
        </div>
    );
}

export default Card;