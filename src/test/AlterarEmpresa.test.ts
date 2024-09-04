
import { FakeDataService } from "../../src/services/fake.data.service";
import { EmpresaCriacaoDto, EmpresaUpdateDto } from "../models/empresas/data/entity/Empresa";
import { EmpresaRepository } from "../models/empresas/data/repository/EmpresaRepository";
import { AlterarEmpresaUseCase } from "../models/empresas/domain/AlterarUseCase";
import { SalvarEmpresaUseCase } from "../models/empresas/domain/SalvarUseCase";


describe("AlteracaoEmpresaTest", () =>{

    let alterarEmpresaUseCase: AlterarEmpresaUseCase;
    let salvarEmpresaUseCase: SalvarEmpresaUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const empresaRepository = new EmpresaRepository();
        alterarEmpresaUseCase = new AlterarEmpresaUseCase(empresaRepository)
        salvarEmpresaUseCase = new SalvarEmpresaUseCase(empresaRepository)
        fakeService = FakeDataService();
    })

    it('Alterar empresa cadastrada', async () => {

        const empresaCriacaoDto: EmpresaCriacaoDto = {
            razaoSocial: fakeService.nome,
            nomeFantasia: fakeService.nome,
            cnpj: fakeService.nome
        }
        const empresa = await salvarEmpresaUseCase.execute(empresaCriacaoDto);

        const empresaAlterarDto : EmpresaUpdateDto = {
            razaoSocial: fakeService.nome,
            nomeFantasia: "UPDATE EMPRESA",
            cnpj: "UPDATE EMPRESA"
        }

        const empresaUpdate = 
            await alterarEmpresaUseCase.execute(empresa.codigo, empresaAlterarDto);

        expect(empresaUpdate).toBeDefined()
        expect(empresaUpdate.codigo).toBe(empresa.codigo);
        expect(empresaUpdate.razaoSocial).toBe(empresaAlterarDto.razaoSocial);
        expect(empresaUpdate.nomeFantasia).toBe(empresaAlterarDto.nomeFantasia);
        expect(empresaUpdate.cnpj).toBe(empresaAlterarDto.cnpj)
    })

})