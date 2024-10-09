import { DatabaseModel } from '../model/DatabaseModel';
import FifaPlayers from '../model/FifaPlayers';

// Jest.mock para o DatabaseModel
jest.mock('../model/DatabaseModel', () => {
    const mockQuery = jest.fn(); // Mock da função query
    return {
        DatabaseModel: jest.fn().mockImplementation(() => ({
            pool: {
                query: mockQuery, // Atribuindo o mockQuery à função query
            },
        })),
        mockQuery, // Exportar o mockQuery para ser usado nos testes
    };
});
describe('FifaPlayers', () => {
    const mockDatabase = new DatabaseModel().pool;

    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('listarPlayersCards', () => {
        it('deve retornar uma lista de player cards em caso de sucesso', async () => {
            const mockResult = {
                rows: [
                    {
                        playerid: 1,
                        playername: 'Pelé',
                        foot: 'Right',
                        playerposition: 'CAM',
                        awr: 'High',
                        dwr: 'Med',
                        ovr: '98',
                        pac: '95',
                        sho: '96',
                        pas: '93',
                        dri: '96',
                        def: '60',
                        phy: '76',
                        sm: '5',
                        div: 'NA',
                        pos: 'NA',
                        han: 'NA',
                        reff: 'NA',
                        kic: 'NA',
                        spd: 'NA',
                    },
                ],
            };
            (mockDatabase.query as jest.Mock).mockResolvedValue(mockResult);
            const result = await FifaPlayers.listarPlayersCards();
            expect(result).toEqual(mockResult.rows);
        });
        it('deve retornar uma mensagem de erro em caso de falha', async () => {
            (mockDatabase.query as jest.Mock).mockRejectedValue(new Error('Database error'));

            const result = await FifaPlayers.listarPlayersCards();
            expect(result).toBe('error, verifique os logs do servidor');
        });
    });
    describe('removerPlayerCard', () => {
        it('deve retornar true quando o player card for removido com sucesso', async () => {
            const mockDeleteResult = { rowCount: 1 };
            (mockDatabase.query as jest.Mock).mockResolvedValue(mockDeleteResult);

            const result = await FifaPlayers.removerPlayerCard(1);
            expect(result).toBe(true);
        });
        it('deve retornar false quando não houver player card para remover', async () => {
            const mockDeleteResult = { rowCount: 0 };
            (mockDatabase.query as jest.Mock).mockResolvedValue(mockDeleteResult);

            const result = await FifaPlayers.removerPlayerCard(2);
            expect(result).toBe(false);
        });
        it('deve retornar false e capturar erro em caso de falha', async () => {
            (mockDatabase.query as jest.Mock).mockRejectedValue(new Error('Delete error'));
            const result = await FifaPlayers.removerPlayerCard(1);
            expect(result).toBe(false);
        });
    });
});
