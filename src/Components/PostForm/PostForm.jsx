import React from "react";
import { useForm } from "react-hook-form";
import { Container, SelectCompnt, Input, RTE } from "../index";
import authservice from "../../appwriteServices/Auth_svc";
import databaseSvcs from "../../appwriteServices/database_svc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = (post) => {
  const navigate = useNavigate();
  const userDataInStore = useSelector((state) => {
    state.auth.status;
  });

  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submitFunction = async (data) => {
    //first new img add and prev delete 📸
    if (post) {
      const file = data.Image[0]
        ? await databaseSvcs.uploadFile(data.Image[0])
        : null;

      if (file) {
        databaseSvcs.deleteFile(post.featuredImage);
      }
      // update new Document
      const dbPost = await databaseSvcs.updataPost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : null,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
    //if no prev POST exist.
    else {
      const file = data.Image[0]
        ? await databaseSvcs.uploadFile(data.Image[0])
        : null;
    }
    if (file) {
      const fileID = file.$id;
      data.featuredImage = fileID;
      const dbpost = await databaseSvcs.createPost({
        ...data,
        userId: userData.$id,
      });

      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    }
  };

  return <div></div>;
};

export default PostForm;
