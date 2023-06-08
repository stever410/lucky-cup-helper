import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import Spreadsheet, { Matrix } from "react-spreadsheet";
import "./App.css";
import CustomCard from "./components/CustomCard";

const CARD_HEADERS = [
  {
    title: "A dài nhất",
    value: 0,
  },
  {
    title: "B dài nhất",
    value: 0,
  },
  {
    title: "C dài nhất",
    value: 0,
  },
  {
    title: "Dây song song",
    value: 0,
  },
  {
    title: "Dây chùm",
    value: 0,
  },
];

const App = () => {
  const DEFAULT_SIZE = 10;
  const [statistic, setStatistic] = useState(CARD_HEADERS);
  const [data, setData] = useState<Matrix<Item | undefined>>(
    [...new Array(DEFAULT_SIZE)].map(() => new Array(DEFAULT_SIZE))
  );

  const handleDataChanged = (data: Matrix<Item | undefined>) => {
    console.log(data);
    setData(data);
  };

  const calculateLongestColumnWithValue = (
    data: Matrix<Item | undefined>,
    value: string
  ) => {
    // To be implemented
    return 1;
  };

  return (
    <Container>
      <Stack gap={3}>
        <h1 className="text-center">Lucky Cup Helper</h1>
        <ButtonGroup>
          <Button variant="outline-primary">Add row</Button>
          <Button variant="outline-primary">Add column</Button>
          <Button variant="outline-danger">Remove row</Button>
          <Button variant="outline-danger">Remove column</Button>
        </ButtonGroup>
        <Spreadsheet
          className="d-flex justify-content-center"
          data={data}
          onChange={handleDataChanged}
        />
        <Row className="gx-4 gy-4 mx-0">
          {statistic.map(({ title, value }) => (
            <Col xs={6} lg={4}>
              <CustomCard title={title} body={value.toString()} />
            </Col>
          ))}
        </Row>
      </Stack>
    </Container>
  );
};

export default App;
