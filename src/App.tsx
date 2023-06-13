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
import useMatrix from "./hooks/useMatrix";
import useStatistic from "./hooks/useStatistic";

const App = () => {
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
      <Stack gap={3} className="d-flex justify-content-center">
        <h1 className="text-center">Lucky Cup Helper</h1>
        <ButtonGroup>
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
        <Spreadsheet
          className="spreadsheet-container"
          data={matrix}
          onChange={handleChange}
        />
        <ButtonGroup className="">
          <Button variant="outline-primary" onClick={saveMatrixToLocalStorage}>
            Lưu
          </Button>
          <Button variant="outline-danger" onClick={clearMatrix}>
            Xóa toàn bộ giá trị
          </Button>
        </ButtonGroup>
        <Row className="gx-4 gy-4 mx-0">
          {statistic.map(({ title, value }) => (
            <Col key={title} xs={12} sm={6} lg={4}>
              <CustomCard title={title} body={value.toString()} />
            </Col>
          ))}
        </Row>
      </Stack>
    </Container>
  );
};

export default App;
