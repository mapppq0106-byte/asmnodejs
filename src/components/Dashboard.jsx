import React from 'react';
import { Row, Col, Card, Table, ListGroup, Dropdown, Button } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Dashboard = () => {
  // Cấu hình chung cho biểu đồ Line và Bar
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { 
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }, 
      y: { beginAtZero: true, grid: { borderDash: [5, 5], drawBorder: false }, ticks: { font: { size: 10 } } } 
    },
  };

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 1. Data cho Biểu đồ Doanh thu (Line Chart)
  const revenueData = {
    labels,
    datasets: [{
      fill: true,
      label: 'Revenue',
      data: [800, 900, 850, 1100, 1400, 1200, 900],
      borderColor: '#5d87ff',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(93, 135, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(93, 135, 255, 0)');
        return gradient;
      },
      tension: 0.4,
    }],
  };

  // 2. Data cho Biểu đồ Tròn (Doughnut Chart)
  const doughnutData = {
    labels: ['Completed', 'Pending', 'Cancelled', 'Delivering'],
    datasets: [{
      data: [65, 15, 5, 15],
      backgroundColor: ['#5d87ff', '#ffa117', '#fa5a7d', '#13deb9'],
      hoverOffset: 4,
      borderWidth: 0,
    }],
  };

  return (
    <div className="dashboard-wrapper animate__animated animate__fadeIn">
      
      {/* 1. HEADER TÁCH RỜI (Đồng bộ với các trang quản lý) */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderLeft: '6px solid #ff5722', borderRadius: '12px' }}>
        <Card.Body className="d-flex justify-content-between align-items-center p-4">
          <div>
            <h2 className="fw-bold mb-1">Tổng quan hệ thống</h2>
            <p className="text-muted mb-0 small">Chào mừng bạn trở lại, đây là tình hình kinh doanh trong tuần này</p>
          </div>
          <div className="d-flex gap-2">
            <Dropdown>
              <Dropdown.Toggle variant="white" className="rounded-pill border shadow-sm px-4 fw-bold small">
                <i className="bi bi-calendar3 me-2"></i>Tuần này
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Tháng này</Dropdown.Item>
                <Dropdown.Item>Năm này</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" className="rounded-pill px-4 shadow-sm fw-bold border-0" style={{backgroundColor: '#5d87ff'}}>
              <i className="bi bi-download me-2"></i>Báo cáo
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* 2. CÁC BIỂU ĐỒ CHÍNH */}
      <Row className="g-4 mb-4">
        {/* Doanh thu */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm p-3 h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-bold small text-uppercase"><i className="bi bi-currency-dollar text-danger me-2"></i>Doanh thu ngày</span>
              <h5 className="fw-bold m-0 text-success">$80.00 <small style={{fontSize: '10px'}}>▲ 12%</small></h5>
            </div>
            <div style={{ height: '150px' }}>
              <Line data={revenueData} options={options} />
            </div>
          </Card>
        </Col>

        {/* Trạng thái đơn hàng */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm p-3 h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-bold small text-uppercase"><i className="bi bi-pie-chart text-warning me-2"></i>Trạng thái đơn</span>
              <h5 className="fw-bold m-0 text-primary">150 <small className="text-muted" style={{fontSize: '10px'}}>Đơn</small></h5>
            </div>
            <div style={{ height: '150px' }} className="d-flex justify-content-center">
              <Doughnut 
                data={doughnutData} 
                options={{ 
                  maintainAspectRatio: false,
                  plugins: { legend: { display: true, position: 'right', labels: { boxWidth: 8, font: { size: 9 }, padding: 10 } } } 
                }} 
              />
            </div>
          </Card>
        </Col>

        {/* Khách hàng mới */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm p-3 h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-bold small text-uppercase"><i className="bi bi-people text-info me-2"></i>Khách hàng mới</span>
              <h5 className="fw-bold m-0 text-info">240 <small style={{fontSize: '10px'}}>▲ 5%</small></h5>
            </div>
            <div style={{ height: '150px' }}>
              <Bar 
                data={{
                  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                  datasets: [{ label: 'Users', data: [25, 45, 30, 50, 40, 60, 45], backgroundColor: '#13deb9', borderRadius: 4 }]
                }} 
                options={options} 
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 3. CHI TIẾT ĐƠN HÀNG VÀ SẢN PHẨM BÁN CHẠY */}
      <Row className="g-4">
        {/* Đơn hàng gần đây */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Header className="bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold m-0"><i className="bi bi-clock-history me-2 text-warning"></i>Đơn hàng gần đây</h5>
              <Button variant="link" className="text-decoration-none p-0 small">Xem tất cả</Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover responsive className="mb-0 align-middle">
                <thead className="bg-light-subtle text-muted small">
                  <tr>
                    <th className="ps-4 py-3">ID</th>
                    <th>Khách hàng</th>
                    <th>Sản phẩm</th>
                    <th>Giá trị</th>
                    <th className="pe-4 text-end">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {[
                    { id: '#355338', name: 'Vinh Trần', addr: 'Đà Nẵng', item: 'Edamame x1', price: '$25.00' },
                    { id: '#104389', name: 'Vinh Nguyễn', addr: 'Đà Nẵng', item: 'Apple Pie x1', price: '$18.00' },
                    { id: '#788824', name: 'Lâm Nguyễn', addr: 'Đà Nẵng', item: 'Coffee x1', price: '$14.00' },
                    { id: '#992104', name: 'Quý Phan', addr: 'Đà Nẵng', item: 'Spaghetti x2', price: '$30.00' },
                  ].map((order, idx) => (
                    <tr key={idx}>
                      <td className="ps-4 py-3 text-muted fw-medium">{order.id}</td>
                      <td>
                        <div className="fw-bold">{order.name}</div>
                        <small className="text-muted" style={{fontSize: '10px'}}>{order.addr}</small>
                      </td>
                      <td className="text-muted">{order.item}</td>
                      <td className="fw-bold text-dark">{order.price}</td>
                      <td className="text-end pe-4">
                        <Button variant="light" className="btn-sm rounded-pill px-3 border-0" style={{fontSize: '10px'}}>Xem</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Sản phẩm bán chạy */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100 rounded-4">
            <Card.Header className="bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold m-0"><i className="bi bi-graph-up-arrow me-2 text-danger"></i>Sản phẩm bán chạy</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {[
                  { name: 'Coffee', price: '$150.00', count: 50, color: 'bg-warning', img: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg' },
                  { name: 'Cheeseburger', price: '$120.00', count: 42, color: 'bg-secondary', img: 'https://i.pinimg.com/1200x/f5/e1/5c/f5e15cd7446b02d3e3133e0c2c8e4570.jpg' },
                  { name: 'Spaghetti', price: '$85.00', count: 38, color: 'bg-info', img: 'https://i.pinimg.com/1200x/f2/9f/f7/f29ff752fe9b098e8a3c9e73d5de2dec.jpg' },
                  { name: 'Apple Pie', price: '$45.00', count: 30, color: 'bg-danger', img: 'https://i.pinimg.com/1200x/4a/a5/0a/4aa50a06d59af6a6e08b434d787527c6.jpg' }
                ].map((item, idx) => (
                  <ListGroup.Item key={idx} className="d-flex align-items-center border-0 mb-3 p-0 bg-transparent">
                    <div className="position-relative me-3">
                      <img src={item.img} alt={item.name} className="rounded-3 shadow-sm border" style={{width: '55px', height: '55px', objectFit: 'cover'}}/>
                      <span className={`position-absolute top-0 start-0 badge rounded-pill ${item.color} text-white border border-white`} style={{transform: 'translate(-30%, -30%), fontSize: "10px"'}}>{idx + 1}</span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-0 small text-dark">{item.name}</h6>
                      <small className="text-muted d-block" style={{fontSize: '11px'}}>{item.price}</small>
                      <div className="text-primary fw-bold" style={{fontSize: '0.7rem'}}>Đã bán {item.count}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default Dashboard;