import { Fragment } from "react";
import ReactDOM from "react-dom";
import "./../css/Modal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalModal = document.getElementById("modal");
  const portalBackdrop = document.getElementById("backdrop");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalBackdrop
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalModal
      )}
    </Fragment>
  );
};

export default Modal;
