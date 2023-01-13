"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;
var _typeorm = require("typeorm");
var _specification = require("../entities/specification");
class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_specification.Specification);
  }
  async findByIds(ids) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      description,
      name
    });
    await this.repository.save(specification);
    return specification;
  }
  async findByName(name) {
    const specification = await this.repository.findOne({
      name
    });
    return specification;
  }
}
exports.SpecificationsRepository = SpecificationsRepository;