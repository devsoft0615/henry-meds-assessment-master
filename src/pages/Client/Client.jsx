import { ContentWrapper } from "../../components/ContentWrapper/ContentWrapper";
import { Col, Flex, Row, Typography } from "antd";
import { CustomCalendar } from "../../components/CustomCalendar/CustomCalendar";
import { useState } from "react";
import dayjs from "dayjs";
import { TITLE_DATE_FORMAT } from "../../constants/datetime";
import { ClientReservations } from "./ClientReservations";

const { Title } = Typography;

export const Client = () => {
  const [date, setDate] = useState(dayjs(new Date()));

  return (
    <ContentWrapper>
      <Title>CLIENT</Title>
      <Flex gap={16} align="flex-start">
        <div style={{ width: 300 }}>
          <CustomCalendar value={date} onChange={setDate} />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            {date.format(TITLE_DATE_FORMAT)}
          </Title>
          <Row gutter={16} justify="center">
            <Col md={18} sm={24}>
              <ClientReservations date={date} />
            </Col>
          </Row>
        </div>
      </Flex>
    </ContentWrapper>
  );
};
