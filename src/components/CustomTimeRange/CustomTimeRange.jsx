import { TimePicker } from "antd";
import { API_TIME_FORMAT } from "../../constants/datetime";

const { RangePicker } = TimePicker;

export const CustomTimeRange = (props) => {
  return <RangePicker {...props} format={API_TIME_FORMAT} minuteStep={15} />;
};
