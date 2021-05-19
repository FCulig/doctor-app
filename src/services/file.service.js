const multer = require("multer");
const path = require('path');
const httpStatus = require('http-status');
const { User, Attachment } = require('../models');
const ApiError = require('../utils/ApiError');
const { imageFilter, upload, storage } = require('./../config/fileUpload');
const { userService } = require(".");

/**
 * Upload users profile image
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */
const uploadProfileImage = async (req, res) => {
    const upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile-image');
    upload(req, res, async function (err) {
        if (!req.file.filename) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error occured while uploading profile image');
        }

        const user = await userService.updateUserById(req.params.userId, { profileImage: req.file.filename });
        res.status(httpStatus.OK).send(user);
    });
};

/**
 * Get users profile image path
 * @param {String} userId
 * @returns {String} 
 */
const getProfileImage = async (userId) => {
    const user = await userService.getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (!user.profileImage) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not have profile image');
    }
    return path.resolve('src/storage/' + user.profileImage);
};

/**
 * Upload doctors attachments
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */
const uploadDoctorsAttachments = async (req, res) => {
    const upload = multer({ storage: storage }).array('attachments[]', 10);
    upload(req, res, async function (err) {
        const files = req.files;
        let index, len, attachments = [];

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            const attachment = await Attachment.create({ path: files[index].path })
            attachments.push(attachment._id);
        }

        let user = userService.getUserById(req.params.doctorId);
        user = await userService.updateUserById(req.params.doctorId, { attachments: attachments });
        res.status(httpStatus.OK).send(user);
    });
};

/**
 * Get doctors attachment path
 * @param {String} userId
 * @returns {String} 
 */
const getDoctorsAttachmentFilePath = async (doctorId, attachmentId) => {
    const user = await userService.getUserById(doctorId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
    }
    if (!user.attachments.includes(attachmentId)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not have that attachment');
    }
    const attachment = await Attachment.findById(attachmentId);
    return path.resolve(attachment.path);
};

module.exports = {
    uploadProfileImage,
    getProfileImage,
    uploadDoctorsAttachments,
    getDoctorsAttachmentFilePath
};