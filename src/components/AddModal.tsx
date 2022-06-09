import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addRestaurantThunk } from "../store/slices/restaurantSlice";
import { toast } from "react-toastify";

export const AddModal = (props: {
  isOpen: boolean;
  handleModal: () => void;
}) => {
  const chefs = useAppSelector((state) => state.chefs.chefs);

  const [chef, setChef] = useState(chefs![0].name);
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMostPopular, setIsMostPopular] = useState(false);

  const dispatch = useAppDispatch();

  const resetModal = () => {
    setChef(chefs![0].name);
    setName("");
    setImageSrc("");
    setIsNew(false);
    setIsOpen(false);
    setIsMostPopular(false);
    props.handleModal();
  };

  const handleSubmit = () => {
    dispatch(
      addRestaurantThunk({
        name,
        chef: chefs!.find((c) => c.name === chef)!._id,
        imageSrc,
        isOpen,
        new: isNew,
        mostPopular: isMostPopular,
      })
    ).then((response) => {
      if (response.type === "add/restaurant/fulfilled") {
        resetModal();
        toast.success("restaurant added");
      } else {
        toast.error("adding restaurant rejected");
      }
    });
  };

  return (
    <Modal onHide={props.handleModal} show={props.isOpen}>
      <Modal.Header closeButton>
        <Modal.Title>{`Add Restaurant`}</Modal.Title>
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
            {chefs!.map((chef, index) => {
              return (
                <option key={index} value={chef.name}>
                  {chef.name}
                </option>
              );
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

          <Form.Check
            type='checkbox'
            onChange={(e) => {
              setIsOpen(!isOpen);
            }}
            label='Is Open'
            value={imageSrc}
            placeholder='is'
          />
          <Form.Check
            type='checkbox'
            onChange={(e) => {
              setIsMostPopular(!isMostPopular);
            }}
            label='Most Popular'
            value={imageSrc}
            placeholder='is'
          />
          <Form.Check
            type='checkbox'
            onChange={(e) => {
              setIsNew(!isNew);
            }}
            label='New'
            value={imageSrc}
            placeholder='is'
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
