const authenticated = ((req, res, next) => {
    if(!req.get('Authorization')) {
        const err = new Error('Not Authenticated');
        res.status(401).set('WWW-Authenticate', 'Basic');
        next(err)
    }
    else {
        const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
        .toString()
        .split(':')
        // -> ['username', 'password']
        const username = credentials[0]
        const password = credentials[1]
        //
        if(!(username === 'admin') &&
            !(password === 'password')) {
                const err = new Error('Not Authenticated');
                res.status(401).set('WWW-Authenticate', 'Basic');
                next(err)
        }
        res.status(200);
        next()
    }
})

module.exports = { authenticated };