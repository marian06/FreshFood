const router = require('express').Router();
const authMiddleware = require('../middlwares/authMiddleware');
const Notification = require('../models/notificationsModel');

// add notification
router.post("/notify", authMiddleware, async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.send({
            success: true,
            message: "Notificare adăugată cu succes",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get all notifications
router.get("/get-all-notifications", authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.body.userId }).sort({ createdAt: -1 });
        res.send({
            success: true,
            data: notifications,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// delete notification
router.delete("/delete-notification/:id", authMiddleware, async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Notificare ștearsă cu succes",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// read all notifications by user
router.put("/read-all-notifications", authMiddleware, async (req, res) => {
    try {
        await Notification.updateMany({ user: req.body.userId, read: false }, { $set: { read: true } });
        res.send({
            success: true,
            message: "Notificările au fost marcate ca citite",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;