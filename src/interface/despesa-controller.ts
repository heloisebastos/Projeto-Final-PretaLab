import { Request, Response } from 'express';
import { CreateDespesaUseCase } from '../application/use-cases/create-despesa-use-case';
import { GetDespesasByUserUseCase } from '../application/use-cases/get-despesas-by-user-use-case';
import { Despesa } from '../domain/despesa';
import { GetDespesasPorMesUseCase } from '../application/use-cases/get-despesas-por-mes-use-case';

export class DespesaController {
    constructor(
        private createDespesaUseCase: CreateDespesaUseCase,
        private getDespesasByUserUseCase: GetDespesasByUserUseCase,
        private getDespesasPorMesUseCase: GetDespesasPorMesUseCase

    ) { }

    create(req: Request, res: Response) {
        const params: Despesa = req.body;
        const despesa = this.createDespesaUseCase.execute(params);
        res.status(201).json(despesa);
    }

    async getAll(req: Request, res: Response) {
        const userId = req.params.userId;
        const despesas = await this.getDespesasByUserUseCase.execute(userId);
        res.json(despesas);
    }

    async findByMonth(req: Request, res: Response): Promise<void> {
        const { month, year, userId } = req.query;

        try {
            const result = await this.getDespesasPorMesUseCase.execute(
                Number(month),
                Number(year),
                String(userId)
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }



}
