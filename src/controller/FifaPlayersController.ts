import { Request, Response } from 'express';
import FifaPlayers from '../model/FifaPlayers';

export default class FifaPlayersControll extends FifaPlayers {
    
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json(await FifaPlayers.listarPlayersCards());
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.query.playerid as string);

            if (await FifaPlayers.removerPlayerCard(id)) {
                return res.status(200).json('Player card removida com sucesso');
            } else {
                return res.status(400).json('Erro ao remover player card');
            }
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}