import {  Injectable } from "@nestjs/common";
import { UserLogsRepository } from "./user-logs.repository";
import { Buyer } from "src/entities/buyer.entity";
import {UserLogsEvent} from "../../shared/enums/UserLogsEvent";
import {Organizer} from "../../entities/organizer.entity";

@Injectable()
export class UserLogsService {
  constructor(
    private readonly userLogsRepository: UserLogsRepository
  ) {}

  async createBuyerEvent(buyer: Buyer, event: UserLogsEvent) {
    await this.userLogsRepository.save({
      event: event,
      buyer: buyer,
    });
    if (event === UserLogsEvent.LOGIN_FAILED) {
      const isUserAccountBlocked = await this.isUserAccountBlocked(
        buyer.id,
        true
      );
      if (isUserAccountBlocked) {

      }
    }
  }

  createOrganizerEvent(organizer: Organizer, event: UserLogsEvent) {
    return this.userLogsRepository.save({
      event: event,
      organizer: organizer,
    });
  }

  async isUserAccountBlocked(id: number, isBuyer: boolean): Promise<boolean> {
    const MAX_FAILED_LOGIN_ATTEMPTS = 3;
    const lastLogins = await this.userLogsRepository.findLastLogins(
      id,
      isBuyer
    );
    if (lastLogins.length < MAX_FAILED_LOGIN_ATTEMPTS) {
      return false;
    } else {
      for (let i = 0; i < MAX_FAILED_LOGIN_ATTEMPTS; i++) {
        if (lastLogins[i].event !== UserLogsEvent.LOGIN_FAILED) {
          return false;
        }
      }
      return true;
    }
  }
}
