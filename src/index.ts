import Server from "./server/server";
import indexApi from "./api/indexApi";
import website from "./website/rutas";

require('./hbs/helpers');

const server = Server.init(Number(3000));

server.app.use(indexApi);
server.app.use(website);

//process.env.PORT
server.start(() => {
    console.log(`Servidor corriendo en el puerto 3000`);
});