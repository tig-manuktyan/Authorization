module.exports = class UserDto {
  email;
  id;
  isActivated;
  name;
  surname;
  gender;
  age;
  avatar;
  profileName;

  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.surname = model.surname;
    this.age = model.age;
    this.gender = model.gender;
    this.avatar = model.avatar;
    this.profileName = model.profileName;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
};
