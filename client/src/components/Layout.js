import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/core'

const Layout = ({ children }) => {
  return (
    <Flex
      backgroundImage="linear-gradient(to right, #83a4d4, #b6fbff)"
      flexDirection="column"
      height="100vh"
      width="100vw"
      color="#222">
      {children}
    </Flex>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Layout
