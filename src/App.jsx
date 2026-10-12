import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { API_BASE } from "./config/api";
import DriverDashboard from "./driver/DriverDashboard";

/* =========================================================
   API
========================================================= */


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Biryani", icon: "🍛" },
  { name: "Chinese", icon: "🥡" },
  { name: "Pasta", icon: "🍝" },
  { name: "Wraps", icon: "🌯" },
  { name: "Sandwiches", icon: "🥪" },
  { name: "Starters", icon: "🍟" },
  { name: "Desserts", icon: "🍰" },
  { name: "Drinks", icon: "🥤" },
];

/* =========================================================
   FOOD DATA
========================================================= */

const vegFoods = {
  Pizza: [
    "Margherita Pizza",
    "Veg Loaded Pizza",
    "Paneer Pizza",
    "Farmhouse Pizza",
    "Corn Cheese Pizza",
    "Mushroom Pizza",
    "Tandoori Paneer Pizza",
    "Peri Peri Veg Pizza",
    "Mexican Veg Pizza",
    "Cheese Burst Veg Pizza",
  ],

  Burger: [
    "Veg Burger",
    "Aloo Tikki Burger",
    "Paneer Burger",
    "Cheese Veg Burger",
    "Mexican Veg Burger",
    "Mushroom Burger",
    "Peri Peri Veg Burger",
    "Crispy Veg Burger",
    "Double Veg Burger",
    "Spicy Paneer Burger",
  ],

  Biryani: [
    "Veg Biryani",
    "Paneer Biryani",
    "Mushroom Biryani",
    "Kaju Biryani",
    "Vegetable Dum Biryani",
    "Baby Corn Biryani",
    "Soya Biryani",
    "Mixed Veg Biryani",
    "Tandoori Paneer Biryani",
    "Special Veg Biryani",
  ],

  Chinese: [
    "Veg Fried Rice",
    "Schezwan Fried Rice",
    "Veg Hakka Noodles",
    "Schezwan Noodles",
    "Veg Manchurian",
    "Chilli Paneer",
    "Spring Rolls",
    "Gobi Manchurian",
    "Chilli Gobi",
    "Veg Momos",
  ],

  Pasta: [
    "White Sauce Pasta",
    "Red Sauce Pasta",
    "Pink Sauce Pasta",
    "Arrabbiata Pasta",
    "Alfredo Pasta",
    "Pesto Pasta",
    "Masala Pasta",
    "Veg Penne Pasta",
    "Mushroom Pasta",
    "Spicy Paneer Pasta",
  ],

  Wraps: [
    "Veg Wrap",
    "Paneer Wrap",
    "Cheese Veg Wrap",
    "Mexican Veg Wrap",
    "Peri Peri Veg Wrap",
    "Mushroom Wrap",
    "Tandoori Paneer Wrap",
    "Crispy Veg Wrap",
    "Corn Cheese Wrap",
    "Spicy Paneer Wrap",
  ],

  Sandwiches: [
    "Veg Sandwich",
    "Paneer Sandwich",
    "Cheese Veg Sandwich",
    "Grilled Veg Sandwich",
    "Corn Cheese Sandwich",
    "Mushroom Sandwich",
    "Club Veg Sandwich",
    "Mexican Sandwich",
    "Peri Peri Paneer Sandwich",
    "Spicy Veg Sandwich",
  ],

  Starters: [
    "Paneer Tikka",
    "Gobi 65",
    "Veg Manchurian",
    "Crispy Corn",
    "French Fries",
    "Chilli Paneer",
    "Veg Spring Rolls",
    "Hara Bhara Kebab",
    "Cheese Balls",
    "Baby Corn 65",
  ],

  Desserts: [
    "Chocolate Cake",
    "Brownie",
    "Gulab Jamun",
    "Rasmalai",
    "Vanilla Ice Cream",
    "Chocolate Mousse",
    "Cheesecake",
    "Fruit Custard",
    "Jalebi",
    "Gajar Halwa",
  ],

  Drinks: [
    "Fresh Lime Soda",
    "Mango Juice",
    "Orange Juice",
    "Watermelon Juice",
    "Strawberry Shake",
    "Chocolate Shake",
    "Vanilla Shake",
    "Cold Coffee",
    "Masala Lemonade",
    "Sweet Lassi",
  ],
};

const nonVegFoods = {
  Pizza: [
    "Chicken Pizza",
    "Chicken Cheese Pizza",
    "Chicken Tikka Pizza",
    "BBQ Chicken Pizza",
    "Peri Peri Chicken Pizza",
    "Tandoori Chicken Pizza",
    "Spicy Chicken Pizza",
    "Chicken Sausage Pizza",
    "Double Chicken Pizza",
    "Chicken Supreme Pizza",
  ],

  Burger: [
    "Chicken Burger",
    "Crispy Chicken Burger",
    "Chicken Cheese Burger",
    "BBQ Chicken Burger",
    "Peri Peri Chicken Burger",
    "Chicken Tikka Burger",
    "Spicy Chicken Burger",
    "Double Chicken Burger",
    "Grilled Chicken Burger",
    "Chicken Zinger Burger",
  ],

  Biryani: [
    "Chicken Biryani",
    "Chicken Dum Biryani",
    "Chicken 65 Biryani",
    "Mutton Biryani",
    "Egg Biryani",
    "Fish Biryani",
    "Prawn Biryani",
    "Tandoori Chicken Biryani",
    "Special Chicken Biryani",
    "Chicken Family Biryani",
  ],

  Chinese: [
    "Chicken Fried Rice",
    "Chicken Schezwan Rice",
    "Chicken Hakka Noodles",
    "Chicken Schezwan Noodles",
    "Chilli Chicken",
    "Chicken Manchurian",
    "Chicken Spring Rolls",
    "Chicken Momos",
    "Dragon Chicken",
    "Schezwan Chicken",
  ],

  Pasta: [
    "Chicken Alfredo Pasta",
    "Chicken White Sauce Pasta",
    "Chicken Red Sauce Pasta",
    "Chicken Arrabbiata Pasta",
    "Chicken Pesto Pasta",
    "Spicy Chicken Pasta",
    "BBQ Chicken Pasta",
    "Tandoori Chicken Pasta",
    "Chicken Penne Pasta",
    "Creamy Chicken Pasta",
  ],

  Wraps: [
    "Chicken Wrap",
    "Chicken Cheese Wrap",
    "Chicken Tikka Wrap",
    "BBQ Chicken Wrap",
    "Peri Peri Chicken Wrap",
    "Tandoori Chicken Wrap",
    "Crispy Chicken Wrap",
    "Spicy Chicken Wrap",
    "Grilled Chicken Wrap",
    "Chicken Seekh Wrap",
  ],

  Sandwiches: [
    "Chicken Sandwich",
    "Chicken Cheese Sandwich",
    "Grilled Chicken Sandwich",
    "BBQ Chicken Sandwich",
    "Chicken Tikka Sandwich",
    "Spicy Chicken Sandwich",
    "Peri Peri Chicken Sandwich",
    "Club Chicken Sandwich",
    "Crispy Chicken Sandwich",
    "Tandoori Chicken Sandwich",
  ],

  Starters: [
    "Chicken 65",
    "Chicken Tikka",
    "Chicken Lollipop",
    "Chilli Chicken",
    "Chicken Kebab",
    "Chicken Wings",
    "Chicken Manchurian",
    "Fish Fingers",
    "Prawn Fry",
    "Tandoori Chicken",
  ],

  Desserts: vegFoods.Desserts,
  Drinks: vegFoods.Drinks,
};

/* =========================================================
   DELIVERY LOCATIONS
========================================================= */

const deliveryLocations = [
  {
    name: "Banjara Hills",
    lat: 17.4156,
    lng: 78.4347,
  },
  {
    name: "Madhapur",
    lat: 17.4483,
    lng: 78.3915,
  },
  {
    name: "Hitech City",
    lat: 17.4435,
    lng: 78.3772,
  },
  {
    name: "Gachibowli",
    lat: 17.4401,
    lng: 78.3489,
  },
  {
    name: "Kukatpally",
    lat: 17.4849,
    lng: 78.4138,
  },
  {
    name: "Secunderabad",
    lat: 17.4399,
    lng: 78.4983,
  },
  {
    name: "Begumpet",
    lat: 17.4448,
    lng: 78.4662,
  },
  {
    name: "Ameerpet",
    lat: 17.4375,
    lng: 78.4483,
  },
];

/* =========================================================
   DEFAULT USER
========================================================= */

const defaultUser = {
  name: "",
  email: "",
  phone: "",
  address: "",
  deliveryLocation: "Banjara Hills",
};

/* =========================================================
   HELPERS
========================================================= */

function getDishPrice(category, index, foodType) {
  const prices = {
    Pizza: 249,
    Burger: 169,
    Biryani: 229,
    Chinese: 189,
    Pasta: 219,
    Wraps: 159,
    Sandwiches: 139,
    Starters: 149,
    Desserts: 129,
    Drinks: 99,
  };

  const extra = foodType === "Non-Veg" ? 40 : 0;

  return prices[category] + index * 15 + extra;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  if (
    lat1 === undefined ||
    lon1 === undefined ||
    lat2 === undefined ||
    lon2 === undefined
  ) {
    return 0;
  }

  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* =========================================================
   RESTAURANT PAGE
========================================================= */

function RestaurantPage({ setPage }) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [timingInputs, setTimingInputs] = useState({});

  const timingValue = (order, field) => {
    const editedValue = timingInputs[order.id]?.[field];
    if (editedValue !== undefined) return editedValue;
    return order[field] ?? "";
  };

  const sendOrderTiming = async (orderId) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order) throw new Error("Order not found in the dashboard.");

    const preparationTimeMinutes = timingValue(
      order,
      "preparationTimeMinutes"
    );
    const expectedDeliveryTime = timingValue(
      order,
      "expectedDeliveryTime"
    );

    if (!preparationTimeMinutes || Number(preparationTimeMinutes) <= 0) {
      throw new Error("Enter the food preparation time in minutes.");
    }

    if (!expectedDeliveryTime) {
      throw new Error("Enter the expected delivery time.");
    }

    const response = await fetch(`${API_BASE}/orders/${orderId}/timing`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        preparationTimeMinutes: Number(preparationTimeMinutes),
        expectedDeliveryTime,
      }),
    });

    if (!response.ok) {
      throw new Error("Could not save preparation and delivery times.");
    }

    const savedOrder = await response.json();
    setOrders((currentOrders) =>
      currentOrders.map((item) =>
        item.id === savedOrder.id ? savedOrder : item
      )
    );
    return savedOrder;
  };

  const saveOrderTiming = async (orderId) => {
    try {
      setActionLoading(`${orderId}-timing`);
      setError("");
      await sendOrderTiming(orderId);
    } catch (err) {
      setError(err.message || "Could not save order times.");
    } finally {
      setActionLoading(null);
    }
  };

  const loadRestaurants = async () => {
    try {
      setError("");
      setLoadingRestaurants(true);

      const response = await fetch(`${API_BASE}/restaurants`);

      if (!response.ok) {
        throw new Error("Unable to load restaurants");
      }

      const data = await response.json();
      setRestaurants(data);

      if (data.length > 0) {
        const savedRestaurant = localStorage.getItem("foodieRestaurantAdmin");
        const savedId = savedRestaurant
          ? JSON.parse(savedRestaurant)?.id
          : null;

        const firstId = data.some((item) => item.id === savedId)
          ? savedId
          : data[0].id;

        setSelectedRestaurantId(String(firstId));
      }
    } catch (error) {
      setError("Could not connect to the restaurant API.");
    } finally {
      setLoadingRestaurants(false);
    }
  };

  const loadOrders = async (restaurantId) => {
    if (!restaurantId) {
      setOrders([]);
      return;
    }

    try {
      setError("");
      setLoadingOrders(true);

      const response = await fetch(
        `${API_BASE}/orders/restaurant/${restaurantId}`
      );

      if (!response.ok) {
        throw new Error("Unable to load orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError("Could not load restaurant orders.");
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (!selectedRestaurantId) {
      return;
    }

    const selected = restaurants.find(
      (restaurant) => String(restaurant.id) === String(selectedRestaurantId)
    );

    if (selected) {
      localStorage.setItem(
        "foodieRestaurantAdmin",
        JSON.stringify(selected)
      );
    }

    loadOrders(selectedRestaurantId);
  }, [selectedRestaurantId, restaurants]);

  const updateOrder = async (orderId, action) => {
    try {
      setActionLoading(`${orderId}-${action}`);
      setError("");

      // The restaurant must save the two time fields before accepting an order.
      if (action === "accept") {
        await sendOrderTiming(orderId);
      }

      const response = await fetch(
        `${API_BASE}/orders/${orderId}/${action}`,
        { method: "PUT" }
      );

      if (!response.ok) {
        throw new Error("Order update failed.");
      }

      const updatedOrder = await response.json();
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    } catch (err) {
      setError(err.message || "Could not update this order.");
    } finally {
      setActionLoading(null);
    }
  };

  const selectedRestaurant = restaurants.find(
    (restaurant) => String(restaurant.id) === String(selectedRestaurantId)
  );

  const placedOrders = orders.filter(
    (order) => order.orderStatus === "PLACED"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.orderStatus === "PREPARING"
  ).length;

  const readyOrders = orders.filter(
    (order) => order.orderStatus === "READY_FOR_PICKUP"
  ).length;

  const statusLabel = (status) => {
    const labels = {
      PLACED: "New Order",
      RESTAURANT_ACCEPTED: "Accepted",
      RESTAURANT_REJECTED: "Rejected",
      PREPARING: "Preparing",
      READY_FOR_PICKUP: "Ready for Pickup",
      DRIVER_ACCEPTED: "Driver Accepted",
      PICKED_UP: "Picked Up",
      OUT_FOR_DELIVERY: "Out for Delivery",
      DELIVERED: "Delivered",
    };

    return labels[status] || status;
  };

  const statusClass = (status) =>
    status ? status.toLowerCase().replaceAll("_", "-") : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fc",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#111827",
            color: "white",
            borderRadius: "18px",
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: "14px", opacity: 0.75 }}>
              FOODIE • RESTAURANT PORTAL
            </div>
            <h1 style={{ margin: "8px 0 4px" }}>
              {selectedRestaurant?.name || "Restaurant Dashboard"}
            </h1>
            <div style={{ opacity: 0.8 }}>
              Manage incoming orders and update preparation status.
            </div>
          </div>

          <button
            onClick={() => setPage("dashboard")}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "11px 16px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            ← Customer Food Page
          </button>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "18px",
            marginTop: "20px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Select Restaurant
          </label>

          <select
            value={selectedRestaurantId}
            onChange={(event) => setSelectedRestaurantId(event.target.value)}
            disabled={loadingRestaurants || restaurants.length === 0}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
            }}
          >
            {restaurants.length === 0 && (
              <option value="">No restaurants available</option>
            )}

            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name} — {restaurant.location}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "14px",
              borderRadius: "12px",
              marginTop: "16px",
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <div style={restaurantStatStyle}>
            <span>NEW ORDERS</span>
            <strong>{placedOrders}</strong>
          </div>
          <div style={restaurantStatStyle}>
            <span>PREPARING</span>
            <strong>{preparingOrders}</strong>
          </div>
          <div style={restaurantStatStyle}>
            <span>READY</span>
            <strong>{readyOrders}</strong>
          </div>
          <div style={restaurantStatStyle}>
            <span>TOTAL ORDERS</span>
            <strong>{orders.length}</strong>
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <h2 style={{ margin: 0 }}>Restaurant Orders</h2>
            <button
              onClick={() => loadOrders(selectedRestaurantId)}
              style={refreshButtonStyle}
              disabled={loadingOrders}
            >
              {loadingOrders ? "Refreshing..." : "↻ Refresh"}
            </button>
          </div>

          {loadingOrders ? (
            <div style={emptyRestaurantStyle}>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div style={emptyRestaurantStyle}>
              No orders for this restaurant yet.
            </div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {orders.map((order) => (
                <div key={order.id} style={orderCardStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 8px" }}>
                        Order #{order.id}
                      </h3>
                      <div style={{ color: "#6b7280" }}>
                        Customer ID: {order.customerId}
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        Delivery: {order.deliveryAddress}
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        Preparation Time: {order.preparationTimeMinutes
                          ? `${order.preparationTimeMinutes} minutes`
                          : "Not set"}
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        Expected Delivery: {order.expectedDeliveryTime || order.suggestedDeliveryTime || "Not set"}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <strong style={{ fontSize: "20px" }}>
                        ₹{order.totalAmount}
                      </strong>
                      <div
                        style={{
                          marginTop: "8px",
                          padding: "7px 10px",
                          borderRadius: "999px",
                          background: "#eef2ff",
                          color: "#3730a3",
                          fontSize: "13px",
                          fontWeight: "700",
                        }}
                      >
                        {statusLabel(order.orderStatus)}
                      </div>
                    </div>
                  </div>

                  {!['RESTAURANT_REJECTED', 'DELIVERED'].includes(order.orderStatus) && (
                    <div
                      style={{
                        marginTop: "18px",
                        padding: "16px",
                        background: "#fff7ed",
                        border: "1px solid #fdba74",
                        borderRadius: "12px",
                        display: "flex",
                        gap: "14px",
                        flexWrap: "wrap",
                        alignItems: "end",
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <h4 style={{ margin: "0 0 5px", color: "#9a3412" }}>⏱ Preparation & Delivery Timing</h4>
                        <p style={{ margin: 0, color: "#7c2d12", fontSize: "13px" }}>Enter the food preparation duration and expected delivery time for this order.</p>
                      </div>
                      <label style={{ display: "grid", gap: "7px", fontWeight: 700 }}>
                        Food Preparation (minutes)
                        <input
                          type="number"
                          min="1"
                          placeholder="e.g. 25"
                          value={timingValue(order, "preparationTimeMinutes")}
                          onChange={(event) =>
                            setTimingInputs((current) => ({
                              ...current,
                              [order.id]: {
                                ...current[order.id],
                                preparationTimeMinutes: event.target.value,
                              },
                            }))
                          }
                          style={{ padding: "10px", border: "1px solid #d1d5db", borderRadius: "8px", minWidth: "180px" }}
                        />
                      </label>

                      <label style={{ display: "grid", gap: "7px", fontWeight: 700 }}>
                        Expected Delivery Time
                        <input
                          type="time"
                          value={timingValue(order, "expectedDeliveryTime")}
                          onChange={(event) =>
                            setTimingInputs((current) => ({
                              ...current,
                              [order.id]: {
                                ...current[order.id],
                                expectedDeliveryTime: event.target.value,
                              },
                            }))
                          }
                          style={{ padding: "10px", border: "1px solid #d1d5db", borderRadius: "8px", minWidth: "180px" }}
                        />
                      </label>

                      <button
                        onClick={() => saveOrderTiming(order.id)}
                        disabled={actionLoading !== null}
                        style={refreshButtonStyle}
                      >
                        {actionLoading === `${order.id}-timing` ? "Saving..." : "Save Times"}
                      </button>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "18px",
                    }}
                  >
                    {order.orderStatus === "PLACED" && (
                      <>
                        <button
                          onClick={() => updateOrder(order.id, "accept")}
                          disabled={actionLoading !== null}
                          style={acceptButtonStyle}
                        >
                          {actionLoading === `${order.id}-accept`
                            ? "Accepting..."
                            : "✓ Accept Order"}
                        </button>

                        <button
                          onClick={() => updateOrder(order.id, "reject")}
                          disabled={actionLoading !== null}
                          style={rejectButtonStyle}
                        >
                          {actionLoading === `${order.id}-reject`
                            ? "Rejecting..."
                            : "✕ Reject"}
                        </button>
                      </>
                    )}

                    {order.orderStatus === "RESTAURANT_ACCEPTED" && (
                      <button
                        onClick={() => updateOrder(order.id, "preparing")}
                        disabled={actionLoading !== null}
                        style={acceptButtonStyle}
                      >
                        {actionLoading === `${order.id}-preparing`
                          ? "Updating..."
                          : "👨‍🍳 Start Preparing"}
                      </button>
                    )}

                    {order.orderStatus === "PREPARING" && (
                      <button
                        onClick={() => updateOrder(order.id, "ready")}
                        disabled={actionLoading !== null}
                        style={acceptButtonStyle}
                      >
                        {actionLoading === `${order.id}-ready`
                          ? "Updating..."
                          : "✓ Ready for Pickup"}
                      </button>
                    )}

                    {order.orderStatus === "READY_FOR_PICKUP" && (
                      <div
                        style={{
                          padding: "11px 14px",
                          borderRadius: "10px",
                          background: "#fef3c7",
                          color: "#92400e",
                          fontWeight: "700",
                        }}
                      >
                        Waiting for driver pickup
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

const restaurantStatStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
};

const refreshButtonStyle = {
  border: "1px solid #d1d5db",
  background: "white",
  borderRadius: "10px",
  padding: "9px 14px",
  cursor: "pointer",
};

const emptyRestaurantStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "40px",
  textAlign: "center",
  color: "#6b7280",
};

const orderCardStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
};

const acceptButtonStyle = {
  border: "none",
  background: "#111827",
  color: "white",
  borderRadius: "10px",
  padding: "11px 15px",
  cursor: "pointer",
  fontWeight: "700",
};

const rejectButtonStyle = {
  border: "none",
  background: "#fee2e2",
  color: "#991b1b",
  borderRadius: "10px",
  padding: "11px 15px",
  cursor: "pointer",
  fontWeight: "700",
};

/* =========================================================
   DRIVER ACCOUNT REGISTRATION PAGE
========================================================= */

function DriverRegistrationPage({ setPage }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [createdDriver, setCreatedDriver] = useState(null);

  const submitDriver = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !email.trim() || !password || !vehicleNumber.trim()) {
      setError("Please fill in the name, phone, email, password, and vehicle number.");
      return;
    }

    if (latitude !== "" && (Number(latitude) < -90 || Number(latitude) > 90)) {
      setError("Latitude must be between -90 and 90.");
      return;
    }

    if (longitude !== "" && (Number(longitude) < -180 || Number(longitude) > 180)) {
      setError("Longitude must be between -180 and 180.");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`${API_BASE}/drivers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          password,
          vehicleNumber: vehicleNumber.trim(),
          status: "AVAILABLE",
          latitude: latitude === "" ? 0 : Number(latitude),
          longitude: longitude === "" ? 0 : Number(longitude),
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || "Could not create the driver account.");
      }

      const driver = await response.json();
      setCreatedDriver(driver);
      if (driver.id !== undefined && driver.id !== null) {
        localStorage.setItem("foodieDriverId", String(driver.id));
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not create the driver account. Check that Spring Boot is running.");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 13px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    marginTop: "7px",
    fontSize: "15px",
    background: "white",
  };

  const labelStyle = {
    display: "block",
    fontWeight: 700,
    color: "#374151",
    marginBottom: "15px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fc", padding: "26px", fontFamily: "Arial, sans-serif", color: "#1f2937" }}>
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
          <div>
            <div style={{ color: "#b45309", fontWeight: 700, letterSpacing: "1px", fontSize: "13px" }}>FOODIE • DELIVERY TEAM</div>
            <h1 style={{ margin: "7px 0" }}>Create Delivery Person Account</h1>
            <p style={{ margin: 0, color: "#6b7280" }}>Register a delivery partner so they can access the Driver Portal.</p>
          </div>
          <button type="button" onClick={() => setPage("dashboard")} style={{ border: "1px solid #d1d5db", background: "white", borderRadius: "10px", padding: "11px 15px", cursor: "pointer", fontWeight: 700 }}>
            ← Back to Dashboard
          </button>
        </div>

        {createdDriver ? (
          <div style={{ background: "white", borderRadius: "18px", padding: "28px", boxShadow: "0 5px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "44px" }}>✅</div>
            <h2 style={{ marginBottom: "8px" }}>Driver account created successfully!</h2>
            <p style={{ color: "#4b5563" }}>The account has been saved to the backend and is ready to use in the Driver Portal.</p>
            <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "16px", margin: "18px 0" }}>
              <p><strong>Name:</strong> {createdDriver.name}</p>
              <p><strong>Phone:</strong> {createdDriver.phone}</p>
              <p><strong>Email:</strong> {createdDriver.email}</p>
              <p><strong>Vehicle:</strong> {createdDriver.vehicleNumber}</p>
              <p><strong>Status:</strong> {createdDriver.status || "AVAILABLE"}</p>
              <p><strong>Driver ID:</strong> {createdDriver.id}</p>
            </div>
            <button type="button" onClick={() => setPage("driver")} style={{ border: 0, borderRadius: "10px", padding: "12px 18px", background: "#111827", color: "white", fontWeight: 700, cursor: "pointer", marginRight: "10px" }}>
              Open Driver Portal
            </button>
            <button type="button" onClick={() => { setCreatedDriver(null); setName(""); setPhone(""); setEmail(""); setPassword(""); setVehicleNumber(""); setLatitude(""); setLongitude(""); }} style={{ border: "1px solid #d1d5db", borderRadius: "10px", padding: "12px 18px", background: "white", fontWeight: 700, cursor: "pointer", marginTop: "8px" }}>
              Create Another Account
            </button>
          </div>
        ) : (
          <form onSubmit={submitDriver} style={{ background: "white", borderRadius: "18px", padding: "24px", boxShadow: "0 5px 20px rgba(0,0,0,0.06)" }}>
            {error && <div role="alert" style={{ background: "#fee2e2", color: "#991b1b", padding: "12px 14px", borderRadius: "10px", marginBottom: "18px" }}>{error}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px" }}>
              <label style={labelStyle}>Full Name *
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter delivery person's name" autoComplete="name" style={inputStyle} required />
              </label>

              <label style={labelStyle}>Phone Number *
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" type="tel" autoComplete="tel" style={inputStyle} required />
              </label>

              <label style={labelStyle}>Email Address *
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="driver@example.com" type="email" autoComplete="email" style={inputStyle} required />
              </label>

              <label style={labelStyle}>Password *
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" type="password" autoComplete="new-password" style={inputStyle} required />
              </label>

              <label style={labelStyle}>Vehicle Number *
                <input value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} placeholder="e.g. TS09AB1234" style={inputStyle} required />
              </label>

              <label style={labelStyle}>Driver Status
                <input value="AVAILABLE" readOnly style={{ ...inputStyle, background: "#f3f4f6", color: "#166534", fontWeight: 700 }} />
              </label>

              <label style={labelStyle}>Latitude (optional)
                <input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="e.g. 17.3850" type="number" step="any" style={inputStyle} />
              </label>

              <label style={labelStyle}>Longitude (optional)
                <input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="e.g. 78.4867" type="number" step="any" style={inputStyle} />
              </label>
            </div>

            <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "0" }}>Fields marked * are required. Location coordinates are optional.</p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
              <button type="submit" disabled={saving} style={{ border: 0, borderRadius: "10px", padding: "13px 20px", background: saving ? "#9ca3af" : "#111827", color: "white", fontWeight: 700, cursor: saving ? "wait" : "pointer" }}>
                {saving ? "Creating Account..." : "Create Driver Account"}
              </button>
              <button type="button" onClick={() => setPage("driver")} style={{ border: "1px solid #d1d5db", borderRadius: "10px", padding: "13px 20px", background: "white", fontWeight: 700, cursor: "pointer" }}>
                Open Driver Portal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  /* =======================================================
     LOGIN / ACCOUNT
  ======================================================= */

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("foodieLoggedIn") === "true"
  );

  const [authMode, setAuthMode] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [authLoading, setAuthLoading] = useState(false);

  /* =======================================================
     PAGES
  ======================================================= */

  const [page, setPage] = useState("dashboard");

  const [foodType, setFoodType] = useState("Veg");

  const [selectedCategory, setSelectedCategory] = useState("");

  /* =======================================================
     USER
  ======================================================= */

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("foodieUser");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultUser;
      }
    }

    return defaultUser;
  });

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState(
    "Banjara Hills"
  );

  /* =======================================================
     RESTAURANTS
  ======================================================= */

  const [restaurants, setRestaurants] = useState([]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(() => {
    const saved = localStorage.getItem("foodieRestaurant");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }

    return null;
  });

  const [restaurantLoading, setRestaurantLoading] = useState(false);

  /* =======================================================
     LOCATION
  ======================================================= */

  const [userLocation, setUserLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState(
    "Location not detected"
  );

  /* =======================================================
     CART
  ======================================================= */

  const [cart, setCart] = useState([]);

  /* =======================================================
     ORDERS
  ======================================================= */

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("foodieOrders");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return [];
  });

  /* =======================================================
     SEARCH
  ======================================================= */

  const [search, setSearch] = useState("");

  /* =======================================================
     PROFILE
  ======================================================= */

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  /* =======================================================
     PAYMENT
  ======================================================= */

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  /* =======================================================
     REWARDS
  ======================================================= */

  const [points, setPoints] = useState(() =>
    Number(localStorage.getItem("foodiePoints") || 0)
  );

  const [discount, setDiscount] = useState(0);

  const [selectedGame, setSelectedGame] = useState("wheel");

  /* =======================================================
     SPIN
  ======================================================= */

  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);

  const [lastSpinDate, setLastSpinDate] = useState(
    localStorage.getItem("foodieLastSpinDate") || ""
  );

  /* =======================================================
     MONTHLY GAMES
  ======================================================= */

  const [monthlyGameKey, setMonthlyGameKey] = useState(
    localStorage.getItem("foodieMonthlyGameKey") || ""
  );

  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [scratchReward, setScratchReward] = useState(0);

  const [tapCount, setTapCount] = useState(0);
  const [tapPlaying, setTapPlaying] = useState(false);
  const [tapTime, setTapTime] = useState(10);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  /* =======================================================
     DATE
  ======================================================= */

  const todayKey = new Date().toISOString().slice(0, 10);

  const currentDay = new Date().getDate();

  const currentMonthKey =
    new Date().getFullYear() + "-" + new Date().getMonth();

  const monthlyGamesAvailable = currentDay === 1;

  const monthlyGamesPlayed =
    monthlyGameKey === currentMonthKey;

  /* =======================================================
     QUIZ
  ======================================================= */

  const quizQuestions = [
    {
      q: "Which food is usually made with rice and spices?",
      a: ["Biryani", "Pizza", "Burger"],
      correct: "Biryani",
    },
    {
      q: "Which one is vegetarian?",
      a: ["Paneer Pizza", "Chicken Wings", "Fish Fry"],
      correct: "Paneer Pizza",
    },
    {
      q: "Which food is served in a bun?",
      a: ["Burger", "Biryani", "Momos"],
      correct: "Burger",
    },
    {
      q: "Which one is a dessert?",
      a: ["Brownie", "Noodles", "Wrap"],
      correct: "Brownie",
    },
    {
      q: "Which category contains pasta dishes?",
      a: ["Pasta", "Drinks", "Starters"],
      correct: "Pasta",
    },
  ];

  /* =======================================================
     LOAD USER DETAILS
  ======================================================= */

  useEffect(() => {
    if (user) {
      setCustomerName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setDeliveryLocation(
        user.deliveryLocation || "Banjara Hills"
      );
    }
  }, [user]);

  /* =======================================================
     LOAD RESTAURANTS FROM BACKEND
     
     IMPORTANT:
     You can create restaurants from Postman.
     
     Expected endpoint:
     GET http://localhost:8080/api/restaurants
  ======================================================= */

  useEffect(() => {
    if (!loggedIn) return;

    loadRestaurants();
  }, [loggedIn]);

  const loadRestaurants = async () => {
    setRestaurantLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/restaurants`
      );

      if (!response.ok) {
        throw new Error("Restaurant API failed");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setRestaurants(data);

        if (!selectedRestaurant && data.length > 0) {
          setSelectedRestaurant(data[0]);

          localStorage.setItem(
            "foodieRestaurant",
            JSON.stringify(data[0])
          );
        }
      } else {
        setRestaurants([]);
      }
    } catch (error) {
      console.log(
        "Restaurants could not be loaded from backend:",
        error
      );

      /*
        Empty array intentionally.
        You will add your own restaurants using Postman.
      */

      setRestaurants([]);
    } finally {
      setRestaurantLoading(false);
    }
  };

  /* =======================================================
     DETECT LOCATION
  ======================================================= */

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage(
        "Location is not supported by this browser."
      );
      return;
    }

    setLocationMessage("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserLocation({
          lat: latitude,
          lng: longitude,
        });

        setLocationMessage(
          `Location detected: ${latitude.toFixed(
            4
          )}, ${longitude.toFixed(4)}`
        );
      },
      () => {
        setLocationMessage(
          "Location permission denied. Select your area manually."
        );
      }
    );
  };

  /* Ask for the user's real location once after login.
     The Restaurants page still has a manual fallback. */
  useEffect(() => {
    if (loggedIn && !userLocation) {
      detectLocation();
    }
  }, [loggedIn]);

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password.");
      return;
    }

    setAuthLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid login");
      }

      const data = await response.json();

      const loggedUser = {
        name:
          data.name ||
          data.username ||
          loginEmail.split("@")[0],

        email: data.email || loginEmail,

        phone: data.phone || "",

        address: data.address || "",

        deliveryLocation:
          data.deliveryLocation || "Banjara Hills",
      };

      setUser(loggedUser);

      localStorage.setItem(
        "foodieUser",
        JSON.stringify(loggedUser)
      );

      localStorage.setItem("foodieLoggedIn", "true");

      setLoggedIn(true);

      setPage("dashboard");

      alert("Login successful!");
    } catch (error) {
      /*
        Local fallback.

        This allows the Create Account option to work
        even while the backend is being developed.
      */

      const localAccount = JSON.parse(
        localStorage.getItem("foodieLocalAccount") ||
          "null"
      );

      if (
        localAccount &&
        localAccount.email === loginEmail &&
        localAccount.password === loginPassword
      ) {
        const loggedUser = {
          name: localAccount.name,
          email: localAccount.email,
          phone: "",
          address: "",
          deliveryLocation: "Banjara Hills",
        };

        setUser(loggedUser);

        localStorage.setItem(
          "foodieUser",
          JSON.stringify(loggedUser)
        );

        localStorage.setItem("foodieLoggedIn", "true");

        setLoggedIn(true);

        setPage("dashboard");

        alert("Login successful!");
      } else {
        alert(
          "Login failed. Please check your email and password."
        );
      }
    } finally {
      setAuthLoading(false);
    }
  };

  /* =======================================================
     REGISTER
  ======================================================= */

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !registerName ||
      !registerEmail ||
      !registerPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (registerPassword.length < 6) {
      alert(
        "Password must contain at least 6 characters."
      );
      return;
    }

    setAuthLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: registerName,
            email: registerEmail,
            password: registerPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert(
        "Account created successfully! Please login."
      );

      setAuthMode("login");

      setLoginEmail(registerEmail);
      setLoginPassword("");

      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      /*
        Local fallback account.
      */

      const account = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      };

      localStorage.setItem(
        "foodieLocalAccount",
        JSON.stringify(account)
      );

      alert(
        "Account created successfully! You can now login."
      );

      setAuthMode("login");

      setLoginEmail(registerEmail);
      setLoginPassword("");
    } finally {
      setAuthLoading(false);
    }
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("foodieLoggedIn");

    setLoggedIn(false);

    setPage("dashboard");

    setIsProfileOpen(false);

    setLoginEmail("");
    setLoginPassword("");

    alert("You have been logged out.");
  };

  /* =======================================================
     POINTS
  ======================================================= */

  const savePoints = (value) => {
    setPoints(value);

    localStorage.setItem(
      "foodiePoints",
      String(value)
    );
  };

  /* =======================================================
     DISCOUNT
  ======================================================= */

  const pointsDiscount =
    points >= 500
      ? 30
      : points >= 300
      ? 20
      : points >= 150
      ? 10
      : points >= 50
      ? 5
      : 0;

  /* =======================================================
     SPIN
  ======================================================= */

  const spinWheel = () => {
    if (wheelSpinning) return;

    if (lastSpinDate === todayKey) {
      alert(
        "🎡 You already used today's spin. Come back tomorrow!"
      );
      return;
    }

    setWheelSpinning(true);

    const rewards = [0, 5, 10, 15, 20, 30];

    const reward =
      rewards[Math.floor(Math.random() * rewards.length)];

    const segment = 360 / rewards.length;

    const index = rewards.indexOf(reward);

    const rotation =
      5 * 360 +
      (360 - index * segment - segment / 2);

    setWheelRotation(
      (oldRotation) => oldRotation + rotation
    );

    setTimeout(() => {
      setWheelResult(reward);

      setLastSpinDate(todayKey);

      localStorage.setItem(
        "foodieLastSpinDate",
        todayKey
      );

      if (reward > 0) {
        savePoints(points + reward);
      }

      setWheelSpinning(false);
    }, 3500);
  };

  /* =======================================================
     MONTHLY GAME
  ======================================================= */

  const canPlayMonthlyGame = () => {
    if (!monthlyGamesAvailable) {
      alert(
        "🎮 Monthly games are available only on the 1st day of every month."
      );

      return false;
    }

    if (monthlyGamesPlayed) {
      alert(
        "🎮 You already played this month's game."
      );

      return false;
    }

    return true;
  };

  const markMonthlyGameUsed = () => {
    setMonthlyGameKey(currentMonthKey);

    localStorage.setItem(
      "foodieMonthlyGameKey",
      currentMonthKey
    );
  };

  /* =======================================================
     SCRATCH
  ======================================================= */

  const playScratchCard = () => {
    if (!canPlayMonthlyGame()) return;

    const reward =
      [5, 10, 15, 20, 25][
        Math.floor(Math.random() * 5)
      ];

    setScratchReward(reward);

    setScratchRevealed(true);

    savePoints(points + reward);

    markMonthlyGameUsed();
  };

  /* =======================================================
     TAP GAME
  ======================================================= */

  const startTapGame = () => {
    if (!canPlayMonthlyGame()) return;

    setTapCount(0);
    setTapTime(10);
    setTapPlaying(true);

    let seconds = 10;

    const timer = setInterval(() => {
      seconds -= 1;

      setTapTime(seconds);

      if (seconds <= 0) {
        clearInterval(timer);

        setTapPlaying(false);

        const reward = Math.min(
          30,
          Math.floor(tapCount / 3)
        );

        if (reward > 0) {
          savePoints(points + reward);

          alert(
            `⚡ You earned ${reward} points!`
          );
        } else {
          alert(
            "Try tapping faster next time!"
          );
        }

        markMonthlyGameUsed();
      }
    }, 1000);
  };

  /* =======================================================
     QUIZ
  ======================================================= */

  const answerQuiz = (answer) => {
    if (quizFinished) return;

    if (!canPlayMonthlyGame()) return;

    const question =
      quizQuestions[quizIndex];

    const newScore =
      answer === question.correct
        ? quizScore + 1
        : quizScore;

    setQuizScore(newScore);

    if (
      quizIndex ===
      quizQuestions.length - 1
    ) {
      const reward = newScore * 5;

      savePoints(points + reward);

      setQuizFinished(true);

      markMonthlyGameUsed();

      alert(
        `🧠 Quiz completed! You earned ${reward} points.`
      );
    } else {
      setQuizIndex(quizIndex + 1);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
  };

  /* =======================================================
     REDEEM POINTS
  ======================================================= */

  const redeemPoints = () => {
    if (!pointsDiscount) {
      alert(
        "You need at least 50 points."
      );
      return;
    }

    const pointsNeeded =
      pointsDiscount === 30
        ? 500
        : pointsDiscount === 20
        ? 300
        : pointsDiscount === 10
        ? 150
        : 50;

    if (
      window.confirm(
        `Use ${pointsNeeded} points for ${pointsDiscount}% OFF?`
      )
    ) {
      savePoints(
        points - pointsNeeded
      );

      setDiscount(pointsDiscount);

      alert(
        `${pointsDiscount}% discount applied!`
      );
    }
  };

  /* =======================================================
     SELECT DELIVERY LOCATION
  ======================================================= */

  /* Use the real GPS position when available.
     Fall back to the manually selected delivery area. */
  const customerLocation = userLocation
    ? {
        name: "Current Location",
        lat: userLocation.lat,
        lng: userLocation.lng,
      }
    : deliveryLocations.find(
        (location) =>
          location.name === deliveryLocation
      ) || deliveryLocations[0];

  /* =======================================================
     DISTANCE
  ======================================================= */

  const restaurantCoordinates =
    selectedRestaurant
      ? {
          lat:
            selectedRestaurant.lat ??
            selectedRestaurant.latitude,

          lng:
            selectedRestaurant.lng ??
            selectedRestaurant.longitude,
        }
      : null;

  const deliveryDistance =
    selectedRestaurant &&
    restaurantCoordinates
      ? calculateDistance(
          restaurantCoordinates.lat,
          restaurantCoordinates.lng,
          customerLocation.lat,
          customerLocation.lng
        )
      : 0;

  /* =======================================================
     DELIVERY FEE
  ======================================================= */

  const deliveryFee =
    selectedRestaurant &&
    deliveryDistance <= 5
      ? 0
      : selectedRestaurant
      ? 49
      : 0;

  /* =======================================================
     FOOD DATA
  ======================================================= */

  const foodData =
    foodType === "Veg"
      ? vegFoods
      : nonVegFoods;

  /* =======================================================
     CART
  ======================================================= */

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price *
        item.quantity,
    0
  );

  const discountAmount = Math.round(
    (subtotal * discount) / 100
  );

  const totalAmount =
    subtotal -
    discountAmount +
    (cart.length > 0
      ? deliveryFee
      : 0);

  /* =======================================================
     ORDERS
  ======================================================= */

  const currentOrder =
    orders.find(
      (order) =>
        order.status !== "Delivered" &&
        order.status !== "Cancelled"
    ) || null;

  const previousOrders =
    orders.filter(
      (order) =>
        order.status === "Delivered" ||
        order.status === "Cancelled"
    );

  const saveOrders = (
    updatedOrders
  ) => {
    setOrders(updatedOrders);

    localStorage.setItem(
      "foodieOrders",
      JSON.stringify(
        updatedOrders
      )
    );
  };

  /* =======================================================
     DASHBOARD
  ======================================================= */

  const goToDashboard = () => {
    setPage("dashboard");

    setIsProfileOpen(false);
  };

  /* =======================================================
     SELECT RESTAURANT
  ======================================================= */

  const selectRestaurant = (
    restaurant
  ) => {
    if (
      cart.length > 0 &&
      cart[0].restaurantId !==
        restaurant.id
    ) {
      if (
        !window.confirm(
          "Your cart contains food from another restaurant. Clear the cart?"
        )
      ) {
        return;
      }

      setCart([]);
    }

    setSelectedRestaurant(
      restaurant
    );

    localStorage.setItem(
      "foodieRestaurant",
      JSON.stringify(
        restaurant
      )
    );

    setPage("categories");
  };

  /* =======================================================
     CATEGORY
  ======================================================= */

  const openCategory = (
    category
  ) => {
    setSelectedCategory(
      category
    );

    setPage("dishes");
  };

  /* =======================================================
     ADD CART
  ======================================================= */

  const addToCart = (
    dish,
    price
  ) => {
    if (!selectedRestaurant) {
      alert(
        "Please select a restaurant first."
      );

      setPage("restaurants");

      return;
    }

    if (
      cart.length > 0 &&
      cart[0].restaurantId !==
        selectedRestaurant.id
    ) {
      if (
        !window.confirm(
          "Your cart contains food from another restaurant. Clear it?"
        )
      ) {
        return;
      }

      setCart([]);
    }

    const existing =
      cart.find(
        (item) =>
          item.name ===
            dish &&
          item.foodType ===
            foodType &&
          item.category ===
            selectedCategory &&
          item.restaurantId ===
            selectedRestaurant.id
      );

    if (existing) {
      setCart(
        cart.map(
          (item) =>
            item === existing
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    1,
                }
              : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          name: dish,
          foodType,
          category:
            selectedCategory,
          price,
          quantity: 1,
          restaurantId:
            selectedRestaurant.id,
          restaurantName:
            selectedRestaurant.name,
          restaurantArea:
            selectedRestaurant.area ||
            selectedRestaurant.location ||
            "",
        },
      ]);
    }
  };

  /* =======================================================
     QUANTITY
  ======================================================= */

  const increaseQuantity = (
    index
  ) => {
    setCart(
      cart.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
      )
    );
  };

  const decreaseQuantity = (
    index
  ) => {
    setCart(
      cart
        .map(
          (item, i) =>
            i === index
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const removeFromCart = (
    index
  ) => {
    setCart(
      cart.filter(
        (_, i) => i !== index
      )
    );
  };

  /* =======================================================
     PROFILE SAVE
  ======================================================= */

  const saveProfile = () => {
    const updatedUser = {
      ...user,

      name:
        customerName ||
        user.name,

      phone,

      address,

      deliveryLocation,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "foodieUser",
      JSON.stringify(
        updatedUser
      )
    );

    alert(
      "Profile updated successfully!"
    );
  };

  /* =======================================================
     PLACE ORDER
  ======================================================= */

  const placeOrder = async () => {
    if (!selectedRestaurant) {
      alert("Please select a restaurant.");
      return;
    }
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }
    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const backendOrder = {
        customerId: Number(user.id || 1),
        restaurantId: Number(selectedRestaurant.id),
        driverId: null,
        totalAmount: Number(totalAmount),
        deliveryAddress: address,
        deliveryLatitude: Number(customerLocation.lat || 0),
        deliveryLongitude: Number(customerLocation.lng || 0),
        suggestedDeliveryTime: "",
      };

      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendOrder),
      });

      if (!response.ok) {
        throw new Error("The backend could not create this order.");
      }

      const savedOrder = await response.json();

      const newOrder = {
        id: savedOrder.id,
        backendOrderId: savedOrder.id,
        customer: customerName,
        phone,
        address,
        deliveryLocation,
        restaurantId: selectedRestaurant.id,
        restaurantName: selectedRestaurant.name,
        restaurantArea: selectedRestaurant.area || selectedRestaurant.location || "",
        deliveryDistance: Number(deliveryDistance.toFixed(2)),
        deliveryFee,
        paymentMethod,
        items: cart,
        subtotal,
        discount,
        discountAmount,
        total: totalAmount,
        status: "Placed",
        date: new Date().toLocaleString(),
      };

      saveOrders([newOrder, ...orders]);

      const updatedUser = {
        ...user,
        name: customerName,
        phone,
        address,
        deliveryLocation,
      };

      setUser(updatedUser);
      localStorage.setItem("foodieUser", JSON.stringify(updatedUser));
      setCart([]);
      setDiscount(0);
      setPage("orderStatus");
    } catch (err) {
      console.error("Place order error:", err);
      alert("Order could not be placed. Please check that Spring Boot is running.");
    }
  };

  /* =======================================================
     HEADER
  ======================================================= */

  const Header = () => (
    <div className="page-topbar">
      <button
        className="top-logo"
        onClick={
          goToDashboard
        }
      >
        🍴 FOODIE
      </button>

      <div className="page-actions">
        <button
          onClick={() =>
            setPage(
              "restaurants"
            )
          }
        >
          🏪 Restaurants
        </button>

        <button
          onClick={() =>
            setPage(
              "rewards"
            )
          }
        >
          🎁 Rewards
        </button>

        <button
          onClick={() =>
            setPage("orders")
          }
        >
          📦 Orders
        </button>

        <button
          onClick={() =>
            setPage("cart")
          }
        >
          🛒 {cartCount}
        </button>

        <button
          onClick={() =>
            setPage("profile")
          }
        >
          👤
        </button>
      </div>
    </div>
  );

  /* =======================================================
     AUTH PAGE
  ======================================================= */

  if (!loggedIn) {
    return (
      <div
        className="auth-page"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          background:
            "radial-gradient(circle at top left, #3b2f4a 0%, #17141c 42%, #0c0b10 100%)",
          color: "#f7f3ee",
        }}
      >
        <div
          style={{
            width: "min(980px, 100%)",
            minHeight: "620px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "#15131a",
            border: "1px solid rgba(255,255,255,.10)",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,.45)",
          }}
        >
          <div
            style={{
              padding: "54px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background:
                "linear-gradient(145deg, #25202c 0%, #17141c 65%, #100f14 100%)",
            }}
          >
            <div>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  display: "grid",
                  placeItems: "center",
                  background: "#f2b36d",
                  color: "#17141c",
                  fontSize: 28,
                  marginBottom: 28,
                }}
              >
                🍴
              </div>
              <p
                style={{
                  letterSpacing: "3px",
                  fontSize: 12,
                  color: "#c8b9a9",
                  marginBottom: 10,
                }}
              >
                WELCOME TO
              </p>
              <h1
                style={{
                  fontSize: "clamp(42px, 6vw, 72px)",
                  lineHeight: 1,
                  margin: 0,
                  letterSpacing: "-3px",
                }}
              >
                FOODIE
              </h1>
              <p
                style={{
                  marginTop: 22,
                  maxWidth: 390,
                  lineHeight: 1.7,
                  color: "#bdb5bd",
                  fontSize: 16,
                }}
              >
                Discover restaurants, order your favourites, play for
                rewards and enjoy smart delivery based on your location.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginTop: 35,
              }}
            >
              {[
                ["📍", "Location"],
                ["🎁", "Rewards"],
                ["🚚", "Delivery"],
              ].map(([icon, text]) => (
                <div
                  key={text}
                  style={{
                    padding: "15px 10px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.07)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 20 }}>{icon}</div>
                  <small style={{ color: "#c8c0c8" }}>{text}</small>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: "54px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "#f5f1eb",
              color: "#211e25",
            }}
          >
            <div style={{ marginBottom: 28 }}>
              <span
                style={{
                  color: "#8b7561",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "2px",
                }}
              >
                {authMode === "login" ? "WELCOME BACK" : "NEW MEMBER"}
              </span>
              <h2 style={{ fontSize: 34, margin: "8px 0 8px" }}>
                {authMode === "login" ? "Sign in to Foodie" : "Create your account"}
              </h2>
              <p style={{ color: "#766f77", margin: 0 }}>
                {authMode === "login"
                  ? "Enter your details to continue ordering."
                  : "Create an account and start exploring."}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: "#e9e3db",
                borderRadius: 14,
                padding: 5,
                marginBottom: 28,
              }}
            >
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                style={{
                  border: 0,
                  borderRadius: 10,
                  padding: "12px 8px",
                  background: authMode === "login" ? "#211e25" : "transparent",
                  color: authMode === "login" ? "#fff" : "#625b62",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                style={{
                  border: 0,
                  borderRadius: 10,
                  padding: "12px 8px",
                  background: authMode === "register" ? "#211e25" : "transparent",
                  color: authMode === "register" ? "#fff" : "#625b62",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Create Account
              </button>
            </div>

            {authMode === "login" ? (
              <form onSubmit={handleLogin}>
                <label style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "14px 15px",
                    border: "1px solid #d8d0c8", borderRadius: 12, background: "#fff",
                    marginBottom: 17, outline: "none", fontSize: 15,
                  }}
                />

                <label style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "14px 15px",
                    border: "1px solid #d8d0c8", borderRadius: 12, background: "#fff",
                    marginBottom: 22, outline: "none", fontSize: 15,
                  }}
                />

                <button
                  type="submit"
                  disabled={authLoading}
                  style={{
                    width: "100%", border: 0, borderRadius: 12, padding: "15px",
                    background: "#211e25", color: "#fff", fontWeight: 700,
                    fontSize: 15, cursor: "pointer",
                  }}
                >
                  {authLoading ? "Signing in..." : "Sign In  →"}
                </button>

                <p style={{ textAlign: "center", color: "#766f77", marginTop: 22 }}>
                  New to Foodie?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("register")}
                    style={{ border: 0, background: "none", color: "#9b5d2e", fontWeight: 700, cursor: "pointer" }}
                  >
                    Create account
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <label style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", padding: "14px 15px", border: "1px solid #d8d0c8", borderRadius: 12, background: "#fff", marginBottom: 15, fontSize: 15 }}
                />
                <label style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", padding: "14px 15px", border: "1px solid #d8d0c8", borderRadius: 12, background: "#fff", marginBottom: 15, fontSize: 15 }}
                />
                <label style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>Password</label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", padding: "14px 15px", border: "1px solid #d8d0c8", borderRadius: 12, background: "#fff", marginBottom: 22, fontSize: 15 }}
                />
                <button
                  type="submit"
                  disabled={authLoading}
                  style={{ width: "100%", border: 0, borderRadius: 12, padding: "15px", background: "#211e25", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
                >
                  {authLoading ? "Creating..." : "Create Account  →"}
                </button>
                <p style={{ textAlign: "center", color: "#766f77", marginTop: 22 }}>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    style={{ border: 0, background: "none", color: "#9b5d2e", fontWeight: 700, cursor: "pointer" }}
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     RESTAURANT PAGE
  ======================================================= */

  if (page === "restaurant") {
    return <RestaurantPage setPage={setPage} />;
  }

  if (page === "driver") {
    return <DriverDashboard setPage={setPage} />;
  }

  if (page === "driver-register") {
    return <DriverRegistrationPage setPage={setPage} />;
  }

  /* =======================================================
     DASHBOARD
  ======================================================= */

  if (page === "dashboard") {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="brand">
            <span>🍴</span>

            <div>
              <h2>
                FOODIE
              </h2>

              <small>
                Food & Delivery
              </small>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className="active-nav"
              onClick={
                goToDashboard
              }
            >
              🏠
              <span>
                Dashboard
              </span>
            </button>

            <button
              onClick={() =>
                setPage(
                  "restaurants"
                )
              }
            >
              🏪
              <span>
                Restaurants
              </span>
            </button>

            <button
              onClick={() =>
                setPage(
                  "restaurant"
                )
              }
            >
              🏪
              <span>
                Restaurant Portal
              </span>
            </button>

            <button
              onClick={() => setPage("driver")}
            >
              🛵
              <span>
                Driver Portal
              </span>
            </button>

            <button
              onClick={() => setPage("driver-register")}
            >
              ➕
              <span>
                Create Driver Account
              </span>
            </button>

            <button
              onClick={() =>
                setPage(
                  "categories"
                )
              }
            >
              🍽️
              <span>
                Explore Food
              </span>
            </button>

            <button
              onClick={() =>
                setPage(
                  "rewards"
                )
              }
            >
              🎁
              <span>
                Rewards & Games
              </span>
            </button>

            <button
              onClick={() =>
                setPage("orders")
              }
            >
              📦
              <span>
                My Orders
              </span>
            </button>

            <button
              onClick={() =>
                setPage("cart")
              }
            >
              🛒
              <span>
                Cart
              </span>

              {cartCount >
                0 && (
                <b className="nav-badge">
                  {
                    cartCount
                  }
                </b>
              )}
            </button>

            <button
              onClick={() =>
                setPage(
                  "profile"
                )
              }
            >
              👤
              <span>
                Profile
              </span>
            </button>
          </nav>

          <div className="sidebar-offer">
            <div className="offer-icon">
              🚚
            </div>

            <h3>
              Free Delivery
            </h3>

            <p>
              Orders within 5 km
              have no delivery
              fee.
            </p>

            <button
              onClick={() =>
                setPage(
                  "restaurants"
                )
              }
            >
              Find Restaurants
            </button>
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            🚪 Logout
          </button>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <div className="search-box">
              <span>⌕</span>

              <input
                placeholder="Search for food, categories..."
                value={
                  search
                }
                onChange={(e) =>
                  setSearch(
                    e.target
                      .value
                  )
                }
              />
            </div>

            <div className="header-actions">
              <button
                className="header-cart"
                onClick={() =>
                  setPage("cart")
                }
              >
                🛒

                {cartCount >
                  0 && (
                  <span>
                    {
                      cartCount
                    }
                  </span>
                )}
              </button>

              <button
                className="profile-mini"
                onClick={() =>
                  setIsProfileOpen(
                    !isProfileOpen
                  )
                }
              >
                <div className="avatar">
                  {user.name
                    ? user.name
                        .charAt(
                          0
                        )
                        .toUpperCase()
                    : "U"}
                </div>

                <div>
                  <strong>
                    {user.name ||
                      "Foodie"}
                  </strong>

                  <small>
                    Foodie Member
                  </small>
                </div>

                <span>
                  ⌄
                </span>
              </button>
            </div>

            {isProfileOpen && (
              <div className="profile-dropdown">
                <button
                  onClick={() =>
                    setPage(
                      "profile"
                    )
                  }
                >
                  👤 View Profile
                </button>

                <button
                  onClick={() =>
                    setPage(
                      "orders"
                    )
                  }
                >
                  📦 My Orders
                </button>

                <button
                  onClick={() =>
                    setPage(
                      "restaurants"
                    )
                  }
                >
                  🏪 Restaurants
                </button>

                <button
                  onClick={() =>
                    setPage(
                      "rewards"
                    )
                  }
                >
                  🎁 Rewards
                </button>

                <button
                  onClick={() =>
                    setPage("cart")
                  }
                >
                  🛒 My Cart
                </button>

                <button
                  onClick={logout}
                  className="dropdown-logout"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </header>

          <section className="welcome-dashboard">
            <div>
              <p className="eyebrow">
                WELCOME BACK
              </p>

              <h1>
                Good afternoon,{" "}
                <span>
                  {user.name ||
                    "Foodie"}{" "}
                  👋
                </span>
              </h1>

              <p>
                Choose a restaurant,
                explore delicious
                food and enjoy free
                delivery within 5 km.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  setPage(
                    "restaurants"
                  )
                }
              >
                Explore Restaurants →
              </button>
            </div>

            <div className="dashboard-food-art">
              🍕
              <span>
                🍔
              </span>
              <b>
                🍜
              </b>
            </div>
          </section>

          <section className="offer-banner">
            <div className="offer-text">
              <span>
                DELIVERY OFFER
              </span>

              <h2>
                Free delivery within
                5 km
              </h2>

              <p>
                {selectedRestaurant
                  ? `Selected: ${selectedRestaurant.name}`
                  : "Choose your restaurant"}
              </p>

              <button
                onClick={() =>
                  setPage(
                    "restaurants"
                  )
                }
              >
                Choose Restaurant
              </button>
            </div>

            <div className="offer-food">
              🚚
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <span>
                  EXPLORE
                </span>

                <h2>
                  Food Categories
                </h2>
              </div>

              <button
                onClick={() =>
                  setPage(
                    "categories"
                  )
                }
              >
                View all →
              </button>
            </div>

            <div className="category-scroll">
              {categories
                .filter((category) =>
                  category.name
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
                )
                .map(
                  (
                    category
                  ) => (
                    <button
                      className="dashboard-category"
                      key={
                        category.name
                      }
                      onClick={() => {
                        if (
                          !selectedRestaurant
                        ) {
                          setPage(
                            "restaurants"
                          );
                          return;
                        }

                        setFoodType(
                          "Veg"
                        );

                        openCategory(
                          category.name
                        );
                      }}
                    >
                      <div className="category-circle">
                        {
                          category.icon
                        }
                      </div>

                      <strong>
                        {
                          category.name
                        }
                      </strong>
                    </button>
                  )
                )}
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="popular-section">
              <div className="section-heading">
                <div>
                  <span>
                    TOP PICKS
                  </span>

                  <h2>
                    Popular Today
                  </h2>
                </div>

                <button
                  onClick={() =>
                    setPage(
                      "categories"
                    )
                  }
                >
                  See all →
                </button>
              </div>

              <div className="popular-grid">
                {[
                  [
                    "Margherita Pizza",
                    "Pizza",
                    249,
                    "🍕",
                  ],
                  [
                    "Paneer Burger",
                    "Burger",
                    199,
                    "🍔",
                  ],
                  [
                    "Veg Biryani",
                    "Biryani",
                    229,
                    "🍛",
                  ],
                ].map(
                  (food) => (
                    <div
                      className="popular-card"
                      key={
                        food[0]
                      }
                    >
                      <div className="popular-image">
                        {
                          food[3]
                        }

                        <span>
                          ★ 4.8
                        </span>
                      </div>

                      <div className="popular-info">
                        <small>
                          {
                            food[1]
                          }
                        </small>

                        <h3>
                          {
                            food[0]
                          }
                        </h3>

                        <div className="popular-bottom">
                          <strong>
                            ₹
                            {
                              food[2]
                            }
                          </strong>

                          <button
                            onClick={() => {
                              if (
                                !selectedRestaurant
                              ) {
                                setPage(
                                  "restaurants"
                                );
                                return;
                              }

                              setFoodType(
                                "Veg"
                              );

                              setSelectedCategory(
                                food[1]
                              );

                              addToCart(
                                food[0],
                                food[2]
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="current-order-card">
              <div className="section-heading">
                <div>
                  <span>
                    LIVE TRACKING
                  </span>

                  <h2>
                    Current Order
                  </h2>
                </div>
              </div>

              {currentOrder ? (
                <>
                  <div className="order-top">
                    <div>
                      <small>
                        ORDER #
                        {
                          currentOrder.id
                        }
                      </small>

                      <h3>
                        ₹
                        {
                          currentOrder.total
                        }
                      </h3>
                    </div>

                    <span className="status-pill">
                      {
                        currentOrder.status
                      }
                    </span>
                  </div>

                  <p>
                    🏪{" "}
                    {
                      currentOrder.restaurantName
                    }
                    <br />
                    🚚{" "}
                    {
                      currentOrder.deliveryDistance
                    }{" "}
                    km
                  </p>

                  <button
                    className="view-order-button"
                    onClick={() =>
                      setPage(
                        "orders"
                      )
                    }
                  >
                    Track Order
                  </button>
                </>
              ) : (
                <div className="no-order">
                  <div>
                    🍽️
                  </div>

                  <p>
                    You don't have
                    an active order
                    right now.
                  </p>

                  <button
                    onClick={() =>
                      setPage(
                        "restaurants"
                      )
                    }
                  >
                    Start Ordering
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* =======================================================
     RESTAURANTS
  ======================================================= */

  if (
    page ===
    "restaurants"
  ) {
    return (
      <div className="category-page">
        <Header />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: 20,
          }}
        >
          <span className="eyebrow">
            CHOOSE YOUR RESTAURANT
          </span>

          <h1>
            Restaurants Near You
          </h1>

          <p>
            Restaurants are loaded
            from your Spring Boot
            backend.
          </p>

          <div
            style={{
              background:
                "#fff7ed",
              padding: 18,
              borderRadius: 18,
              margin:
                "20px 0",
            }}
          >
            <strong>
              📍 Your Delivery
              Location
            </strong>

            <select
              value={
                deliveryLocation
              }
              onChange={(e) =>
                setDeliveryLocation(
                  e.target.value
                )
              }
              style={{
                display:
                  "block",
                width:
                  "100%",
                maxWidth:
                  500,
                padding: 12,
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              {deliveryLocations.map(
                (location) => (
                  <option
                    key={
                      location.name
                    }
                  >
                    {
                      location.name
                    }
                  </option>
                )
              )}
            </select>

            <button
              className="primary-button"
              onClick={
                detectLocation
              }
              style={{
                marginTop: 12,
              }}
            >
              📍 Detect My Location
            </button>

            <p>
              {locationMessage}
            </p>
          </div>

          {restaurantLoading ? (
            <div className="empty-orders">
              <div>
                ⏳
              </div>

              <h3>
                Loading restaurants...
              </h3>
            </div>
          ) : restaurants.length ===
            0 ? (
            <div className="empty-orders">
              <div>
                🏪
              </div>

              <h3>
                No restaurants
                added yet
              </h3>

              <p>
                Add your restaurants
                using Postman:
              </p>

              <code>
                POST
                /api/restaurants
              </code>

              <p>
                After adding them,
                refresh this page.
              </p>

              <button
                className="primary-button"
                onClick={
                  loadRestaurants
                }
              >
                Refresh Restaurants
              </button>
            </div>
          ) : (
            <div
              className="category-container"
              style={{
                alignItems:
                  "stretch",
              }}
            >
              {restaurants.map(
                (restaurant) => {
                  const lat =
                    restaurant.lat ??
                    restaurant.latitude;

                  const lng =
                    restaurant.lng ??
                    restaurant.longitude;

                  const distance =
                    calculateDistance(
                      lat,
                      lng,
                      customerLocation.lat,
                      customerLocation.lng
                    );

                  const free =
                    distance <=
                    5;

                  return (
                    <div
                      className="category-card"
                      key={
                        restaurant.id
                      }
                    >
                      <div className="category-icon">
                        🍴
                      </div>

                      <h2>
                        {
                          restaurant.name
                        }
                      </h2>

                      <p>
                        📍{" "}
                        {restaurant.area ||
                          restaurant.location ||
                          "Location"}
                        <br />
                        🚚{" "}
                        {distance.toFixed(
                          1
                        )}{" "}
                        km away
                      </p>

                      <strong
                        style={{
                          display:
                            "block",
                          margin:
                            "10px 0",
                          color:
                            free
                              ? "green"
                              : "#dc2626",
                        }}
                      >
                        {free
                          ? "FREE DELIVERY"
                          : "₹49 DELIVERY FEE"}
                      </strong>

                      <button
                        onClick={() =>
                          selectRestaurant(
                            restaurant
                          )
                        }
                      >
                        {selectedRestaurant?.id ===
                        restaurant.id
                          ? "Selected ✓"
                          : "Choose Restaurant"}
                      </button>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>

        <button
          className="back-button"
          onClick={
            goToDashboard
          }
        >
          ← Dashboard
        </button>
      </div>
    );
  }

  /* =======================================================
     REWARDS
  ======================================================= */

  if (
    page ===
    "rewards"
  ) {
    return (
      <div className="profile-page">
        <Header />

        <div className="profile-container">
          <div className="profile-hero">
            <div className="profile-avatar">
              🎮
            </div>

            <div>
              <span>
                FOODIE GAME ZONE
              </span>

              <h1>
                Play & Earn
              </h1>

              <p>
                Daily Spin is available
                every day. Other games
                are available only on
                the 1st day of every
                month.
              </p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-form-card">
              <span>
                YOUR POINTS
              </span>

              <h2>
                ⭐ {points} Points
              </h2>

              <p>
                50 points → 5% OFF
              </p>

              <p>
                150 points → 10% OFF
              </p>

              <p>
                300 points → 20% OFF
              </p>

              <p>
                500 points → 30% OFF
              </p>

              <button
                className="primary-button"
                disabled={
                  !pointsDiscount
                }
                onClick={
                  redeemPoints
                }
              >
                {pointsDiscount
                  ? `Redeem ${pointsDiscount}% OFF`
                  : "Earn More Points"}
              </button>
            </div>

            <div className="profile-form-card">
              <span>
                MONTHLY GAMES
              </span>

              <h2>
                📅 1st Day
              </h2>

              <p>
                {monthlyGamesAvailable
                  ? monthlyGamesPlayed
                    ? "You already played this month."
                    : "🎉 Monthly games are available today!"
                  : "Monthly games unlock on the 1st day."}
              </p>
            </div>
          </div>

          <div
            style={{
              background:
                "#fff",
              borderRadius: 22,
              padding: 25,
              marginTop: 25,
              textAlign:
                "center",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                gap: 10,
                flexWrap:
                  "wrap",
                justifyContent:
                  "center",
                marginBottom:
                  25,
              }}
            >
              <button
                className={
                  selectedGame ===
                  "wheel"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setSelectedGame(
                    "wheel"
                  )
                }
              >
                🎡 Daily Spin
              </button>

              <button
                className={
                  selectedGame ===
                  "scratch"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setSelectedGame(
                    "scratch"
                  )
                }
              >
                🎫 Scratch
              </button>

              <button
                className={
                  selectedGame ===
                  "tap"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setSelectedGame(
                    "tap"
                  )
                }
              >
                ⚡ Tap
              </button>

              <button
                className={
                  selectedGame ===
                  "quiz"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setSelectedGame(
                    "quiz"
                  )
                }
              >
                🧠 Quiz
              </button>
            </div>

            {selectedGame ===
              "wheel" && (
              <div>
                <h2>
                  🎡 Daily Lucky
                  Spin
                </h2>

                <p>
                  ONE SPIN EVERY
                  DAY
                </p>

                <div
                  style={{
                    width: 260,
                    height: 260,
                    borderRadius:
                      "50%",
                    margin:
                      "25px auto",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    border:
                      "12px solid #222",
                    fontSize: 55,
                    background:
                      "conic-gradient(#fb923c 0 60deg,#fde68a 60deg 120deg,#86efac 120deg 180deg,#93c5fd 180deg 240deg,#c4b5fd 240deg 300deg,#f9a8d4 300deg 360deg)",
                    transform: `rotate(${wheelRotation}deg)`,
                    transition:
                      "transform 3.5s cubic-bezier(.17,.67,.12,1)",
                  }}
                >
                  🎡
                </div>

                {wheelResult !==
                  null && (
                  <p>
                    You won{" "}
                    <b>
                      {
                        wheelResult
                      }{" "}
                      points
                    </b>
                  </p>
                )}

                <button
                  className="primary-button"
                  disabled={
                    wheelSpinning ||
                    lastSpinDate ===
                      todayKey
                  }
                  onClick={
                    spinWheel
                  }
                >
                  {wheelSpinning
                    ? "Spinning..."
                    : lastSpinDate ===
                      todayKey
                    ? "Come Back Tomorrow"
                    : "SPIN TODAY 🎡"}
                </button>
              </div>
            )}

            {selectedGame ===
              "scratch" && (
              <div>
                <h2>
                  🎫 Monthly
                  Scratch Card
                </h2>

                <p>
                  Available only on
                  the 1st day.
                </p>

                <button
                  onClick={
                    playScratchCard
                  }
                  disabled={
                    !monthlyGamesAvailable ||
                    monthlyGamesPlayed
                  }
                  style={{
                    width: 280,
                    height: 160,
                    borderRadius: 20,
                    fontSize: 28,
                    margin:
                      "25px auto",
                    display:
                      "block",
                  }}
                >
                  {scratchRevealed
                    ? `🎉 ${scratchReward} POINTS`
                    : "✨ SCRATCH ME ✨"}
                </button>
              </div>
            )}

            {selectedGame ===
              "tap" && (
              <div>
                <h2>
                  ⚡ Monthly Tap
                  Challenge
                </h2>

                <p>
                  Available only on
                  the 1st.
                </p>

                <h1
                  style={{
                    fontSize: 50,
                  }}
                >
                  🔥{" "}
                  {tapCount}
                </h1>

                <p>
                  Time:{" "}
                  <b>
                    {tapTime}s
                  </b>
                </p>

                {!tapPlaying ? (
                  <button
                    className="primary-button"
                    onClick={
                      startTapGame
                    }
                    disabled={
                      !monthlyGamesAvailable ||
                      monthlyGamesPlayed
                    }
                  >
                    START GAME ⚡
                  </button>
                ) : (
                  <button
                    className="primary-button"
                    style={{
                      fontSize: 28,
                      minWidth: 220,
                    }}
                    onClick={() =>
                      setTapCount(
                        (value) =>
                          value +
                          1
                      )
                    }
                  >
                    TAP! 👆
                  </button>
                )}
              </div>
            )}

            {selectedGame ===
              "quiz" && (
              <div>
                <h2>
                  🧠 Monthly Food
                  Quiz
                </h2>

                {!monthlyGamesAvailable ||
                monthlyGamesPlayed ? (
                  <p>
                    🔒 Available only
                    on the 1st.
                  </p>
                ) : !quizFinished ? (
                  <>
                    <p>
                      Question{" "}
                      {quizIndex +
                        1}{" "}
                      of{" "}
                      {
                        quizQuestions.length
                      }
                    </p>

                    <h3>
                      {
                        quizQuestions[
                          quizIndex
                        ].q
                      }
                    </h3>

                    <div
                      style={{
                        display:
                          "flex",
                        gap: 12,
                        justifyContent:
                          "center",
                        flexWrap:
                          "wrap",
                      }}
                    >
                      {quizQuestions[
                        quizIndex
                      ].a.map(
                        (
                          answer
                        ) => (
                          <button
                            key={
                              answer
                            }
                            onClick={() =>
                              answerQuiz(
                                answer
                              )
                            }
                          >
                            {
                              answer
                            }
                          </button>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h2>
                      🎉 Quiz
                      Complete!
                    </h2>

                    <p>
                      Score:{" "}
                      <b>
                        {
                          quizScore
                        }
                        /
                        {
                          quizQuestions.length
                        }
                      </b>
                    </p>

                    <button
                      className="primary-button"
                      onClick={
                        resetQuiz
                      }
                    >
                      PLAY AGAIN
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="back-button"
            onClick={
              goToDashboard
            }
          >
            ← Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     CATEGORIES
  ======================================================= */

  if (
    page ===
    "categories"
  ) {
    return (
      <div className="category-page">
        <Header />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: 20,
          }}
        >
          {selectedRestaurant ? (
            <>
              <p className="eyebrow">
                🏪{" "}
                {
                  selectedRestaurant.name
                }
              </p>

              <h1>
                {foodType} Food
              </h1>

              <p>
                Delivery to{" "}
                <b>
                  {
                    deliveryLocation
                  }
                </b>
                :{" "}
                <b>
                  {deliveryFee ===
                  0
                    ? "FREE"
                    : "₹49"}
                </b>
              </p>
            </>
          ) : (
            <>
              <h1>
                Choose a
                Restaurant
              </h1>

              <button
                className="primary-button"
                onClick={() =>
                  setPage(
                    "restaurants"
                  )
                }
              >
                Choose Restaurant
              </button>
            </>
          )}

          <div className="food-switcher">
            <button
              className={
                foodType ===
                "Veg"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setFoodType(
                  "Veg"
                )
              }
            >
              🥗 Veg
            </button>

            <button
              className={
                foodType ===
                "Non-Veg"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setFoodType(
                  "Non-Veg"
                )
              }
            >
              🍗 Non-Veg
            </button>
          </div>

          <div className="category-container">
            {categories.map(
              (category) => (
                <div
                  className="category-card"
                  key={
                    category.name
                  }
                >
                  <div className="category-icon">
                    {
                      category.icon
                    }
                  </div>

                  <h2>
                    {
                      category.name
                    }
                  </h2>

                  <button
                    onClick={() =>
                      openCategory(
                        category.name
                      )
                    }
                    disabled={
                      !selectedRestaurant
                    }
                  >
                    View Dishes
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <button
          className="back-button"
          onClick={
            goToDashboard
          }
        >
          ← Dashboard
        </button>
      </div>
    );
  }

  /* =======================================================
     DISHES
  ======================================================= */

  if (
    page ===
    "dishes"
  ) {
    const dishes =
      foodData[
        selectedCategory
      ] || [];

    return (
      <div className="dishes-page">
        <Header />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: 20,
          }}
        >
          <p className="eyebrow">
            🏪{" "}
            {
              selectedRestaurant?.name
            }
          </p>

          <h1>
            {foodType}{" "}
            {selectedCategory}
          </h1>

          <p>
            Delivery:{" "}
            <b>
              {deliveryFee ===
              0
                ? "FREE"
                : "₹49"}
            </b>
          </p>

          {discount >
            0 && (
            <div className="active-offer">
              🔥 {discount}%
              DISCOUNT
              APPLIED
            </div>
          )}

          <div className="dishes-container">
            {dishes.map(
              (
                dish,
                index
              ) => {
                const price =
                  getDishPrice(
                    selectedCategory,
                    index,
                    foodType
                  );

                const salePrice =
                  discount >
                  0
                    ? Math.round(
                        price -
                          (price *
                            discount) /
                            100
                      )
                    : price;

                return (
                  <div
                    className="dish-card"
                    key={
                      dish
                    }
                  >
                    <div className="dish-image-wrapper">
                      <div className="dish-image">
                        {categories.find(
                          (c) =>
                            c.name ===
                            selectedCategory
                        )?.icon ||
                          "🍽️"}
                      </div>

                      {discount >
                        0 && (
                        <span className="sale-badge">
                          -{discount}%
                        </span>
                      )}
                    </div>

                    <h2>
                      {
                        dish
                      }
                    </h2>

                    <p>
                      Delicious{" "}
                      {foodType.toLowerCase()}{" "}
                      {
                        selectedCategory.toLowerCase()
                      }
                    </p>

                    <div className="price-row">
                      {discount >
                        0 && (
                        <span className="old-price">
                          ₹
                          {
                            price
                          }
                        </span>
                      )}

                      <h3>
                        ₹
                        {
                          salePrice
                        }
                      </h3>
                    </div>

                    <button
                      onClick={() =>
                        addToCart(
                          dish,
                          salePrice
                        )
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <button
          className="back-button"
          onClick={() =>
            setPage(
              "categories"
            )
          }
        >
          ← Back to
          Categories
        </button>
      </div>
    );
  }

  /* =======================================================
     CART
  ======================================================= */

  if (
    page ===
    "cart"
  ) {
    return (
      <div className="cart-page">
        <Header />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: 20,
          }}
        >
          <h1>
            🛒 Your Cart
          </h1>

          {cart.length ===
          0 ? (
            <div className="cart-container empty-cart">
              <div>
                🛍️
              </div>

              <h2>
                Your cart is
                empty
              </h2>

              <p>
                Add some delicious
                food to continue.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  setPage(
                    "restaurants"
                  )
                }
              >
                Explore Restaurants
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-container">
                <div
                  style={{
                    padding: 15,
                    background:
                      "#fff7ed",
                    borderRadius: 15,
                    marginBottom: 15,
                  }}
                >
                  <b>
                    🏪{" "}
                    {
                      selectedRestaurant?.name
                    }
                  </b>

                  <br />

                  📍{" "}
                  {
                    selectedRestaurant?.area
                  }{" "}
                  →{" "}
                  {
                    deliveryLocation
                  }

                  <br />

                  🚚{" "}
                  {deliveryDistance.toFixed(
                    1
                  )}{" "}
                  km •{" "}
                  {deliveryFee ===
                  0
                    ? "FREE DELIVERY"
                    : "₹49 DELIVERY"}
                </div>

                {cart.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      className="cart-item"
                      key={`${item.name}-${index}`}
                    >
                      <div className="cart-food-icon">
                        🍽️
                      </div>

                      <div className="cart-item-info">
                        <h2>
                          {
                            item.name
                          }
                        </h2>

                        <p>
                          {
                            item.foodType
                          }{" "}
                          •{" "}
                          {
                            item.category
                          }
                        </p>

                        <strong>
                          ₹
                          {
                            item.price
                          }
                        </strong>
                      </div>

                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            decreaseQuantity(
                              index
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              index
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <strong>
                        ₹
                        {item.price *
                          item.quantity}
                      </strong>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(
                            index
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  )
                )}
              </div>

              <div className="cart-summary">
                <span>
                  ORDER SUMMARY
                </span>

                <h2>
                  Your Order
                </h2>

                <p>
                  Subtotal
                  <strong>
                    ₹
                    {
                      subtotal
                    }
                  </strong>
                </p>

                <p>
                  Discount
                  <strong className="discount-text">
                    -₹
                    {
                      discountAmount
                    }
                  </strong>
                </p>

                <p>
                  Delivery
                  <strong>
                    {deliveryFee ===
                    0
                      ? "FREE"
                      : `₹${deliveryFee}`}
                  </strong>
                </p>

                <hr />

                <p className="grand-total">
                  Total
                  <strong>
                    ₹
                    {
                      totalAmount
                    }
                  </strong>
                </p>

                <button
                  className="checkout-button"
                  onClick={() =>
                    setPage(
                      "checkout"
                    )
                  }
                >
                  Proceed to
                  Checkout →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* =======================================================
     CHECKOUT
  ======================================================= */

  if (
    page ===
    "checkout"
  ) {
    return (
      <div className="checkout-page">
        <Header />

        <div className="checkout-container">
          <h1>
            Checkout
          </h1>

          <p>
            Complete your
            delivery details
          </p>

          <div
            style={{
              background:
                "#fff7ed",
              padding: 15,
              borderRadius: 15,
              marginBottom: 20,
            }}
          >
            <b>
              🏪{" "}
              {
                selectedRestaurant?.name
              }
            </b>

            <br />

            📍{" "}
            {
              deliveryLocation
            }

            <br />

            📏 Distance:{" "}
            {deliveryDistance.toFixed(
              2
            )}{" "}
            km

            <br />

            🚚 Delivery:{" "}
            <b>
              {deliveryFee ===
              0
                ? "FREE"
                : `₹${deliveryFee}`}
            </b>
          </div>

          <div className="checkout-form">
            <label>
              Customer Name
            </label>

            <input
              value={
                customerName
              }
              placeholder="Enter your name"
              onChange={(e) =>
                setCustomerName(
                  e.target
                    .value
                )
              }
            />

            <label>
              Phone Number
            </label>

            <input
              value={phone}
              placeholder="Enter phone number"
              onChange={(e) =>
                setPhone(
                  e.target
                    .value
                )
              }
            />

            <label>
              Delivery Location
            </label>

            <select
              value={
                deliveryLocation
              }
              onChange={(e) =>
                setDeliveryLocation(
                  e.target
                    .value
                )
              }
            >
              {deliveryLocations.map(
                (location) => (
                  <option
                    key={
                      location.name
                    }
                  >
                    {
                      location.name
                    }
                  </option>
                )
              )}
            </select>

            <button
              className="primary-button"
              onClick={
                detectLocation
              }
              type="button"
            >
              📍 Detect My Location
            </button>

            <label>
              Complete Address
            </label>

            <textarea
              value={
                address
              }
              placeholder="Enter complete address"
              onChange={(e) =>
                setAddress(
                  e.target
                    .value
                )
              }
            />

            <label>
              Payment Method
            </label>

            <select
              value={
                paymentMethod
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target
                    .value
                )
              }
            >
              <option>
                Cash on Delivery
              </option>

              <option>
                UPI
              </option>

              <option>
                Credit / Debit Card
              </option>
            </select>

            <div className="checkout-summary">
              <h2>
                Order Summary
              </h2>

              {cart.map(
                (
                  item,
                  index
                ) => (
                  <p
                    key={
                      index
                    }
                  >
                    {
                      item.name
                    }{" "}
                    ×{" "}
                    {
                      item.quantity
                    }

                    <span>
                      ₹
                      {item.price *
                        item.quantity}
                    </span>
                  </p>
                )
              )}

              <p>
                Subtotal
                <span>
                  ₹
                  {
                    subtotal
                  }
                </span>
              </p>

              <p className="discount-text">
                Discount
                <span>
                  -₹
                  {
                    discountAmount
                  }
                </span>
              </p>

              <p>
                Delivery
                <span>
                  {deliveryFee ===
                  0
                    ? "FREE"
                    : `₹${deliveryFee}`}
                </span>
              </p>

              <hr />

              <h2>
                Total: ₹
                {
                  totalAmount
                }
              </h2>
            </div>

            <button
              className="place-order-button"
              onClick={
                placeOrder
              }
            >
              Place Order ✓
            </button>

            <button
              className="back-button"
              onClick={() =>
                setPage(
                  "cart"
                )
              }
            >
              ← Back to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     ORDER STATUS
  ======================================================= */

  if (
    page ===
    "orderStatus"
  ) {
    const order =
      orders[0];

    return (
      <div className="order-status-page">
        <div className="order-status-card">
          <div className="success-icon">
            ✓
          </div>

          <span className="eyebrow">
            ORDER CONFIRMED
          </span>

          <h1>
            Your food is on
            its way!
          </h1>

          <p>
            Order #
            {
              order?.id
            }
          </p>

          <div className="large-order-status">
            <div className="status-item active">
              <span>
                ✓
              </span>

              <div>
                <strong>
                  Order Confirmed
                </strong>

                <small>
                  We've received
                  your order
                </small>
              </div>
            </div>

            <div className="status-item active">
              <span>
                🍳
              </span>

              <div>
                <strong>
                  Preparing
                </strong>

                <small>
                  Your food is
                  being prepared
                </small>
              </div>
            </div>

            <div className="status-item">
              <span>
                🛵
              </span>

              <div>
                <strong>
                  Out for Delivery
                </strong>

                <small>
                  Your order will
                  be delivered soon
                </small>
              </div>
            </div>
          </div>

          <div className="success-total">
            <span>
              Total
            </span>

            <strong>
              ₹
              {
                order?.total ||
                0
              }
            </strong>
          </div>

          <button
            className="primary-button"
            onClick={
              goToDashboard
            }
          >
            Back to Dashboard
          </button>

          <button
            className="back-button"
            onClick={() =>
              setPage(
                "orders"
              )
            }
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     ORDERS
  ======================================================= */

  if (
    page ===
    "orders"
  ) {
    return (
      <div className="orders-page">
        <Header />

        <div className="orders-header">
          <span>
            MY ACCOUNT
          </span>

          <h1>
            Your Orders
          </h1>

          <p>
            Track current orders
            and view previous
            orders.
          </p>
        </div>

        {currentOrder && (
          <section className="orders-section">
            <div className="section-heading">
              <div>
                <span>
                  CURRENT ORDER
                </span>

                <h2>
                  On the way
                </h2>
              </div>

              <span className="status-pill">
                {
                  currentOrder.status
                }
              </span>
            </div>

            <div className="order-list-card">
              <div>
                <small>
                  #
                  {
                    currentOrder.id
                  }
                </small>

                <h3>
                  {currentOrder.items
                    .map(
                      (
                        item
                      ) =>
                        `${item.name} × ${item.quantity}`
                    )
                    .join(
                      ", "
                    )}
                </h3>

                <p>
                  🏪{" "}
                  {
                    currentOrder.restaurantName
                  }
                </p>

                <p>
                  🚚{" "}
                  {
                    currentOrder.deliveryDistance
                  }{" "}
                  km
                </p>

                <p>
                  {
                    currentOrder.date
                  }
                </p>
              </div>

              <strong>
                ₹
                {
                  currentOrder.total
                }
              </strong>
            </div>
          </section>
        )}

        <section className="orders-section">
          <div className="section-heading">
            <div>
              <span>
                ORDER HISTORY
              </span>

              <h2>
                Previous Orders
              </h2>
            </div>
          </div>

          {previousOrders.length ===
          0 ? (
            <div className="empty-orders">
              <div>
                📦
              </div>

              <h3>
                No previous
                orders
              </h3>

              <p>
                Your completed
                orders will appear
                here.
              </p>
            </div>
          ) : (
            <div className="previous-orders">
              {previousOrders.map(
                (
                  order
                ) => (
                  <div
                    className="order-list-card"
                    key={
                      order.id
                    }
                  >
                    <div className="order-history-icon">
                      🍽️
                    </div>

                    <div>
                      <small>
                        #
                        {
                          order.id
                        }
                      </small>

                      <h3>
                        {order.items
                          .map(
                            (
                              item
                            ) =>
                              `${item.name} × ${item.quantity}`
                          )
                          .join(
                            ", "
                          )}
                      </h3>

                      <p>
                        🏪{" "}
                        {
                          order.restaurantName
                        }
                      </p>

                      <p>
                        {
                          order.date
                        }
                      </p>
                    </div>

                    <div className="order-price">
                      <strong>
                        ₹
                        {
                          order.total
                        }
                      </strong>

                      <span className="delivered-pill">
                        {
                          order.status
                        }
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        <button
          className="back-button"
          onClick={
            goToDashboard
          }
        >
          ← Dashboard
        </button>
      </div>
    );
  }

  /* =======================================================
     PROFILE
  ======================================================= */

  if (
    page ===
    "profile"
  ) {
    return (
      <div className="profile-page">
        <Header />

        <div className="profile-container">
          <div className="profile-hero">
            <div className="profile-avatar">
              {user.name
                ? user.name
                    .charAt(
                      0
                    )
                    .toUpperCase()
                : "U"}
            </div>

            <div>
              <span>
                FOODIE MEMBER
              </span>

              <h1>
                {user.name ||
                  "User"}
              </h1>

              <p>
                {
                  user.email
                }
              </p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-form-card">
              <span>
                PERSONAL INFORMATION
              </span>

              <h2>
                Profile Details
              </h2>

              <label>
                Full Name
              </label>

              <input
                value={
                  customerName
                }
                onChange={(e) =>
                  setCustomerName(
                    e.target
                      .value
                  )
                }
              />

              <label>
                Email
              </label>

              <input
                value={
                  user.email
                }
                disabled
              />

              <label>
                Phone
              </label>

              <input
                value={phone}
                placeholder="Add phone number"
                onChange={(e) =>
                  setPhone(
                    e.target
                      .value
                  )
                }
              />

              <label>
                Delivery Location
              </label>

              <select
                value={
                  deliveryLocation
                }
                onChange={(e) =>
                  setDeliveryLocation(
                    e.target
                      .value
                  )
                }
              >
                {deliveryLocations.map(
                  (location) => (
                    <option
                      key={
                        location.name
                      }
                    >
                      {
                        location.name
                      }
                    </option>
                  )
                )}
              </select>

              <label>
                Delivery Address
              </label>

              <textarea
                value={
                  address
                }
                placeholder="Add delivery address"
                onChange={(e) =>
                  setAddress(
                    e.target
                      .value
                  )
                }
              />

              <button
                className="primary-button"
                onClick={
                  saveProfile
                }
              >
                Save Changes
              </button>

              <button
                className="logout-button profile-logout"
                onClick={
                  logout
                }
              >
                🚪 Logout
              </button>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <span>
                  TOTAL ORDERS
                </span>

                <strong>
                  {
                    orders.length
                  }
                </strong>

                <small>
                  Orders placed
                </small>
              </div>

              <div className="stat-card">
                <span>
                  POINTS
                </span>

                <strong>
                  {points}
                </strong>

                <small>
                  Reward points
                </small>
              </div>

              <div className="stat-card">
                <span>
                  CART ITEMS
                </span>

                <strong>
                  {cartCount}
                </strong>

                <small>
                  Ready to checkout
                </small>
              </div>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              setPage(
                "rewards"
              )
            }
          >
            🎁 Rewards &
            Games
          </button>

          <button
            className="primary-button"
            onClick={() =>
              setPage(
                "restaurants"
              )
            }
            style={{
              marginLeft: 10,
            }}
          >
            🏪 Restaurants
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;