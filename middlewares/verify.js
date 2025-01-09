/**
 * verify token and check if user is admin or not
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {function} next - The next function to call
 */
export const verifyTokenIsAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json({ message: "you are not allowed" })
        }
    })
}

/**
 * verify token and check if user is authorized or not
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {function} next - The next function to call
 */
export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json({ message: "you are not allowed" })
        }
    })
}

/**
 * verify token and check if user is the same as the one making the request
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {function} next - The next function to call
 */
export const verifyTokenUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next()
        } else {
            res.status(403).json({ message: "you are not allowed" })
        }
    })
}