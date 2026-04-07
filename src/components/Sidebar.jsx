import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Thống kê', path: '/', icon: 'bi bi-grid-1x2-fill' },
    { name: 'Sản phẩm', path: '/products', icon: 'bi bi-box-seam-fill' },
    { name: 'Đơn hàng', path: '/orders', icon: 'bi bi-cart-fill' },
    { name: 'Khách hàng', path: '/customers', icon: 'bi bi-people-fill' },
  ];

  return (
    <div className="sidebar shadow-sm h-100 py-4 bg-white border-end">
      <div className="px-4 mb-5">
        <h4 className="fw-bold text-primary m-0">
          <span style={{ color: '#ff5722' }}>Shop</span> 7-11
        </h4>
      </div>
      <Nav className="flex-column px-3">
        {menuItems.map((item, index) => (
          <Nav.Link
            key={index}
            as={Link}
            to={item.path}
            className={`d-flex align-items-center rounded mb-2 py-3 px-3 transition-all ${
              isActive(item.path) ? 'bg-primary text-white shadow' : 'text-dark hover-light'
            }`}
          >
            <i className={`${item.icon} me-3 fs-5`}></i>
            <span className="fw-bold">{item.name}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;