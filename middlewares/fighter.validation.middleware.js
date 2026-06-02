const FIGHTER_FIELDS = ["name", "health", "power", "defense"];

const createFighterValid = (req, res, next) => {
  const { name, health, power, defense } = req.body;
  const bodyKeys = Object.keys(req.body);

  if ("id" in req.body) {
    return res.status(400).json({
      error: true,
      message: "Field 'id' cannot be provided",
    });
  }

  const extraFields = bodyKeys.filter((key) => !FIGHTER_FIELDS.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Extra fields not allowed: ${extraFields.join(", ")}`,
    });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: true,
      message: "Name is required and must be a non-empty string",
    });
  }

  if (
    power === undefined ||
    typeof power !== "number" ||
    power < 1 ||
    power > 100
  ) {
    return res.status(400).json({
      error: true,
      message: "Power is required and must be a number between 1 and 100",
    });
  }

  if (
    defense === undefined ||
    typeof defense !== "number" ||
    defense < 1 ||
    defense > 10
  ) {
    return res.status(400).json({
      error: true,
      message: "Defense is required and must be a number between 1 and 10",
    });
  }

  if (
    health !== undefined &&
    (typeof health !== "number" || health < 80 || health > 120)
  ) {
    return res.status(400).json({
      error: true,
      message: "Health must be a number between 80 and 120",
    });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
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

  const extraFields = bodyKeys.filter((key) => !FIGHTER_FIELDS.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Extra fields not allowed: ${extraFields.join(", ")}`,
    });
  }

  if (
    req.body.power !== undefined &&
    (typeof req.body.power !== "number" ||
      req.body.power < 1 ||
      req.body.power > 100)
  ) {
    return res.status(400).json({
      error: true,
      message: "Power must be a number between 1 and 100",
    });
  }

  if (
    req.body.defense !== undefined &&
    (typeof req.body.defense !== "number" ||
      req.body.defense < 1 ||
      req.body.defense > 10)
  ) {
    return res.status(400).json({
      error: true,
      message: "Defense must be a number between 1 and 10",
    });
  }

  if (
    req.body.health !== undefined &&
    (typeof req.body.health !== "number" ||
      req.body.health < 80 ||
      req.body.health > 120)
  ) {
    return res.status(400).json({
      error: true,
      message: "Health must be a number between 80 and 120",
    });
  }

  next();
};

export { createFighterValid, updateFighterValid };
