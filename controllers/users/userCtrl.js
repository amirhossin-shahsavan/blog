const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeaders");
const { appErr, AppErr } = require("../../utils/appErr");

const userEmailRegisterCtrl = async (req, res, next) => {
  const { firstname, lastname, profilephoto, email, password } = req.body;
  try {
    // check email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Already Exist", 500));
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    // create the user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedpass,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const userLoginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check user exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("invalid login credentional", 500));
    }
    // verifying
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(appErr("invalid login credentional", 500));
    }
    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const whoViewedMyProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const userWhoViewed = await User.findById(req.userAuth);

    if (user && userWhoViewed) {
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );
      if (isUserAlreadyViewed) {
        return next(appErr("you alredy viewed this profile"));
      } else {
        user.viewers.push(userWhoViewed._id);

        await user.save();

        res.json({
          status: "success",
          data: "you have successfully viewed this profile",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const followingCtrl = async (req, res, next) => {
  try {
    const userWhoFollowed = await User.findById(req.params.id);
    const userToFollow = await User.findById(req.userAuth);

    if (userToFollow && userWhoFollowed) {
      const isUserAlreadyFollowed = userToFollow.following.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );

      if (isUserAlreadyFollowed) {
        return next(appErr("you already followed this user"));
      } else {
        userToFollow.following.push(userWhoFollowed._id);

        userWhoFollowed.followers.push(userToFollow._id);

        await userWhoFollowed.save();
        await userToFollow.save();

        res.json({
          status: "success",
          data: "you have successfully follow",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const unFollowingCtrl = async (req, res, next) => {
  try {
    const userWhoUnFollowed = await User.findById(req.params.id);
    const userToUnFollow = await User.findById(req.userAuth);

    if (userToUnFollow && userWhoUnFollowed) {
      const isUserAlreadyUnFollowed = userToUnFollow.following.find(
        (follower) => follower.toString() === userWhoUnFollowed._id.toString()
      );

      if (!isUserAlreadyUnFollowed) {
        return next(appErr("you already unfollowed this user"));
      } else {
        userToUnFollow.following.pop(userWhoUnFollowed._id);

        userWhoUnFollowed.followers.pop(userToUnFollow._id);

        await userWhoUnFollowed.save();
        await userToUnFollow.save();

        res.json({
          status: "success",
          data: "you have successfully unfollow",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const userProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const usersCtrl = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      data: "all user profile",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const adminBlockUsersCtrl = async (req, res, next) => {
  try {
    const userToBeBlock = await User.findById(req.params.id);
    if (!userToBeBlock) {
      return next(appErr("user not found"));
    }
    if (userToBeBlock.isBlocked == false) {
      userToBeBlock.isBlocked = true;
    } else {
      return next(appErr("this user is already block!"));
    }

    await userToBeBlock.save();
    res.json({
      status: "success",
      data: "you have successfully blocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const adminUnBlockUsersCtrl = async (req, res, next) => {
  try {
    const userToUnBeBlock = await User.findById(req.params.id);
    if (!userToUnBeBlock) {
      return next(appErr("user not found"));
    }
    if (userToUnBeBlock.isBlocked == true) {
      userToUnBeBlock.isBlocked = false;
    } else {
      return next(appErr("this user is already unblock!"));
    }

    await userToUnBeBlock.save();
    res.json({
      status: "success",
      data: "you have successfully unblocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const blockUserCtrl = async (req, res, next) => {
  try {
    const userToBeBloced = await User.findById(req.params.id);
    const userWhoBlocked = await User.findById(req.userAuth);
    if (userWhoBlocked && userToBeBloced) {
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBloced._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appErr("you already blocked this user"));
      } else {
        userWhoBlocked.blocked.push(userToBeBloced._id);
        await userWhoBlocked.save();
        res.json({
          status: "success",
          data: "blockUserCtrl",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const unBlockUserCtrl = async (req, res, next) => {
  try {
    const userToUnBeBloced = await User.findById(req.params.id);
    const userWhoUnBlocked = await User.findById(req.userAuth);
    if (userToUnBeBloced && userWhoUnBlocked) {
      const isUserAlreadyBlocked = userWhoUnBlocked.blocked.find(
        (blocked) => blocked.toString() === userToUnBeBloced._id.toString()
      );
      if (!isUserAlreadyBlocked) {
        return next(appErr("you have not blocked this user"));
      } else {
        userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
          (blocked) => blocked.toString() !== userToUnBeBloced._id.toString()
        );
        await userWhoUnBlocked.save();
        res.json({
          status: "success",
          data: "unBlockUserCtrl",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const userUpdateCtrl = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      data: "user userUpdateCtrl",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const profilePhotoUploadCtrl = async (req, res, next) => {
  try {
    // find user to be uploaded
    const userToUpdate = await User.findById(req.userAuth);
    // check if user is found
    if (!userToUpdate) {
      return next(appErr("user not found", 404));
    }
    // check if user is blocked
    if (userToUpdate.isBlocked) {
      return next(appErr("action not allowed, your account is blocked", 403));
    }
    // check if user is updating their photo
    if (req.file) {
      // update profile photo
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilephoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        status: "success",
        data: "you have successfully updated your profile photo",
      });
    }
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const userDeleteCtrl = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      data: "user delete",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  userEmailRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
  profilePhotoUploadCtrl,
  whoViewedMyProfileCtrl,
  followingCtrl,
  unFollowingCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
};
