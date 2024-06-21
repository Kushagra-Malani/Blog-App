import React from 'react';
import { useState, useEffect } from 'react';
import { Container, PostCard } from '../components/index';
import appwriteService from '../appwrite/config';

function AllPosts() {
    const [posts, setPosts] = useState([])  // posts contain all the post
    useEffect(() => {}, [])

    appwriteService.getPosts([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {/* each item is a post */}
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}  
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;