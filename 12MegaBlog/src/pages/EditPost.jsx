import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import service from '../appwrite/config';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()  // useParams is used to take the values from the url
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){  // if slug is present then only we can edit the post else there is no post so no need to edit
            appwriteService.getPost(slug).then((currPost) => {
                if(currPost){
                    setPost(currPost)
                }
                else{
                    navigate("/")
                }
            })
        } 
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost;