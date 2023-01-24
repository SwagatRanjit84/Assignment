import React, { useState } from "react";
import "./modal.scss";
import { TextField } from "office-ui-fabric-react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../redux/slice/create-item";

function Modal({ setOpenModal }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [allValues, setAllValues] = useState({
    title: "",
    body: "",
  });
  const initialData = { title: "", body: "" };

  const myChangeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const saveItem = async (e) => {
    setAllValues({ ...allValues, initialData });
    setOpenModal(false);
    await dispatch(createItem(allValues));
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Add new item</h1>
        </div>
        <div className="">
          <TextField
            label="Title"
            name="title"
            placeholder="Enter title"
            onChange={myChangeHandler}
          />
          <br />
          <TextField
            label="Body"
            name="body"
            placeholder="Enter body"
            onChange={myChangeHandler}
          />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={saveItem}>Add new item</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
