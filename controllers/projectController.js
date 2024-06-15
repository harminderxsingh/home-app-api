const { Project } = require('../models');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
