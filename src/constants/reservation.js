import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export const RESERVATION_STATUS = {
  0: { label: "Pending", color: "purple", icon: <ClockCircleOutlined /> },
  1: { label: "Booked", color: "green", icon: <CheckCircleOutlined /> },
  2: { label: "Expired", color: "red", icon: <CloseCircleOutlined /> },
};
