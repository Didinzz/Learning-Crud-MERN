import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listuser from "./listUser";
import React, { useEffect, useState } from "react";
import AddUser from "./Page/AddUser";
import EditUser from "./Page/EditUser";
import Login from "./Page/Login";
import Auth from "./utils/auth";

function App() {
  const [createFlashMessage, setCreateFlashMessage] = useState("");
  const [editFlashMessage, setEditFlashMessage] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white p-10">
        <Routes>
          <Route
            path="/listuser"
            element={
              <Auth>
                <Listuser
                  createFlashMessage={createFlashMessage}
                  setCreateFlashMessage={setCreateFlashMessage}
                  editFlashMessage={editFlashMessage}
                  setEditFlashMessage={setEditFlashMessage}
                />
              </Auth>
            }
          />
          <Route
            path="/createuser"
            element={
              // <Auth>
              <AddUser flashMassage={setCreateFlashMessage} />
              // </Auth>
            }
          />
          <Route
            path="edituser/:id"
            element={<EditUser setEditFlashMessage={setEditFlashMessage} />}
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
