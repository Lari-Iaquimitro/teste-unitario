import { DatabaseModel } from "./model/DatabaseModel";
import { server } from "./server";

const port = 3001;

new DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        server.listen(port, () => {
            console.log(`Servidor está rodando no endereço http://localhost:${port}/`);
        });
    } else {
        console.log('Não foi possível conectar aos bancos de dados.');
    }
})