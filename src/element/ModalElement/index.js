import React from "react";
import propTypes from "prop-types";
import { Modal } from "react-bootstrap";
import "./index.scss";

export default function ModalElement(props) {
  const { show, funcModal, heading, size } = props;
  let className = [];
  if (props.isDongker) className.push("isdongker");
  return (
    <Modal show={show} onHide={funcModal} centered={props.isCentered} className={`${className.join(" ")}`} size={size}>
      {props.isHeader ? (
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
      ) : (
        ""
      )}
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}

ModalElement.propTypes = {
  heading: propTypes.string,
  funcModal: propTypes.func,
  show: propTypes.bool,
  isHeader: propTypes.bool,
  isCentered: propTypes.bool,
  isDongker: propTypes.bool,
  size: propTypes.string,
};
