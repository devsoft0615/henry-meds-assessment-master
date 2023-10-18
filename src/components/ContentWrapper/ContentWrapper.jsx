import { Col, Row } from "antd";
import { GoBack } from "../GoBack/GoBack";

export const ContentWrapper = ({ children }) => {
  return (
    <Row justify="center" style={{ margin: "24px 0px" }}>
      <Col lg={18} md={20} sm={22} xs={24}>
        <GoBack />
        {children}
      </Col>
    </Row>
  );
};
