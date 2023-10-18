import { Descriptions, Modal } from "antd";
import { RESERVATION_STATUS } from "../../constants/reservation";

const { Item } = Descriptions;

export const ReservationDialog = ({ open, onClose, data }) => {
  return (
    <Modal
      title="Client Detail"
      open={open}
      onCancel={onClose}
      onOk={onClose}
      width={400}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Descriptions bordered column={1} style={{ marginTop: 16 }}>
        <Item label="Name">{data.name}</Item>
        <Item label="Phone">{data.phone}</Item>
        <Item label="Email">{data.email}</Item>
      </Descriptions>
    </Modal>
  );
};
