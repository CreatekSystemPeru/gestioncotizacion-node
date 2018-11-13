import {Router, Request, Response} from "express";

const inicio = Router();

inicio.get("/inicio", (req: Request, res: Response) => {
    if (!req.session!.userLogin) {
        return res.redirect("/sesion/iniciar");
    }

    /*let userLogin = req.session!.userLogin;

    res.render("index", {
        usuarioMenu: userLogin.MenuList,
        userName: userLogin.UsuarioPersona
    });*/
    res.render("inicio", {
    });
});

export default inicio;
