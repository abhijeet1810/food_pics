import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>MS Dhoni</h5>
        <div className="card-image">
          <img
            className="gallery-item"
            src="https://images.firstpost.com/fpimages/1200x800/fixed/jpg/2019/05/MS-Dhoni-380-AFP.jpg"
          />
        </div>

        <div className="card-content">
          <h6>title</h6>
          <p>Such an amazing post</p>
          <input type="text" placeholder="add comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
