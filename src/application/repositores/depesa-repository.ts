import { Despesa } from '../../domain/despesa';

export interface DespesaRepository {
    save(despesa: Despesa): Promise<void>;
    findAll(): Promise<Despesa[]>;
    findByMonthAndUserId(month: number, year: number, userId: string): Promise<Despesa[]>;

}