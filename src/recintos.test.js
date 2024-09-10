import { Recintos } from "./recintos.js";

describe("Classe Recintos", () => {
  const recintoTeste = {
    numero: 6,
    biomas: ["savana", "rio"],
    tamanhoTotal: 20,
    animaisExistentes: [{ especie: "HIPOPOTAMO", quantidade: 1 }],
  };

  test("Deve adicionar recinto", () => {
    const resultado = new Recintos([recintoTeste]);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).toBe(6);
  });

  test("Não deve adicionar recinto com número inválido", () => {
    const resultado = new Recintos([{ ...recintoTeste, numero: 1 }]);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).not.toBe(1);
  });

  test("Não deve adicionar recinto com bioma inválido", () => {
    const resultado = new Recintos([
      { ...recintoTeste, biomas: ["savana", "outro"] },
    ]);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).not.toBe(6);
  });

  test("Não deve adicionar recinto com lista de biomas vazia", () => {
    const resultado = new Recintos([{ ...recintoTeste, biomas: [] }]);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).not.toBe(6);
  });

  test("Não deve adicionar recinto com tamanho total inválido", () => {
    const resultado = new Recintos([{ ...recintoTeste, tamanhoTotal: -1 }]);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).not.toBe(6);
  });

  test("Não deve adicionar recinto sem lista de animais existentes", () => {
    const resultado = new Recintos([
      { ...recintoTeste, animaisExistentes: "string" },
    ]);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).not.toBe(6);
  });

  test("Não deve adicionar recinto com espécie inválida de animal existente", () => {
    const resultado = new Recintos([
      {
        ...recintoTeste,
        animaisExistentes: [{ especie: "GIRAFA", quantidade: 2 }],
      },
    ]);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).not.toBe(6);
  });

  test("Não deve adicionar recinto com quantidade inválida de animal existente", () => {
    const resultado = new Recintos([
      {
        ...recintoTeste,
        animaisExistentes: [{ especie: "MACACO", quantidade: 0 }],
      },
    ]);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).not.toBe(6);
  });

  test("Não deve adicionar recinto que não esteja em um array", () => {
    const resultado = new Recintos(recintoTeste);
    expect(
      resultado.recintosExistentes[resultado.recintosExistentes.length - 1]
        .numero
    ).not.toBe(6);
  });
});
