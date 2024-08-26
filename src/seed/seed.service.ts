import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.instance';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    try {
      const data = await this.http.get<PokeResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=650',
      );

      const pokemonToInsert: { name: string; no: number }[] = [];

      data.results.forEach(async ({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];

        pokemonToInsert.push({ name, no });
      });

      await this.pokemonModel.insertMany(pokemonToInsert);

      return 'Seed executed';
    } catch (error) {
      this.handleException(error);
    }
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new ConflictException(
        `Pokemon already exists: ${JSON.stringify(error.keyValue)} `,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Cant create pokemon - check logs`);
  }
}
