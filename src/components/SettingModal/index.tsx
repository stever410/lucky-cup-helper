import Button from "react-bootstrap/Button";
import Modal, { ModalProps } from "react-bootstrap/Modal";

const SettingModal = (props: ModalProps) => {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Cài đặt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Chức năng chưa có</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingModal;
