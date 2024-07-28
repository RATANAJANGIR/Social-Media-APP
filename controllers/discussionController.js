const Discussion = require('../models/Discussion');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.createDiscussion = async (req, res) => {
    const { text, image, hashtags } = req.body;

    try {
        const newDiscussion = new Discussion({
            text,
            image,
            hashtags,
            user: req.user.id
        });

        const discussion = await newDiscussion.save();

        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find().sort({ date: -1 });
        res.json(discussions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateDiscussion = async (req, res) => {
    const { text, image, hashtags } = req.body;
    const discussionFields = { text, image, hashtags };

    try {
        let discussion = await Discussion.findById(req.params.id);

        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        discussion = await Discussion.findByIdAndUpdate(req.params.id, { $set: discussionFields }, { new: true });

        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteDiscussion = async (req, res) => {
    try {
        await Discussion.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Discussion removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getDiscussionsByTag = async (req, res) => {
    try {
        const discussions = await Discussion.find({ hashtags: { $in: [req.params.tag] } });
        res.json(discussions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getDiscussionsByText = async (req, res) => {
    try {
        const discussions = await Discussion.find({ text: { $regex: req.params.text, $options: 'i' } });
        res.json(discussions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
