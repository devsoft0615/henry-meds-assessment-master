import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const GoBack = () => {
  const navigate = useNavigate();
  return (
    <Row>
      <Button type="link" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
        Go Back
      </Button>
    </Row>
  );
};
