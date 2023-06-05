import { useNavigate } from 'react-router-dom'
import { IngredientType } from '../../models/Ingredient'
import { Card } from '../UI/Card'

type IngredientItemProps = {

    ingredient: IngredientType
}
export const IngredientItem = ({ ingredient }: IngredientItemProps) => {

    return (

        <Card keyValue={ingredient._id}>
            <div 
                style={{
                    display: "flex", 
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
            <div style={{maxHeight: "60px", aspectRatio: '1/1', margin: "0 32px 8px 16px"}}>
            { ingredient.img ? (
                    <img src={ingredient.img}/> 
                ) : ( 
                    <i className="bi bi-cup-straw" style={{fontSize: "50px"}}></i>
                )}
            </div>
                <hgroup style={{ textAlign: "left" }}>
                    <h3>{`${ingredient.name[0].toUpperCase()}${ingredient.name.slice(1)}`}</h3>
                    <h6>{ingredient.replacements?.join(',')}</h6>
                </hgroup>
            </div>
        </Card>
    )
}