const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Snippet = require('../../models/Snippet');

// @route   GET api/snippets
// @desc    Fetch all of a users snippets
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const snippets = await Snippet.find({ user: req.user.id });

        if (!snippets) {
            return res.status(400).json({ errors: [{ msg: 'No snippets added yet' }] });
        }
        res.json(snippets);
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

        // If id is present, attempt update 
        if (id) {
            let snippet = await Snippet.findById(id);

            if (snippet) {
                // Update the existing snippet
                snippet = await Snippet.findByIdAndUpdate( 
                    id, 
                    { $set: snippetFields }, 
                    { new: true }
                );

                res.json(snippet);
            }
        }
        
        // Otherwise create new snippet
        let snippet = new Snippet(snippetFields);
        await snippet.save();

        res.json(snippet);
    }
    catch(err) {
        console.error("Snippet Post Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;