"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    findOneById(id) {
        return this.repository.findOne({ where: { id: (0, typeorm_1.Equal)(id) } });
    }
    save(entity) {
        return this.repository.save(entity);
    }
    create(entity) {
        return this.repository.create(entity);
    }
    findOne(options) {
        return this.repository.findOne(options);
    }
    async findMany(options) {
        return this.repository.find(options);
    }
    async findManyAndCount(options) {
        return this.repository.findAndCount(options);
    }
    update(filter, entity) {
        return this.repository.update(filter, entity);
    }
    delete(filter) {
        return this.repository.softDelete(filter);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map