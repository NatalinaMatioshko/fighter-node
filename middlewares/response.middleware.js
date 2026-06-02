const responseMiddleware = (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = function (data) {
    if (data && typeof data === "object" && "error" in data) {
      return originalJson(data);
    }

    if (res.statusCode === 404) {
      return originalJson({
        error: true,
        message: data?.message || "Not found",
      });
    }

    if (res.statusCode === 400) {
      return originalJson({
        error: true,
        message: data?.message || "Bad request",
      });
    }

    if (res.statusCode === 500) {
      return originalJson({
        error: true,
        message: data?.message || "Internal server error",
      });
    }

    return originalJson(data);
  };

  next();
};

export { responseMiddleware };
