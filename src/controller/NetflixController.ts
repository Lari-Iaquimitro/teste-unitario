import { Request, Response } from 'express';
import Netflix from '../model/Netflix';

export default class NetflixController extends Netflix {
    
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json(await Netflix.listarNetflixTitles());
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.query.show_id as string;

            if (await Netflix.removerNetflixTitle(id)) {
                return res.status(200).json('Titulo removido com sucesso');
            } else {
                return res.status(400).json('Erro ao remover titulo');
            }
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}