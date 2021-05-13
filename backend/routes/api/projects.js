const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Project = require('../../models/Project');

// @route   GET api/projects
// @desc    Fetch all of a users projects, or search by keywords provided in query
// @access  Private
router.get('/', auth, async (req, res) => {
    
    const {keywords} = req.query;

    try {
        let projects;

        if (keywords) {
            projects = await Project.find({ user: req.user.id, $text: {$search: keywords} });
        }
        else {
            projects = await Project.find({ user: req.user.id });
        }

        if (!projects || projects.length < 1) {
            if (keywords) {
                return res.status(400).json({ errors: [{ msg: 'Nothing found with those search parameters' }] });
            }
            else {
                return res.status(400).json({ errors: [{ msg: 'Nothing here yet' }] });
            }
        }
        res.json(projects);
    }
    catch(err) {
        console.error("Project Fetch Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   GET api/projects/id
// @desc    Fetch a single project by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(400).json({ errors: [{ msg: 'Project does not exist' }] });
        }

        // Check that the project belongs to the authorized user
        if (project.user != req.user.id) {
            return res.status(400).json({ errors: [{ msg: 'Not authorized to access this resource' }] });
        }

        res.json(project);
    }
    catch(err) {
        console.error("Project Fetch Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   POST api/projects
// @desc    Create or update a project
// @access  Private
router.post('/', [ auth, [
    check('name', 'Project name is required')
        .not()
        .isEmpty()
] ], 
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, desc } = req.body;

    try {
        // Create the project field object
        let projectFields = {
            name: name,
            user: req.user.id
        };
        if (desc) 
            projectFields.desc = desc; 

        let project;

        // If id is present, attempt update 
        if (id) {
            project = await Project.findById(id);

            if (project) {
                // Check that the project belongs to the authorized user
                if (project.user != req.user.id) {
                    return res.status(400).json({ errors: [{ msg: 'Not authorized to access this resource' }] });
                }

                // Update the existing project
                projectFields.dateMod = Date.now();
                project = await Project.findByIdAndUpdate( 
                    id, 
                    { $set: projectFields }, 
                    { new: true }
                );

                return res.json(project);
            }
        }
        
        // Otherwise create new project
        project = new Project(projectFields);
        await project.save();

        res.json(project);
    }
    catch(err) {
        console.error("Project Post Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   DELETE api/projects/id
// @desc    Delete a project by id
// @access  Private
router.delete(`/:id`, auth, async (req, res) => {
    try {
        let project = await Project.findOneAndDelete( { _id: req.params.id, user: req.user.id } );
        // Check that the project exists and belongs to the authorized user
        if (!project) {
            return res.status(400).json({ errors: [{ msg: 'Project does not exist for current user' }] });
        }
        res.json(project);
    }
    catch(err) {
        console.error("Project Delete Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;