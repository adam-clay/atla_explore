import React from 'react';
import bannerImage from './images/banner.png';

function Header() {
  return (
    <div className="header">
      <img src={bannerImage} alt="Banner" className="banner-image" />
    </div>
  );
}

export default Header;