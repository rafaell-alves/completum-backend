import { randomUUID } from 'node:crypto';
import { CharacterCreate } from '../http/dto/character';
import { ChampionData } from './interfaces/IChampionData';
import { ItemCreate } from '../http/dto/item';
import ItemRepository from '../http/repositories/ItemRepository';
import { ItemData } from './interfaces/IItemData';
import axios from 'axios';
import CharacterRepository from '../http/repositories/CharacterRepository';
import { Prisma } from '@prisma/client';

export default class SeedCharacter {
  async seedChampions(): Promise<ChampionData> {
    try {
      console.log('Buscando campeões da API do League of Legends...');

      // Obter lista geral de campeões
      const response = await axios.get(
        'https://ddragon.leagueoflegends.com/cdn/15.11.1/data/pt_BR/champion.json',
      );

      // Extrair dados da resposta do axios
      const data = response.data as ChampionData;

      console.log(
        'Dados recebidos:',
        Object.keys(data.data).length,
        'campeões encontrados',
      );

      // Criar instância do repositório
      const characterRepository = new CharacterRepository();

      // Obter lista de campeões
      const champions = Object.keys(data.data);

      // Usar map + Promise.all para processamento assíncrono
      const createPromises = champions.map(async champion => {
        try {
          // Buscar detalhes do campeão específico
          console.log(`Buscando detalhes do campeão: ${champion}`);
          const championDetailUrl = `https://ddragon.leagueoflegends.com/cdn/15.11.1/data/pt_BR/champion/${champion}.json`;
          const championDetailResponse = await axios.get(championDetailUrl);
          const championDetail = championDetailResponse.data.data[champion];

          console.log(championDetail);
          // Criar DTO com dados mais completos
          let dto: CharacterCreate = {
            uuid: randomUUID(),
            name: championDetail.name,
            // Usar lore completa do detalhe, mas ainda truncando para o limite do banco
            lore: championDetail.lore,
          };

          // Definir galeria de imagens (agora podemos incluir skins)
          const images = {
            icon: `https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${champion}.png`,
            loading: [
              `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`,
            ],
            splash_art: [
              `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`,
            ],
          };
          // Adicionar imagens de skins se disponíveis
          if (championDetail.skins) {
            championDetail.skins.forEach(skin => {
              if (skin.num > 0) {
                // Ignora a skin padrão (num 0)
                images.loading.push(
                  `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_${skin.num}.jpg`,
                );
                images.splash_art.push(
                  `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${skin.num}.jpg`,
                );
              }
            });
          }

          dto.gallery = images as Prisma.JsonObject;

          console.log(`Salvando campeão: ${champion}`);
          await characterRepository.create(dto);
          console.log(`Campeão salvo: ${champion}, Nome: ${dto.name}`);
        } catch (error) {
          console.error(`Erro ao processar o campeão ${champion}:`, error);
          // Continua para o próximo campeão
        }
      });

      // Aguardar todas as operações de criação
      await Promise.all(createPromises);
      console.log('Todos os campeões foram salvos no banco de dados!');

      return data;
    } catch (error) {
      console.error('Erro ao processar seed:', error);
      throw error;
    }
  }

  async seedItems(): Promise<ItemData> {
    try {
      console.log('Fetching items from League of Legends API');
      const response = await fetch(
        'https://ddragon.leagueoflegends.com/cdn/15.11.1/data/pt_BR/item.json',
      );

      const data: ItemData = (await response.json()) as ItemData;
      console.log(
        'Dados recebidos:',
        Object.keys(data.data).length,
        'Itens encontrados',
      );

      const itemRepository = new ItemRepository();
      const items = Object.keys(data.data);
      const createPromises = items.map(async item => {
        let dataItem: ItemCreate = {
          uuid: randomUUID(),
          name: data.data[item].name,
          description: data.data[item].plaintext,
          photo: `https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${data.data[item].image.full}`,
        };

        console.log(`Salvando campeão: ${data.data[item].name}`);
        // Agora com await

        await itemRepository.create(dataItem);
        console.log(`Item salvo: ${item}, Nome: ${data.data[item].name}`);
      });

      await Promise.all(createPromises);
      return data;
    } catch (error) {
      console.error('Erro ao processar seed:', error);
      throw error;
    }
  }
}
