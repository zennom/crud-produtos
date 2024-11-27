import {Router} from 'express'
import * as produtoController from '../controllers/produtoController'

const router = Router()

router.get('/',(req,res) =>{
    res.send('teste')
})

router.get('/produtos',produtoController.index)
router.get('/cadastro',produtoController.visualizarPaginaCadastro)
router.post('/cadastro',produtoController.cadastroProduto)
router.get('/editar/:id',produtoController.editaProduto)
router.post('/editar/:id',produtoController.atualizaProduto)
router.get('/excluir/:id',produtoController.deletaProduto)



export default router