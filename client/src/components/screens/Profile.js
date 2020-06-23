import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.posts);
      });
  }, []);

  return (
    <div className="profile-body">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0",
          borderBottom: "1px solid",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.firstpost.com/fpimages/1200x800/fixed/jpg/2019/05/MS-Dhoni-380-AFP.jpg"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "110%",
            }}
          >
            <h6>{mypics.length} Posts</h6>
            <h6>{state ? state.followers.length : 0} Followers</h6>
            <h6>{state ? state.following.length : 0} Following</h6>
          </div>
        </div>
      </div>

      <div className="gallery">
        {mypics.map((item) => {
          return (
            <div className="card gallery-item">
              <div className="card-image">
                <img
                  key={item._id}
                  className="item"
                  src={item.image}
                  alt={item.title}
                />
              </div>

              <div className="card-content">
                <i className="material-icons" style={{ color: "red" }}>
                  favorite
                </i>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                <input type="text" placeholder="add comment" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
