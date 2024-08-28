
import { FakeDataService } from "../../src/services/fake.data.service";
import { EmpresaCriacaoDto } from "../models/empresas/data/entity/Empresa";
import { EmpresaRepository } from "../models/empresas/data/repository/EmpresaRepository";
import { SalvarEmpresaUseCase } from "../models/empresas/domain/SalvarUseCase";

describe('SalvarEmpresa', () => {

    let salvarEmpresaUseCase: SalvarEmpresaUseCase;
    let fakeService: any;

    beforeEach(() => {
        const empresaRepository = new EmpresaRepository();
        salvarEmpresaUseCase = new SalvarEmpresaUseCase(empresaRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de nova empresa', async () => {

        const empresaCriacaoDto: EmpresaCriacaoDto = {
            razaoSocial: fakeService.nome,
            nomeFantasia: fakeService.nome,
            cnpj: fakeService.nome
        }

        const empresa = await salvarEmpresaUseCase.execute(empresaCriacaoDto);

        expect(empresa).toBeDefined();
        expect(empresa.codigo).toBeDefined();
        expect(empresaCriacaoDto.razaoSocial).toBe(empresa.razaoSocial);
        expect(empresaCriacaoDto.nomeFantasia).toBe(empresa.nomeFantasia);
        expect(empresaCriacaoDto.cnpj).toBe(empresa.cnpj);

    })

})