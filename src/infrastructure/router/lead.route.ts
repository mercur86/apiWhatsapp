import express, { Router } from "express";
import LeadCtrl from "../controller/lead.ctrl";
import container from "../ioc";
import jwt from 'jsonwebtoken';
const router: Router = Router();

/**
 * http://localhost/lead POST
 */
const leadCtrl: LeadCtrl = container.get("lead.ctrl");
router.post("/obtenerToken", leadCtrl.obtenerTokenCtrl);
router.post("/enviar", leadCtrl.sendCtrl);
router.post('/enviarMensaje', leadCtrl.sendWhitTokenCtrl);


export { router };
