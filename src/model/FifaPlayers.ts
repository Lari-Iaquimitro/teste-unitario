import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

export default class FifaPlayers {

    static async listarPlayersCards(): Promise<any | string> {
        const queryPlayerCards = `SELECT * FROM playercards;`;

        try {
            const queryReturn = await database.query(queryPlayerCards);

            return queryReturn.rows
        } catch (error) {
            console.log(`Erro no modelo\n${error}`);
            return "error, verifique os logs do servidor";
        }
    }

    static async removerPlayerCard(idPlayerCard: number): Promise<boolean> {
        let queryResult = false;

        try {
            const queryDeletePlayerCard = `DELETE FROM playercards WHERE playerid=${idPlayerCard}`;
            await database.query(queryDeletePlayerCard)
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