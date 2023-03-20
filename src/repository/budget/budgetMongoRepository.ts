import type BudgetRepository from "./budgetRepository.js";
import { BudgetConverter } from "./entity/converters.js";
import { BudgetModel } from "./models.js";
import { type BudgetId } from "../../domain/budget.js";

export const insertBudget: BudgetRepository["insertBudget"] = async (
  budget
) => {
  const entity = BudgetConverter.toEntity(budget);
  const model = new BudgetModel(entity);
  const saved = await model.save();
  return BudgetConverter.toDomain(saved);
};

export const findBudget: BudgetRepository["findBudget"] = async (
  budgetId: BudgetId
) => {
  const found = await BudgetModel.findOne({ id: budgetId.uuid });
  if (found != null) {
    return BudgetConverter.toDomain(found);
  }
};

export const findBudgets: BudgetRepository["findBudgets"] = async () => {
  const found = await BudgetModel.find();
  return found.map(BudgetConverter.toDomain);
};

const BudgetMongoRepository: () => BudgetRepository = () => ({
  insertBudget,
  findBudget,
  findBudgets,
});

export default BudgetMongoRepository;