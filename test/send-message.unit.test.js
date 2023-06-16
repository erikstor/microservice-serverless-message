const { sendMessage } = require("../src/services/send-message.service.js");

describe("Send Message Function", () => {

  let mockMessagesCreate
  let mockClient

  beforeEach(() => {
    mockMessagesCreate = jest.fn().mockRejectedValue();
    mockClient = {
    };
  })


  // Tests that a message is sent successfully
  it("should send a message successfully", async () => {
    // Crea objetos mock para req, res y next
    const req = {
      headers: {
        authorization: "Bearer validToken",
      },
      body: {
        body: "Test message",
        to: '+573153226435',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Ejecuta el middleware con los objetos mock
    await sendMessage(req, res, next);

    console.log(res.status.mock);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Se envió el mensaje correctamente", });
    expect(next).not.toHaveBeenCalled();
  });



  // Tests that an error is thrown when Twilio credentials are invalid
  it("should handle an error when credentials are invalid", async () => {

    // Crea objetos mock para req, res y next
    const req = {
      body: {
        body: "Test message",
        to: "+573153226435",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Configura una función mock para client.messages.create que arroja un error
    const errorMessage = "Las credenciales del proveedor no son validas";
    mockMessagesCreate = jest.fn().mockRejectedValue({
      code: 20003,
      status: 401,
      message: errorMessage
    });
    mockClient = {
      messages: {
        create: mockMessagesCreate,
      },
    };

    // Reemplaza el cliente original con el mockClient
    jest.mock("twilio", () => () => mockClient);

    // Ejecuta la función sendMessage con los objetos mock
    await sendMessage(req, res, next);
    // Verifica el manejo del error
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].message).toContain(errorMessage);
  });


  it("should handle other errors", async () => {
    // Crea objetos mock para req, res y next
    const req = {
      body: {
        body: "Test message",
        to: "+123456789",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    // Configura una función mock para client.messages.create que arroja un error
    const errorMessage = "Some other error";
    mockMessagesCreate = jest.fn().mockRejectedValue(new Error(errorMessage));
    mockClient = {
      messages: {
        create: mockMessagesCreate,
      },
    };

    // Reemplaza el cliente original con el mockClient
    jest.mock("twilio", () => () => mockClient);

    // Ejecuta la función sendMessage con los objetos mock
    await sendMessage(req, res, next);

    // Verifica el manejo del error
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].message).toContain(errorMessage);
  });

});


