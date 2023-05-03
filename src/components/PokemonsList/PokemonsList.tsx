import React, { useEffect } from 'react'
import styles from './PokemonsList.module.scss'
import PokemonPreview from '../PokemonPreview/PokemonPreview'
import { gql, useLazyQuery, ApolloError, LazyQueryResultTuple, OperationVariables } from '@apollo/client';
import { Data, Pokemon } from '../../types/pokemons';
import { Link } from 'react-router-dom'
import Skeleton from '../Skeleton/Skeleton';

type Props = {
    currentPage: number;
    inputValue: string;
    pokemons: Pokemon[] | [];
    setPokemons: React.Dispatch<React.SetStateAction<[] | Pokemon[]>>;
}



const PokemonsList = ( { currentPage, inputValue, pokemons, setPokemons }: Props ) => {

    const GET_POKEMONS = gql`
    query samplePokeAPIquery($offset: Int!, $searchTerm: String) {
        pokemons: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-i"}}, name: {_iregex: $searchTerm}}, order_by: {id: asc}, limit: 12, offset: $offset) {
            name
            id
          }
    }
  `;


    const [getPokemons, { loading, data, error }] = useLazyQuery<Data>( GET_POKEMONS );


    useEffect( () => {

        getPokemons( {
            variables: {
                offset: currentPage * 12,
                searchTerm: inputValue
            },
        } );

        if ( data ) {
            setPokemons( data.pokemons );
        }
    }, [data, currentPage, inputValue] );

    if ( loading ) return (
        <div className={styles.pokemonsBlock}>
            {
                [...new Array( 12 )].map( ( item, index ) => (
                    <div key={index} className={styles.gridItem}>
                        <Skeleton />

                    </div>
                ) )
            }
        </div>
    );
    if ( error ) return <p>Error ...</p>;


    return (
        <div className={styles.pokemonsBlock}>

            {pokemons.map( item => (
                <Link to={`/pokemon/${ item.id }`} className={styles.gridItem} key={item.id}>
                    <PokemonPreview name={item.name} id={item.id} />
                </Link>
            ) )}
        </div>
    )
}

export default PokemonsList