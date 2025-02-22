import { useState } from "react";
import axios from "axios";
import "./CommunityFunding.css"; // Import CSS file

function CommunityFunding() {
  const [loading, setLoading] = useState(false);

  let data = {
    name: "tanisha",
    amount: 1,
    number: "9999999999",
    MID: "MID" + Date.now(),
    transactionId: "T" + Date.now(),
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await axios
        .post("http://localhost:8000/order", data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="funding-card">
      <h2>Support the Community</h2>
      <p>Your contribution helps us reduce food waste and support those in need.</p>
      <button onClick={handleClick} className="donate-button">
        {loading ? "Processing..." : "Donate Now"}
      </button>
    </div>
  );
}

export default CommunityFunding;
