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
    expect(resultado.recintosViaveis[0].info).toBe(
      "Recinto 4 (espaço livre: 5 total: 8)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test("Deve encontrar três recintos para 2 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0].info).toBe(
      "Recinto 1 (espaço livre: 5 total: 10)"
    );
    expect(resultado.recintosViaveis[1].info).toBe(
      "Recinto 2 (espaço livre: 3 total: 5)"
    );
    expect(resultado.recintosViaveis[2].info).toBe(
      "Recinto 3 (espaço livre: 2 total: 7)"
    );
    expect(resultado.recintosViaveis.length).toBe(3);
  });

  test("Deve encontrar dois recintos para 5 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 5);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0].info).toBe(
      "Recinto 1 (espaço livre: 2 total: 10)"
    );
    expect(resultado.recintosViaveis[1].info).toBe(
      "Recinto 2 (espaço livre: 0 total: 5)"
    );
    //Recinto 3 desconsiderado por espaço extra ocupado (regra 6)
    expect(resultado.recintosViaveis.length).toBe(2);
  });

  test("Deve encontrar dois recintos para 1 macaco", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0].info).toBe(
      "Recinto 1 (espaço livre: 6 total: 10)"
    );
    //Recinto 2 desconsiderado para o macaco não ficar sozinho no recinto (regra 6)
    expect(resultado.recintosViaveis[1].info).toBe(
      "Recinto 3 (espaço livre: 3 total: 7)"
    );
    expect(resultado.recintosViaveis.length).toBe(2);
  });

  test("Deve encontrar dois recintos para 1 hipopotamo", () => {
    const resultado = new RecintosZoo().analisaRecintos("hipopotamo", 1);
    expect(resultado.erro).toBeFalsy();
    //Recinto 1 inviável por conter macacos e não ter rio
    expect(resultado.recintosViaveis[0].info).toBe(
      "Recinto 3 (espaço livre: 0 total: 7)"
    );
    expect(resultado.recintosViaveis[1].info).toBe(
      "Recinto 4 (espaço livre: 4 total: 8)"
    );
    expect(resultado.recintosViaveis.length).toBe(2);
  });

  test("Deve encontrar um recinto para 2 hipopotamos", () => {
    const resultado = new RecintosZoo().analisaRecintos("hipopotamo", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0].info).toBe(
      "Recinto 4 (espaço livre: 0 total: 8)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test("Deve encontrar um recinto para 2 leões", () => {
    const resultado = new RecintosZoo().analisaRecintos("LEAO", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0].info).toBe(
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
    expect(resultado.recintosViaveis[0].info).toBe(
      "Recinto 1 (espaço livre: 2 total: 10)"
    );
    expect(resultado.recintosViaveis[1].info).toBe(
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
    expect(resultado.recintosViaveis[0].info).toBe(
      "Recinto 6 (espaço livre: 0 total: 20)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  //Testes adicionarAnimalEmRecinto()

  test("Deve rejeitar número de recinto inválido para adicionar animal", () => {
    const resultado = new RecintosZoo();
    resultado.adicionarAnimalEmRecinto("hipopotamo", 1, 0);
    expect(resultado.erro).toBe("Número do recinto inválido");
    resultado.adicionarAnimalEmRecinto("hipopotamo", 1, 7);
    expect(resultado.erro).toBe("Número do recinto inválido");
  });

  test("Deve rejeitar número de recinto inviável para adicionar animal", () => {
    const resultado = new RecintosZoo();
    resultado.adicionarAnimalEmRecinto("hipopotamo", 1, 1);
    expect(resultado.erro).toBe("Recinto 1 não é viável");
  });

  test("Deve adicionar animal em recinto viável", () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.adicionarAnimalEmRecinto("macaco", 3, 1);
    expect(zoo.erro).toBeFalsy();
    expect(resultado.sucesso).toBe("MACACO - 3 adicionado(s) ao recinto 1");
    expect(zoo.recintosExistentes[0].animaisExistentes[0].especie).toBe(
      "MACACO"
    );
    expect(zoo.recintosExistentes[0].animaisExistentes[0].quantidade).toBe(6);
  });

  test("Deve adicionar animal de diferente espécie em recinto viável", () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.adicionarAnimalEmRecinto("gazela", 2, 1);
    expect(zoo.erro).toBeFalsy();
    expect(resultado.sucesso).toBe("GAZELA - 2 adicionado(s) ao recinto 1");
    expect(resultado.recintoAtualizado.animaisExistentes.length).toBe(2);
    expect(zoo.recintosExistentes[0].animaisExistentes[0].especie).toBe(
      "MACACO"
    );
    expect(zoo.recintosExistentes[0].animaisExistentes[0].quantidade).toBe(3);
    expect(zoo.recintosExistentes[0].animaisExistentes[1].especie).toBe(
      "GAZELA"
    );
    expect(zoo.recintosExistentes[0].animaisExistentes[1].quantidade).toBe(2);
  });

  //Testes removerAnimalDeRecinto()

  test("Deve rejeitar número de recinto inválido para remover animal", () => {
    const resultado = new RecintosZoo();
    resultado.removerAnimalDeRecinto("hipopotamo", 1, 0);
    expect(resultado.erro).toBe("Número do recinto inválido");
    resultado.removerAnimalDeRecinto("hipopotamo", 1, 7);
    expect(resultado.erro).toBe("Número do recinto inválido");
  });

  test("Não deve remover animal inexistente em recinto", () => {
    const resultado = new RecintosZoo();
    resultado.removerAnimalDeRecinto("macaco", 3, 2);
    expect(resultado.erro).toBe("Não há macaco suficiente no recinto 2");
  });

  test("Deve remover quantidade de animal em recinto", () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.removerAnimalDeRecinto("macaco", 2, 1);
    expect(zoo.erro).toBeFalsy();
    expect(resultado.sucesso).toBe("MACACO - 2 removido(s) do recinto 1");
  });

  test("Deve remover animal de recinto", () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.removerAnimalDeRecinto("macaco", 3, 1);
    expect(zoo.erro).toBeFalsy();
    expect(resultado.sucesso).toBe("MACACO - 3 removido(s) do recinto 1");
  });
});
