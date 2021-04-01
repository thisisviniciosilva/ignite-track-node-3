import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // TODO Complete this method using QUERY BUILDER

    return this.repository.createQueryBuilder();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // TODO Complete this method using RAW QUERY

    return this.repository.query();
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // TODO Complete this method using QUERY BUILDER

    return this.repository.createQueryBuilder();
  }
}
