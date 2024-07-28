import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/shared/base/base.repository";
import {  In, Repository,  } from "typeorm";
import { CreatableUserLogs, EditableUserLogs } from "./user-logs.types";
import {UserLogsEntity} from "../../entities/userLogs.entity";
import {UserLogsEvent} from "../../shared/enums/UserLogsEvent";

@Injectable()
export class UserLogsRepository extends BaseRepository<
  UserLogsEntity,
  CreatableUserLogs,
  EditableUserLogs
> {
  constructor(
    @InjectRepository(UserLogsEntity)
    private readonly userLogsRepository: Repository<UserLogsEntity>
  ) {
    super(userLogsRepository);
  }

  findLastLogins(id: number, isBuyer: boolean) {
    const whereClause = isBuyer
      ? {
          buyer: {
            id: id,
          },
          event: In([
            UserLogsEvent.LOGIN_SUCCESSFUL,
            UserLogsEvent.LOGIN_FAILED,
          ]),
        }
      : {
          organizer: {
            id: id,
          },
          event: In([
            UserLogsEvent.LOGIN_SUCCESSFUL,
            UserLogsEvent.LOGIN_FAILED,
          ]),
        };
    return this.userLogsRepository.find({
      where: whereClause,
      order: { createdAt: "DESC" },
    });
  }
}
