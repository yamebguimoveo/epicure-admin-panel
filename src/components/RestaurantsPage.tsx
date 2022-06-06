import React, { useState } from "react";
import { Items } from "./Items";
import { BsFillCloudPlusFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { AddModal } from "./AddModal";
import { useAppSelector } from "../store/hooks";

export const RestaurantsPage = (props: {
  items: Restaurant[] | null;
  status: string;
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const state = useAppSelector((state) => state);

  const handleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  return (
    <div className='restaurants-page'>
      {props.status === "pending" || props.status === "" ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>{props.items ? "Restaurants" : "No restaurants found"}</h2>
          <button onClick={handleAddModal} className='btn btn-success'>
            <BsFillCloudPlusFill />
          </button>
          {!!props.items && <Items items={props.items} />}
        </div>
      )}
      {state.chefs.status === "fulfilled" && (
        <AddModal isOpen={isAddModalOpen} handleModal={handleAddModal} />
      )}
      <ToastContainer />
    </div>
  );
};
