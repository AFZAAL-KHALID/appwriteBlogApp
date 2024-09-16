import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseSvcs from "../appwriteServices/database_svc";
import { Container, PostForm } from "../Components/index";

const EditPost = () => {
  const [post, setposts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseSvcs.getPost(slug).then((data) => {
        if (data) {
          setposts(data)
        }
      })
    } else {
      navigate("/")
    }
  }, [slug, navigate]);
  
  
  return post ? (
    <div className="py-8 bg-yellow-400 w-full">
    <Container>
      <PostForm post={post} />
    </Container>
    </div>
  ) : null;
};

export default EditPost;
