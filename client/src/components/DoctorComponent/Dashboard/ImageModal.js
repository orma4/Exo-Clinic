import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ImageModal = ({ imageURL, isOpen, toggle }) => {
  const toggled = () => toggle({ imageURL: '' })
  // console.log(imageURL);
  return (
        <Modal isOpen={ isOpen } toggle={ toggled }>
          <ModalHeader toggle={ toggled }>Modal title</ModalHeader>
          <ModalBody>
            <img src={ imageURL } className="img-fluid" alt=''/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ toggled }>Do Something</Button>{' '}
            <Button color="secondary" onClick={ toggled }>Cancel</Button>
          </ModalFooter>
        </Modal>
  )
};

export default ImageModal;
