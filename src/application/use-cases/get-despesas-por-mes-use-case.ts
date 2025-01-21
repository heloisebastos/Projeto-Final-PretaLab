import { DespesaRepository } from '../repositores/depesa-repository';
import { Despesa } from '../../domain/despesa';

export class GetDespesasPorMesUseCase {
    constructor(private despesaRepository: DespesaRepository) { }

    async execute(month: number, year: number, userId: string): Promise<{
        totalGanhos: number,
        totalDespesas: number,
        saldoTotal: number,
        despesas: Despesa[]
    }> {
        const despesas = await this.despesaRepository.findByMonthAndUserId(month, year, userId);

        const totalGanhos = despesas
            .filter(despesa => despesa.tipo === 'ganho')
            .reduce((acc, despesa) => acc + despesa.valor, 0);

        const totalDespesas = despesas
            .filter(despesa => despesa.tipo === 'despesa')
            .reduce((acc, despesa) => acc + despesa.valor, 0);

        const saldoTotal = totalGanhos - totalDespesas;

        return {
            totalGanhos,
            totalDespesas,
            saldoTotal,
            despesas
        };
    }
}
