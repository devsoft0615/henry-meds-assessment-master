import { Modal, Select, message } from "antd";
import { useEffect, useState } from "react";
import { API_DATE_FORMAT, API_TIME_FORMAT } from "../../constants/datetime";
import { getAvailableTimes, getProviders } from "../../api/api";

export const BookDialog = ({ open, onClose, onOk, date }) => {
  const [time, setTime] = useState();
  const [providers, setProviders] = useState([]);
  const [times, setTimes] = useState([]);
  const [providersLoading, setProvidersLoading] = useState(false);
  const [timesLoading, setTimesLoading] = useState(false);
  const [provider, setProvider] = useState(undefined);

  const fetchProviders = async () => {
    setProvidersLoading(true);
    try {
      const response = await getProviders();
      setProviders(response.map((p) => ({ label: p.name, value: p.id })));
      setProvider(response[0]?.id);
    } catch (e) {
      message.error("Error fetching providers");
      console.error(e);
    }
    setProvidersLoading(false);
  };

  const fetchTimes = async () => {
    setTimesLoading(true);
    try {
      const response = await getAvailableTimes(
        date.format(API_DATE_FORMAT),
        provider
      );
      setTimes(response.map((t) => ({ label: t, value: t })));
      setTime(response[0]);
    } catch (e) {
      message.error("Error fetching times");
      console.error(e);
    }
    setTimesLoading(false);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    if (provider && date) fetchTimes();
  }, [provider, date]);

  const handleOk = () => {
    onOk(time, provider);
    onClose();
    setTime();
    setProvider(undefined);
  };

  return (
    <Modal
      title={"Book a Reservation on " + date.format("MMM D")}
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      width={300}
    >
      <Select
        options={providers}
        loading={providersLoading}
        style={{ width: "100%", margin: "16px 0px" }}
        placeholder="Select a provider"
        value={provider}
        onChange={setProvider}
      />
      <Select
        options={times}
        loading={timesLoading}
        style={{ width: "100%" }}
        placeholder="Select time"
        value={time}
        onChange={setTime}
      />
    </Modal>
  );
};
