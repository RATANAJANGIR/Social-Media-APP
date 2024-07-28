const express = require('express');
const router = express.Router();
const {
    createDiscussion,
    getDiscussions,
    updateDiscussion,
    deleteDiscussion,
    getDiscussionsByTag,
    getDiscussionsByText
} = require('../controllers/discussionController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createDiscussion);
router.get('/', auth, getDiscussions);
router.put('/:id', auth, updateDiscussion);
router.delete('/:id', auth, deleteDiscussion);
router.get('/tag/:tag', auth, getDiscussionsByTag);
router.get('/text/:text', auth, getDiscussionsByText);

module.exports = router;
