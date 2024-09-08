import { Animais } from "./animais.js";

describe("Classe Animais", () => {
  test("Deve retornar erro ao tentar incluir animal com tipo de parâmetro inválido", () => {
    const resultado = Animais.incluirAnimal("LEAO");
    expect(resultado.erro).toBe("Tipo de parâmetro inválido");
  });

  test("Deve retornar erro ao tentar obter animal com parâmetro inválido", () => {
    const resultado = Animais.obterAnimal("");
    expect(resultado.erro).toBe("Parâmetro inválido");
  });
});
