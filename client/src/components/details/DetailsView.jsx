import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { API } from '../../service/api'
import { Edit, Delete } from '@mui/icons-material'
import { DataContext } from '../../context/DataProvider'

const DetailsView = () => {
  const {id} = useParams();
  const [post, setpost] = useState({});
  const {account} = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async()=>{
      let response = await API.getPostById({}, null, `/post/${id}`);
      if(response.isSuccess){
        setpost(response.data.post)
      }
    }
    fetchData()
  },[id])

  const deletePost = async()=>{
    let response = await API.deletePostById({}, null, `/delete/${post._id }`)
    if(response.isSuccess){
      navigate('/')
    }
  }


  const url = post.picture ? post.picture : '/Createpost.jpg';
  return (
    <div className='my-16 mx-1 md:mx-25'>
     <img className='w-full h-[50vh] object-cover' src={url} alt="" />
     <div className='float-right'>
      {
        account.username === post.username &&
        <>
      <Link to={`/update/${post._id}`}><Edit className='m-1.5 p-0.5 border-2 rounded-sm border-gray-400 text-orange-500'/></Link>
      <Delete onClick={()=> deletePost()} className='m-1.5 p-0.5 border-2 rounded-sm border-gray-400 text-red-500 '/>
      </>
      }
     </div>
        <h1 className='text-4xl text-center font-bold mt-12 mb-2.5 break-words'>{post.title}</h1>
      <div className='text-gray-400 flex '>
        <h4 className=''>Author: <span className='font-semibold'> {post.username}</span></h4>
        <h5 className='ml-auto'>{new Date(post.createdDate).toDateString()}</h5>

      </div>
        <p className='break-words'>{post.description}</p>
    </div>
  )
}

export default DetailsView
