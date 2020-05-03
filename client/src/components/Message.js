import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/core'

const Message = props => {
  return (
    <Text textAlign="center" role="alert">
      {props.message.msgBody}
    </Text>
  )
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
}

export default Message
