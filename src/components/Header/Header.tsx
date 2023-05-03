import React from 'react'
import styles from './Header.module.scss'
import { Link } from "react-router-dom";
import Logo from '../../assets/logo-pokedex.png'

type Props = {}

const Header = ( props: Props ) => {
    return (
        <div className={styles.header}>
            <Link to='/'>
                <img src={Logo} alt="logo" />
            </Link>

            <div className={styles.links}>
                <Link to='/o-nas'>
                    O nás
                </Link>
                <Link to='/'>
                    Pokémoni
                </Link>
            </div>
        </div>
    )
}

export default Header