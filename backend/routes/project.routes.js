import express from "express";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/create",
  authMiddleware.authUser,
  body("name").isString().withMessage("Name is required"),
  projectController.createProject
);

router.get("/all", authMiddleware.authUser, projectController.getAllProjects);

router.put(
  "/add-users",
  authMiddleware.authUser,
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users are required")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("user must be a string"),
  projectController.addUsersToProject
);

export default router;
