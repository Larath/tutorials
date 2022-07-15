
import './card-list.styles.css';
import Card from '../card/card.component';

const CardList = ({ monsters }) => ( //using the monsters prop as we will only receive a monster. 
    //do not need a return statment as there is no other process being performed other than returning the jsx
    <div className="card-list">
        {monsters.map((monster) =>{
            return(
                <Card monster={monster}/>
            )
        })}
    </div>
)

export default CardList;