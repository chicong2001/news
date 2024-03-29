import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../../actions/user.action";
import { setMessage } from "../../../actions/message.action";
import { closeMessage } from "../closeMessage";

export default function Infomation() {
  const {users} = useSelector(state => state);
  // const [users, setUsers] = useState("");
  // const appState = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [users]);

  // useEffect(() => {
  //   if (appState.users.data) {
  //     setUsers(appState.users.data);
  //   }
  // }, [appState.users.data]);

  const hanldeChangeUpload = async e => {
    const formData = new FormData();
    console.log("data" + e.target.files)
    await formData.append("file", e.target.files[0]);
    try {
      const res = await axios.put(`/login/uploadAvatar/${users.data._id}`, formData);
      const { username, email, role, image, _id } = res.data.data;
      const { code, message } = res.data;

      dispatch(addUser({ username, email, role, image, _id }));
      dispatch(setMessage({ code, message }));
      dispatch(closeMessage());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center shadow rounded p-1">
      <img
        src={`/uploads/users/${users.data.image || "avatar-default.jpg"}`}
        className="avatar img-circle img-thumbnail"
        alt="avatar"
      />
      <h6>Thay đổi ảnh đại diện...</h6>
      <div className="custom-file mb-3">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          name="filename"
          onChange={hanldeChangeUpload}
        />
        <label className="custom-file-label" htmlFor="customFile">
          Chọn ảnh
        </label>
      </div>
    </div>
  );
}
