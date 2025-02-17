import { useState } from "react";

function Form() {
  // State for form fields
  const [eventData, setEventData] = useState({
    name: "",
    category: "",
    description: "",
    startDate: "",
    endDate: "",
    regDeadline: "",
    pricePerTicket: "",
    totalTickets: "",
    organiserName: "",
    phoneNumber: "",
  });

  // State for tiered pricing
  const [tiers, setTiers] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEventData({ ...eventData, [id]: value });
  };

  // Add a new tiered pricing entry
  const addTier = () => {
    setTiers([...tiers, { name: "", price: "", availability: "", slots: "" }]);
  };

  // Handle tiered pricing changes
  const handleTierChange = (index, e) => {
    const { id, value } = e.target;
    const updatedTiers = [...tiers];
    updatedTiers[index][id] = value;
    setTiers(updatedTiers);
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.category || !eventData.startDate) {
      alert("Please fill out required fields.");
      return;
    }
    console.log("Event Data:", eventData);
    console.log("Tiered Pricing:", tiers);
    alert("Event Created Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h3 className="text-2xl font-semibold">Create an Event</h3>
      <p className="text-gray-600">Enter your event details</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h4 className="text-xl font-semibold">Event Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Event Name*</label>
            <input type="text" id="name" value={eventData.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700">Event Category*</label>
            <input type="text" id="category" value={eventData.category} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
        </div>

        <h4 className="text-xl font-semibold">Event Description</h4>
        <textarea id="description" value={eventData.description} onChange={handleChange} className="w-full p-2 border rounded-md"></textarea>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-gray-700">Start Date*</label>
            <input type="date" id="startDate" value={eventData.startDate} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-gray-700">End Date</label>
            <input type="date" id="endDate" value={eventData.endDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="regDeadline" className="block text-gray-700">Registration Deadline</label>
            <input type="date" id="regDeadline" value={eventData.regDeadline} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
        </div>

        <h4 className="text-xl font-semibold">Pricing & Tickets</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pricePerTicket" className="block text-gray-700">Price per Ticket ($)</label>
            <input type="number" id="pricePerTicket" value={eventData.pricePerTicket} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="totalTickets" className="block text-gray-700">Total Tickets</label>
            <input type="number" id="totalTickets" value={eventData.totalTickets} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
        </div>

        <h4 className="text-xl font-semibold">Tiered Pricing Options</h4>
        {tiers.map((tier, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" id="name" placeholder="Tier Name" value={tier.name} onChange={(e) => handleTierChange(index, e)} className="w-full p-2 border rounded-md" />
            <input type="number" id="price" placeholder="Price" value={tier.price} onChange={(e) => handleTierChange(index, e)} className="w-full p-2 border rounded-md" />
            <input type="date" id="availability" value={tier.availability} onChange={(e) => handleTierChange(index, e)} className="w-full p-2 border rounded-md" />
            <input type="number" id="slots" placeholder="Slots" value={tier.slots} onChange={(e) => handleTierChange(index, e)} className="w-full p-2 border rounded-md" />
          </div>
        ))}
        <button type="button" onClick={addTier} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600">+ Add Tier</button>

        <h4 className="text-xl font-semibold">Point of Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="organiserName" className="block text-gray-700">Organiser Name</label>
            <input type="text" id="organiserName" value={eventData.organiserName} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
            <input type="number" id="phoneNumber" value={eventData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">Add Section</button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500">Preview</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
