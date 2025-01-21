import { Request, Response } from 'express';
import { CreateDespesaUseCase } from '../application/use-cases/create-despesa-use-case';
import { GetDespesasByUserUseCase } from '../application/use-cases/get-despesas-by-user-use-case';
import { Despesa } from '../domain/despesa';
import { GetDespesasPorMesUseCase } from '../application/use-cases/get-despesas-por-mes-use-case';

export class DespesaController {
    constructor(
        private createDespesaUseCase: CreateDespesaUseCase,
        private getDespesaByUserUseCase: GetDespesasByUserUseCase,
        private getDespesasPorMesUseCase: GetDespesasPorMesUseCase

    ) { }

    create(req: Request, res: Response) {
        try {
            const params: Despesa = req.body;
            const despesa = this.createDespesaUseCase.execute(params);
            res.status(201).json(despesa);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }


    }

    async findAll(req: Request, res: Response) {
        const userId = req.params.userId;
        const despesa = await this.getDespesaByUserUseCase.execute(userId)
        res.status(200).json(despesa);
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
