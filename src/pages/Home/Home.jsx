import { Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const SubAppItem = ({ text, link }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: 240,
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: 24,
      }}
      onClick={() => navigate(link)}
    >
      {text}
    </div>
  );
};

export const Home = () => {
  return (
    <div>
      <Row justify="center" style={{ margin: "24px 0px" }}>
        <Title>Welcome to Henry Meds Assessment</Title>
      </Row>
      <Row justify="center" gutter={16}>
        <Col span={6}>
          <SubAppItem text="PROVIDER" link="/provider" />
        </Col>
        <Col span={6}>
          <SubAppItem text="CLIENT" link="/client" />
        </Col>
      </Row>
    </div>
  );
};
