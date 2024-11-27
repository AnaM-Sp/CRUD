import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcryptjs';

// Renderiza a página de login
export const loginPage = (req: Request, res: Response) => {
    res.render('login'); 
};

// Realiza o login
export const login = async (req: Request, res: Response) => {
    const { usuario, senha } = req.body; // Aqui "usuario" (com "u" minúsculo) deve ser o nome do campo no corpo da requisição

    // Verifica se o usuário existe no banco de dados
    const usuarioEncontrado = await Usuario.findOne({ where: { usuario } });

    if (!usuarioEncontrado) {
        return res.status(401).send('Usuário não encontrado');
    }

    // Compara a senha fornecida com a senha criptografada armazenada no banco de dados
    const isMatch = await bcrypt.compare(senha, usuarioEncontrado.senha); // Aqui deve ser "usuarioEncontrado.senha"

    if (!isMatch) {
        return res.status(401).send('Senha incorreta');
    }

    // Cria uma sessão para o usuário
    req.session.usuarioId = usuarioEncontrado.id;

    return res.redirect('/dashboard'); // Redireciona para o dashboard após o login
};

// Realiza o logout
export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout');
        }

        res.redirect('/login'); // Redireciona para a página de login após o logout
    });
};
