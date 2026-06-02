const USER_FIELDS = ["firstName", "lastName", "email", "phone", "password"];

const validateEmail = (email) => {
  const gmailRegex = /^[^\s@]+@gmail\.com$/;
  return gmailRegex.test(email.trim());
};

const validatePhone = (phone) => {
  const phoneRegex = /^\+380\d{9}$/;
  return phoneRegex.test(phone);
};

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const bodyKeys = Object.keys(req.body);

  if ("id" in req.body) {
    return res.status(400).json({
      error: true,
      message: "Field 'id' cannot be provided",
    });
  }

  const extraFields = bodyKeys.filter((key) => !USER_FIELDS.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Extra fields not allowed: ${extraFields.join(", ")}`,
    });
  }

  if (typeof firstName !== "string" || firstName.trim() === "") {
    return res.status(400).json({
      error: true,
      message: "firstName is required and must be a non-empty string",
    });
  }

  if (typeof lastName !== "string" || lastName.trim() === "") {
    return res.status(400).json({
      error: true,
      message: "lastName is required and must be a non-empty string",
    });
  }

  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({
      error: true,
      message: "email is required and must be a non-empty string",
    });
  }

  if (typeof phone !== "string" || phone.trim() === "") {
    return res.status(400).json({
      error: true,
      message: "phone is required and must be a non-empty string",
    });
  }

  if (typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({
      error: true,
      message: "password is required and must be a non-empty string",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      error: true,
      message: "Email must be a gmail address",
    });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({
      error: true,
      message: "Phone must be in format +380xxxxxxxxx",
    });
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 3 characters long",
    });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);

  if ("id" in req.body) {
    return res.status(400).json({
      error: true,
      message: "Field 'id' cannot be updated",
    });
  }

  if (bodyKeys.length === 0) {
    return res.status(400).json({
      error: true,
      message: "At least one field must be provided for update",
    });
  }

  const extraFields = bodyKeys.filter((key) => !USER_FIELDS.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Extra fields not allowed: ${extraFields.join(", ")}`,
    });
  }

  if (req.body.firstName !== undefined) {
    if (
      typeof req.body.firstName !== "string" ||
      req.body.firstName.trim() === ""
    ) {
      return res.status(400).json({
        error: true,
        message: "firstName must be a non-empty string",
      });
    }
  }

  if (req.body.lastName !== undefined) {
    if (
      typeof req.body.lastName !== "string" ||
      req.body.lastName.trim() === ""
    ) {
      return res.status(400).json({
        error: true,
        message: "lastName must be a non-empty string",
      });
    }
  }

  if (req.body.email && !validateEmail(req.body.email)) {
    return res.status(400).json({
      error: true,
      message: "Email must be a gmail address",
    });
  }

  if (req.body.phone && !validatePhone(req.body.phone)) {
    return res.status(400).json({
      error: true,
      message: "Phone must be in format +380xxxxxxxxx",
    });
  }

  if (req.body.password && req.body.password.length < 3) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 3 characters long",
    });
  }

  next();
};

export { createUserValid, updateUserValid };
