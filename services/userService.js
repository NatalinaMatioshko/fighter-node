import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    return userRepository.getAll();
  }

  getOneById(id) {
    const item = userRepository.getOne({ id });
    if (!item) {
      return null;
    }
    return item;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  emailExists(email, excludeId = null) {
    const allUsers = userRepository.getAll();
    const emailLower = email.toLowerCase();
    return allUsers.some(
      (user) =>
        user.email.toLowerCase() === emailLower &&
        (!excludeId || user.id !== excludeId),
    );
  }

  phoneExists(phone, excludeId = null) {
    const allUsers = userRepository.getAll();
    return allUsers.some(
      (user) =>
        user.phone.toLowerCase() === phone.toLowerCase() &&
        (!excludeId || user.id !== excludeId),
    );
  }

  create(data) {
    if (this.emailExists(data.email)) {
      throw new Error("Email already exists");
    }

    if (this.phoneExists(data.phone)) {
      throw new Error("Phone already exists");
    }

    return userRepository.create(data);
  }

  update(id, data) {
    if (data.email && this.emailExists(data.email, id)) {
      throw new Error("Email already exists");
    }

    if (data.phone && this.phoneExists(data.phone, id)) {
      throw new Error("Phone already exists");
    }

    return userRepository.update(id, data);
  }

  delete(id) {
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
