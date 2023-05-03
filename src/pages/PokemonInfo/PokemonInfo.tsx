import React, { useEffect, useState } from 'react'
import styles from './PokemonInfo.module.scss'
import { gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { PokemonInfoData, PokemonV2Pokemon, PokemonV2Pokemontype } from '../../types/pokemoninfo';

type Props = {}

const PokemonInfo = ( props: Props ) => {

    const { id } = useParams<string>();
    const [pokemonInfo, setPokemonInfo] = useState<PokemonV2Pokemon | []>( [] )
    const [pokemonType, setPokemonType] = useState<PokemonV2Pokemontype | []>( [] )

    const GET_POKEMON_INFO = gql`
    query pokemonStat($id: Int!) {
        pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
            name
            pokemon_v2_pokemonstats {
              base_stat
              stat_id
        }
        height
      weight
      }
      pokemon_v2_pokemontype(where: {pokemon_id: {_eq: 4}}) {
        pokemon_v2_type {
          name
        }
      }
    }
  `;

    const [getPokemonInfo, { loading, data, error }] = useLazyQuery<PokemonInfoData>( GET_POKEMON_INFO );

    useEffect( () => {

        getPokemonInfo( {
            variables: {
                id: id
            },
        } );

        if ( data ) {
            setPokemonInfo( data.pokemon_v2_pokemon[0] )
            setPokemonType( data.pokemon_v2_pokemontype[0] )
        }
    }, [data] );

    console.log( data )
    const stats: string[] = ['HP', 'Attack', 'Defense', 'Sp Atk', 'Sp Def', 'Speed']

    const [firstTab, setFirstTab] = useState<boolean>( true )


    if ( loading ) return <p className={styles.loading}>Loading...</p>;
    if ( error ) return <p>Error ...</p>;

    const tabStyle = {
        transform: 'translateY(20px)',
        opacity: '0.5',

    }



    return (
        <div className={styles.root}>
            <Link className={styles.btnBack} to='/'>
                <div>
                    {'<'}
                </div>
                <div>Zpět na přehled</div>

            </Link>
            <div className={styles.tabs}>
                <div onClick={() => setFirstTab( true )} style={firstTab ? {} : tabStyle}>
                    Profil
                </div>
                <div onClick={() => setFirstTab( false )} style={!firstTab ? {} : tabStyle}>
                    Statistiky
                </div>
            </div>
            <div className={styles.pokemonInfo}>
                <div className={styles.pokemonBlock}>
                    <h2>{'name' in pokemonInfo && pokemonInfo.name}</h2>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`} alt="pokemon picture" />
                </div>
                {
                    !firstTab && <div className={styles.pokemonStats}>
                        {'pokemon_v2_pokemonstats' in pokemonInfo && pokemonInfo.pokemon_v2_pokemonstats.map( item => (
                            <div className={styles.statBlock}>
                                <div className={styles.statTitle}>
                                    {stats[item.stat_id - 1]}
                                </div>
                                <div className={styles.statLine}>
                                    <div style={{ width: `${ item.base_stat }%` }}>
                                        {item.base_stat}
                                    </div>
                                </div>
                            </div>
                        ) )}
                    </div>
                }

                {
                    firstTab && (
                        <div className={styles.dataBlock}>
                            <div className={styles.data}>
                                <div>
                                    Typ
                                </div>
                                <p>
                                    {'pokemon_v2_type' in pokemonType && pokemonType.pokemon_v2_type.name}
                                </p>
                            </div>
                            <div className={styles.data}>
                                <div>
                                    Výška
                                </div>
                                <p>
                                    {'height' in pokemonInfo && pokemonInfo.height}m
                                </p>
                            </div>
                            <div className={styles.data}>
                                <div>
                                    Váha
                                </div>
                                <p>
                                    {'weight' in pokemonInfo && pokemonInfo.weight}kg
                                </p>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default PokemonInfo