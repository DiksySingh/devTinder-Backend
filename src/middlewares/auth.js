const isAdminAuthorized = (req, res, next) => {
    // Check if the user is an admin
    console.log("isAdminAuthorized middleware called");
    const token = "xyz";
    const isValidToken = token === "xyz"; // Simulating token validation
    if (!isValidToken) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    } else {
        next();
    }
};

module.exports = {
    isAdminAuthorized
};