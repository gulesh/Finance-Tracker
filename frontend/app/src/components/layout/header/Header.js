import React, { Fragment} from 'react'
import './Header.css'
import NavBar from './NavBar';

function Header(props)
{
    return <Fragment>
        <header className="header">
            <NavBar />
        </header>
    </Fragment>
}

export default Header;