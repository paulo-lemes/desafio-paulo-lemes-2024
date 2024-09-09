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

  test("Deve retornar erro ao tentar incluir bioma com parâmetro inválido", () => {
    const resultado = Animais.incluirBioma("");
    expect(resultado.erro).toBe("Bioma inválido");
  });

  test("Deve incluir bioma com parâmetro válido", () => {
    Animais.incluirBioma("geleira");
    expect(Animais.biomas[Animais.biomas.length - 1]).toBe("geleira");
  });

  test("Deve retornar erro ao tentar incluir tipo de alimentação com parâmetro inválido", () => {
    const resultado = Animais.incluirTipoAlimentacao("");
    expect(resultado.erro).toBe("Tipo de alimentação inválido");
  });

  test("Deve incluir tipo de alimentação com parâmetro válido", () => {
    Animais.incluirTipoAlimentacao("mamifero");
    expect(Animais.alimentacao[Animais.alimentacao.length - 1]).toBe(
      "mamifero"
    );
  });
});
