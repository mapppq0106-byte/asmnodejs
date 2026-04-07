import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, Modal, Form, Table, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ProductManager = () => {
  // Dữ liệu mẫu ban đầu[cite: 3]
  const [products, setProducts] = useState([
    { id: 1, name: 'Spaghetti Carbonara', desc: 'Classic Italian pasta with a creamy sauce made from eggs, P...', price: 14.00, category: 'Pastas', status: 'Unavailable', image: 'https://i.pinimg.com/1200x/f2/9f/f7/f29ff752fe9b098e8a3c9e73d5de2dec.jpg' },
    { id: 2, name: 'Cannelloni', desc: 'Large pasta tubes filled with meat or cheese, covered in sau...', price: 15.50, category: 'Pastas', status: 'Available', image: 'https://i.pinimg.com/1200x/28/66/79/286679f6e0fc7fa7b6d0a0cbb86b6252.jpg' },
    { id: 3, name: 'Coke', desc: 'Classic Coca-Cola served chilled.', price: 2.00, category: 'Cold Drinks', status: 'Unavailable', image: 'https://i.pinimg.com/1200x/95/75/63/9575638d883262576c9ac730e14f736a.jpg' },
    { id: 4, name: 'Apple Pie', desc: 'Classic apple pie with a flaky crust, filled with cinnamon-spi...', price: 6.00, category: 'Deserts', status: 'Available', image: 'https://i.pinimg.com/1200x/4a/a5/0a/4aa50a06d59af6a6e08b434d787527c6.jpg' },
    { id: 5, name: 'Ice Cream', desc: 'Your choice of vanilla, chocolate, or strawberry ice cream, s...', price: 4.00, category: 'Deserts', status: 'Unavailable', image: 'https://i.pinimg.com/1200x/73/e7/ff/73e7ff9043ff44cb36c2a52c2804aa50.jpg' },
    { id: 6, name: 'Edamame', desc: 'Steamed young soybeans sprinkled with sea salt. A simple...', price: 5.00, category: 'Starters', status: 'Unavailable', image: 'https://i.pinimg.com/1200x/a3/85/e7/a385e72282b5fd2ad7ce97254f3de90f.jpg' },
    { id: 7, name: 'Coffee', desc: 'Freshly brewed coffee, rich and aromatic.', price: 3.00, category: 'Hot Drinks', status: 'Unavailable', image: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg' },
    { id: 8, name: 'Cobb Salad', desc: 'A hearty option with mixed greens, chicken, bacon, eggs, av...', price: 12.00, category: 'Salads', status: 'Available', image: 'https://i.pinimg.com/1200x/cc/f4/b5/ccf4b53ea291d2da0fc8b299f1626ef5.jpg' },
    { id: 9, name: 'Sprite', desc: 'Crisp and refreshing lemon-lime Sprite.', price: 2.00, category: 'Cold Drinks', status: 'Available', image: 'https://i.pinimg.com/736x/ca/4e/fe/ca4efe3c52806f7c887bf527b4d092fa.jpg' },
    { id: 10, name: 'Nicoise Salad', desc: 'Tuna, green beans, potatoes, eggs, olives, and tomatoes ov...', price: 13.00, category: 'Salads', status: 'Available', image: 'https://i.pinimg.com/736x/74/ae/b6/74aeb6e7bf510344b00e9969893c4c6d.jpg' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); // State để quản lý sản phẩm đang sửa[cite: 3]

  // Cấu hình useForm[cite: 3]
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Đóng Modal và reset trạng thái[cite: 3]
  const handleClose = () => {
    reset();
    setEditingProduct(null);
    setShowModal(false);
  };

  // Mở Modal cho chế độ thêm mới[cite: 3]
  const handleShow = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  // Mở Modal cho chế độ chỉnh sửa[cite: 3]
  const handleEdit = (product) => {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('desc', product.desc);
    setValue('price', product.price);
    setValue('category', product.category);
    setValue('status', product.status);
    setShowModal(true);
  };

  // Logic xóa sản phẩm
  const handleDelete = (id) => {
    if(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Logic tìm kiếm sản phẩm[cite: 3]
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toString().includes(searchTerm)
  );

  // Xử lý lưu (Thêm mới hoặc Cập nhật)[cite: 3]
  const onSubmit = (data) => {
    if (editingProduct) {
      // Logic Cập nhật[cite: 3]
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...data, price: parseFloat(data.price) } 
          : p
      );
      setProducts(updatedProducts);
      alert("Cập nhật sản phẩm thành công!");
    } else {
      // Logic Thêm mới[cite: 3]
      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        ...data,
        price: parseFloat(data.price),
        image: 'https://via.placeholder.com/150',
        status: data.status || 'Available'
      };
      setProducts([newProduct, ...products]);
      alert("Thêm sản phẩm thành công!");
    }
    handleClose();
  };

  return (
    <Container fluid className="px-0 py-0 bg-light min-vh-100">
      
      {/* 1. HEADER TÁCH RỜI */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderLeft: '6px solid #ff5722', borderRadius: '12px' }}>
        <Card.Body className="d-flex justify-content-between align-items-center p-4">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Quản lý Sản phẩm</h2>
            <p className="text-muted mb-0 small">{products.length} sản phẩm đang có trong hệ thống</p>
          </div>
          <Button 
            onClick={handleShow}
            style={{ backgroundColor: '#ff5722', borderColor: '#ff5722' }} 
            className="rounded-pill px-4 py-2 shadow-sm text-white fw-bold d-flex align-items-center gap-2"
          >
            <i className="bi bi-plus-lg"></i> Thêm sản phẩm mới
          </Button>
        </Card.Body>
      </Card>

      {/* 2. THANH TÌM KIẾM */}
      <div className="mb-4">
        <InputGroup className="shadow-sm rounded-pill overflow-hidden border-0 bg-white p-1">
          <InputGroup.Text className="bg-white border-0 ps-4">
            <i className="bi bi-search text-muted"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Tìm kiếm theo tên sản phẩm, mã ID hoặc danh mục..."
            className="border-0 py-2 shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button 
              variant="link" 
              className="text-decoration-none text-muted border-start px-4 d-none d-md-block"
              onClick={() => setSearchTerm('')}
            >
              Xóa tìm kiếm
            </Button>
          )}
        </InputGroup>
      </div>

      {/* 3. BẢNG DANH SÁCH SẢN PHẨM */}
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead className="bg-light text-muted small">
              <tr className="text-uppercase text-nowrap">
                <th className="py-3 ps-4" style={{ width: '80px' }}>ID #</th>
                <th style={{ width: '100px' }}>Hình ảnh</th>
                <th style={{ minWidth: '180px' }}>Tên sản phẩm</th>
                <th style={{ minWidth: '220px' }}>Mô tả</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="small">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-bottom-0">
                  <td className="ps-4 text-muted fw-medium">#{p.id}</td>
                  <td>
                    <Image 
                      src={p.image} 
                      rounded 
                      style={{ width: '48px', height: '48px', objectFit: 'cover' }} 
                      className="border shadow-sm" 
                    />
                  </td>
                  <td className="fw-bold">{p.name}</td>
                  <td className="text-muted">
                    <div className="text-truncate" style={{ maxWidth: '220px' }}>{p.desc}</div>
                  </td>
                  <td className="fw-bold text-dark">${p.price.toFixed(2)}</td>
                  <td>
                    <Badge bg="light" text="dark" className="border px-2 py-1 fw-normal text-muted">
                      {p.category}
                    </Badge>
                  </td>
                  <td>
                    <Badge 
                      bg={p.status === 'Available' ? 'success-subtle' : 'secondary-subtle'} 
                      className={`${p.status === 'Available' ? 'text-success' : 'text-secondary'} px-3 py-2 rounded-pill border-0 fw-bold`}
                      style={{ fontSize: '0.7rem' }}
                    >
                      {p.status === 'Available' ? '● AVAILABLE' : '○ UNAVAILABLE'}
                    </Badge>
                  </td>
                  <td className="text-center text-nowrap">
                    <Button 
                        variant="link" 
                        className="text-muted p-0 hover-orange me-3"
                        onClick={() => handleEdit(p)}
                    >
                      <i className="bi bi-pencil-square fs-5"></i>
                    </Button>
                    <Button 
                        variant="link" 
                        className="text-danger p-0"
                        onClick={() => handleDelete(p.id)}
                    >
                      <i className="bi bi-trash fs-5"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted d-block mb-2"></i>
              <p className="text-muted">Không tìm thấy sản phẩm nào phù hợp!</p>
            </div>
          )}
        </div>
      </Card>

      {/* MODAL THÊM / SỬA SẢN PHẨM */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold fs-4">
            {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="px-4">
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Tên sản phẩm *</Form.Label>
                  <Form.Control 
                    type="text" 
                    isInvalid={!!errors.name}
                    placeholder="Ví dụ: Spaghetti Carbonara" 
                    {...register("name", { required: "Tên sản phẩm không được để trống", minLength: { value: 3, message: "Tên phải ít nhất 3 ký tự" } })} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Mô tả chi tiết *</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    isInvalid={!!errors.desc}
                    placeholder="Nhập mô tả ngắn gọn về sản phẩm..." 
                    {...register("desc", { required: "Vui lòng nhập mô tả sản phẩm" })} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.desc?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Giá bán ($) *</Form.Label>
                  <Form.Control 
                    type="number" 
                    step="0.01" 
                    isInvalid={!!errors.price}
                    placeholder="0.00" 
                    {...register("price", { required: "Giá không được để trống", min: { value: 0.1, message: "Giá phải lớn hơn 0" } })} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Danh mục sản phẩm *</Form.Label>
                  <Form.Select isInvalid={!!errors.category} {...register("category", { required: "Vui lòng chọn danh mục" })}>
                    <option value="">Chọn danh mục...</option>
                    <option value="Pastas">Pastas</option>
                    <option value="Cold Drinks">Cold Drinks</option>
                    <option value="Hot Drinks">Hot Drinks</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Starters">Starters</option>
                    <option value="Salads">Salads</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.category?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold d-block">Trạng thái kinh doanh</Form.Label>
                  <div className="d-flex gap-4">
                    <Form.Check 
                        type="radio" 
                        label="Đang bán (Available)" 
                        value="Available" 
                        {...register("status")} 
                        id="statusAvailable"
                    />
                    <Form.Check 
                        type="radio" 
                        label="Ngừng bán (Unavailable)" 
                        value="Unavailable" 
                        {...register("status")} 
                        id="statusUnavailable"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 px-4 pb-4">
            <Button variant="light" onClick={handleClose} className="px-4 rounded-pill fw-bold border">Hủy bỏ</Button>
            <Button 
              type="submit" 
              style={{ backgroundColor: '#ff5722', borderColor: '#ff5722' }} 
              className="px-5 rounded-pill text-white fw-bold shadow-sm"
            >
              {editingProduct ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Tùy chỉnh CSS trực tiếp*/}
      <style>{`
        .hover-orange:hover { color: #ff5722 !important; }
        .rounded-4 { border-radius: 1rem !important; }
        .table thead th { font-weight: 700; letter-spacing: 0.5px; }
        .form-control:focus, .form-select:focus { 
          border-color: #ff5722; 
          box-shadow: 0 0 0 0.25rem rgba(255, 87, 34, 0.15); 
        }
        .bg-success-subtle { background-color: #e8f5e9 !important; }
        .bg-secondary-subtle { background-color: #f5f5f5 !important; }
      `}</style>
    </Container>
  );
};

export default ProductManager;