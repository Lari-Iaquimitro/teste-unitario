import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

export default class Netflix {

    static async listarNetflixTitles(): Promise<any | string> {
        const queryNetflixTitles = `SELECT * FROM netflix_titles;`;

        try {
            const queryReturn = await database.query(queryNetflixTitles);

            return queryReturn.rows
        } catch (error) {
            console.log(`Erro no modelo\n${error}`);
            return "error, verifique os logs do servidor";
        }
    }

    static async removerNetflixTitle(titleId: string): Promise<boolean> {
        let queryResult = false;

        try {
            const queryDeleteTitulo = `DELETE FROM netflix_titles WHERE show_id='${titleId}'`;
            await database.query(queryDeleteTitulo)
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