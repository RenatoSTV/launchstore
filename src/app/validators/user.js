const User = require('../models/User')

async function post(req, res, next) {
    //chef if has all fields
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "" && key != "removed_files") {
            return res.render('user/register', {
                user: req.body,
                error: 'Por favor, preencha todos os campos.'
            })
        }
    }

    //check if user exists [email,cpf_cnpj]
    let { email, cpf_cnpj, password, passwordRepeat }= req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({ 
        where: {email},
        or: {cpf_cnpj}
    })

    if(user) return res.render('user/register', {
        user: req.body,
        error: 'Usuário já cadastrado.'
    })

    //check if password match
    if(password != passwordRepeat) return res.render('user/register', {
        user: req.body,
        error: 'As senhas tem que ser iguais'
    })

    next()
}

module.exports = {
    post
}