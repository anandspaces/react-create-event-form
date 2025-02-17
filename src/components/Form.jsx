import { useState } from "react"

function Form() {
  const [name, setName] = useState("")
  return (
    <div>
      <div>
      <h3>Create an Event</h3>
      <p>Enter your event details</p>
      </div>
<form>
  <h4>Event Details</h4>
  <div>
    <label htmlFor="name">Event Name</label>
    <input type="text" id="name" />
    <label htmlFor="category">Event Category</label>
    <input type="text" id="category" />
  </div>
  <h4>Event Cards</h4>
  {/* Two image cards  */}
  {/* uploade video */}
  <p>We require event images in both vertical (portrait) and horizontal (landscape) formats*  </p>
  {/* uploade video */}
    <p>card guidelines</p>
    <label htmlFor="desc">Event Description</label>
    <input type="textarea" />
    <label htmlFor="startDate">Start Date</label>
    <input type="date" name="" id="startDate" />
    <label htmlFor="endDate">End Date</label>
    <input type="date" name="" id="endDate" />
    <label htmlFor="reg">Registration Deadline</label>
    <input type="date" name="" id="reg" />
    <label htmlFor="eventType">Event Type</label>
    <input type="date" name="" id="eventType" />
    <label htmlFor="venueName">Enter Venue Name</label>
    <input type="date" name="" id="venueName" />
    <label htmlFor="city">Enter City</label>
    <input type="date" name="" id="city" />
    <label htmlFor="pricePerTicket">Price per Ticket</label>
    <input type="date" name="" id="pricePerTicket" />
    {/* gray text=This is the standard price for your tickets */}
    <label htmlFor="totalTicket">Total Tickets</label>
    <input type="date" name="" id="totalTicket" />
    {/* checkbox text=Add Tiered Pricing Options (Optiona) */}
    <h1>Tiered Pricing Options</h1>
    <label htmlFor="nameTier">Name</label>
    <input type="text" id="nameTier"/>
    <label htmlFor="priceTier">Price per Ticket</label>
    <input type="text" id="priceTier"/>
    <label htmlFor="availabilityTier">Availability Deadline</label>
    <input type="date" id="availabilityTier"/>
    <label htmlFor="slotTier">Slots</label>
    <input type="text" id="slotTier"/>
    <button>+ Add More</button>
    <button>Done</button>
    <h4>Point of Contact</h4>
    <label htmlFor="organiserName">Organiser Name</label>
    <input type="text" id="organiserName"/>
    <label htmlFor="phoneNumber">Phone Number</label>
    <input type="number" id="phoneNumber"/>
    <p>Terms n Conditions</p>
    {/* Terms & Conditions */}
    {/* switch button text=Set event to private */}
    <button>Add Section</button>
    <button type="submit">Preview</button>
</form>
    </div>
  )
}
export default Form