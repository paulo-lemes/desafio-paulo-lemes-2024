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
      if (recinto.numero !== numeroRecinto) return recinto;

      const indexAnimal = recinto.animaisExistentes.findIndex(
        ({ especie }) => especie === animal.especie
      );

      const recintoAtualizado = { ...recinto };
      const animaisAtualizados = [...recinto.animaisExistentes];

      if (indexAnimal === -1) {
        animaisAtualizados.push({
          especie: animal.especie,
          quantidade,
        });
      } else {
        const quantidadeAnimal = animaisAtualizados[indexAnimal].quantidade;
        animaisAtualizados[indexAnimal] = {
          ...animaisAtualizados[indexAnimal],
          quantidade: quantidadeAnimal + quantidade,
        };
      }

      recintoAtualizado.animaisExistentes = animaisAtualizados;
      return recintoAtualizado;
    });

    this.recintosExistentes = recintosAtualizados;
    return {
      sucesso: `${animal.especie} - ${quantidade} adicionado(s) ao recinto ${numeroRecinto}`,
      recintoAtualizado: this.recintosExistentes[numeroRecinto - 1],
    };
  }

  removerAnimalDeRecinto(especie, quantidade, numeroRecinto) {
    const animal = this.validarParametrosEntrada(
      especie,
      quantidade,
      numeroRecinto
    );

    if (!animal) return { erro: this.erro };

    this.erro = "";

    const recintosAtualizados = this.recintosExistentes.map((recinto) => {
      if (recinto.numero !== numeroRecinto) return recinto;

      const indexAnimal = recinto.animaisExistentes.findIndex(
        ({ especie }) => especie === animal.especie
      );

      if (
        indexAnimal === -1 ||
        recinto.animaisExistentes[indexAnimal].quantidade < quantidade
      ) {
        this.erro = `Não há ${especie} suficiente no recinto ${numeroRecinto}`;
        return recinto;
      }

      const recintoAtualizado = { ...recinto };
      const animaisAtualizados = [...recinto.animaisExistentes];

      const quantidadeAnimal = animaisAtualizados[indexAnimal].quantidade;

      if (quantidadeAnimal > quantidade) {
        animaisAtualizados[indexAnimal] = {
          ...animaisAtualizados[indexAnimal],
          quantidade: quantidadeAnimal - quantidade,
        };
      } else {
        animaisAtualizados.splice(indexAnimal, 1);
      }

      recintoAtualizado.animaisExistentes = animaisAtualizados;
      return recintoAtualizado;
    });

    if (this.erro) {
      return {
        erro: this.erro,
        recinto: this.recintosExistentes[numeroRecinto - 1],
      };
    }

    this.recintosExistentes = recintosAtualizados;
    return {
      sucesso: `${animal.especie} - ${quantidade} removido(s) do recinto ${numeroRecinto}`,
      recintoAtualizado: this.recintosExistentes[numeroRecinto - 1],
    };
  }
}

export { RecintosZoo as RecintosZoo };
