import React, { useState, useRef, useCallback } from 'react'
import searchIcon from '../../assets/icons/searchIcon.svg'
import clearIcon from '../../assets/icons/clearIcon.svg'
import styles from './Search.module.scss'
import debounce from "lodash.debounce";

type Props = {
    setInputValue: ( event: any ) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Search = ( { setInputValue, setCurrentPage }: Props ) => {


    const [value, setValue] = useState( "" );
    const inputRef = useRef<HTMLInputElement>( null );



    const onClickClear = () => {
        setValue( '' )
        setInputValue( '' );
        if ( inputRef.current ) {
            inputRef.current.focus();
        }
    }

    const updateSearchValue = useCallback(
        debounce( ( str: string ) => {
            setInputValue( str );
            setCurrentPage( 0 )
        }, 200 ),
        []
    );

    const handleSearch = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setValue( e.target?.value );
        updateSearchValue( e.target?.value )
    };

    return (
        <div className={styles.root}>
            <img className={styles.searchIcon} src={searchIcon} alt='search icon' />
            <input
                ref={inputRef}
                value={value}
                onChange={handleSearch}
                type='text'
                placeholder='Zadejte jméno Pokémona'
                className={styles.input}
            />
            {value && (
                <img
                    onClick={() => onClickClear()}
                    className={styles.clearIcon}
                    src={clearIcon}
                    alt='clear icon'
                />
            )}
        </div>
    )
}

export default Search