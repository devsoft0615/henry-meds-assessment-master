import { Typography, Table, Tag, message, Button, Row } from "antd";
import { useEffect, useState } from "react";
import {
  bookReservation,
  confirmReservation,
  getClientReservations,
} from "../../api/api";
import { API_DATE_FORMAT } from "../../constants/datetime";
import { RESERVATION_STATUS } from "../../constants/reservation";
import { ReservationDialog } from "../../components/ReservationDialog/ReservationDialog";
import { Link } from "react-router-dom";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { BookDialog } from "../../components/BookDialog/BookDialog";
import dayjs from "dayjs";
import { CLIENT_ID } from "../../constants/userdata";

const { Title } = Typography;

export const ClientReservations = ({ date }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [detailOpen, setDetailOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState();

  const handleConfirmReservation = async (id) => {
    setPendingConfirm(id);
    try {
      const reservation = await confirmReservation(id);
      setData(data.map((d) => (d.id === id ? reservation : d)));
      message.success("Reservation confirmed");
    } catch (e) {
      message.error("Error confirming reservation");
      console.error(e);
    }
    setPendingConfirm();
  };

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
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      render: (provider) => (
        <Link
          onClick={() => {
            setModalData(provider);
            setDetailOpen(true);
          }}
        >
          {provider.name}
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (status, row) => (
        <>
          <Tag color={RESERVATION_STATUS[status].color}>
            {RESERVATION_STATUS[status].icon} {RESERVATION_STATUS[status].label}
          </Tag>
          {status === 0 && date.isAfter(dayjs()) && (
            <Tag
              color="blue"
              size="small"
              onClick={() => handleConfirmReservation(row.id)}
              style={{ cursor: "pointer" }}
            >
              {row.id === pendingConfirm && <LoadingOutlined />} Confirm
            </Tag>
          )}
        </>
      ),
    },
  ];

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await getClientReservations(
        date.format(API_DATE_FORMAT),
        CLIENT_ID
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

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const handleCloseBook = () => {
    setBookOpen(false);
  };

  const handleBook = async (time, provider) => {
    setPending(false);
    try {
      await bookReservation(
        date.format(API_DATE_FORMAT),
        provider,
        CLIENT_ID,
        time
      );
      fetchReservations();
      message.success("Reservation booked");
    } catch (e) {
      message.error("Error booking reservation");
      console.error(e);
    }
    setPending(false);
  };

  return (
    <>
      <Title level={5}>Reservations</Title>
      <Table
        rowKey={(row, index) => index}
        columns={columns}
        size="small"
        dataSource={data}
        loading={loading}
      />
      <ReservationDialog
        open={detailOpen}
        onClose={handleCloseDetail}
        data={modalData}
      />
      <BookDialog
        open={bookOpen}
        onClose={handleCloseBook}
        onOk={handleBook}
        date={date}
      />
      <Row justify="center">
        {date.isAfter(dayjs()) && (
          <Button
            type="primary"
            onClick={() => setBookOpen(true)}
            loading={pending}
          >
            <PlusCircleOutlined /> Book a Reservation
          </Button>
        )}
      </Row>
    </>
  );
};
