import request from "request";
import io from "../main.mjs";
import { Mensaje } from "../models/index.mjs";

// Funcion donde el chat respondera usando SendAPI
async function enviar_texto(senderID, response) {
  // Construcicon del cuerpo del mensaje
  let request_body = {
    recipient: {
      id: senderID + "",
    },
    message: response,
  };
  console.log(request_body);

  // Enviar el request HTTP a la plataforma de messenger
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("Mensaje enviado!");
      } else {
        console.error("No se puedo enviar el mensaje:" + err);
      }
    }
  );
}
async function process_event(event) {
  // Capturamos los datos del que genera el evento y el mensaje
  var senderID = event.sender.id;
  var message = event.message;

  // Si en el evento existe un mensaje de tipo texto
  if (message.text) {
    // Crear un payload para un simple mensaje de texto
    // var response = {
    //   text: "Enviaste este mensaje: " + message.text,
    // };

    await Mensaje.create({
      idCliente: Number(senderID),
      mensaje: message.text,
      fechaEnviado: event.timestamp,
    });
    io.emit("MESSAGE");
  }

  // Enviamos el mensaje mediante SendAPI
  //enviar_texto(senderID, response);
}

export default class MensajesController {
  static async ok(req, res) {
    res.send("Se ha desplegado exitosamente!");
  }

  static async verificar(req, res) {
    // Verificar la coincidendia del token
    if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
      console.log("webhook verificado!");
      res.status(200).send(req.query["hub.challenge"]);
    } else {
      console.error(
        "La verificacion ha fallado, porque los tokens no coinciden"
      );
      res.sendStatus(403);
    }
  }

  static async capturarEventos(req, res) {
    // Verificar si el vento proviene del pagina asociada
    if (req.body.object == "page") {
      // Si existe multiples entradas
      req.body.entry.forEach(function (entry) {
        // Iterara todos lo eventos capturados
        entry.messaging.forEach(function (event) {
          if (event.message) {
            process_event(event);
            console.log(event);
          }
        });
      });
      res.sendStatus(200);
    }
  }

  static async findAll(req, res) {
    const mensajes = await Mensaje.findAll();
    res.json(mensajes);
  }

  static async findByIdCliente(req, res) {
    const { idCliente } = req.params;

    const mensajes = await Mensaje.findAll({ where: { idCliente } });
    res.json(mensajes);
  }

  static async saveMessage(req, res) {
    const { idCliente, mensaje } = req.body;

    enviar_texto(idCliente, { text: mensaje });

    const response = await Mensaje.create({
      idCliente: Number(idCliente),
      mensaje,
    });

    res.json(response);
  }
}
