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
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6 shadow-md rounded-md bg-gray-900">
        <div className="text-center my-6">
          <h3 className="text-4xl md:text-6xl font-semibold">Create an Event</h3>
          <p className="text-lg md:text-xl my-4">Enter your event details</p>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          <h4 className="text-2xl font-semibold">Event Details</h4>
          <div className="flex justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="block text-gray-300">Event Name*</label>
              <input type="text" id="name" value={eventData.name} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" required />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="category" className="block text-gray-300">Event Category*</label>
              <input type="text" id="category" value={eventData.category} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" required />
            </div>
          </div>
  
          <h4 className="text-2xl font-semibold">Event Cards</h4>
          <div>
            <div className="flex justify-between">
              <input type="file" accept="image/*" className="w-full md:w-1/2 h-48 p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
              <input type="file" accept="image/*" className="w-full md:w-1/2 h-48 p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />

            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="text-gray-300">Display title on the card</span>
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-gray-400">We require event images in both vertical (portrait) and horizontal (landscape) formats*</p>
            <div className="flex flex-col gap-4">
              <div className="w-full h-48">
                <input type="file" accept="video/*" className="w-full h-48 p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
              </div>
              <div className="w-full h-48">
                <input type="file" accept="video/*" className="w-full h-48 p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm">Card guidelines: Ensure images are high-quality and relevant to the event.</p>
          </div>
  
          <h4 className="text-2xl font-semibold">Event Description</h4>
          <textarea id="description" value={eventData.description} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" rows="5"></textarea>
  
          <div className="flex justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="startDate" className="block text-gray-300">Start Date*</label>
              <input type="date" id="startDate" value={eventData.startDate} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" required />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="endDate" className="block text-gray-300">End Date</label>
              <input type="date" id="endDate" value={eventData.endDate} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
            </div>
          </div>
  
          <div className="flex justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="regDeadline" className="block text-gray-300">Registration Deadline</label>
              <input type="date" id="regDeadline" value={eventData.regDeadline} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="eventType" className="block text-gray-300">Event Type</label>
              <select id="eventType" value={eventData.eventType} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white">
                <option value="Physical">Physical</option>
                <option value="Virtual">Virtual</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
  
          <div className="flex justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="pricePerTicket" className="block text-gray-300">Price per Ticket ($)</label>
              <input type="number" id="pricePerTicket" value={eventData.pricePerTicket} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="totalTickets" className="block text-gray-300">Total Tickets</label>
              <input type="number" id="totalTickets" value={eventData.totalTickets} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
            </div>
          </div>
  
          <h4 className="text-2xl font-semibold">Tiered Pricing Options</h4>
          {tiers.map((tier, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Tier Name" value={tier.name} onChange={(e) => handleTierChange(index, e)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
              <input type="number" placeholder="Price" value={tier.price} onChange={(e) => handleTierChange(index, e)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
              <input type="date" value={tier.availability} onChange={(e) => handleTierChange(index, e)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
              <input type="number" placeholder="Slots" value={tier.slots} onChange={(e) => handleTierChange(index, e)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
            </div>
          ))}
          <div className="flex justify-between">

          <button type="button" onClick={addTier} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">+ Add More</button>
          <button type="button" className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Done</button>
          </div>
  
          <h4 className="text-2xl font-semibold">Point of Contact</h4>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="organiserName" className="block text-gray-300">Organiser Name</label>
              <input type="text" id="organiserName" value={eventData.organiserName} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="phoneNumber" className="block text-gray-300">Phone Number</label>
              <input type="number" id="phoneNumber" value={eventData.phoneNumber} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
            </div>
          </div>
  
          <h4 className="text-2xl font-semibold">Terms and Conditions</h4>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="text-gray-300">Set event to Private</span>
          </label>
  
          <div className="flex gap-4">
            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">Add Section</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500">Preview</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;