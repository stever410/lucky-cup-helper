import { useContext, useState } from "react";
import { Button, Col, Form, Modal, ModalProps, Row } from "react-bootstrap";
import SettingContext from "../../context/SettingContext";
import Threshold from "../../enums/Threshold.enums";

const SettingModal = (props: ModalProps) => {
  const { settings, setSettings } = useContext(SettingContext);
  const [formData, setFormData] = useState<Record<Threshold, number>>(
    settings || {
      [Threshold.LongestLatest]: -1,
      [Threshold.Parallel]: -1,
      [Threshold.Group]: -1,
      [Threshold.Longest]: -1,
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSettings(formData);
    localStorage.setItem("settings", JSON.stringify(formData));
    alert("Lưu thành công");
  };

  const handleChange = (key: Threshold, value: string) => {
    setFormData({
      ...formData,
      [key]: parseInt(value),
    });
  };

  return (
    <Modal {...props} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Cài đặt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" as={Row} name="longestLatestThreshold">
            <Form.Label column sm={3}>
              Ngưỡng kéo dây
            </Form.Label>
            <Col>
              <Form.Control
                type="number"
                min={-1}
                required
                onChange={(e) =>
                  handleChange(Threshold.LongestLatest, e.target.value)
                }
                value={formData[Threshold.LongestLatest]}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row} name="parallelThreshold">
            <Form.Label column sm={3}>
              Ngưỡng song song
            </Form.Label>
            <Col>
              <Form.Control
                type="number"
                min={-1}
                required
                onChange={(e) =>
                  handleChange(Threshold.Parallel, e.target.value)
                }
                value={formData[Threshold.Parallel]}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row} name="groupThreshold">
            <Form.Label column sm={3}>
              Ngưỡng dây chùm
            </Form.Label>
            <Col>
              <Form.Control
                type="number"
                min={-1}
                required
                onChange={(e) => handleChange(Threshold.Group, e.target.value)}
                value={formData[Threshold.Group]}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row} name="longestThreshold">
            <Form.Label column sm={3}>
              Ngưỡng dài nhất
            </Form.Label>
            <Col>
              <Form.Control
                type="number"
                min={-1}
                required
                onChange={(e) =>
                  handleChange(Threshold.Longest, e.target.value)
                }
                value={formData[Threshold.Longest]}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Lưu</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SettingModal;
