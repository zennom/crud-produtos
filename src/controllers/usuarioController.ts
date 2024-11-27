// src/controllers/authController.ts
import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {Usuario} from '../models/Usuario'
import dotenv from 'dotenv'

dotenv.config()

export const cadastrarUsuario = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).send('Nome, email e senha são obrigatórios.')
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } })
    if (usuarioExistente) {
        return res.status(400).send('Email já cadastrado.')
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada
    })

    res.status(201).send('Usuário cadastrado com sucesso.')
}

// src/controllers/authController.ts
export const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha } = req.body

  if (!email || !senha) {
      return res.status(400).send('Email e senha são obrigatórios.')
  }

  const usuario = await Usuario.findOne({ where: { email } })
  if (!usuario) {
      return res.status(400).send('Credenciais inválidas.')
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha)
  if (!senhaValida) {
      return res.status(400).send('Credenciais inválidas.')
  }

  const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET as string, // Defina uma chave secreta no .env
      { expiresIn: '1h' } // O token vai expirar em 1 hora
  )

  res.json({ token })
}
