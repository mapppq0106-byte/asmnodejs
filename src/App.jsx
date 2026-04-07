import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Import các Components chung
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// Import các trang chức năng
import Dashboard from './components/Dashboard';
import ProductManager from './components/ProductManager';
import OrderManager from './components/OrderManager';
import CustomerManager from './components/CustomerManager';

function App() {
  return (
    <Router>
      <div className="bg-light min-vh-100 overflow-hidden">
        <Row className="g-0">
          {/* Cột Sidebar */}
          <Col lg={2} className="d-none d-lg-block">
            <Sidebar />
          </Col>

          {/* Cột Nội dung chính */}
          <Col lg={10} className="vh-100 overflow-auto">
            <TopBar />
            <Container fluid className="p-4 p-lg-5">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductManager />} />
                <Route path="/orders" element={<OrderManager />} />
                <Route path="/customers" element={<CustomerManager />} />
              </Routes>
            </Container>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;