const multer = require("multer");
const path = require('path');
const httpStatus = require('http-status');
const { User } = require('../models');
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

module.exports = {
    uploadProfileImage,
    getProfileImage
};