import React, { useEffect, useState } from 'react'
import databaseSvcs from '../appwriteServices/database_svc'
import {Container, PostCard} from '../Components/index.js'


const AllPost = () => {
    const [posts, setposts] = useState([])

useEffect(() => {
databaseSvcs.getPosts([]).then((posts)=>{
    if (posts) {
        console.log(posts);
        setposts(posts.documents)
        console.log(posts);
        
        
    }
})
}, [])


  return (
    <div className='w-full'>
        <Container>
        {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>

                        <PostCard {...post} />
                    </div>
                ))}
        </Container>
    </div>
  )
}

export default AllPost