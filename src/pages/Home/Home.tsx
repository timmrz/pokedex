import React, { useState } from 'react'
import styles from './Home.module.scss'
import Search from '../../components/Search/Search'

import PokemonsList from '../../components/PokemonsList/PokemonsList';
import ReactPaginate from 'react-paginate';
import { Pokemon } from '../../types/pokemons';


type Props = {}

const Home = ( props: Props ) => {

    const [currentPage, setCurrentPage] = useState( 0 )
    const [inputValue, setInputValue] = useState<string>( '' )
    const [pokemons, setPokemons] = useState<Pokemon[] | []>( [] )

    const handlePageClick = ( event: {
        selected: number;
    } ) => {
        setCurrentPage( event.selected )
        window.scrollTo( 0, 0 );
    }

    return (
        <div>
            <div className={styles.search}>
                <Search setCurrentPage={( i ) => setCurrentPage( i )} setInputValue={( i ) => setInputValue( i )} />
            </div>
            <PokemonsList
                pokemons={pokemons}
                setPokemons={( e ) => setPokemons( e )}
                currentPage={currentPage} inputValue={inputValue} />
            <ReactPaginate
                className={styles.paginate}
                breakLabel="..."
                nextLabel=">"
                onPageChange={( event ) => handlePageClick( event )}
                pageCount={pokemons.length < 12 ? currentPage + 1 : 13}
                previousLabel="<"
                renderOnZeroPageCount={null}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
            />
        </div >
    )
}

export default Home