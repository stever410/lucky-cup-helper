import { FC } from "react";
import Card from "react-bootstrap/Card";
import Icon from "../Icon";

interface Props {
  className?: string;
  title: string;
  body: string;
  blink?: boolean;
}

const CustomCard: FC<Props> = ({ className, title, body, blink = false }) => {
  return (
    <Card className={className}>
      <Card.Body>
        <Card.Title className="d-flex align-items-center justify-content-between">
          {title}
          {blink && <Icon iconName="Fire" color="#ff1313" />}
        </Card.Title>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
