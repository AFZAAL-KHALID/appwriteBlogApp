import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SelectCompnt, Input, RTE } from "../index";
import databaseSvcs from "../../appwriteServices/database_svc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({post}) => {
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate(); 
  const userDataInStore = useSelector((state) => 
    state.auth.userData
  );
  

   
  const submitFunction = async (data) => {
    console.log(data.image[0]);
    
    // first new img add and prev delete 📸
    if (post) {
      const file = data.image[0]
        ? await databaseSvcs.uploadFile(data.image[0])
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
    //if no prev POST exist so run this.
    else 
    console.log(data.image[0]);
    
      const file = await databaseSvcs.uploadFile(data.image[0]);
      
      
    if (file) {
      console.log('file has been saved: ', file.$id);
      
      const fileId = file.$id; 
      data.featuredImage = fileId;
      const dbpost = await databaseSvcs.createPost({
        ...data,
        userID: userDataInStore.$id,
      });

      if (dbpost) {
        console.log('document created successfully');
        
        navigate(`/post/${dbpost.$id}`);
      }
    }
  };

  //slug validation
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const slug = value.trim().toLowerCase().replace(/ /g, "-");
      setValue("slug", slug);
      return slug;
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submitFunction)} className="flex flex-wrap text-black">
      {/* //⬅️<<<------------- */}
      <div className="w-2/3 px-2"> 
        <Input
          label={"Title :"}
          placeholder={"Title"}
          className={"mb-4 rounded-md pl-2 py-2"}
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/*right side ➡️ -------->>>           */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
         {post && (
          <div className="w-full mb-4">
            <img
              src={databaseSvcs.previewFile(post.featuredImage)}
              alt={post.title}
              className="rounded-lg h-[35vh]"
            />
          </div>
        )} 
        <SelectCompnt
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <button
          type="submit"
          className={`${post ? "bg-green-500" : "bg-blue-700"} p-2 rounded-lg mt-2 text-white w-full`}
        >
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default PostForm
