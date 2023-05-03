import React from 'react'
import styles from './pokemonPreview.module.scss'

type Props = {
    id: number;
    name: string;
}

const PokemonPreview = ( { id, name }: Props ) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageBlock}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`} alt="pokemon picture" />
            </div>
            <p>{name}</p>
        </div>
    )
}

export default PokemonPreview