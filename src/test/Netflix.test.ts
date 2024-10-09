import { DatabaseModel } from '../model/DatabaseModel';
import Netflix from '../model/Netflix';

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
describe('Netflix', () => {
    const mockDatabase = new DatabaseModel().pool;
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('listarNetflixTitles', () => {
        it('deve retornar uma lista de títulos da Netflix em caso de sucesso', async () => {
            const mockResult = {
                rows: [
                    {
                        show_id: 's1',
                        tipo: 'Movie',
                        titulo: 'Dick Johnson Is Dead',
                        diretor: 'Kirsten Johnson',
                        elenco: null,
                        pais: 'United States',
                        adicionado: 'September 25, 2021',
                        ano_lancamento: 2020,
                        classificacao: 'PG-13',
                        duracao: '90 min',
                        listado_em: 'Documentaries',
                        descricao: 'As her father nears the end of his life, filmmaker Kirsten Johnson stages his death in inventive and comical ways to help them both face the inevitable.',
                    },
                ],
            };
            (mockDatabase.query as jest.Mock).mockResolvedValue(mockResult);
            const result = await Netflix.listarNetflixTitles();
            expect(result).toEqual(mockResult.rows);
        });
        it('deve retornar uma mensagem de erro em caso de falha', async () => {
            (mockDatabase.query as jest.Mock).mockRejectedValue(new Error('Database error'));
            const result = await Netflix.listarNetflixTitles();
            expect(result).toBe('error, verifique os logs do servidor');
        });
    });
    describe('removerNetflixTitle', () => {
        it('deve retornar true quando o título for removido com sucesso', async () => {
            const mockDeleteResult = { rowCount: 1 };
            (mockDatabase.query as jest.Mock).mockResolvedValue(mockDeleteResult);

            const result = await Netflix.removerNetflixTitle('s1');
            expect(result).toBe(true);
        });
        it('deve retornar false quando não houver título para remover', async () => {
            const mockDeleteResult = { rowCount: 0 };
            (mockDatabase.query as jest.Mock).mockResolvedValue(mockDeleteResult);
            const result = await Netflix.removerNetflixTitle('s2');
            expect(result).toBe(false);
        });
        it('deve retornar false e capturar erro em caso de falha', async () => {
            (mockDatabase.query as jest.Mock).mockRejectedValue(new Error('Delete error'));
            const result = await Netflix.removerNetflixTitle('s1');
            expect(result).toBe(false);
        });
    });
});
