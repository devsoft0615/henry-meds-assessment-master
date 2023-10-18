import { TimePicker } from "antd";
import { API_TIME_FORMAT } from "../../constants/datetime";

export const CustomTimePicker = (props) => {
  return <TimePicker {...props} format={API_TIME_FORMAT} minuteStep={15} />;
};
