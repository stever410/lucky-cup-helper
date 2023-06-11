import { useEffect, useState } from "react";
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

const STATISTIC_HEADERS: Array<Statistic> = [
  {
    id: "longestA",
    title: "A dài nhất",
    value: 0,
  },
  {
    id: "longestB",
    title: "B dài nhất",
    value: 0,
  },
  {
    id: "longestC",
    title: "C dài nhất",
    value: 0,
  },
  {
    id: "mostParallel",
    title: "Dây song song",
    value: 0,
  },
  {
    id: "mostGroup",
    title: "Dây chùm",
    value: 0,
  },
];

const App = () => {
  const [statistic, setStatistic] = useState(STATISTIC_HEADERS);
  const {
    matrix,
    handleChange,
    addColumn,
    addRow,
    removeLastColumn,
    removeLastRow,
    clearMatrix,
    getStatistic,
    saveMatrixToLocalStorage,
  } = useMatrix();

  useEffect(() => {
    const latestStatistic = getStatistic();
    setStatistic(
      statistic.map((s) => ({ ...s, value: latestStatistic[s.id] }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrix]);

  return (
    <Container>
      <Stack gap={3}>
        <h1 className="text-center">Lucky Cup Helper</h1>
        <ButtonGroup>
          <Button variant="outline-primary" onClick={addRow}>
            Add row
          </Button>
          <Button variant="outline-primary" onClick={addColumn}>
            Add column
          </Button>
          <Button variant="outline-danger" onClick={removeLastRow}>
            Remove row
          </Button>
          <Button variant="outline-danger" onClick={removeLastColumn}>
            Remove column
          </Button>
        </ButtonGroup>
        <Spreadsheet
          className="d-flex justify-content-center"
          data={matrix}
          onChange={handleChange}
        />
        <ButtonGroup className="">
          <Button variant="outline-primary" onClick={saveMatrixToLocalStorage}>
            Save
          </Button>
          <Button variant="outline-danger" onClick={clearMatrix}>
            Clear
          </Button>
        </ButtonGroup>
        <Row className="gx-4 gy-4 mx-0">
          {statistic.map(({ title, value }) => (
            <Col key={title} xs={6} lg={4}>
              <CustomCard title={title} body={value.toString()} />
            </Col>
          ))}
        </Row>
      </Stack>
    </Container>
  );
};

export default App;
