import type { AnalysisCategoryItem, ProblemType, StepKey } from '../model'

export const AnalysisCategory: Record<ProblemType, AnalysisCategoryItem> = {
  //step1
  goalSetting: { minNormalWeight: 5, stepKey: 'step1' },
  physiology: { minNormalWeight: 3, stepKey: 'step1' },
  anxiety: { minNormalWeight: 4, stepKey: 'step1' },
  burnout: { minNormalWeight: 4, stepKey: 'step1' },
  rigidity: { minNormalWeight: 2, stepKey: 'step1' },
  timeManagement: { minNormalWeight: 4, stepKey: 'step1' },
  motivation: { minNormalWeight: 4, stepKey: 'step1' },
  //step2
  ethicalStandards: { minNormalWeight: 9, stepKey: 'step2' },
  appearance: { minNormalWeight: 9, stepKey: 'step2' },
  manners: { minNormalWeight: 9, stepKey: 'step2' },
  communication: { minNormalWeight: 9, stepKey: 'step2' },
  //step3
  externalCareer: { minNormalWeight: 14, stepKey: 'step3' },
  internalCareer: { minNormalWeight: 14, stepKey: 'step3' },
  careerSpace: { minNormalWeight: 9, stepKey: 'step3' },
}

export const AnalysisStep: Record<StepKey, { minNormalWeight: number }> = {
  step1: { minNormalWeight: 26 },
  step2: { minNormalWeight: 36 },
  step3: { minNormalWeight: 38 },
}
