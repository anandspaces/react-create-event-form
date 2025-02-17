import { useState } from "react";

function Form() {
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
    eventType: "Physical",
    isPrivate: false,
    displayTitle: false,
  });

  const [tiers, setTiers] = useState([]);
  const [errors, setErrors] = useState({});
  const [verticalPreview, setVerticalPreview] = useState(null);
  const [horizontalPreview, setHorizontalPreview] = useState(null);
  const [verticalVideoPreview, setVerticalVideoPreview] = useState(null);
  const [horizontalVideoPreview, setHorizontalVideoPreview] = useState(null);
  const [videoFile, setVideoFile] = useState({
    vertical: null,
    horizontal: null
  });

// Enhanced validation function
const validateForm = () => {
  const newErrors = {};
  const requiredFields = ['name', 'category', 'startDate', 'regDeadline'];
  
  requiredFields.forEach(field => {
    if (!eventData[field]) {
      newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  if (!verticalPreview) newErrors.verticalImage = "Vertical image is required";
  if (!horizontalPreview) newErrors.horizontalImage = "Horizontal image is required";
  
  if (eventData.endDate && new Date(eventData.endDate) < new Date(eventData.startDate)) {
    newErrors.endDate = "End date cannot be before start date";
  }

  if (eventData.phoneNumber && !/^\d{10}$/.test(eventData.phoneNumber)) {
    newErrors.phoneNumber = "Invalid phone number format";
  }

  // Validate ticket tiers
  tiers.forEach((tier, index) => {
    if (!tier.name || !tier.price || !tier.availability || !tier.slots) {
      newErrors[`tier${index}`] = `All fields in Tier ${index + 1} are required`;
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Enhanced image upload handler with file validation
const handleImageUpload = (e, setPreview) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.match(/image.(jpeg|jpg|png)/)) {
    setErrors(prev => ({ ...prev, [e.target.name]: 'Only JPG/PNG images allowed' }));
    return;
  }

  if (file.size > 100 * 1024 * 1024) { // 100MB
    setErrors(prev => ({ ...prev, [e.target.name]: 'File size exceeds 100MB limit' }));
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => setPreview(reader.result);
  reader.readAsDataURL(file);
};

// New video upload handler
const handleVideoUpload = (e, type) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.match(/video.(mp4|mov|avi)/)) {
    setErrors(prev => ({ ...prev, [type]: 'Only MP4/MOV/AVI videos allowed' }));
    return;
  }

  if (file.size > 500 * 1024 * 1024) { // 500MB
    setErrors(prev => ({ ...prev, [type]: 'File size exceeds 500MB limit' }));
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    type === 'vertical' 
      ? setVerticalVideoPreview(reader.result)
      : setHorizontalVideoPreview(reader.result);
  };
  reader.readAsDataURL(file);
  setVideoFile(prev => ({ ...prev, [type]: file }));
};

// Enhanced form submission handler
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const formPayload = new FormData();
  
  // Append all event data
  Object.entries(eventData).forEach(([key, value]) => {
    formPayload.append(key, value);
  });

  // Append media files
  if (verticalPreview) formPayload.append('verticalImage', verticalPreview);
  if (horizontalPreview) formPayload.append('horizontalImage', horizontalPreview);
  if (videoFile.vertical) formPayload.append('verticalVideo', videoFile.vertical);
  if (videoFile.horizontal) formPayload.append('horizontalVideo', videoFile.horizontal);

  // Append ticket tiers
  tiers.forEach((tier, index) => {
    Object.entries(tier).forEach(([key, value]) => {
      formPayload.append(`tier${index}_${key}`, value);
    });
  });

  try {
    // Example API call
    const response = await fetch('/api/events', {
      method: 'POST',
      body: formPayload
    });
    
    if (!response.ok) throw new Error('Submission failed');
    
    alert('Event created successfully!');
    resetForm();
  } catch (error) {
    console.error('Submission error:', error);
    alert('Error creating event. Please try again.');
  }
};

// Form reset function
const resetForm = () => {
  setEventData({
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
    eventType: "Physical",
    isPrivate: false,
    displayTitle: false,
  });
  setTiers([]);
  setErrors({});
  setVerticalPreview(null);
  setHorizontalPreview(null);
  setVerticalVideoPreview(null);
  setHorizontalVideoPreview(null);
  setVideoFile({ vertical: null, horizontal: null });
};
  

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setEventData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };


  const addTier = () => {
    setTiers([...tiers, { id: Date.now(), name: "", price: "", availability: "", slots: "" }]);
  };

  const removeTier = (tierId) => {
    setTiers(tiers.filter(tier => tier.id !== tierId));
  };

  const handleTierChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTiers = [...tiers];
    updatedTiers[index][name] = value;
    setTiers(updatedTiers);
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto p-6 shadow-xl rounded-xl bg-gray-900 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Create Your Event
          </h1>
          <p className="text-gray-300 mt-4">Enter your event details</p>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Details Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Event Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Event Name</label>
                <input
                  type="text"
                  id="name"
                  className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
                  value={eventData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Category</label>
                <input
                  type="text"
                  id="category"
                  className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.category ? 'border-red-500' : 'border-gray-700'}`}
                  value={eventData.category}
                  onChange={handleChange}
                />
                {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
              </div>
            </div>
          </section>
  
          {/* Media Upload Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Event Cards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="relative h-48 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setVerticalPreview)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {verticalPreview ? (
                    <img src={verticalPreview} alt="Preview" className="h-full w-full object-cover rounded-xl" />
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-gray-400">Click to upload</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="relative h-48 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setHorizontalPreview)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {horizontalPreview ? (
                    <img src={horizontalPreview} alt="Preview" className="h-full w-full object-cover rounded-xl" />
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-gray-400">Click to upload</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={eventData.displayTitle}
                onChange={handleChange}
                id="displayTitle"
                className="h-5 w-5 rounded border-gray-600 bg-gray-800"
              />
              <span className="text-sm">Display title on event card</span>
            </label>
          </section>
  
          {/* Video Upload Section */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="relative h-48 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e, setVerticalVideoPreview)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {verticalVideoPreview ? (
                      <video controls className="h-full w-full object-cover rounded-xl">
                        <source src={verticalVideoPreview} />
                      </video>
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-400">Click to upload video</p>
                      </div>
                    )}
                  </div>
                </div>
                
              <div className="text-sm text-gray-400">
                <p>We require event images in both vertical (portrait) and horizontal (landscape) formats*</p>
              </div>
                <div>
                  <div className="relative h-48 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e, setHorizontalVideoPreview)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {horizontalVideoPreview ? (
                      <video controls className="h-full w-full object-cover rounded-xl">
                        <source src={horizontalVideoPreview} />
                      </video>
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-400">Click to upload video</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <p className="mt-2 text-blue-300 hover:text-blue-200 font-bold">Card Guidelines</p>
                {/* <ul className="list-disc pl-5 mt-1">
                  <li>Minimum resolution: 1920x1080</li>
                  <li>Max file size: 100MB</li>
                  <li>Supported formats: PNG, JPG, MP4</li>
                </ul> */}
              </div>
            </div>
          </section>
  
          {/* Event Settings Section */}
          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                  value={eventData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                  value={eventData.endDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Registration Deadline</label>
                <input
                  type="date"
                  id="regDeadline"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                  value={eventData.regDeadline}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Type</label>
                <select
                  id="eventType"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                  value={eventData.eventType}
                  onChange={handleChange}
                >
                  <option value="Physical">Physical Event</option>
                  <option value="Virtual">Virtual Event</option>
                  <option value="Hybrid">Hybrid Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Enter Venue Name</label>
                <input
                  type="text"
                  id="name"
                  className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
                  value={eventData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Enter City</label>
                <input
                  type="text"
                  id="name"
                  className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
                  value={eventData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price per ticket</label>
                <input
                  type="number"
                  id="name"
                  className={`w-full p-3 rounded-lg bg-gray-800 border border-gray-700`}
                  value={eventData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Total Tickets</label>
                <input
                  type="number"
                  id="name"
                  className={`w-full p-3 rounded-lg bg-gray-800 border border-gray-700`}
                  value={eventData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>
  
          {/* Tiered Pricing Section */}
          <section className="space-y-6">
              <h2 className="text-2xl font-bold">Tiered Pricing Options</h2>
            
            {tiers.map((tier, index) => (
              <div key={tier.id} className="bg-gray-800 p-4 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Ticket Tier #{index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeTier(tier.id)}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <span>Remove</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={tier.name}
                      onChange={(e) => handleTierChange(index, e)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Price per Ticket</label>
                    <input
                      type="number"
                      name="price"
                      value={tier.price}
                      onChange={(e) => handleTierChange(index, e)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Available Deadline</label>
                    <input
                      type="date"
                      name="availability"
                      value={tier.availability}
                      onChange={(e) => handleTierChange(index, e)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Slots</label>
                    <input
                      type="number"
                      name="slots"
                      value={tier.slots}
                      onChange={(e) => handleTierChange(index, e)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={addTier}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <span>+ Add More</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <span>Done</span>
              </button>

</div>
          </section>
  
          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Point of Contact</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Organiser Name</label>
                <input
                  type="text"
                  id="organiserName"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                  value={eventData.organiserName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                  value={eventData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          <div className="mt-2">
              <h3 className="text-white">Terms and Conditions</h3>
              <p className="text-gray-300 rounded-lg">
          {/* Terms and Conditions */}

              </p>
          </div>
          </section>
  
          <section className="space-y-6">
            {/* <h2 className="text-2xl font-bold">Visibility Settings</h2> */}
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={eventData.isPrivate}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-600 bg-gray-700"
                />
                <span className="text-sm">Make event private (visible only to invited guests)</span>
              </label>
            </div>
          </section>
  
          {/* Form Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-end border-t border-gray-800 pt-6">
            {/* <button
              type="button"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Save Draft
            </button> */}
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all"
            >
              Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;