import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-center bg-black text-white p-4">
      <div className="flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`md:flex md:items-center md:space-x-6 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="p-2 hover:text-gray-400 cursor-pointer">Home</div>
        <div className="p-2 hover:text-gray-400 cursor-pointer">Dashboard</div>
        <div className="p-2 hover:text-gray-400 cursor-pointer">Reports</div>
        <div className="p-2 hover:text-gray-400 cursor-pointer">History</div>
        <div className="p-2 hover:text-gray-400 cursor-pointer">Create Event</div>
      </div>
    </nav>
  );
}

export default Header;
