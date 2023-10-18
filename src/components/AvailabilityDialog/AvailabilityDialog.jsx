import { Modal } from "antd";
import { CustomTimeRange } from "../CustomTimeRange/CustomTimeRange";
import { useState } from "react";
import { API_TIME_FORMAT } from "../../constants/datetime";

export const AvailabilityDialog = ({ date, open, onOk, onClose }) => {
  const [[from, to], setTimes] = useState([]);

  const handleOk = () => {
    onOk(from.format(API_TIME_FORMAT), to.format(API_TIME_FORMAT));
    onClose();
    setTimes([]);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      title={"Add Availability for " + date.format("MMM D")}
      width={300}
      okButtonProps={{ disabled: !from || !to }}
    >
      <CustomTimeRange
        value={[from, to]}
        onChange={setTimes}
        style={{ marginTop: 16 }}
      />
    </Modal>
  );
};
