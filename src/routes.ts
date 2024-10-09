import express from 'express';
import AmazonController from './controller/AmazonController';
import NetflixController from './controller/NetflixController';
import FifaPlayersControll from './controller/FifaPlayersController';

// Criando serviço de rotas
const router = express.Router();

const LivrosController = new AmazonController();
const NetflixControl = new NetflixController();
const FifaControl = new FifaPlayersControll();

router.get('/', (req, res) => { res.json({"mensagem": "Olá!"})});

router.get('/vendas', LivrosController.todos);
router.delete('/remover/venda', LivrosController.remover);

router.get('/playercards', FifaControl.todos);
router.delete('/remover/playercard', FifaControl.remover);

router.get('/titulos', NetflixControl.todos);
router.delete('/remover/titulo', NetflixControl.remover);

export { router }