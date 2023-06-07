import { FC } from "react";
import Card from "react-bootstrap/Card";

interface Props {
  className?: string;
  title: string;
  body: string;
}

const CustomCard: FC<Props> = ({ className, title, body }) => {
  return (
    <Card className={className}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
