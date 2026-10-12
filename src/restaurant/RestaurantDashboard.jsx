import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

function RestaurantDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const loadRestaurants = async () => {
    try {
      setLoadingRestaurants(true);
      setMessage("");

      const response = await fetch(`${API_BASE}/restaurants`);

      if (!response.ok) {
        throw new Error("Could not load restaurants");
      }

      const data = await response.json();
      setRestaurants(data);

      if (data.length > 0) {
        setSelectedRestaurantId((current) =>
          current || String(data[0].id)
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Could not load restaurants. Make sure Spring Boot is running on port 8080."
      );
    } finally {
      setLoadingRestaurants(false);
    }
  };

  const loadOrders = async () => {
    if (!selectedRestaurantId) {
      setOrders([]);
      return;
    }

    try {
      setLoadingOrders(true);
      setMessage("");

      const response = await fetch(
        `${API_BASE}/orders/restaurant/${selectedRestaurantId}`
      );

      if (!response.ok) {
        throw new Error("Could not load orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      setMessage(
        "Could not load orders for this restaurant."
      );
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    loadOrders();
  }, [selectedRestaurantId]);

  useEffect(() => {
    if (!selectedRestaurantId) {
      return undefined;
    }

    const timer = setInterval(() => {
      loadOrders();
    }, 5000);

    return () => clearInterval(timer);
  }, [selectedRestaurantId]);

  const updateOrderStatus = async (orderId, action) => {
    try {
      setActionLoading(`${orderId}-${action}`);
      setMessage("");

      const response = await fetch(
        `${API_BASE}/orders/${orderId}/${action}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Could not update order");
      }

      await loadOrders();
      setMessage(`Order #${orderId} updated successfully.`);
    } catch (error) {
      console.error(error);
      setMessage("Could not update the order.");
    } finally {
      setActionLoading(null);
    }
  };

  const selectedRestaurant = restaurants.find(
    (restaurant) =>
      String(restaurant.id) === String(selectedRestaurantId)
  );

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "PLACED" ||
      order.orderStatus === "RESTAURANT_ACCEPTED" ||
      order.orderStatus === "PREPARING" ||
      order.orderStatus === "READY_FOR_PICKUP"
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        color: "#222",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "1px",
                color: "#e85d04",
                marginBottom: "6px",
              }}
            >
              FOODIE
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "32px",
              }}
            >
              Restaurant Portal
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                color: "#666",
              }}
            >
              View and manage customer orders.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              loadRestaurants();
              loadOrders();
            }}
            style={{
              border: "none",
              background: "#111",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            🔄 Refresh
          </button>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "24px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
          }}
        >
          <label
            htmlFor="restaurant-select"
            style={{
              display: "block",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Select Restaurant
          </label>

          {loadingRestaurants ? (
            <p>Loading restaurants...</p>
          ) : restaurants.length === 0 ? (
            <div>
              <p style={{ marginTop: 0 }}>
                No restaurants found.
              </p>

              <p
                style={{
                  background: "#f3f4f6",
                  padding: "12px",
                  borderRadius: "10px",
                  overflowX: "auto",
                }}
              >
                Add one using Postman:
                <br />
                POST http://localhost:8080/api/restaurants
              </p>
            </div>
          ) : (
            <>
              <select
                id="restaurant-select"
                value={selectedRestaurantId}
                onChange={(event) =>
                  setSelectedRestaurantId(event.target.value)
                }
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  padding: "13px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  fontSize: "16px",
                  background: "#fff",
                }}
              >
                {restaurants.map((restaurant) => (
                  <option
                    key={restaurant.id}
                    value={restaurant.id}
                  >
                    {restaurant.name} -{" "}
                    {restaurant.location || "Location"}
                  </option>
                ))}
              </select>

              {selectedRestaurant && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "14px",
                    background: "#fff7ed",
                    borderRadius: "12px",
                  }}
                >
                  <strong>
                    🏪 {selectedRestaurant.name}
                  </strong>

                  <div
                    style={{
                      marginTop: "6px",
                      color: "#666",
                    }}
                  >
                    📍{" "}
                    {selectedRestaurant.location ||
                      "Location not available"}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ color: "#666" }}>Total Orders</div>
            <strong
              style={{
                display: "block",
                fontSize: "30px",
                marginTop: "8px",
              }}
            >
              {orders.length}
            </strong>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ color: "#666" }}>Active Orders</div>
            <strong
              style={{
                display: "block",
                fontSize: "30px",
                marginTop: "8px",
              }}
            >
              {pendingOrders.length}
            </strong>
          </div>
        </div>

        {message && (
          <div
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              color: "#9a3412",
              padding: "14px 16px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "20px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <h2 style={{ margin: 0 }}>
              Customer Orders
            </h2>

            <span
              style={{
                background: "#f3f4f6",
                borderRadius: "999px",
                padding: "8px 12px",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {orders.length} order
              {orders.length === 1 ? "" : "s"}
            </span>
          </div>

          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                color: "#666",
              }}
            >
              <div style={{ fontSize: "46px" }}>
                📦
              </div>

              <h3
                style={{
                  color: "#222",
                  marginBottom: "8px",
                }}
              >
                No orders yet
              </h3>

              <p style={{ margin: 0 }}>
                Place an order from the customer side.
                It will appear here automatically.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "16px",
                    padding: "18px",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "20px",
                        }}
                      >
                        Order #{order.id}
                      </h3>

                      <div
                        style={{
                          marginTop: "6px",
                          color: "#666",
                        }}
                      >
                        Customer ID: {order.customerId}
                      </div>
                    </div>

                    <span
                      style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        borderRadius: "999px",
                        background: "#fef3c7",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <strong>Total</strong>
                      <div>₹{order.totalAmount}</div>
                    </div>

                    <div>
                      <strong>Delivery Address</strong>
                      <div>
                        {order.deliveryAddress || "Not provided"}
                      </div>
                    </div>

                    <div>
                      <strong>Suggested Time</strong>
                      <div>
                        {order.suggestedDeliveryTime ||
                          "Not provided"}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {order.orderStatus === "PLACED" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "accept"
                            )
                          }
                          disabled={
                            actionLoading ===
                            `${order.id}-accept`
                          }
                          style={{
                            border: "none",
                            background: "#16a34a",
                            color: "#fff",
                            padding: "11px 16px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "700",
                          }}
                        >
                          {actionLoading ===
                          `${order.id}-accept`
                            ? "Accepting..."
                            : "✅ Accept"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "reject"
                            )
                          }
                          disabled={
                            actionLoading ===
                            `${order.id}-reject`
                          }
                          style={{
                            border: "none",
                            background: "#dc2626",
                            color: "#fff",
                            padding: "11px 16px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "700",
                          }}
                        >
                          {actionLoading ===
                          `${order.id}-reject`
                            ? "Rejecting..."
                            : "❌ Reject"}
                        </button>
                      </>
                    )}

                    {order.orderStatus ===
                      "RESTAURANT_ACCEPTED" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            "preparing"
                          )
                        }
                        disabled={
                          actionLoading ===
                          `${order.id}-preparing`
                        }
                        style={{
                          border: "none",
                          background: "#ea580c",
                          color: "#fff",
                          padding: "11px 16px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        {actionLoading ===
                        `${order.id}-preparing`
                          ? "Updating..."
                          : "🍳 Start Preparing"}
                      </button>
                    )}

                    {order.orderStatus === "PREPARING" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            "ready"
                          )
                        }
                        disabled={
                          actionLoading ===
                          `${order.id}-ready`
                        }
                        style={{
                          border: "none",
                          background: "#2563eb",
                          color: "#fff",
                          padding: "11px 16px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        {actionLoading ===
                        `${order.id}-ready`
                          ? "Updating..."
                          : "📦 Ready for Pickup"}
                      </button>
                    )}

                    {order.orderStatus ===
                      "READY_FOR_PICKUP" && (
                      <div
                        style={{
                          padding: "11px 16px",
                          borderRadius: "10px",
                          background: "#dcfce7",
                          color: "#166534",
                          fontWeight: "700",
                        }}
                      >
                        🛵 Waiting for Driver
                      </div>
                    )}

                    {order.orderStatus === "DELIVERED" && (
                      <div
                        style={{
                          padding: "11px 16px",
                          borderRadius: "10px",
                          background: "#dcfce7",
                          color: "#166534",
                          fontWeight: "700",
                        }}
                      >
                        ✅ Delivered
                      </div>
                    )}

                    {order.orderStatus ===
                      "RESTAURANT_REJECTED" && (
                      <div
                        style={{
                          padding: "11px 16px",
                          borderRadius: "10px",
                          background: "#fee2e2",
                          color: "#991b1b",
                          fontWeight: "700",
                        }}
                      >
                        ❌ Order Rejected
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDashboard;
