import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/core'

const Handle = ({ handle }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="30px"
      width="30px"
      borderRadius="8px"
      backgroundColor="#7f0"
      {...handle}>
      =
    </Flex>
  )
}

Handle.propTypes = {
  handle: PropTypes.object.isRequired,
}

export default Handle
