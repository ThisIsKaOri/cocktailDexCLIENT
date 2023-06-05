//import styles from './Card.module.css';

type CardProps = {

    children?: string | JSX.Element | JSX.Element[];
    keyValue?: string;
    className?: string;
}

export const Card = ({ children, keyValue, className }: CardProps) => {

    const classes = `${className}`;

    return (
        <article key={`card${keyValue}`} className={classes} 
        style={{margin: "2px 0", padding: "16px"}}
        >
            {children}
        </article>
    )
}
