import { Router } from 'express';
import MensajesController from '../controllers/MensajesController.mjs';
import ClienteController from '../controllers/ClienteController.mjs'
import Call from '../utils/Call.mjs';

const router = Router();


router.get("/", Call(MensajesController.ok));

// Facebook Webhook
router.get("/webhook", Call(MensajesController.verificar));

// Todos eventos de mesenger sera capturados por esta ruta
router.post("/webhook", Call(MensajesController.capturarEventos));

//Mensajes
router.get("/mensajes",Call(MensajesController.findAll));

router.get("/filterBy/:idCliente",Call(MensajesController.findByIdCliente));

router.post("/mensajes",Call(MensajesController.saveMessage));

//Cliente
router.get("/clientes", Call(ClienteController.findAll));

router.get("/cliente/:id",Call(ClienteController.findById));


export default router;