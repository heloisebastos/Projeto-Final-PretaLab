import { RepositoryData } from '../database/repository';
import { CreateDespesaUseCase } from '../../application/use-cases/create-despesa-use-case';
import { GetDespesasByUserUseCase } from '../../application/use-cases/get-despesas-by-user-use-case';
import { DespesaController } from '../../interface/despesa-controller';
// import { RepositoryAI } from '../genai/repository';
// import { ChatController } from '../../interface/chat-controller';
// import { CreateChatUseCase } from '../../application/use-cases/create-chat-use-case';

export function configureDependencies() {

    const repositoryData = new RepositoryData();
    const createDespesaUseCase = new CreateDespesaUseCase(repositoryData);
    const getDespesasByUserUseCase = new GetDespesasByUserUseCase(repositoryData);
    const despesaController = new DespesaController(createDespesaUseCase, getDespesasByUserUseCase)

    return { despesaController }
} 