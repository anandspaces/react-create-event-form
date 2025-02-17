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
        <div className="p-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent">Home</div>
        <div className="p-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent">Dashboard</div>
        <div className="p-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent">Reports</div>
        <div className="p-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent">History</div>
        <div className="p-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent">Create Event</div>
      </div>
    </nav>
  );
}

export default Header;
