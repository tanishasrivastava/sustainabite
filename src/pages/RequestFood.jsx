import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestFood.css";

const RequestFood = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    isPacked: null,
    isPerishable: null,
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [donations, filterOptions, sortOption]);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/donations");
      // Convert packed & perishable values to proper booleans
      const formattedDonations = response.data.map((donation) => ({
        ...donation,
        isPacked: donation.isPacked === "true" || donation.isPacked === true,
        isPerishable: donation.isPerishable === "true" || donation.isPerishable === true,
      }));
      setDonations(formattedDonations);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleRequest = (donationId) => {
    alert(`Requested item with ID: ${donationId}`);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleFilterChange = (filterType, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [filterType]: value === "all" ? null : value === "true",
    }));
  };

  const applyFiltersAndSort = () => {
    let filteredData = donations.filter((donation) => {
      return (
        (filterOptions.isPacked === null || donation.isPacked === (filterOptions.isPacked === "true")) &&
        (filterOptions.isPerishable === null || donation.isPerishable === (filterOptions.isPerishable === "true"))
      );
    });

    let sortedData = [...filteredData]; // Copy array to prevent mutation

    if (sortOption) {
      switch (sortOption) {
        case "expiryCloseToFar":
          sortedData.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
          break;
        case "expiryFarToClose":
          sortedData.sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));
          break;
        case "quantityHighToLow":
          sortedData.sort((a, b) => Number(b.quantity) - Number(a.quantity));
          break;
        case "quantityLowToHigh":
          sortedData.sort((a, b) => Number(a.quantity) - Number(b.quantity));
          break;
        default:
          break;
      }
    }

    setFilteredDonations([...sortedData]); // Ensure proper re-render
  };

  return (
    <div>
      <h2 className="righteous-regularrq">Request Food</h2>

      {/* Sorting & Filtering Options */}
      <div className="sort-filter-container">
        <select onChange={(e) => handleSort(e.target.value)} className="sort-dropdown">
          <option value="">Sort By</option>
          <option value="expiryCloseToFar">Expiry Date (Close to Far)</option>
          <option value="expiryFarToClose">Expiry Date (Far to Close)</option>
          <option value="quantityHighToLow">Quantity (High to Low)</option>
          <option value="quantityLowToHigh">Quantity (Low to High)</option>
        </select>

        <select onChange={(e) => handleFilterChange("isPacked", e.target.value)} className="filter-dropdown">
          <option value="all">All (Packed & Not Packed)</option>
          <option value="true">Packed</option>
          <option value="false">Not Packed</option>
        </select>

        <select onChange={(e) => handleFilterChange("isPerishable", e.target.value)} className="filter-dropdown">
          <option value="all">All (Perishable & Non-Perishable)</option>
          <option value="true">Perishable</option>
          <option value="false">Non-Perishable</option>
        </select>
      </div>

      {/* Donations List */}
      <div className="donation-history-container">
        {filteredDonations.length === 0 ? (
          <p className="text-gray-500 text-center">No donations available.</p>
        ) : (
          <ul className="donation-listt">
            {filteredDonations.map((donation) => (
              <li key={donation.id} className="donation-item">
                <img
                  src={donation.imageUrl || "/placeholder.jpg"}
                  alt={donation.foodName}
                  className="donation-image"
                />
                <div className="donation-details">
                  <p className="donation-name">{donation.foodName}</p>
                  <p className="donation-info">Quantity: {donation.quantity} kg/pieces</p>
                  <p className="donation-info">Perishable: {donation.isPerishable ? "Yes" : "No"}</p>
                  <p className="donation-info">Packed Food: {donation.isPacked ? "Yes" : "No"}</p>
                  <p className="donation-info">Expiry Date: {donation.expiryDate}</p>
                  <p className="donation-info">Pickup Address: {donation.address}</p>
                  <p className="donation-info">Item Added On: {new Date(donation.madeDate).toLocaleDateString()}</p>
                  <button className="request-button" onClick={() => handleRequest(donation.id)}>
                    Request This Item
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RequestFood;
