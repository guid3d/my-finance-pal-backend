import type BudgetSummaryRepository from "../budgetSummaryRepository";
import { BudgetSummaryEntityConverter } from "../entity/converters";
import { BudgetSummary, type BudgetId } from "../../../domain/budget";
import { BudgetSummaryModel } from "./models";
import BudgetSummaryEntity from "../entity/budgetSummaryEntity";

// TODO 2.3 - implement the new "insertBudgetSummary" function

export const findBudgetSummary: BudgetSummaryRepository["find"] = async (
  budgetId: BudgetId,
) => {
  const found = await BudgetSummaryModel.findOne({ id: budgetId.value });
  if (found != null) {
    return BudgetSummaryEntityConverter.toDomain(found);
  }
};

export const insertBudgetSummary: BudgetSummaryRepository["insert"] = async (
  budgetSummary: BudgetSummary,
) => {
  const entity: BudgetSummaryEntity = BudgetSummaryEntityConverter.toEntity(budgetSummary);
  const insertedSummary: BudgetSummaryEntity = await new BudgetSummaryModel(entity).save();
  const insertedBudgetSummary: BudgetSummary = BudgetSummaryEntityConverter.toDomain(insertedSummary);
  return insertedBudgetSummary;
};

const BudgetSummaryMongoRepository = (): BudgetSummaryRepository => ({
  // TODO 2.4. - add the "insertBudgetSummary" function to the repository
  find: findBudgetSummary,
  insert: insertBudgetSummary
});

export default BudgetSummaryMongoRepository;
