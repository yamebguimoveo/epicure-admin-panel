import React, { Fragment, MouseEventHandler, useState } from "react";
import { BsFillXCircleFill, BsPencilFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteRestaurantThunk } from "../store/slices/restaurantSlice";
import { UpdateForm } from "./UpdateForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Item = (props: { item: Restaurant }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDelete = () => {
    dispatch(deleteRestaurantThunk(props.item._id)).then((response) => {
      if (response.type === "delete/restaurant/:id/fulfilled") {
        toast.success("restaurant deleted");
      } else {
        toast.error("delete rejected");
      }
    });
  };

  const dispatch = useAppDispatch();
  return (
    <Fragment>
      <div className='item'>
        <span className='item-title'>{props.item.name}</span>
        <span className='item-actions'>
          <button
            onClick={() => {
              handleModal();
            }}
            className='item-change'
          >
            <BsPencilFill />
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
            className='item-delete'
          >
            <BsFillXCircleFill />
          </button>
        </span>
      </div>
      <UpdateForm isOpen={isOpen} handleClose={handleModal} item={props.item} />
    </Fragment>
  );
};
