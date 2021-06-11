import React, { useEffect } from 'react'
import CustomNavbar from '../components/Molecules/CustomNavbar'
import GlobalStyle from '../GlobalStyles/GlobalStyle'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  width:100%;
  max-width: 1920px;
`


const MainTemplate = ({ children }) => {
    useEffect(() => {
        console.log(children)
    })

    return (
        <StyledWrapper>
            <GlobalStyle/>
            <CustomNavbar/>
            {children}
        </StyledWrapper>
    )
}

export default MainTemplate