import { useState } from "react";
import { Card, Container, Row, Stack } from "react-bootstrap";
import Spreadsheet from "react-spreadsheet";
import "./App.css";
import CustomCard from "./components/CustomCard";

const App = () => {
  const DEFAULT_SIZE = 10;

  const [data, setData] = useState<any[][]>(
    [...new Array(DEFAULT_SIZE)].map(() => new Array(DEFAULT_SIZE))
  );

  return (
    <Container>
      <Stack gap={3}>
        <h1 className="text-center">Lucky Cup Helper</h1>
        <Spreadsheet
          className="d-flex justify-content-center"
          data={data}
          onChange={setData}
        />
        <Row xs={6} sm={4} md={3} className="g-4">
          {Array.from({ length: 4 }).map(() => (
            <CustomCard title="Title" body="Body" />
          ))}
        </Row>
      </Stack>
    </Container>
  );
};

export default App;
