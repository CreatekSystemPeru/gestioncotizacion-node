import {Router, Request, Response} from "express";

const sesion = Router();

sesion.get("/iniciar", (req: Request, res: Response) => {
    if (!req.session!.userLogin) {
        return res.redirect("/");
    }

    let userLogin = req.session!.userLogin;

    res.render("index", {
        usuarioMenu: userLogin.MenuList,
        userName: userLogin.UsuarioPersona
    });
});

sesion.get("/salir", (req: Request, res: Response) => {
    if (!req.session!.userLogin) {
        return res.redirect("/");
    }

    let userLogin = req.session!.userLogin;

    res.render("index", {
        usuarioMenu: userLogin.MenuList,
        userName: userLogin.UsuarioPersona
    });
});

export default sesion;
