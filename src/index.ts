import Server from "./server/server";
import webapi from "./api/webapi";
import website from "./website/rutas";

require('./hbs/helpers');

const port = process.env.PORT || 3000;
const server = Server.init(Number(port));

server.app.use(webapi);
server.app.use(website);

//process.env.PORT
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});