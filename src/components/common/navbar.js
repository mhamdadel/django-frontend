import { useState } from 'react';
import './navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-end justify-end h-16 justify-items-end">
        <div className="absolute inset-y-0 right-0 flex items-end sm:hidden justify-items-end">
  <button
    onClick={toggleMenu}
    type="button"
    className="inline-flex items-end justify-end p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    aria-controls="mobile-menu"
    aria-expanded={isOpen}
  >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
                  <h4 className=''>Ecommerce</h4>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
  <div className="flex-shrink-0">
  </div>
  <div className="hidden sm:block sm:ml-6 flex-grow">
    <div className="flex justify-end space-x-4" id='link' >
      <a href="#" className="text-black px-3 py-2 rounded-md text-base font-medium">
        Home
      </a>

      <a href="#" className="text-black px-3 py-2 rounded-md text-base font-medium">
        Sign In
      </a>

      <a href="#" className="text-black px-3 py-2 rounded-md text-base font-medium" >
        Sign Up
      </a>

      <a href="#" className="text-black px-3 py-2 rounded-md text-base font-medium" >
        Discover
      </a>

      <a><i className="fa fa-shopping-cart px-3 py-2"></i></a>
      <a><i className="far fa-heart	px-3 py-2"></i></a>

    </div>
  </div>
</div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <div className="ml-3 relative">

            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="text-black block px-3 py-2 rounded-md text-base font-medium">
            Home            
            </a>

            <a href="#"className="text-black block px-3 py-2 rounded-md text-base font-medium">
              Sign In
            </a>

            <a href="#" className="text-black block px-3 py-2 rounded-md text-base font-medium">
              Sign Up
            </a>

            <a href="#" className="text-black block px-3 py-2 rounded-md text-base font-medium">
              Calendar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;