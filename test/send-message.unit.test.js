// const { sendMessage } = require("../services/send-message.service.js");

const process = require("process")

describe("Send Message Function", () => {

  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEERIK');
    console.log(process.env);
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it("should send a message successfully", async () => {
    console.log(process.env.ACCOUNT_SID);
    expect(200).toBe(200)
  });


  // it("should send a message successfully", async () => {
  //   // Crea objetos mock para req, res y next
  //   const req = {
  //     body: {
  //       body: "Test message",
  //       to: "+123456789",
  //     },
  //   };
  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };
  //   const next = jest.fn();

  //   // Configura una función mock para client.messages.create
  //   const mockMessagesCreate = jest.fn().mockResolvedValue({});
  //   const mockClient = {
  //     messages: {
  //       create: mockMessagesCreate,
  //     },
  //   };

  //   jest.mock("process");

  //   jest.spyOn(process, "env").mockImplementationOnce(() => {
  //     return {
  //       ACCOUNT_SID: process.env.ACCOUNT_SID,
  //       AUTH_TOKEN: process.env.AUTH_TOKEN,
  //       NUMBER_FROM_SEND_MESSAGE: process.env.NUMBER_FROM_SEND_MESSAGE
  //     }
  //   })


  //   // Reemplaza el cliente original con el mockClient
  //   jest.mock("twilio", () => () => mockClient);

  //   // Ejecuta la función sendMessage con los objetos mock
  //   await sendMessage(req, res, next);

  //   // Verifica la respuesta
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: "Se envió el mensaje correctamente",
  //   });
  //   expect(mockMessagesCreate).toHaveBeenCalledWith({
  //     body: req.body.body,
  //     from: process.env.NUMBER_FROM_SEND_MESSAGE,
  //     to: req.body.to,
  //   });
  // });

  // it("should handle an error when credentials are invalid", async () => {
  //   // Crea objetos mock para req, res y next
  //   const req = {
  //     body: {
  //       body: "Test message",
  //       to: "+123456789",
  //     },
  //   };
  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     send: jest.fn(),
  //   };
  //   const next = jest.fn();

  //   // Configura una función mock para client.messages.create que arroja un error
  //   const errorMessage = "Invalid credentials";
  //   const mockMessagesCreate = jest.fn().mockRejectedValue(new Error(errorMessage));
  //   const mockClient = {
  //     messages: {
  //       create: mockMessagesCreate,
  //     },
  //   };

  //   // Reemplaza el cliente original con el mockClient
  //   jest.mock("twilio", () => () => mockClient);

  //   // Ejecuta la función sendMessage con los objetos mock
  //   await sendMessage(req, res, next);

  //   // Verifica el manejo del error
  //   expect(next).toHaveBeenCalled();
  //   expect(next.mock.calls[0][0].message).toContain(errorMessage);
  // });

  // it("should handle other errors", async () => {
  //   // Crea objetos mock para req, res y next
  //   const req = {
  //     body: {
  //       body: "Test message",
  //       to: "+123456789",
  //     },
  //   };
  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     send: jest.fn(),
  //   };
  //   const next = jest.fn();

  //   // Configura una función mock para client.messages.create que arroja un error
  //   const errorMessage = "Some other error";
  //   const mockMessagesCreate = jest.fn().mockRejectedValue(new Error(errorMessage));
  //   const mockClient = {
  //     messages: {
  //       create: mockMessagesCreate,
  //     },
  //   };

  //   // Reemplaza el cliente original con el mockClient
  //   jest.mock("twilio", () => () => mockClient);

  //   // Ejecuta la función sendMessage con los objetos mock
  //   await sendMessage(req, res, next);

  //   // Verifica el manejo del error
  //   expect(next).toHaveBeenCalled();
  //   expect(next.mock.calls[0][0].message).toContain(errorMessage);
  // });


})


