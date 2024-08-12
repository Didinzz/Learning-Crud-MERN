export default (req, res, next) => {
  if (!req.session.user_id) {
    return res
      .status(401)
      .json({ message: "Silahkan melakukan login terlebih dahulu" });
  }
  next();
};
