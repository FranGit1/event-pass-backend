import { Injectable } from "@nestjs/common";
import { BuyerRepository } from "./buyer.repository";
import { Buyer } from "src/entities/buyer.entity";
import { CreatableBuyer, EditableBuyer } from "./buyer.type";

@Injectable()
export class BuyerService {
  constructor(private readonly buyerRepository: BuyerRepository) {}

  findOne(id: number): Promise<Buyer | null> {
    return this.buyerRepository.findOne(id);
  }

  create(createBuyerDto: CreatableBuyer): Promise<Buyer> {
    return this.buyerRepository.create(createBuyerDto);
  }

  update(id: number, updateBuyerDto: EditableBuyer): Promise<Buyer> {
    return this.buyerRepository.update(id, updateBuyerDto);
  }

  async findBuyerByEmail(email: string): Promise<Buyer | undefined> {
    return this.buyerRepository.findOneByEmail(email);
  }

  remove(id: number): Promise<void> {
    return this.buyerRepository.remove(id);
  }
}
