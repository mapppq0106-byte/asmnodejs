import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup, Modal } from 'react-bootstrap';

const CustomerManager = () => {
  // 1. Dữ liệu mẫu khách hàng
  const [customers, setCustomers] = useState([
    { id: 'CUS001', name: 'Vinh Trần', email: 'vinhtran@gmail.com', address: 'Đà Nẵng, Việt Nam', orders: 12, totalSpent: 450.00 },
    { id: 'CUS002', name: 'Vinh Nguyễn', email: 'vinhnguyen@gmail.com', address: 'Đà Nẵng, Việt Nam', orders: 5, totalSpent: 120.50 },
    { id: 'CUS003', name: 'Lâm Nguyễn', email: 'lamnguyen@gmail.com', address: 'Đà Nẵng, Việt Nam', orders: 20, totalSpent: 1500.00 },
    { id: 'CUS004', name: 'Quý Phan', email: 'quyphan@gmail.com', address: 'Đà Nẵng, Việt Nam', orders: 2, totalSpent: 45.00 },
    { id: 'CUS005', name: 'Hoàng Lê', email: 'hoangle@gmail.com', address: 'Đà Nẵng, Việt Nam', orders: 8, totalSpent: 320.00 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Logic tìm kiếm khách hàng
  const filteredCustomers = customers.filter(cus => 
    cus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cus.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cus.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-manager animate__animated animate__fadeIn">
      
      {/* 1. HEADER TÁCH RỜI (Đồng bộ thiết kế) */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderLeft: '6px solid #13deb9', borderRadius: '12px' }}>
        <Card.Body className="d-flex justify-content-between align-items-center p-4">
          <div>
            <h2 className="fw-bold mb-1">Quản lý Khách hàng</h2>
            <p className="text-muted mb-0 small">Hệ thống lưu trữ thông tin và phân tích thói quen mua sắm</p>
          </div>
          <Button 
            style={{ backgroundColor: '#ff5722', borderColor: '#ff5722' }} 
            className="rounded-pill px-4 py-2 fw-bold text-white shadow-sm d-flex align-items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-person-plus-fill"></i> + Thêm khách hàng mới
          </Button>
        </Card.Body>
      </Card>

      {/* 2. THANH TÌM KIẾM (Phong cách hiện đại) */}
      <div className="mb-4">
        <InputGroup className="shadow-sm rounded-pill overflow-hidden border-0 bg-white p-1">
          <InputGroup.Text className="bg-white border-0 ps-4">
            <i className="bi bi-search text-muted"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Tìm theo tên khách hàng, email hoặc mã định danh (CUS...)"
            className="border-0 py-2 shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="link" 
            className="text-decoration-none text-muted border-start px-4"
            onClick={() => setSearchTerm('')}
          >
            Xóa lọc
          </Button>
        </InputGroup>
      </div>

      {/* 3. BẢNG DANH SÁCH KHÁCH HÀNG */}
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <Table hover className="align-middle mb-0 text-nowrap">
            <thead className="bg-light text-muted small">
              <tr className="text-uppercase">
                <th className="ps-4 py-3">Khách hàng</th>
                <th>Thông tin liên hệ</th>
                <th>Địa chỉ nhận hàng</th>
                <th className="text-center">Lượt mua</th>
                <th className="text-end">Tổng tích lũy</th>
                <th className="text-center pe-4">Hành động</th>
              </tr>
            </thead>
            <tbody className="small">
              {filteredCustomers.map((cus) => (
                <tr key={cus.id} className="border-bottom-0">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center me-3 shadow-sm" style={{width: '42px', height: '42px', fontSize: '1.1rem'}}>
                        {cus.name.charAt(0)}
                      </div>
                      <div>
                        <div className="fw-bold text-dark">{cus.name}</div>
                        <small className="text-muted fw-medium">ID: {cus.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                       <span className="fw-medium">{cus.email}</span>
                       <small className="text-muted" style={{fontSize: '11px'}}>Đã xác thực</small>
                    </div>
                  </td>
                  <td>
                    <div className="text-muted text-wrap" style={{maxWidth: '220px', fontSize: '0.8rem'}}>
                      <i className="bi bi-geo-alt-fill me-1 text-danger"></i>{cus.address}
                    </div>
                  </td>
                  <td className="text-center">
                    <Badge bg="info-subtle" className="text-info border border-info-subtle px-3 py-2 rounded-pill fw-bold">
                      {cus.orders} đơn hàng
                    </Badge>
                  </td>
                  <td className="text-end pe-4 fw-bold text-success" style={{fontSize: '1rem'}}>
                    ${cus.totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </td>
                  <td className="text-center pe-4">
                    <Button variant="link" className="text-muted p-0 me-3 hover-teal">
                      <i className="bi bi-clock-history fs-5"></i>
                    </Button>
                    <Button variant="link" className="text-danger p-0">
                      <i className="bi bi-trash3-fill fs-5"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-5 bg-white">
              <i className="bi bi-person-x fs-1 text-muted d-block mb-2"></i>
              <p className="text-muted">Không tìm thấy khách hàng nào khớp với tìm kiếm!</p>
            </div>
          )}
        </div>
      </Card>

      {/* 4. MODAL THÊM KHÁCH HÀNG */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md">
        <Modal.Header closeButton className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold fs-4">Đăng ký khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Họ và tên *</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên đầy đủ..." className="rounded-3 py-2 border-light-subtle shadow-none" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Địa chỉ Email *</Form.Label>
              <Form.Control type="email" placeholder="example@gmail.com" className="rounded-3 py-2 border-light-subtle shadow-none" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">Địa chỉ cư trú</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Số nhà, đường, phường/xã..." className="rounded-3 border-light-subtle shadow-none" />
            </Form.Group>
            
            <div className="d-grid">
              <Button 
                style={{ backgroundColor: '#ff5722', borderColor: '#ff5722' }} 
                className="rounded-pill py-2 fw-bold text-white shadow"
                onClick={() => setShowModal(false)}
              >
                Lưu thông tin khách hàng
              </Button>
              <Button variant="light" className="rounded-pill mt-2 py-2 fw-bold text-muted" onClick={() => setShowModal(false)}>
                Hủy bỏ
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <style>{`
        .hover-teal:hover { color: #13deb9 !important; }
        .bg-primary-subtle { background-color: #e3f2fd !important; }
        .bg-info-subtle { background-color: #e0f7fa !important; }
        .rounded-4 { border-radius: 1rem !important; }
        .form-control:focus { 
          border-color: #13deb9; 
          box-shadow: 0 0 0 0.25rem rgba(19, 222, 185, 0.15); 
        }
        .table thead th { 
          background-color: #f8f9fa; 
          font-weight: 700; 
          letter-spacing: 0.5px; 
          border-bottom: 1px solid #edf2f9;
        }
      `}</style>
    </div>
  );
};

export default CustomerManager;