import { ContentWrapper } from "../../components/ContentWrapper/ContentWrapper";
import { Col, Flex, Row, Typography } from "antd";
import { CustomCalendar } from "../../components/CustomCalendar/CustomCalendar";
import { useState } from "react";
import dayjs from "dayjs";
import { ProviderAvailabilities } from "./ProviderAvailabilities";
import { ProviderReservations } from "./ProviderReservations";
import { TITLE_DATE_FORMAT } from "../../constants/datetime";

const { Title } = Typography;

export const Provider = () => {
  const [date, setDate] = useState(dayjs(new Date()));

  return (
    <ContentWrapper>
      <Title>PROVIDER</Title>
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
          <Row gutter={16}>
            <Col sm={10} xs={24}>
              <ProviderAvailabilities date={date} />
            </Col>
            <Col sm={14} xs={24}>
              <ProviderReservations date={date} />
            </Col>
          </Row>
        </div>
      </Flex>
    </ContentWrapper>
  );
};
