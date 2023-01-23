import React, { useState, useEffect } from "react";
import "./home.scss";
import Card from "../card/card";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    displayCard();
  }, []);

  const displayCard = async () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setPosts(json);
        setLoading(false);
      });
  };

  if (isLoading) return "...Loading...";

  return (
    <div className="app">
      <div className="wrapper">
        {posts &&
          posts.map((post) => {
            return (
              <div className="wrapper">
                <Card
                  img="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  title={post.title}
                  description={post.body}
                />
              </div>
            );
          })}
      </div>
      <br />
      <button className="btn-add">Add new post</button>
    </div>
  );
};

export default Home;
