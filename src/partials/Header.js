import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition.js';

function Header() {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [top, setTop] = useState(true);

  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNavOpen.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white blur shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:flex-grow">

            {/* Desktop menu as */}
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <a href="#audits" className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">Audits</a>
              </li>
              <li>
                <a href="#roadmap" className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">Roadmap</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">FAQ</a>
              </li>              
              {/* 1st level: hover */}
            </ul>

            {/* Desktop sign in as */}
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <a href="/dashboard" target="_blank" rel="noreferrer" className="btn-sm text-white buy mr-3">Dashboard</a>
              </li>
              <li>
                <a href="/stake" target="_blank" rel="noreferrer" className="btn-sm text-white buy">GUSser</a>
              </li>
            </ul>

          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden">

            {/* Hamburger button */}
            <button
              className={`hamburger ${mobileNavOpen && 'active'}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" />
                <rect y="11" width="24" height="2" />
                <rect y="18" width="24" height="2" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <div ref={mobileNav}>
              <Transition
                show={mobileNavOpen}
                tag="nav"
                id="mobile-nav"
                className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"              
              >
                <ul className="px-5 py-2">
                  <li>
                    <a href="#audits" className="flex text-gray-600 hover:text-gray-900 py-2">Audits</a>
                  </li>
                  <li>
                    <a href="#roadmap" className="flex text-gray-600 hover:text-gray-900 py-2">Roadmap</a>
                  </li>
                  <li>
                    <a href="#faq" className="flex text-gray-600 hover:text-gray-900 py-2">FAQ</a>
                  </li>                                  
                  <li>
                    <a href="https://app.guhtoken.org/" rel="noreferrer" target="_blank" className="btn-sm text-white buy w-full my-4">Dashboard</a>
                  </li>
                  <li>
                    <a href="https://stake.guhtoken.org/" rel="noreferrer" target="_blank" className="btn-sm text-white buy w-full">Geyser</a>
                  </li>
                </ul>
              </Transition>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
