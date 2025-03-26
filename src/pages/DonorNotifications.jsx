import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8081");

const DonorNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    socket.emit("joinRoom", localStorage.getItem("userEmail"));

    socket.on("newRequest", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("newRequest");
    };
  }, []);

  const fetchNotifications = async () => {
    const response = await fetch(`http://localhost:8081/api/notifications/${localStorage.getItem("userEmail")}`);
    const data = await response.json();
    setNotifications(data);
  };

  const handleResponse = async (id, status) => {
    await fetch(`http://localhost:8081/api/notifications/update-request/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setNotifications(notifications.filter((n) => n._id !== id));
  };

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notif) => (
        <div key={notif._id}>
          <p>{notif.recipientEmail} requested {notif.itemName}</p>
          <button onClick={() => handleResponse(notif._id, "Accepted")}>Accept</button>
          <button onClick={() => handleResponse(notif._id, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default DonorNotifications;
