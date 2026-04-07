import React from 'react';
import { Navbar, Container, Form, InputGroup, Nav, Button } from 'react-bootstrap';

const TopBar = () => {
  return (
    <Navbar bg="white" expand="lg" className="px-4 py-3 border-bottom sticky-top shadow-sm">
      <Container fluid className="p-0">
        <div className="d-flex align-items-center w-100">
          {/* <Form className="d-none d-md-flex flex-grow-1" style={{ maxWidth: '400px' }}>
            <InputGroup className="bg-light rounded-pill border-0 px-3">
              <InputGroup.Text className="bg-transparent border-0">
                <i className="bi bi-search text-muted"></i>
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Tìm kiếm nhanh..."
                className="bg-transparent border-0 shadow-none ps-0"
              />
            </InputGroup>
          </Form> */}
          
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Button variant="light" className="rounded-circle border-0">
              <i className="bi bi-bell text-dark"></i>
            </Button>
            <div className="d-flex align-items-center border-start ps-3 ms-2">
              <div className="text-end me-3 d-none d-sm-block">
                <p className="fw-bold mb-0 small">Quý Phan</p>
                <small className="text-muted" style={{ fontSize: '10px' }}>Quản trị viên</small>
              </div>
              <img 
                src="https://ui-avatars.com/api/?name=Quy+Phan&background=0D6EFD&color=fff" 
                alt="avatar" className="rounded-circle border" width="40" 
              />
            </div>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopBar;