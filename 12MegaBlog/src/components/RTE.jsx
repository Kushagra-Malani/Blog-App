import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {  // 'control' comes from react-hook-form & is responsibel to transfer all the states of RTE to some another form
  return (
    <div className='w-full'>
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}  {/*if label is present then display it*/}

    <Controller
    name={name || "content"}  // if 'name' is present then: name = {name} else name = content
    control={control}
    render={({field: {onChange}}) => (   // field: {onChange} means: if there is any change in this field then render it
        <Editor
        apiKey='60fyam52huh3cjv1kw6vygn868he4it1gxy7io8hbyhh6yw3'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}