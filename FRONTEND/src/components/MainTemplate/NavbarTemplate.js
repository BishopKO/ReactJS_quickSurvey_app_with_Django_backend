import React from 'react';
import CustomNavbar from '../Navbar/Navbar';

const NavbarTemplate = ({ children }) => {
    return (
        <>
            <CustomNavbar/>
            {children}
        </>
    );
};

export default NavbarTemplate;