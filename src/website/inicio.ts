import {Router, Request, Response} from "express";
import validar from "./validar";

const inicio = Router();

inicio.get(["/", "/inicio"], [validar.tieneSesion], (req: Request, res: Response) => {
    res.locals = {
        titulo: "Inicio"
    };

    console.log("render inicio");
    res.render("inicio", { });
    /*if (!req.session!.userLogin) {
        
        return res.redirect("/sesion/iniciar");
    }

    let userLogin = req.session!.userLogin;

    res.render("index", {
        usuarioMenu: userLogin.MenuList,
        userName: userLogin.UsuarioPersona
    });*/
});

export default inicio;
