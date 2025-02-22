import Project from "../models/project.model.js";
import { validationResult } from "express-validator";
import * as projectService from "../services/project.service.js";
import User from "../models/user.model.js";

export const createProject = async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const { name } = req.body;
        const loggedInUser = await User.findOne({ email: req.user.email });
        const userId = loggedInUser._id;
        const newProject = await projectService.createProject({ name, user: userId });

        res.status(201).json(newProject);
    }catch (error) {
        res.status(400).send(error.message);
    }
}