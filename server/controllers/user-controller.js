const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const User = require("../models/user-model");
const Uuid = require("uuid");
const fs = require("fs");
const UserModel = require("../models/user-model");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, name, surname, birthday, gender, password } = req.body;
      const userData = await userService.registration(
        email,
        name,
        surname,
        birthday,
        gender,
        password
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      const file = req.files.file;
      const user = await User.findById(req.user.id);
      const avatarName = Uuid.v4() + ".jpg";
      file.mv(
        "C:\\Users\\User\\Desktop\\authorization\\server\\static" +
          "\\" +
          avatarName
      );
      user.avatar = avatarName;
      await user.save();
      return res.json({ message: "Avatar was uploaded" });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async uploadProfileName(req, res, next) {
    try {
      const { profileName } = req.body;
      const userData = await userService.uploadProfileName(profileName);
      const user = await User.findById(req.user.id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      user.profileName = userData;
      await user.save();
      return res.json({ message: "profileName was uploaded" });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async deleteAvatar(req, res, next) {
    try {
      const user = await User.findById(req.user.id);

      fs.unlinkSync(
        "C:\\Users\\User\\Desktop\\authorization\\server\\static" +
          "\\" +
          user.avatar
      );
      user.avatar = null;
      await user.save();
      return res.json(user);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new UserController();
