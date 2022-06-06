import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateRestaurantThunk } from "../store/slices/restaurantSlice";
import { ToastContainer, toast } from "react-toastify";

export const UpdateForm = (props: {
  isOpen: boolean;
  item: Restaurant;
  handleClose: () => void;
}) => {
  const [name, setName] = useState(props.item.name);
  const [chef, setChef] = useState(props.item.chef.name);
  const [imageSrc, setImageSrc] = useState(props.item.imageSrc);

  const chefs = useAppSelector((state) => state.chefs.chefs) || [];
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(
      updateRestaurantThunk({
        _id: props.item._id,
        name,
        chef: chefs.find((c) => c.name === chef)!._id,
        imageSrc,
      })
    ).then((response) => {
      if (response.type === "update/restaurant/id/fulfilled") {
        toast.success("restaurant updated");
      } else {
        toast.error("update rejected");
      }
    });
  };

  return (
    <Modal onHide={props.handleClose} show={props.isOpen}>
      <Modal.Header closeButton>
        <Modal.Title>{`Update ${props.item.name}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type='text'
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            value={name}
            placeholder='name input'
          />
          <Form.Label>Chef: </Form.Label>
          <Form.Select
            aria-label='Default'
            onChange={(e) => {
              setChef(e.currentTarget.value);
            }}
            value={chef}
          >
            {chefs.map((chef ,index) => {
              return <option key={index} value={chef.name}>{chef.name}</option>;
            })}
          </Form.Select>
          <Form.Label>Image Src: </Form.Label>
          <Form.Control
            type='text'
            onChange={(e) => {
              setImageSrc(e.currentTarget.value);
            }}
            value={imageSrc}
            placeholder='source input'
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' type='submit' onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
