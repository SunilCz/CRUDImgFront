import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, TextField, Box, SpeedDial } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = process.env.REACT_APP_CRUD;

const UpdatePost = () => {
  const [blog, setBlog] = useState({ title: "", content: "", image: "" });
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    const fetchSingleBlog = async () => {
      const res = await fetch(`${URL}/api/blog/` + id, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      });
      const data = await res.json();
      if (res.ok) {
        setBlog(data);
      } else {
        console.log(data);
      }
    };
    fetchSingleBlog();
  }, [id]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, image: file });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content);
      if (blog.image) {
        formData.append("image", blog.image);
      }

      const res = await fetch(`${URL}/api/blog/update/` + id, {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        // Show toast notification for success
        toast.success("updated sucessfully");
        
        // Delay before navigating to home
        setTimeout(() => {
          navigator("/");
        }, 1500);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error updating :", error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Card sx={{ p: 4, py: 5, maxWidth: "550px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: "15px" }} elevation={10}>
        <CardContent sx={{ m: 0 }}>
          <Typography gutterBottom variant="h4" component="div" sx={{ m: 0 }}>
            Update !
          </Typography>
        </CardContent>
        <TextField id="outlined-basic" label="Title" variant="outlined" name='title' value={blog.title} onChange={handleChange} />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: "10px 0" }}
        />
        <TextField id="outlined-basic" label="Content" variant="outlined" rows={3} multiline name='content' value={blog.content} onChange={handleChange} />

        <Box sx={{ textAlign: "center" }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            onClick={handleSubmit}
            icon={<Add />}
          />
        </Box>
      </Card>
    </>
  );
};

export default UpdatePost;
