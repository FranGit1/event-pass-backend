// buyer.repository.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Buyer } from "src/entities/buyer.entity";
import { CreatableBuyer, EditableBuyer } from "./buyer.type";

@Injectable()
export class BuyerRepository {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>
  ) {}

  findOne(id: number): Promise<Buyer | null> {
    return this.buyerRepository.findOne({ where: { id: id } });
  }

  findOneByEmail(email: string): Promise<Buyer | null> {
    return this.buyerRepository.findOne({ where: { email: email } });
  }

  create(createBuyerDto: CreatableBuyer): Promise<Buyer> {
    const buyer = this.buyerRepository.create(createBuyerDto);
    return this.buyerRepository.save(buyer);
  }

  async update(id: number, updateBuyerDto: EditableBuyer): Promise<Buyer> {
    await this.buyerRepository.update(id, updateBuyerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.buyerRepository.delete(id);
  }
}
