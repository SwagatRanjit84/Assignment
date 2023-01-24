import React, { useState, useEffect } from "react";
import "./home.scss";
import Card from "../card/card";
import Modal from "../modal/modal";
import { Spinner } from "office-ui-fabric-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../redux/slice/create-item";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    displayCard();
  }, [state.item1]);

  const displayCard = () => {
    if (isLoading && !state.item1.data) {
      setLoading(true);
      dispatch(fetchItems());
    }

    setPosts(state.item1.data);
    if (state.item1.data) setLoading(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="app">
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      <div className="wrapper">
        {posts &&
          posts.map((post) => {
            return (
              <div className="wrapper">
                <Card
                  img="https://plus.unsplash.com/premium_photo-1669863791240-896f003fbbeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  title={post.title}
                  description={post.body}
                />
              </div>
            );
          })}
      </div>
      <br />
      <div className="wrapper">
        <button className="btn-add" onClick={() => setModalOpen(true)}>
          Add new post
        </button>
      </div>
    </div>
  );
};

export default Home;
