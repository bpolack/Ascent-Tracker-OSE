const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Time = require('../../models/Time');
const Project = require('../../models/Project');

// @route   GET api/time
// @desc    If the start and end dates are present, fetch time between range. Otherwise, fetch the latest 10 time chunks for a user. Format for dates must be YYYY-MM-DD format.
// @access  Private
router.get('/', auth, async (req, res) => {
    
    const {keywords, start, end} = req.query;

    try {
        let times;
        if (keywords && start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            times = await Time.find({
                    user: req.user.id, 
                    $text: {$search: keywords},
                    $or: [{
                            $and: [{
                                    startDate: {
                                        $lte: endDate
                                    }
                                },
                                {
                                    startDate: {
                                        $gte: startDate
                                    }
                                }
                            ]
                        },
                        {
                            $and: [{
                                    endDate: {
                                        $lte: endDate
                                    }
                                },
                                {
                                    endDate: {
                                        $gte: startDate
                                    }
                                }
                            ]
                        },
                    ]
                })
                .populate({ path: 'project', model: Project })
                .sort({endDate: 'desc'});
        }
        else if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            times = await Time.find({
                    user: req.user.id, 
                    $or: [{
                            $and: [{
                                    startDate: {
                                        $lte: endDate
                                    }
                                },
                                {
                                    startDate: {
                                        $gte: startDate
                                    }
                                }
                            ]
                        },
                        {
                            $and: [{
                                    endDate: {
                                        $lte: endDate
                                    }
                                },
                                {
                                    endDate: {
                                        $gte: startDate
                                    }
                                }
                            ]
                        },
                    ]
                })
                .populate({ path: 'project', model: Project })
                .sort({endDate: 'desc'});

        }
        else if (keywords) {
            times = await Time.find({ user: req.user.id, $text: {$search: keywords} })
                .sort({endDate: 'desc'});
        } 
        else {
            times = await Time.find({ user: req.user.id })
                .sort({endDate: 'desc'})
                .limit(10);
        }

        if (!times || times.length < 1) {
            return res.status(400).json({ errors: [{ msg: 'No time chunks found' }] });
        }
        res.json(times);
    }
    catch(err) {
        console.error("Time Fetch Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   GET api/time/id
// @desc    Fetch a single time chunk by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const time = await Time.findById(req.params.id);

        if (!time) {
            return res.status(400).json({ errors: [{ msg: 'Time does not exist' }] });
        }

        // Check that the time belongs to the authorized user
        if (time.user != req.user.id) {
            return res.status(400).json({ errors: [{ msg: 'Not authorized to access this resource' }] });
        }

        res.json(time);
    }
    catch(err) {
        console.error("Time Fetch Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   POST api/time
// @desc    Create or update a time chunk
// @access  Private
router.post('/', [ auth, [
    check('name', 'Time name is required')
        .not()
        .isEmpty(),
    check('startDate', 'Time start is required')
        .not()
        .isEmpty()
] ], 
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, project, startDate, endDate, desc, refLink } = req.body;

    try {
        // Create the time field object
        let timeFields = {
            name: name,
            user: req.user.id,
            startDate: startDate
        };
        // Add optional fields
        if (project)
            timeFields.project = project;
        if (endDate)
            timeFields.endDate = endDate;
        if (desc) 
            timeFields.desc = desc; 
        if (refLink) 
            timeFields.refLink = refLink; 

        let time;

        // If id is present, attempt update 
        if (id) {
            time = await Time.findById(id);

            if (time) {
                // Check that the time belongs to the authorized user
                if (time.user != req.user.id) {
                    return res.status(400).json({ errors: [{ msg: 'Not authorized to access this resource' }] });
                }

                // Update the existing time
                timeFields.dateMod = Date.now();
                time = await Time.findByIdAndUpdate( 
                    id, 
                    { $set: timeFields }, 
                    { new: true }
                );

                return res.json(time);
            }
        }
        
        // Otherwise create new time
        time = new Time(timeFields);
        await time.save();

        res.json(time);
    }
    catch(err) {
        console.error("Time Post Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

// @route   DELETE api/time/id
// @desc    Delete a time chunk by id
// @access  Private
router.delete(`/:id`, auth, async (req, res) => {
    try {
        let time = await Time.findOneAndDelete( { _id: req.params.id, user: req.user.id } );
        // Check that the time exists and belongs to the authorized user
        if (!time) {
            return res.status(400).json({ errors: [{ msg: 'Time does not exist for current user' }] });
        }
        res.json(time);
    }
    catch(err) {
        console.error("Time Delete Err - " + err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;