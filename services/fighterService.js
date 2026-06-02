import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  getOneById(id) {
    const item = fighterRepository.getOne({ id });
    if (!item) {
      return null;
    }
    return item;
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  nameExists(name, excludeId = null) {
    const allFighters = fighterRepository.getAll();
    const nameLower = name.toLowerCase();
    return allFighters.some(
      (fighter) =>
        fighter.name.toLowerCase() === nameLower &&
        (!excludeId || fighter.id !== excludeId),
    );
  }


  create(data) {

    if (this.nameExists(data.name)) {
      throw new Error("Fighter name already exists");
    }

    if (data.health === undefined) {
      data.health = 85;
    }

    return fighterRepository.create(data);
  }

  update(id, data) {
    if (data.name && this.nameExists(data.name, id)) {
      throw new Error("Fighter name already exists");
    }

    return fighterRepository.update(id, data);
  }

  delete(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
