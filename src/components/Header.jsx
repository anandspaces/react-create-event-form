import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Create Event"); // Default selected item

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
        {["Home", "Dashboard", "Reports", "History", "Create Event"].map(
          (item) => (
            <div
              key={item}
              className={`p-2 cursor-pointer relative 
              hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent 
              ${selected === item ? "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent border-b-2 border-white" : ""}`}
              onClick={() => setSelected(item)}
            >
              {item}
            </div>
          )
        )}
      </div>
    </nav>
  );
}

export default Header;
