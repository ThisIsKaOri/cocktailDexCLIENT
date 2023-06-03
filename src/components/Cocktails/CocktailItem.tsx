//import styles from './CocktailItem.module.css'
import { useNavigate } from 'react-router-dom'
import { CocktailType } from '../../models/Cocktail'
import { Card } from '../UI/Card'

type CocktailItemProps = {

    cocktail: CocktailType
}
export const CocktailItem = ({ cocktail }: CocktailItemProps) => {

    //let navigate = useNavigate()

    return (

        <Card keyValue={cocktail._id}>
            <div style={{display: "flex", flexDirection: "row"}}
            //</Card>onClick={() => navigate('/cocktails/:name')}
            >
            <div style={{width: "30%", aspectRatio: '1/1', marginRight: "16px"}}>
            { cocktail.img ? <img src={cocktail.img}/> : <i className="bi bi-cup-straw" style={{fontSize: "50px"}}></i>}
            </div>
            <hgroup style={{textAlign: "left"}}>
                <h3>{`${cocktail.name[0].toUpperCase()}${cocktail.name.slice(1)}`}</h3>
                <h6>{cocktail.ibaFamily}</h6>
            </hgroup> 
            </div>     
        </Card>
    )
}
