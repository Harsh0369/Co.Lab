import projectModel from "../models/project.model.js";
import { validationResult } from "express-validator";
import * as projectService from "../services/project.service.js";
import userModel from "../models/user.model.js";

export const createProject = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const userId = loggedInUser._id;
        const newProject = await projectService.createProject({ name, userId });

        res.status(201).json(newProject);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}
export const getAllProjects = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const userId = loggedInUser._id;
        const allProjects = await projectService.getAllProjectsByUserId(userId);
        return res.status(200).json({ projects: allProjects });
        
    }catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

export const addUsersToProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const { projectId, users } = req.body;

        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const userId = loggedInUser._id;

        const project = await projectService.addUsersToProject({ projectId, users, userId });
        res.status(200).json(project);
    }catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}
 
export const getProjectById = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await projectService.getProjectById({projectId});
        return res.status(200).json(project);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}