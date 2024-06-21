import React, {useCallback, useId} from 'react';
import { useForm } from 'react-hook-form';
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../../appwrite/auth';
// 'watch' gives us the capability to monitor a partucular field at all times & we can use it with any form
// 'control' gives us the control of a particular form. Here, we pass this contol to the RTE

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        // There are 2 things a user can do: Update the form or Create a new form
        defaultValues:{
            title: post?.title || '',  // if a user is editing a post then give the post title as default but if there is no post then it means that the user is creating a new post so, give nothing as default
            slug: post?.$id || '',    // same for slug (read the above line)
            content: post?.content || '',
            status: post?.status || 'active'
        },
    })
    
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    // const userData = authService.getCurrentUser().then((userData) => {  
    //     console.log(userData.$id);
    // })

    console.log(userData);

    // Now, we create a form (with name submit). 
    //There a now 2 cases i.e if the value of post is available then update that post else if the value of post is not available then create a new post.

    const submit = async (data) => {
        // case-1 we have post & now we just have to update it
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null  // uploading the file

            // delete the old image first and then update it by new image
            if(file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            // updating the post
            const dbPost = await appwriteService.updatePost(post.$id, 
                {...data,
                featuredImage: file ? file.$id : undefined
                }
            )
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }    
        // creating a new post 
        else{
            const file = await appwriteService.uploadFile(data.image[0])

            if(file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }   
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
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
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;