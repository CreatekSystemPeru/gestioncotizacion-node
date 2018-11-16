import {Router, Request, Response} from "express";
import validar from "./validar";

const inicio = Router();

inicio.get(["/", "/inicio"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P inicio: render");
    res.render("inicio", { 
        titulo: "Inicio"
    });
});

export default inicio;
