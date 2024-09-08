import { RecintosZoo } from "./recintos-zoo.js";

describe("Recintos do Zoologico", () => {
  test("Deve retornar falta de parâmetro como erro", () => {
    const resultado = new RecintosZoo().analisaRecintos("LEAO");
    expect(resultado.erro).toBe("Parâmetro(s) inválido(s)");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve rejeitar animal inválido", () => {
    const resultado = new RecintosZoo().analisaRecintos("UNICORNIO", 1);
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve rejeitar quantidade inválida", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 0);
    expect(resultado.erro).toBe("Quantidade inválida");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Não deve encontrar recintos para 10 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 10);
    expect(resultado.erro).toBe("Não há recinto viável");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve encontrar recinto para 1 crocodilo", () => {
    const resultado = new RecintosZoo().analisaRecintos("CROCODILO", 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 4 (espaço livre: 5 total: 8)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test("Deve encontrar três recintos para 2 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 1 (espaço livre: 5 total: 10)"
    );
    expect(resultado.recintosViaveis[1]).toBe(
      "Recinto 2 (espaço livre: 3 total: 5)"
    );
    expect(resultado.recintosViaveis[2]).toBe(
      "Recinto 3 (espaço livre: 2 total: 7)"
    );
    expect(resultado.recintosViaveis.length).toBe(3);
  });

  test("Deve encontrar dois recintos para 5 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 5);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 1 (espaço livre: 2 total: 10)"
    );
    expect(resultado.recintosViaveis[1]).toBe(
      "Recinto 2 (espaço livre: 0 total: 5)"
    );
    //Recinto 3 desconsiderado por espaço extra ocupado (regra 6)
    expect(resultado.recintosViaveis.length).toBe(2);
  });

  test("Deve encontrar dois recintos para 1 macaco", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 1 (espaço livre: 6 total: 10)"
    );
    //Recinto 2 desconsiderado para o macaco não ficar sozinho no recinto (regra 6)
    expect(resultado.recintosViaveis[1]).toBe(
      "Recinto 3 (espaço livre: 3 total: 7)"
    );
    expect(resultado.recintosViaveis.length).toBe(2);
  });

  test("Deve encontrar dois recintos para 1 hipopotamo", () => {
    const resultado = new RecintosZoo().analisaRecintos("hipopotamo", 1);
    expect(resultado.erro).toBeFalsy();
    //Recinto 1 inviável por conter macacos e não ter rio
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 3 (espaço livre: 0 total: 7)"
    );
    expect(resultado.recintosViaveis[1]).toBe(
      "Recinto 4 (espaço livre: 4 total: 8)"
    );
    expect(resultado.recintosViaveis.length).toBe(2);
  });

  test("Deve encontrar um recinto para 2 hipopotamos", () => {
    const resultado = new RecintosZoo().analisaRecintos("hipopotamo", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 4 (espaço livre: 0 total: 8)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test("Deve encontrar um recinto para 2 leões", () => {
    const resultado = new RecintosZoo().analisaRecintos("LEAO", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 5 (espaço livre: 0 total: 9)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test("Não deve encontrar recintos para 2 leopardos", () => {
    const resultado = new RecintosZoo().analisaRecintos("LEOPARDO", 2);
    expect(resultado.erro).toBe("Não há recinto viável");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve encontrar dois recintos para 2 gazelas", () => {
    const resultado = new RecintosZoo().analisaRecintos("GAZELA", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 1 (espaço livre: 2 total: 10)"
    );
    expect(resultado.recintosViaveis[1]).toBe(
      "Recinto 3 (espaço livre: 1 total: 7)"
    );
    //Recinto 5 inviável por conter leões
    expect(resultado.recintosViaveis.length).toBe(2);
  });

  test("Deve encontrar um recinto para 3 elefantes", () => {
    const resultado = new RecintosZoo([
      {
        numero: 6,
        biomas: ["savana", "rio"],
        tamanhoTotal: 20,
        animaisExistentes: [{ especie: "HIPOPOTAMO", quantidade: 1 }],
      },
    ]);
    resultado.analisaRecintos("elefante", 3);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 6 (espaço livre: 0 total: 20)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });
});
