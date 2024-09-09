import { Recintos } from "./recintos.js";

class RecintosZoo extends Recintos {
  constructor(recintos) {
    super(recintos);
    this.erro = "";
    this.recintosViaveis = [];
  }

  analisaRecintos(especie, quantidade) {
    const animal = this.validarParametrosEntrada(especie, quantidade);

    if (!animal) return { erro: this.erro };
    console.log(`Animal obtido:`, animal);

    const recintos = this.obterRecintoPorTipo(animal, quantidade);

    if (recintos.length === 0) {
      this.erro = "Não há recinto viável";
      return { erro: this.erro };
    }

    const recintosViaveis = this.obterRecintosViaveis(
      recintos,
      animal,
      quantidade
    );

    if (recintosViaveis.length === 0) {
      this.erro = "Não há recinto viável";
      return { erro: this.erro };
    }

    this.recintosViaveis = recintosViaveis;
    return { recintosViaveis };
  }

  validarParametrosEntrada(especie, quantidade, numeroRecinto) {
    if (
      typeof especie !== "string" ||
      especie.length < 2 ||
      typeof quantidade !== "number"
    ) {
      this.erro = "Parâmetro(s) inválido(s)";
      return false;
    }

    const nomeDaEspecieEmMaiusculo = especie.toUpperCase();
    const animal = Recintos.obterAnimal(nomeDaEspecieEmMaiusculo);

    if (!animal) {
      this.erro = "Animal inválido";
      return false;
    }

    if (quantidade <= 0) {
      this.erro = "Quantidade inválida";
      return false;
    }

    if (
      numeroRecinto !== undefined &&
      (numeroRecinto <= 0 ||
        numeroRecinto >
          this.recintosExistentes[this.recintosExistentes.length - 1].numero)
    ) {
      this.erro = "Número do recinto inválido";
      return false;
    }

    return animal;
  }

  adicionarAnimalEmRecinto(especie, quantidade, numeroRecinto) {
    const animal = this.validarParametrosEntrada(
      especie,
      quantidade,
      numeroRecinto
    );

    if (!animal) return { erro: this.erro };

    this.analisaRecintos(especie, quantidade);

    if (
      !this.recintosViaveis.find(
        ({ recinto }) => recinto.numero === numeroRecinto
      )
    ) {
      this.erro = `Recinto ${numeroRecinto} não é viável`;
      return { erro: this.erro };
    }

    const recintosAtualizados = this.recintosExistentes.map((recinto) => {
      if (recinto.numero === numeroRecinto) {
        recinto.animaisExistentes.push({
          especie: animal.especie,
          quantidade,
        });
      }
      return recinto;
    });

    this.recintosExistentes = recintosAtualizados;
    return {
      sucesso: `${quantidade} ${animal.especie}(s) adicionado(s) ao recinto ${numeroRecinto}`,
    };
  }
}

export { RecintosZoo as RecintosZoo };

const resultado = new RecintosZoo();
// console.log(resultado.analisaRecintos("Leao", 1));
// console.log(resultado.analisaRecintos("CROCODILO", 1));
// console.log(resultado.analisaRecintos("ELEFANTE", 1));
console.log(resultado.analisaRecintos("HIPOPOTAMO", 1));
console.log(resultado.adicionarAnimalEmRecinto("HIPOPOTAMO", 1, 4));
console.log(resultado.recintosExistentes[3]);
// console.clear();
// console.log(resultado.analisaRecintos("MACACO", 2));
