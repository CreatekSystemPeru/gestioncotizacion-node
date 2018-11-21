import Server from "./server/server";
import webapi from "./api/webapi";
import website from "./website/rutas";

require('./hbs/helpers');

const port = process.env.PORT || 3000;
const server = Server.init(Number(port));

// para invocaciones del lado del servidor, no está pensado para usarlo desde el cliente.
process.env.SERVICE_URL = process.env.SERVICE_URL || "http://localhost:3000/api/";

server.app.use(webapi);
server.app.use(website);

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});