import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { addElipsis } from '../../../utils/common-utils'

const Container = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin: 10px;
  height: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > p {
  padding: 0 5px 5px 5px;
  }
`

const Image = styled('img')({
  width: '100%',
  objectFit: 'cover',
  height: '150px',
  borderRadius: '10px 10px 0 0'
})

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`
const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600
`

const Details = styled(Typography)`
font-size: 14px;
word-break: break-word
`

const Post = ({post}) => {
  const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171'

  return (
    <Container>
      <Image src={url} alt="blog"/>
      <Text>{post.categories}</Text>
      <Heading>{addElipsis(post.title, 15)}</Heading>
      <Text>{post.username}</Text>
      <Details>{addElipsis(post.description, 100)}</Details>
    </Container>
  )
}

export default Post
