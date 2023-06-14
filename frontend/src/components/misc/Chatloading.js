import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

function Chatloading() {
  return (
    <Stack>
        <Skeleton height={"45px"}></Skeleton>
        <Skeleton height={"45px"}></Skeleton>
        <Skeleton height={"45px"}></Skeleton>
        <Skeleton height={"45px"}></Skeleton>
        <Skeleton height={"45px"}></Skeleton>
        <Skeleton height={"45px"}></Skeleton>
    </Stack>
  )
}

export default Chatloading