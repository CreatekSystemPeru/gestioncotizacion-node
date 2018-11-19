import Server from "./server/server";
import webapi from "./api/webapi";
import website from "./website/rutas";

require('./hbs/helpers');

const server = Server.init(Number(3000));

server.app.use(webapi);
server.app.use(website);

//process.env.PORT
server.start(() => {
    console.log(`Servidor corriendo en el puerto 3000`);
});