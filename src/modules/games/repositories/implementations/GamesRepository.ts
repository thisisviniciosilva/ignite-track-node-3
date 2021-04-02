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
    const games = await this.repository
      .createQueryBuilder("games")
      .where("LOWER(games.title) like LOWER(:param)", { param: `%${param}%` })
      .getMany();

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const queryText = "SELECT COUNT(*) FROM games";

    return this.repository.query(queryText);
  }

  async findUsersByGameId(id: string): Promise<User[] | undefined> {
    const game = await this.repository
      .createQueryBuilder("games")
      .leftJoinAndSelect("games.users", "users")
      .where("games.id = :id", { id })
      .getOne();

    const users = game?.users;

    return users;
  }
}
