const loginPost = (req, res) => {
    const { correo, password } = req.body;

    res.json({
        msg: 'login ok', correo, password
    });
};

module.exports = {
    loginPost
};