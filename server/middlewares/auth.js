import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({ success: false, message: "No token provided" });
    }

    // Format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.json({ success: false, message: "Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId for controllers
    req.userId = decoded.id;

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    return res.json({ success: false, message: "Unauthorized" });
  }
};

export default userAuth;
