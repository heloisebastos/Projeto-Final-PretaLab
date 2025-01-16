import { DespesaRepository } from '../../application/repositores/depesa-repository'
import { Despesa } from '../../domain/despesa';
import { DespesaModel } from './model';

export class RepositoryData implements DespesaRepository {
    async save(despesa: Despesa): Promise<void> {
        const despesaModel = new DespesaModel(despesa);
        await despesaModel.save();
    }

    async findAll(): Promise<Despesa[]> {
        const despesa = await DespesaModel.find()
        const translatedDespesas = despesa.map(item => {
            return {
                id: item._id.toString(),
                descricao: item.descricao,
                valor: item.valor,
                tipo: item.tipo,
                data: item.data,
                userId: item.userId,
                categoria: item.categoria

            }
        }) as Despesa[];

        return translatedDespesas;

    }


}