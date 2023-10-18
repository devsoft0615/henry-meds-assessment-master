import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Table, Typography, message } from "antd";
import { AvailabilityDialog } from "../../components/AvailabilityDialog/AvailabilityDialog";
import { useEffect, useState } from "react";
import { addAvailability, getAvailability } from "../../api/api";
import { API_DATE_FORMAT } from "../../constants/datetime";
import dayjs from "dayjs";
import { PROVIDER_ID } from "../../constants/userdata";

const { Title } = Typography;

export const ProviderAvailabilities = ({ date }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [data, setData] = useState([]);

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
  ];

  const fetchAvail = async () => {
    setLoading(true);
    try {
      const response = await getAvailability(
        date.format(API_DATE_FORMAT),
        PROVIDER_ID
      );
      setData(response);
    } catch (e) {
      message.error("Error fetching availabilities");
      console.error(e);
    }
    setLoading(false);
  };

  const addAvail = async (from, to) => {
    setPending(true);
    try {
      const response = await addAvailability(
        date.format(API_DATE_FORMAT),
        PROVIDER_ID,
        from,
        to
      );
      fetchAvail();
      message.success("Availability added");
    } catch (e) {
      message.error("Error adding availability");
      console.error(e);
    }
    setPending(false);
  };

  useEffect(() => {
    fetchAvail();
  }, [date]);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenAddModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Flex justify="space-between" align="flex-end">
        <Title level={5}>Availabilities</Title>
        {date.format(API_DATE_FORMAT) >= dayjs().format(API_DATE_FORMAT) && (
          <Button
            style={{ marginBottom: 8 }}
            size="small"
            type="primary"
            onClick={handleOpenAddModal}
            loading={pending}
          >
            <PlusCircleOutlined />
            Add
          </Button>
        )}
      </Flex>
      <Table
        columns={columns}
        size="small"
        dataSource={data}
        loading={loading}
      />
      <AvailabilityDialog
        date={date}
        open={open}
        onClose={handleCloseModal}
        onOk={addAvail}
      />
    </>
  );
};
