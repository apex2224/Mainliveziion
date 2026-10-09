exports.home = (req, res, next) => {
    try {
      res.send("Chatbot backend Running");
    } catch (error) {
      next(error);
    }
  };
  