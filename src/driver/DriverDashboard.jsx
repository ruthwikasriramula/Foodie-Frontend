import { useEffect, useState } from "react";
import { API_BASE as API } from "../config/api";

function DriverDashboard({ setPage }) {
  const [drivers, setDrivers] = useState([]);
  const [driverId, setDriverId] = useState(localStorage.getItem("foodieDriverId") || "");
  const [availableOrders, setAvailableOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busyOrder, setBusyOrder] = useState(null);
  useEffect(() => {
    async function loadDrivers() {
      try {
        const response = await fetch(`${API}/drivers`);
        if (!response.ok) throw new Error("Unable to load drivers");
        const data = await response.json();
        setDrivers(data);

        if (data.length > 0) {
          const stored = localStorage.getItem("foodieDriverId");
          const exists = data.some((driver) => String(driver.id) === String(stored));
          const selectedId = exists ? String(stored) : String(data[0].id);
          setDriverId(selectedId);
          localStorage.setItem("foodieDriverId", selectedId);
        }
      } catch (err) {
        setError("Could not load drivers. Check the Spring Boot backend.");
      }
    }
    loadDrivers();
  }, []);

  async function loadOrders() {
    if (!driverId) {
      setAvailableOrders([]);
      setMyOrders([]);
      return;
    }

    try {
      setLoading(true);
      const [availableResponse, myResponse] = await Promise.all([
        fetch(`${API}/orders/available-for-driver/${driverId}`),
        fetch(`${API}/orders/driver/${driverId}`),
      ]);
      if (!availableResponse.ok || !myResponse.ok) {
        throw new Error("Order API failed");
      }
      const availableData = await availableResponse.json();
      const myData = await myResponse.json();
      setAvailableOrders(Array.isArray(availableData) ? availableData : []);
      setMyOrders(Array.isArray(myData) ? myData : []);
      setError("");
    } catch (err) {
      setError("Could not load orders. Check the order endpoints in the backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!driverId) return undefined;
    loadOrders();
    const timer = setInterval(loadOrders, 5000);
    return () => clearInterval(timer);
  }, [driverId]);

  async function acceptOrder(orderId) {
    try {
      setBusyOrder(orderId);
      setError("");
      setMessage("");
      const response = await fetch(`${API}/orders/${orderId}/driver-accept/${driverId}`, {
        method: "PUT",
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || "Could not accept the delivery.");
      }
      setMessage(`Order #${orderId} accepted.`);
      await loadOrders();
    } catch (err) {
      setError(err.message || "Could not accept the delivery.");
    } finally {
      setBusyOrder(null);
    }
  }

  async function rejectOrder(orderId) {
    try {
      setBusyOrder(orderId);
      setError("");
      setMessage("");
      const response = await fetch(`${API}/orders/${orderId}/driver-reject/${driverId}`, {
        method: "PUT",
      });
      if (!response.ok) {
         const details = await response.text();
        throw new Error(details || "Could not decline this order.");
      }
      setMessage(`Order #${orderId} declined. It remains available for other drivers.`);
      await loadOrders();
    } catch (err) {
      setError(err.message || "Could not decline this order.");
    } finally {
      setBusyOrder(null);
    }
  }

  async function updateStatus(orderId, action, successText) {
    try {
      setBusyOrder(orderId);
      setError("");
      setMessage("");
      const response = await fetch(`${API}/orders/${orderId}/${action}`, { method: "PUT" });
      if (!response.ok) throw new Error("Could not update this delivery.");
      setMessage(successText);
      await loadOrders();
    } catch (err) {
      setError(err.message || "Could not update this delivery.");
    } finally {
      setBusyOrder(null);
    }
  }

  const selectedDriver = drivers.find((driver) => String(driver.id) === String(driverId));
  const visibleOrders = availableOrders;
  const activeOrders = myOrders.filter((order) =>
    ["DRIVER_ACCEPTED", "PICKED_UP", "OUT_FOR_DELIVERY"].includes(order.orderStatus)
  );

  const btn = (background) => ({
    background,
    color: "white",
    border: 0,
    borderRadius: 9,
    padding: "11px 16px",
    cursor: "pointer",
    fontWeight: 700,
    marginRight: 8,
    marginTop: 8,
  });

  const card = {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  };

  const timeDetails = (order) => (
    <div style={{ background: "#f9fafb", borderRadius: 10, padding: 12, marginTop: 12 }}>
      <div><strong>Food preparation:</strong> {order.preparationTimeMinutes ? `${order.preparationTimeMinutes} minutes` : "Not set"}</div>
      <div style={{ marginTop: 5 }}><strong>Expected delivery:</strong> {order.expectedDeliveryTime || order.suggestedDeliveryTime || "Not set"}</div>
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#f3f4f6", padding: 24, fontFamily: "Arial, sans-serif", color: "#1f2937" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ background: "#111827", color: "white", padding: 24, borderRadius: 16, marginBottom: 20, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 13, letterSpacing: 1, opacity: 0.75 }}>FOODIE • DRIVER PORTAL</div>
            <h1 style={{ margin: "8px 0" }}>🛵 Driver Dashboard</h1>
            <p style={{ margin: 0 }}>Accept or decline deliveries, pick up parcels, and mark them delivered.</p>
          </div>
          <button onClick={() => setPage("dashboard")} style={{ border: 0, borderRadius: 9, padding: "11px 16px", cursor: "pointer", fontWeight: 700 }}>← Customer Dashboard</button>
        </header>

        <section style={{ background: "white", padding: 20, borderRadius: 14, marginBottom: 18 }}>
          <label htmlFor="driver-select" style={{ display: "block", fontWeight: 700, marginBottom: 9 }}>Select Driver</label>
          <select id="driver-select" value={driverId} onChange={(event) => {
            const id = event.target.value;
            setDriverId(id);
            localStorage.setItem("foodieDriverId", id);
          }} style={{ width: "100%", maxWidth: 480, padding: 12, borderRadius: 9, border: "1px solid #d1d5db" }}>
            {drivers.map((driver) => <option key={driver.id} value={driver.id}>{driver.name} — {driver.vehicleNumber}</option>)}
          </select>
          {selectedDriver && <p>Driver: <strong>{selectedDriver.name}</strong> · Phone: {selectedDriver.phone} · Vehicle: {selectedDriver.vehicleNumber}</p>}
          {drivers.length === 0 && !error && <p>No driver records found. Add a driver using POST /api/drivers in Postman.</p>}
        </section>

        {message && <div style={{ background: "#dcfce7", color: "#166534", padding: 13, borderRadius: 9, marginBottom: 14 }}>{message}</div>}
        {error && <div style={{ background: "#fee2e2", color: "#991b1b", padding: 13, borderRadius: 9, marginBottom: 14 }}>{error}</div>}

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 20 }}>
          <div style={{ background: "white", padding: 18, borderRadius: 14 }}><div>Available deliveries</div><h2>{visibleOrders.length}</h2></div>
          <div style={{ background: "white", padding: 18, borderRadius: 14 }}><div>My active deliveries</div><h2>{activeOrders.length}</h2></div>
          <div style={{ background: "white", padding: 18, borderRadius: 14 }}><div>Completed deliveries</div><h2>{myOrders.filter((order) => order.orderStatus === "DELIVERED").length}</h2></div>
        </section>

        <section style={{ background: "white", padding: 20, borderRadius: 14, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <h2>📦 Available Orders</h2>
            <button onClick={loadOrders} style={{ padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 9, background: "white", cursor: "pointer" }}>↻ Refresh</button>
          </div>
           {loading && <p>Loading orders...</p>}
          {!loading && visibleOrders.length === 0 && <p>No available orders. An order appears here after the restaurant sets the times and marks it Ready for Pickup.</p>}
          {visibleOrders.map((order) => (
            <div key={order.id} style={card}>
              <h3 style={{ marginTop: 0 }}>Order #{order.id}</h3>
              <p><strong>Delivery address:</strong> {order.deliveryAddress || "Not provided"}</p>
              <p><strong>Order amount:</strong> ₹{order.totalAmount}</p>
              {timeDetails(order)}
              <button style={btn("#16a34a")} disabled={busyOrder === order.id} onClick={() => acceptOrder(order.id)}>{busyOrder === order.id ? "Please wait..." : "✓ Accept Delivery"}</button>
              <button style={btn("#dc2626")} onClick={() => rejectOrder(order.id)}>✕ Reject Delivery</button>
            </div>
          ))}
        </section>

        <section style={{ background: "white", padding: 20, borderRadius: 14 }}>
          <h2>🚚 My Deliveries</h2>
          {myOrders.length === 0 && <p>No deliveries have been assigned to this driver yet.</p>}
          {myOrders.map((order) => (
            <div key={order.id} style={card}>
              <h3 style={{ marginTop: 0 }}>Order #{order.id} · {order.orderStatus}</h3>
              <p><strong>Delivery address:</strong> {order.deliveryAddress || "Not provided"}</p>
              <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
              {timeDetails(order)}
              {order.orderStatus === "DRIVER_ACCEPTED" && <button style={btn("#2563eb")} disabled={busyOrder === order.id} onClick={() => updateStatus(order.id, "picked-up", `Order #${order.id}: parcel picked up.`)}>📦 Parcel Picked Up</button>}
              {order.orderStatus === "PICKED_UP" && <button style={btn("#ea580c")} disabled={busyOrder === order.id} onClick={() => updateStatus(order.id, "out-for-delivery", `Order #${order.id} is out for delivery.`)}>🛵 Out for Delivery</button>}
              {order.orderStatus === "OUT_FOR_DELIVERY" && <button style={btn("#16a34a")} disabled={busyOrder === order.id} onClick={() => updateStatus(order.id, "delivered", `Order #${order.id} delivered successfully.`)}>✓ Parcel Delivered</button>}
              {order.orderStatus === "DELIVERED" && <p style={{ color: "#15803d", fontWeight: 700 }}>✓ Delivery completed</p>}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default DriverDashboard;
