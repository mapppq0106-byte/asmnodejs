import React, { useState } from 'react';
import { Container, Table, Badge, Button, Card, Row, Col, InputGroup, Form } from 'react-bootstrap';

const OrderManager = () => {
  // 1. Dữ liệu mẫu cho Đơn hàng
  const [orders] = useState([
    { id: 'ORD001', customer: 'Vinh Trần', date: '2024-03-20', total: 25.00, status: 'Completed', items: 'Edamame x1' },
    { id: 'ORD002', customer: 'Vinh Nguyễn', date: '2024-03-21', total: 18.00, status: 'Processing', items: 'Apple Pie x1, Tea x1' },
    { id: 'ORD003', customer: 'Lâm Nguyễn', date: '2024-03-21', total: 14.00, status: 'Pending', items: 'Coffee x1' },
    { id: 'ORD004', customer: 'Quý Phan', date: '2024-03-22', total: 45.00, status: 'Cancelled', items: 'Pizza x2' },
    { id: 'ORD005', customer: 'An Lê', date: '2024-03-23', total: 32.50, status: 'Completed', items: 'Spaghetti x1, Coke x1' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Hàm hiển thị Badge trạng thái hiện đại hơn
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': 
        return <Badge bg="success-subtle" className="text-success border border-success-subtle px-3 py-2 rounded-pill fw-bold" style={{fontSize: '0.7rem'}}>● ĐÃ HOÀN THÀNH</Badge>;
      case 'Processing': 
        return <Badge bg="primary-subtle" className="text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-bold" style={{fontSize: '0.7rem'}}>● ĐANG XỬ LÝ</Badge>;
      case 'Pending': 
        return <Badge bg="warning-subtle" className="text-warning border border-warning-subtle px-3 py-2 rounded-pill fw-bold" style={{fontSize: '0.7rem'}}>● CHỜ THANH TOÁN</Badge>;
      case 'Cancelled': 
        return <Badge bg="danger-subtle" className="text-danger border border-danger-subtle px-3 py-2 rounded-pill fw-bold" style={{fontSize: '0.7rem'}}>○ ĐÃ HỦY</Badge>;
      default: 
        return <Badge bg="secondary-subtle" className="text-secondary border border-secondary-subtle px-3 py-2 rounded-pill fw-bold" style={{fontSize: '0.7rem'}}>{status}</Badge>;
    }
  };

  // Logic lọc đơn hàng theo tên khách hoặc mã đơn
  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán nhanh số liệu
  const totalRevenue = orders.reduce((sum, order) => order.status === 'Completed' ? sum + order.total : sum, 0);

  return (
    <div className="order-manager animate__animated animate__fadeIn">
      
      {/* 1. HEADER TÁCH RỜI (Đồng bộ thiết kế) */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderLeft: '6px solid #5d87ff', borderRadius: '12px' }}>
        <Card.Body className="d-flex justify-content-between align-items-center p-4">
          <div>
            <h2 className="fw-bold mb-1">Quản lý Đơn hàng</h2>
            <p className="text-muted mb-0 small">Theo dõi lịch sử giao dịch và trạng thái vận chuyển</p>
          </div>
          <div className="d-flex gap-2">
             <Button variant="outline-dark" className="rounded-pill px-4 fw-bold shadow-sm d-none d-md-block">
               <i className="bi bi-file-earmark-spreadsheet me-2"></i>Xuất báo cáo
             </Button>
             <Button style={{ backgroundColor: '#ff5722', borderColor: '#ff5722' }} className="rounded-pill px-4 fw-bold text-white shadow-sm">
               + Tạo đơn mới
             </Button>
          </div>
        </Card.Body>
      </Card>

      {/* 2. THỐNG KÊ NHANH (Layout mới bắt mắt hơn) */}
      <Row className="mb-4 g-3 text-center">
        {[
          { label: 'Tổng số đơn', value: orders.length, color: 'text-primary', icon: 'bi-cart-check' },
          { label: 'Đang xử lý', value: '01', color: 'text-warning', icon: 'bi-clock-history' },
          { label: 'Hoàn thành', value: '02', color: 'text-success', icon: 'bi-check-circle' },
          { label: 'Doanh thu (Giao xong)', value: `$${totalRevenue.toFixed(2)}`, color: 'text-danger', icon: 'bi-currency-dollar' },
        ].map((stat, idx) => (
          <Col key={idx} xs={6} md={3}>
            <Card className="border-0 shadow-sm h-100 py-2">
              <Card.Body>
                <i className={`bi ${stat.icon} fs-4 mb-2 d-block ${stat.color}`}></i>
                <h6 className="text-muted small fw-bold text-uppercase mb-1" style={{letterSpacing: '0.5px'}}>{stat.label}</h6>
                <h4 className={`fw-bold mb-0 ${stat.color}`}>{stat.value}</h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 3. THANH TÌM KIẾM (Bo tròn phong cách modern) */}
      <div className="mb-4">
        <InputGroup className="shadow-sm rounded-pill overflow-hidden border-0 bg-white p-1">
          <InputGroup.Text className="bg-white border-0 ps-4">
            <i className="bi bi-search text-muted"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Tìm mã đơn hàng hoặc tên khách hàng..."
            className="border-0 py-2 shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="link" 
            className="text-decoration-none text-muted border-start px-4"
            onClick={() => setSearchTerm('')}
          >
            Lọc đơn
          </Button>
        </InputGroup>
      </div>

      {/* 4. BẢNG DANH SÁCH ĐƠN HÀNG */}
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead className="bg-light text-muted small">
              <tr className="text-uppercase">
                <th className="py-3 ps-4">Mã đơn</th>
                <th>Khách hàng</th>
                <th>Sản phẩm đặt</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="small">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-bottom-0">
                  <td className="ps-4 fw-bold text-primary">{order.id}</td>
                  <td>
                    <div className="fw-bold">{order.customer}</div>
                    <small className="text-muted" style={{fontSize: '10px'}}>Khách hàng vãng lai</small>
                  </td>
                  <td>
                    <div className="text-truncate" style={{ maxWidth: '200px' }}>
                      <i className="bi bi-bag-fill me-1 text-muted"></i>{order.items}
                    </div>
                  </td>
                  <td className="text-muted">{order.date}</td>
                  <td className="fw-bold text-dark">${order.total.toFixed(2)}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td className="text-center">
                    <Button variant="link" className="text-muted p-0 me-3 hover-blue">
                      <i className="bi bi-eye-fill fs-5"></i>
                    </Button>
                    <Button variant="link" className="text-primary p-0">
                      <i className="bi bi-pencil-square fs-5"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox fs-1 d-block mb-2"></i>
              Không tìm thấy đơn hàng nào phù hợp!
            </div>
          )}
        </div>
      </Card>

      <style>{`
        .hover-blue:hover { color: #5d87ff !important; }
        .rounded-4 { border-radius: 1rem !important; }
        .bg-success-subtle { background-color: #e8f5e9 !important; }
        .bg-primary-subtle { background-color: #e3f2fd !important; }
        .bg-warning-subtle { background-color: #fff3e0 !important; }
        .bg-danger-subtle { background-color: #ffebee !important; }
        .form-control:focus { 
          border-color: #5d87ff; 
          box-shadow: 0 0 0 0.25rem rgba(93, 135, 255, 0.15); 
        }
      `}</style>
    </div>
  );
};

export default OrderManager;