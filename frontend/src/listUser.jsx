import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "flowbite-react";
import AlertMassage from "./components/AlertMassage";

const listUser = ({
  createFlashMessage,
  setCreateFlashMessage,
  editFlashMessage,
  setEditFlashMessage,
}) => {
  const [users, setUsers] = useState([]);
  const [deletFlashMassage, setdeletFlashMassage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, [navigate]);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    let timer;
    if (createFlashMessage) {
      timer = setTimeout(() => setCreateFlashMessage(""), 5000);
    }
    return () => clearTimeout(timer);
  }, [createFlashMessage, setCreateFlashMessage]);

  const deleteUser = async (id) => {
    try {
      const respons = await axios.delete(
        `http://localhost:5000/user/delete/${id}`
      );
      setdeletFlashMassage(respons.data.message);
      // setCreateFlashMessage("");
      // setEditFlashMessage("");
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });

      navigate("/");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:roundedlg">
        {editFlashMessage ? (
          <AlertMassage
            flashMessage={editFlashMessage}
            color="yellow"
            setFlashMassage={setEditFlashMessage}
          />
        ) : createFlashMessage ? (
          <AlertMassage
            flashMessage={createFlashMessage}
            color="green"
            setFlashMassage={setCreateFlashMessage}
          />
        ) : deletFlashMassage ? (
          <AlertMassage
            flashMessage={deletFlashMassage}
            color="red"
            setFlashMassage={setdeletFlashMassage}
          />
        ) : null}

        <div className="flex justify-between">
          <h1 className="text-2xl m-4 font-extrabold">Tabel User</h1>
          <div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-4 rounded"
              onClick={handleLogout}>
              Logout
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-4 rounded">
              <Link to={"/createuser"}>Add User</Link>
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name User
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/edituser/${user._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline m-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default listUser;
