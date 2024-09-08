class Animais {
  static biomas = ["savana", "floresta", "rio"];
  static alimentacao = ["carnivoro", "onivoro", "herbivoro"];
  static animais = [
    {
      especie: "LEAO",
      tamanho: 3,
      biomas: ["savana"],
      alimentacao: "carnivoro",
    },
    {
      especie: "LEOPARDO",
      tamanho: 2,
      biomas: ["savana"],
      alimentacao: "carnivoro",
    },
    {
      especie: "CROCODILO",
      tamanho: 3,
      biomas: ["rio"],
      alimentacao: "carnivoro",
    },
    {
      especie: "MACACO",
      tamanho: 1,
      biomas: ["savana", "floresta"],
      alimentacao: "onivoro",
    },
    {
      especie: "GAZELA",
      tamanho: 2,
      biomas: ["savana"],
      alimentacao: "herbivoro",
    },
    {
      especie: "HIPOPOTAMO",
      tamanho: 4,
      biomas: ["savana", "rio"],
      alimentacao: "herbivoro",
    },
  ];

  static obterAnimal(especie) {
    if (typeof especie !== "string" || especie.length < 2) {
      return { erro: "Parâmetro inválido" };
    }

    const animal = this.animais.filter(
      (animal) => animal.especie === especie
    )[0];

    return animal;
  }
}

export { Animais as Animais };
