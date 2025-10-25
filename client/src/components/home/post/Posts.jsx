import { API } from '@/service/api'
import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Box, Pagination } from '@mui/material'
import Post from './Post'
import { useSearchParams, Link } from 'react-router-dom'

const Posts = () => {

  const [posts, setposts] = useState([])
  const [page, setpage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 4
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category')

  useEffect(()=>{
    const fetchData = async()=>{
      let response = await API.getAllPosts({page, limit,category: category || ''})
      if(response.isSuccess){
        setposts(response.data.posts)
        setTotalPages(response.data.totalPages)
      }
    }
    fetchData()

  },[page, category])

  const handlePageChange = (event, value) =>{
    setpage(value)
  }

  return (
    <Box>
    <Grid container spacing={2}>
    {
      posts && posts.length > 0 ? posts.map(post=>(
        <Grid key={post._id} size={{xs:12, sm:4, lg:3}}>
            <Link to={`/details/${post._id}`}>  
        <Post post={post}/>
        </Link>
        </Grid>
      )) : <div>No posts available to display</div>
    }
    </Grid>
    <Box>
    <Pagination
      count={totalPages}
      page={page}
      onChange={handlePageChange}
      color="primary"
      />
      </Box>
    </Box>
  )
}

export default Posts
