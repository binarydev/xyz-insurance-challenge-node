import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import 'styles/CustomModal.css'
class CustomModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="small"
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.headerText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.props.children }
        </Modal.Body>
        <Modal.Footer>
          { this.props.buttons }
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CustomModal