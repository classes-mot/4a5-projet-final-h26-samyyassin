const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.code || 500).json({
    message: err.message || "Une erreur est survenue sur le serveur."
  });
};

export default errorHandler;