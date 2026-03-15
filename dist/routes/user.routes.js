"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const userController = new user_controller_1.UserController();
router.post('/users', userController.createUser.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.put('/users/:id', auth_middleware_1.authMiddleware, userController.updateUser.bind(userController));
router.delete('/users/:id', auth_middleware_1.authMiddleware, userController.deleteUser.bind(userController));
exports.default = router;
