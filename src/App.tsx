import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import Spreadsheet from "react-spreadsheet";
import "./App.css";
import CustomCard from "./components/CustomCard";
import IconButton from "./components/IconButton";
import useMatrix from "./hooks/useMatrix";
import useStatistic from "./hooks/useStatistic";
import SettingModal from "./components/SettingModal";
import { useState } from "react";

const App = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const {
    matrix,
    handleChange,
    addColumn,
    addRow,
    removeLastColumn,
    removeLastRow,
    clearMatrix,
    saveMatrixToLocalStorage,
  } = useMatrix();
  const statistic = useStatistic(matrix);

  return (
    <Container fluid>
      <SettingModal show={isModalShow} onHide={() => setIsModalShow(false)} />
      <Stack gap={3} className="d-flex justify-content-center">
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-center align-items-center"
        >
          <h1 className="text-center">Lucky Cup Helper</h1>
          <IconButton
            iconName="GearFill"
            size={24}
            onClick={() => setIsModalShow(true)}
          />
        </Stack>
        <div className="d-flex justify-content-center">
          <ButtonGroup className="w-75">
            <Button variant="outline-primary" onClick={addRow}>
              Thêm dòng
            </Button>
            <Button variant="outline-primary" onClick={addColumn}>
              Thêm cột
            </Button>
            <Button variant="outline-danger" onClick={removeLastRow}>
              Xóa dòng cuối
            </Button>
            <Button variant="outline-danger" onClick={removeLastColumn}>
              Xóa cột cuối
            </Button>
          </ButtonGroup>
        </div>
        <Spreadsheet
          className="spreadsheet-container"
          data={matrix}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-center">
          <ButtonGroup className="w-25">
            <Button
              variant="outline-primary"
              onClick={saveMatrixToLocalStorage}
            >
              Lưu
            </Button>
            <Button variant="outline-danger" onClick={clearMatrix}>
              Xóa
            </Button>
          </ButtonGroup>
        </div>
        <Row className="gx-4 gy-4 mx-0">
          {statistic.map(({ title, value }) => (
            <Col key={title} xs={12} sm={6} lg={4} xl={3}>
              <CustomCard title={title} body={value.toString()} />
            </Col>
          ))}
        </Row>
      </Stack>
    </Container>
  );
};

export default App;
