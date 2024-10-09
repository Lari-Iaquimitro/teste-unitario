import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

export default class Amazon {

    static async listarVendaLivros(): Promise<any | string> {
        const queryVendaLivros = `SELECT * FROM livros;`;

        try {
            const queryReturn = await database.query(queryVendaLivros);

            return queryReturn.rows
        } catch (error) {
            console.log(`Erro no modelo\n${error}`);
            return "error, verifique os logs do servidor";
        }
    }

    static async removerVenda(idVenda: number): Promise<boolean> {
        let queryResult = false;

        try {
            const queryDeleteVenda = `DELETE FROM livros WHERE id_livro=${idVenda}`;
            await database.query(queryDeleteVenda)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                })
            return queryResult;
        } catch (error) {
            console.log(error);
            return queryResult;
        }
    }
}