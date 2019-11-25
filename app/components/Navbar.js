import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className='nav-bar'>
          <div className="nav-links">
            <div className='nav-link'><Link to={"/"}>Home</Link></div>
            <div className='nav-link'><Link to={"/schedule"}>Schedule</Link></div>
            <div className='nav-link'><Link to={"/faq"}>FAQ</Link></div>
            <div className='nav-link'><Link to={"/rsvp"}>RSVP</Link></div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;