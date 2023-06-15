const jwt = require("jsonwebtoken");

// Importa tu función authMiddleware aquí
const { authMiddleware } = require("../src/middleware/auth.middleware.js");

describe("Auth Middleware", () => {
  // Prueba unitaria para el middleware de autorización
  it("should authorize the request with a valid token", async () => {
    // Crea objetos mock para req, res y next
    const req = {
      headers: {
        authorization: "Bearer validToken",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    // Ejecuta el middleware con los objetos mock
    await authMiddleware(req, res, next);

    // Verifica el comportamiento del middleware
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if no authorization token is provided", async () => {
    // Crea objetos mock para req, res y next
    const req = {
      headers: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    // Ejecuta el middleware con los objetos mock
    await authMiddleware(req, res, next);

    // Verifica la respuesta
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ message: "No se encontro ningún token de autorización" });
    expect(next).not.toHaveBeenCalled();
  });

  // Otras pruebas unitarias para cubrir casos de error y situaciones límite
});
