import { mongo } from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("User is required");
  }
  let project;
  try {
    project = await projectModel.create({
      name,
      users: [userId],
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw error;
  }
  return project;
};


export const getAllProjectsByUserId = async (userId) => {
    if (!userId) {
        throw new Error("User is required");
    }
    const allProjects = await projectModel.find({
        users:userId
    })
    return allProjects
}
 
export const addUsersToProject = async ({ projectId, users,userId }) => { 
  if(!projectId) {
    throw new Error("Project Id is required");
  }
  if(!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project Id");
  }
  if(!users || users.length === 0) {
    throw new Error("Users are required");
  }
  if(!Array.isArray(users) || users.some(user => !mongoose.Types.ObjectId.isValid(user))) {
    throw new Error("Users should be an array of valid user ids");
  }
  if(!userId) {
    throw new Error("User is required");
  }
  if(!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User Id");
  }
  const project = await projectModel.findOne({
    _id: projectId,
    users: userId
  });
  if(!project) {
    throw new Error("Project not found");
  }
  const updatedProject = await projectModel.findOneAndUpdate
  (
    {
      _id: projectId
    },
    {
      $addToSet: {
        users: {
          $each: users
        }
      }
    },
    {
      new: true
    }
  );

}