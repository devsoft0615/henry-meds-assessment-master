import dayjs from "dayjs";

let providers = [
  {
    id: 1,
    name: "William Rincon",
    phone: "111-111-1111",
    email: "william@email.com",
  },
  {
    id: 2,
    name: "Eric Belair",
    phone: "222-222-2222",
    email: "eric@email.com",
  },
];

let clients = [
  {
    id: 1,
    name: "Phil Tome",
    phone: "333-333-3333",
    email: "phil@email.com",
  },
  {
    id: 2,
    name: "John Doe",
    phone: "444-444-4444",
    email: "john@email.com",
  },
];

let avail = [
  { id: 1, provider: 1, date: "2023-10-13", from: "10:00", to: "17:00" },
  { id: 2, provider: 1, date: "2023-10-14", from: "10:00", to: "12:00" },
  { id: 3, provider: 1, date: "2023-10-14", from: "15:00", to: "17:00" },
  { id: 4, provider: 2, date: "2023-10-13", from: "10:00", to: "13:00" },
  { id: 5, provider: 2, date: "2023-10-13", from: "15:00", to: "17:00" },
  { id: 6, provider: 2, date: "2023-10-15", from: "12:00", to: "17:00" },
];

let reservations = [
  {
    id: 1,
    provider: 1,
    client: 1,
    date: "2023-10-13",
    time: "10:00",
    status: 0,
    timestamp: "2023-10-13T10:30:00",
  },
  {
    id: 2,
    provider: 1,
    client: 1,
    date: "2023-10-14",
    time: "11:00",
    status: 1,
    timestamp: "2023-10-13T10:30:00",
  },
  {
    id: 3,
    provider: 1,
    client: 2,
    date: "2023-10-13",
    time: "10:30",
    status: 1,
    timestamp: "2023-10-13T10:30:00",
  },
  {
    id: 4,
    provider: 1,
    client: 2,
    date: "2023-10-14",
    time: "10:30",
    status: 0,
    timestamp: "2023-10-13T10:00:00",
  },
  {
    id: 5,
    provider: 2,
    client: 1,
    date: "2023-10-13",
    time: "10:15",
    status: 1,
    timestamp: "2023-10-13T10:30:00",
  },
  {
    id: 6,
    provider: 2,
    client: 1,
    date: "2023-10-14",
    time: "11:15",
    status: 0,
    timestamp: "2023-10-13T10:00:00",
  },
  {
    id: 7,
    provider: 2,
    client: 2,
    date: "2023-10-13",
    time: "10:45",
    status: 0,
    timestamp: "2023-10-13T10:30:00",
  },
  {
    id: 8,
    provider: 2,
    client: 2,
    date: "2023-10-14",
    time: "10:45",
    status: 0,
    timestamp: "2023-10-13T10:00:00",
  },
];

export const getAvailability = (date, provider = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!provider) {
        resolve(avail.filter((a) => a.date === date));
      } else {
        resolve(
          avail.filter((a) => a.date === date && a.provider === provider)
        );
      }
    }, 1000);
  });
};

export const addAvailability = (date, provider, from, to) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredAvail = avail.filter(
        (a) => a.date === date && a.provider === provider
      );
      for (const a of filteredAvail) {
        if ((a.from <= from && from < a.to) || (a.from < to && to <= a.to)) {
          reject(new Error("Availability overlaps with existing availability"));
          return;
        }
      }
      avail.push({
        id: avail.length + 1,
        provider: provider,
        date: date,
        from: from,
        to: to,
      });
      resolve(avail);
    }, 1000);
  });
};

export const getProviderReservations = (date, provider) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        reservations
          .filter(
            (r) =>
              r.date === date &&
              r.provider === provider &&
              (r.status === 1 ||
                (r.status === 0 && dayjs(r.timestamp).add(30, "m") >= dayjs()))
          )
          .sort((a, b) => {
            if (a.time < b.time) {
              return -1;
            }
            if (a.time > b.time) {
              return 1;
            }
            return 0;
          })
          .map((a) => ({
            id: a.id,
            from: a.time,
            to: dayjs(date + a.time)
              .add(15, "m")
              .format("HH:mm"),
            client: clients.find((c) => c.id === a.client),
            status: a.status,
          }))
      );
    }, 1000);
  });
};

export const getClientReservations = (date, client) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        reservations
          .filter((r) => r.date === date && r.client === client)
          .sort((a, b) => {
            if (a.time < b.time) {
              return -1;
            }
            if (a.time > b.time) {
              return 1;
            }
            return 0;
          })
          .map((a) => ({
            id: a.id,
            from: a.time,
            to: dayjs(date + a.time)
              .add(15, "m")
              .format("HH:mm"),
            provider: providers.find((c) => c.id === a.provider),
            status:
              a.status || (dayjs(a.timestamp).add(30, "m") >= dayjs() ? 0 : 2),
          }))
      );
    }, 1000);
  });
};

const checkBookable = (date, time, provider) => {
  if (dayjs().add(24, "hours") >= dayjs(date + time)) return false;
  const providerAvail = avail.filter(
    (a) => a.provider === provider && a.date === date
  );
  if (!providerAvail.length) return false;
  if (
    avail.filter(
      (a) =>
        a.date === date &&
        a.provider === provider &&
        a.from <= time &&
        a.to > time
    ).length === 0
  )
    return false;
  if (
    reservations.filter(
      (r) =>
        r.date === date &&
        r.provider === provider &&
        r.time === time &&
        (r.status === 1 ||
          (r.status === 0 && dayjs(r.timestamp).add(30, "m") >= dayjs()))
    ).length
  )
    return false;
  return true;
};

export const getAvailableTimes = (date, provider) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(96)
          .fill(0)
          .map(
            (_, i) =>
              `${(i / 4).toFixed(0).padStart(2, "0")}:${((i % 4) * 15)
                .toFixed(0)
                .padStart(2, "0")}`
          )
          .filter((time) => checkBookable(date, time, provider))
          .sort()
      );
    }, 1000);
  });
};

export const bookReservation = (date, provider, client, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dayjs().add(24, "hours") >= dayjs(date + time)) {
        reject(
          new Error("Reservations must be made at least 24 hours in advance")
        );
        return;
      }
      const providerAvail = avail.filter(
        (a) => a.provider === provider && a.date === date
      );
      if (!providerAvail.length) {
        reject(new Error("Provider is not available on this date"));
        return;
      }
      let available = false;
      for (const a of providerAvail) {
        if (a.from <= time && time < a.to) {
          available = true;
          break;
        }
      }
      if (!available) {
        reject(new Error("Provider is not available at this time"));
        return;
      }
      if (
        reservations.filter(
          (r) => r.date === date && r.provider === provider && r.time === time
        ).length
      ) {
        reject(new Error("Reservation already exists"));
        return;
      }
      reservations.push({
        id: reservations.length + 1,
        provider: provider,
        client: client,
        date: date,
        time: time,
        status: 0,
        timestamp: dayjs().toISOString(),
      });
      resolve(reservations);
    }, 1000);
  });
};

export const getProviders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(providers);
    }, 1000);
  });
};

export const confirmReservation = (reservationId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reservation = reservations.find((r) => r.id === reservationId);
      if (reservation.status !== 0) {
        reject("Reservation already confirmed");
        return;
      }
      if (dayjs(reservation.timestamp).add(30, "m") < dayjs()) {
        reject("Reservation must be confirmed within 30 minutes");
        return;
      }
      reservation.status = 1;
      resolve({
        id: reservation.id,
        from: reservation.time,
        to: dayjs(reservation.date + reservation.time)
          .add(15, "m")
          .format("HH:mm"),
        provider: providers.find((c) => c.id === reservation.provider),
        status: reservation.status,
      });
    }, 1000);
  });
};
