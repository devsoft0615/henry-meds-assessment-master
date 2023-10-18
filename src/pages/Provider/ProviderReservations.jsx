import { Typography, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { getProviderReservations } from "../../api/api";
import { API_DATE_FORMAT } from "../../constants/datetime";
import { RESERVATION_STATUS } from "../../constants/reservation";
import { ReservationDialog } from "../../components/ReservationDialog/ReservationDialog";
import { Link } from "react-router-dom";
import { PROVIDER_ID } from "../../constants/userdata";

const { Title } = Typography;

export const ProviderReservations = ({ date }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (client) => (
        <Link
          onClick={() => {
            setModalData(client);
            setOpen(true);
          }}
        >
          {client.name}
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={RESERVATION_STATUS[status].color}>
          {RESERVATION_STATUS[status].icon} {RESERVATION_STATUS[status].label}
        </Tag>
      ),
    },
  ];

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await getProviderReservations(
        date.format(API_DATE_FORMAT),
        PROVIDER_ID
      );
      setData(response);
    } catch (e) {
      message.error("Error fetching reservations");
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, [date]);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Title level={5}>Reservations</Title>
      <Table
        columns={columns}
        size="small"
        dataSource={data}
        loading={loading}
      />
      <ReservationDialog
        open={open}
        onClose={handleCloseModal}
        data={modalData}
      />
    </>
  );
};
