const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, fileService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUnconfirmedDoctors = catchAsync(async (req, res) => {
  const doctors = await userService.findUsers({ role: 'doctor', isVerified: false });
  res.send(doctors);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const confirmDoctor = catchAsync(async (req, res) => {
  const doctor = await userService.updateUserById(req.params.doctorId, { isVerified: true });
  res.send(doctor);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDoctors = catchAsync(async (req, res) => {
  const doctors = await userService.findUsers({ role: 'doctor' });
  res.status(httpStatus.OK).send(doctors);
});

const uploadProfileImage = catchAsync(async (req, res) => {
  await fileService.uploadProfileImage(req, res);
});

const getProfileImage = catchAsync(async (req, res) => {
  const image = await fileService.getProfileImage(req.params.userId);
  res.sendFile(image);
});

const uploadDoctorAttachments = catchAsync(async (req, res) => {
  await fileService.uploadDoctorsAttachments(req, res);
});

const getDoctorsAttachment = catchAsync(async (req, res) => {
  const attachment = await fileService.getDoctorsAttachmentFilePath(req.params.doctorId, req.params.attachmentId);
  res.sendFile(attachment);
});

module.exports = {
  createUser,
  getUsers,
  getUnconfirmedDoctors,
  confirmDoctor,
  getUser,
  updateUser,
  deleteUser,
  getDoctors,
  uploadProfileImage,
  getProfileImage,
  uploadDoctorAttachments,
  getDoctorsAttachment
};
