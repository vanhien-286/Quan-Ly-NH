const adminService = require("../services/adminService");

// ============ QUẢN LÝ MÓN ĂN ============
exports.getDishes = async (req, res) => {
  try {
    const result = await adminService.getAllDishes();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createDish = async (req, res) => {
  try {
    const result = await adminService.createDish(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateDish = async (req, res) => {
  try {
    const result = await adminService.updateDish(req.params.dishId, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const result = await adminService.deleteDish(req.params.dishId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ============ QUẢN LÝ ĐƠN HÀNG ============
exports.getOrders = async (req, res) => {
  try {
    const result = await adminService.getAllOrders();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const result = await adminService.getOrderDetail(req.params.orderId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const result = await adminService.updateOrderStatus(req.params.orderId, req.body.status);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const result = await adminService.deleteOrder(req.params.orderId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ============ QUẢN LÝ BÀN ============
exports.getTables = async (req, res) => {
  try {
    const result = await adminService.getAllTables();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createTable = async (req, res) => {
  try {
    const result = await adminService.createTable(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTable = async (req, res) => {
  try {
    const result = await adminService.updateTable(req.params.tableId, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const result = await adminService.deleteTable(req.params.tableId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTableStatus = async (req, res) => {
  try {
    const result = await adminService.updateTableStatus(req.params.tableId, req.body.status);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ============ QUẢN LÝ NGƯỜI DÙNG ============
exports.getUsers = async (req, res) => {
  try {
    const result = await adminService.getAllUsers();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const result = await adminService.updateUserRole(req.params.userId, req.body.role);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await adminService.deleteUser(req.params.userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ============ THỐNG KÊ DOANH THU ============
exports.getRevenueOverview = async (req, res) => {
  try {
    const result = await adminService.getRevenueOverview();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getRevenueByDate = async (req, res) => {
  try {
    const result = await adminService.getRevenueByDate(req.query.startDate, req.query.endDate);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getRevenueByProduct = async (req, res) => {
  try {
    const result = await adminService.getRevenueByProduct();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMonthlyRevenue = async (req, res) => {
  try {
    const result = await adminService.getMonthlyRevenue();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
