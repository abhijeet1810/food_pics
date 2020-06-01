import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Post data to backend server
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          image: url,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({ html: data.message });
            history.pushState("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postImage = () => {
    // cloudniary related stuff, upload image to cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "instapost");
    formData.append("cloud_name", "abhijeet-test");

    fetch("https://api.cloudinary.com/v1_1/abhijeet-test/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data.url);
        console.log(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-file"
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="file-field input-field">
        <div className="btn blue darken-1">
          <span>Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <button
        className="btn waves-effect waves-light blue darken-1"
        onClick={() => postImage()}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
