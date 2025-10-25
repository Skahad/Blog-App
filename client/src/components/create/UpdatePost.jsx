import { AddCircle as Add,  } from "@mui/icons-material";
import { FormControl, Input, InputBase, TextareaAutosize, styled } from "@mui/material";
import React from "react";
import { Button } from "../ui/button";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const StyledFormControl = styled(FormControl)`
margin-top: 10px;
display: flex;
flex-direction: row;
// gap:10px
`

const InputStyled = styled(InputBase)`
flex:1;
margin: 0 30px;
font-size: 1.4rem 
`

const TextareaStyled = styled(TextareaAutosize)`
margin-top:50px;
width: 100%;
font-size: 1.2rem;
&:focus-visible{
outline: none;
}
`

const InitialValue = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date()
}

const UpdatePost = () => {
  
  const [post, setpost] = useState(InitialValue);
  const [file, setfile] = useState('')
  const location = useLocation()
  const {account} = useContext(DataContext)
  const navigate = useNavigate();
  const {id} = useParams();
  
  const url = post.picture ? post.picture: "/Createpost.jpg";
  
  useEffect(()=>{
     console.log("Fetched ID:", id);
    const fetchData = async()=>{
      let response = await API.getPostById({}, null, `/post/${id}`);
      if(response.isSuccess){
        setpost(response.data.post)
      }
    }
    fetchData()
  },[id])

  useEffect(()=>{
    const getImage = async()=>{
      if(file){
        const data = new FormData();
        data.append('name', file.name)
        data.append('file', file)
        //API call
        const response = await API.uploadFile(data)
         setpost(prev => ({ ...prev, picture: response.data.ImageUrl }));
      }
    }
    getImage();
      setpost(prev => ({
    ...prev,
    categories: location.search?.split('=')[1] || 'All',
    username: account.username,
  }));
  },[file])


  const handleChange = (e) =>{
    setpost({...post, [e.target.name]: e.target.value})
  }

  const UpdatePost = async () => {
    let response = await API.updatePostById(post, null, `/update/${id}`)
    if(response.isSuccess){
      navigate(`/details/${id}`)
    }
  }

  return (
    <div className="my-13 mx-1 md:mx-25 ">
      <img className="w-full h-[50vh] object-cover" src={url} alt="Content" />
      <StyledFormControl >
        <label htmlFor="fileInput">
          <Add fontSize="large" className="text-orange-600" />
        </label>
        <Input type="file" id="fileInput" style={{display: 'none'}} onChange={(e)=> setfile(e.target.files[0])}/>
        <InputStyled value={post.title} placeholder="Title" onChange={(e)=> handleChange(e)} name="title"/>
        <Button onClick={() => UpdatePost()} className='bg-orange-400 hover:bg-orange-500'>Update</Button>
      </StyledFormControl>
      <TextareaStyled value={post.description} minRows={5} placeholder="Tell your story..." onChange={(e)=> handleChange(e)} name="description"/>

      
    </div>
  );
};

export default UpdatePost;
