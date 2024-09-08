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
}

export { Animais as Animais };
