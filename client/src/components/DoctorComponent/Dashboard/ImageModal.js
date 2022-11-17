import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import noPic from "../../../assets/images/no-pic.jpeg"
const ImageModal = ({ imageURL, isOpen, toggle }) => {
  const toggled = () => toggle({ imageURL: '' })
  return (
        <Modal isOpen={ isOpen } toggle={ toggled }>
          <ModalHeader toggle={ toggled }>Picture</ModalHeader>
          <ModalBody>
            <img src={imageURL?imageURL:noPic } className="img-fluid" alt=''/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={ toggled }>Exit</Button>
          </ModalFooter>
        </Modal>
  )
};

export default ImageModal;
