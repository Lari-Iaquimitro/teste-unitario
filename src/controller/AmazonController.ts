import { Request, Response } from 'express';
import Amazon from '../model/Amazon';

export default class AmazonController extends Amazon {
    
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json(await Amazon.listarVendaLivros());
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.query.id_livro as string);

            if (await Amazon.removerVenda(id)) {
                return res.status(200).json('Venda removida com sucesso');
            } else {
                return res.status(400).json('Erro ao remover venda');
            }
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}