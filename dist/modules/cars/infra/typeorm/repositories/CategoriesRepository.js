"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;
var _Category = require("../../typeorm/entities/Category");
var _typeorm = require("typeorm");
class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category);
  }

  /* public static getInstance(): CategoriesRepository {
      
      if(!CategoriesRepository.INSTANCE){
          CategoriesRepository.INSTANCE = new CategoriesRepository();
      }
       return CategoriesRepository.INSTANCE;
  } */

  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      description,
      name
    });
    await this.repository.save(category);
  }
  async list() {
    const categories = await this.repository.find();
    return categories;
  }
  async findByName(name) {
    const category = await this.repository.findOne({
      name
    });
    return category;
  }
}
exports.CategoriesRepository = CategoriesRepository;