import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseSvcs from "../appwriteServices/database_svc";
import { Container, PostForm } from "../Components/index";

const EditPost = () => {
  const [post, setpost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    databaseSvcs.getPost(slug).then((post) => {
     if (post) {
         setpost(post);
     }else{
        navigate('/')
     }
    });
  }, [slug, navigate]);

  return post ? (

    <Container>
      <PostForm post={post} />
    </Container>
  ) : null;
};

export default EditPost;
