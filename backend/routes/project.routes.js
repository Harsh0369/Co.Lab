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
  body("projectId").isString().withMessage("Project ID is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array of strings")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  projectController.addUserToProject
);

router.get('/get-project/:projectId', authMiddleware.authUser, projectController.getProjectById)


router.put(
  "/update-file-tree",
  authMiddleware.authUser,
  body("projectId").isString().withMessage("Project ID is required"),
  body("fileTree").isObject().withMessage("File tree is required"),
  projectController.updateFileTree
);

export default router;
