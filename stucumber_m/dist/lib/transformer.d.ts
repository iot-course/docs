import { Feature, Scenario, Rule, RuleDeclaration } from './parser';
export default abstract class Transformer<T> {
    protected abstract transformFeature(filename: string, feature: Feature, ruleDeclarations: T[], scenarios: T[]): T;
    protected abstract transformRuleDeclaration(filename: string, feature: Feature, ruleDeclaration: RuleDeclaration, rules: T[]): T;
    protected abstract transformScenario(filename: string, feature: Feature, scenario: Scenario, rules: T[]): T;
    protected abstract transformRule(filename: string, feature: Feature, scenario: Scenario, rule: Rule, template?: boolean): T;
    protected abstract transformFile(filename: string, file: T): string;
    transform(filename: string, source: string): any;
    transform(filename: string, feature: Feature): any;
}
