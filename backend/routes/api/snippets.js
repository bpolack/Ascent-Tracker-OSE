const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
//const User = require('../../models/User');
const Snippet = require('../../models/Snippet');

// @route   GET api/snippets
// @desc    Fetch all of a users snippets
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const snippets = await Snippet.find({ user: req.user.id });

        if (!snippets || snippets.length < 1) {
            return res.status(400).json({ errors: [{ msg: 'No snippets added yet' }] });
        }
        res.json(snippets);
    }
    catch(err) {
        console.error("Snippet Fetch Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   GET api/snippets/id
// @desc    Fetch a snippet by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const snippet = await Snippet.findById(req.params.id);

        if (!snippet) {
            return res.status(400).json({ errors: [{ msg: 'Snippet does not exist' }] });
        }

        // Check that the snippet belongs to the authorized user
        if (snippet.user != req.user.id) {
            return res.status(400).json({ errors: [{ msg: 'Not authorized to access this resource' }] });
        }

        res.json(snippet);
    }
    catch(err) {
        console.error("Snippet Fetch Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   POST api/snippets
// @desc    Create or update a snippet
// @access  Private
router.post('/', [ auth, [
    check('name', 'Snippet name is required')
        .not()
        .isEmpty()
] ], 
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, desc, code } = req.body;

    try {
        // Create the snippet field object
        let snippetFields = {
            name: name,
            user: req.user.id
        };
        if (desc) snippetFields.desc = desc; 
        if (code) snippetFields.code = code;

        let snippet;

        // If id is present, attempt update 
        if (id) {
            snippet = await Snippet.findById(id);

            if (snippet) {
                // Check that the snippet belongs to the authorized user
                if (snippet.user != req.user.id) {
                    return res.status(400).json({ errors: [{ msg: 'Not authorized to access this resource' }] });
                }

                // Update the existing snippet
                snippetFields.dateMod = Date.now();
                console.log(snippetFields.dateMod);
                snippet = await Snippet.findByIdAndUpdate( 
                    id, 
                    { $set: snippetFields }, 
                    { new: true }
                );

                return res.json(snippet);
            }
        }
        
        // Otherwise create new snippet
        snippet = new Snippet(snippetFields);
        await snippet.save();

        res.json(snippet);
    }
    catch(err) {
        console.error("Snippet Post Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   DELETE api/snippets/id
// @desc    Delete a snippet by id
// @access  Private
router.delete(`/:id`, auth, async (req, res) => {
    try {
        let snippet = await Snippet.findOneAndDelete( { _id: req.params.id, user: req.user.id } );
        // Check that the snippet exists and belongs to the authorized user
        if (!snippet) {
            return res.status(400).json({ errors: [{ msg: 'Snippet does not exist for current user' }] });
        }
        res.json(snippet);
    }
    catch(err) {
        console.error("Snippet Delete Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;