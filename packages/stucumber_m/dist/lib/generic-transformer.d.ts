import Transformer from './transformer';
import { Feature, Scenario, Rule, RuleDeclaration } from './parser';
export interface GenericTransformerOptions {
    featureFn?: string;
    scenarioFn: string;
    beforeAllFn: string;
    afterAllFn: string;
    preamble?: string;
    getFeatureName?: (feature: Feature) => string;
    getScenarioName?: (feature: Feature, scenario: Scenario) => string;
}
export default class GenericTransformer extends Transformer<any> {
    protected options: GenericTransformerOptions;
    constructor(options: GenericTransformerOptions);
    protected transformFile(filename: string, file: any): string;
    private getContext(name, annotations, includeFeature?);
    protected transformFeature(filename: string, feature: Feature, ruleDeclarations: any, scenarios: any): any;
    protected transformRuleDeclaration(filename: string, feature: Feature, ruleDeclaration: RuleDeclaration, rules: any): any;
    protected transformScenario(filename: string, feature: Feature, scenario: Scenario, rules: any): any;
    protected transformRule(filename: string, feature: Feature, scenario: Scenario, rule: Rule, template?: boolean): any[];
}
