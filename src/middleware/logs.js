const middlewareLogRequest = (req, res, next) => {
    console.log('Sending Request on Path: ', req.path);
    next();
}

export default middlewareLogRequest;