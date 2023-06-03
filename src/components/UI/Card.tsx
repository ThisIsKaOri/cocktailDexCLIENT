//import styles from './Card.module.css';

type CardProps = {

    children?: string | JSX.Element | JSX.Element[];
    keyValue?: string;
    className?: string;
}

export const Card = ({ children, keyValue, className }: CardProps) => {

    const classes = `${className}`;

    return (
        <article key={keyValue} className={classes} style={{margin: "5px 0"}}>
            {children}
        </article>
    )
}
