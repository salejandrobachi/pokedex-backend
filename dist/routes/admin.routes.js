"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = express_1.default.Router();
const adminController = new admin_controller_1.AdminController();
router.use(auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware);
router.get('/admin/users', adminController.listUsers.bind(adminController));
router.put('/admin/users/:id', adminController.updateUser.bind(adminController));
exports.default = router;
