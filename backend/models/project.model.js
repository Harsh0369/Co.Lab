import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,    
        required: true,
        unique: [true, 'Project name already exists'],
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
})

const Project = mongoose.model('Project', projectSchema);

export default Project;