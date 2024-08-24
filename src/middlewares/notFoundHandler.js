export function notFoundHandler(req, res, next) {
    res.status(404).json({
        message: 'Oops, page not found'
    });
}