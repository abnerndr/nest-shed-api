import { PLAN_BASIC, PLAN_PRO } from 'src/utils/constants/stripe';

export const selectPlan = async (type: 'pro' | 'basic') => {
  let plan: string;
  switch (type) {
    case 'basic':
      plan = PLAN_BASIC;
      break;
    case 'pro':
      plan = PLAN_PRO;
      break;
    default:
      plan = PLAN_BASIC;
      break;
  }
  return plan;
};
