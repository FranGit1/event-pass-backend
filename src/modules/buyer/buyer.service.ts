import { Injectable } from "@nestjs/common";
import { BuyerRepository } from "./buyer.repository";
import { Buyer } from "src/entities/buyer.entity";
import { CreatableBuyer, EditableBuyer } from "./buyer.type";
import {Event} from "../../entities/event.entity";

@Injectable()
export class BuyerService {
  constructor(private readonly buyerRepository: BuyerRepository) {}

  findOne(id: number): Promise<Buyer | null> {
    return this.buyerRepository.findOne(id);
  }
  findOneWithFav(id: number): Promise<Buyer | null> {
    return this.buyerRepository.findOneWithFav(id);
  }

  create(createBuyerDto: CreatableBuyer): Promise<Buyer> {
    return this.buyerRepository.create(createBuyerDto);
  }

  update(id: number, updateBuyerDto: EditableBuyer): Promise<Buyer> {
    return this.buyerRepository.update(id, updateBuyerDto);
  }

  save(buyer:Buyer): Promise<Buyer> {
    return this.buyerRepository.save(buyer);
  }

  async findBuyerByEmail(email: string): Promise<Buyer | undefined> {
    return this.buyerRepository.findOneByEmail(email);
  }


  async getFavoritesEventsBuBuyer(buyerId: number): Promise<Event[] | undefined> {
    const buyer = await this.buyerRepository.findOneWithFav(buyerId);
    return buyer.favoriteEvents;
  }


  remove(id: number): Promise<void> {
    return this.buyerRepository.remove(id);
  }
}
