import React, {useEffect, useState} from 'react';
import style from './main-list.module.scss';
import Card from "../card/Card";
import UserService from "../../services/UserService";

function MainList(props) {

    const [vacations, setVacations] = useState([]);

    useEffect(async () => {
        const data = await UserService.getVacations();
        setVacations(data);
        console.log(data)
    }, []);

    const cards = vacations.map(vacation => <Card key={vacation._id} vacation={vacation}/>)
    return (
        <div className={style.mainContainer}>
            <div className={style.mainList}>
                {vacations && cards}
            </div>
        </div>
    );
}

export default MainList;