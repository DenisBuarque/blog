function userAuth (req, res, next){
    if(req.session.user !== undefined){
        next();
    } else {
        res.status(422).json({ message: "Você não esta autenticado!" });
        return;
    }
}

module.exports = userAuth;