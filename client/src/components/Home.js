import React from 'react'
import { Flex, Text } from '@chakra-ui/core'

function Home() {
  return (
    <Flex
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center">
      <Text mt="-100px" fontSize="4xl">
        MERN stack template - with authentication
      </Text>
    </Flex>
  )
}

export default Home
