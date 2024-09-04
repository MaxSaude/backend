
import { FakeDataService } from "../../src/services/fake.data.service";
import { EmpresaCriacaoDto } from "../models/empresas/data/entity/Empresa";
import { EmpresaRepository } from "../models/empresas/data/repository/EmpresaRepository";
import { BuscarEmpresaPorCodigoUseCase } from "../models/empresas/domain/BuscarPorCodigoUseCase";
import { DeletarEmpresaUseCase } from "../models/empresas/domain/DeletarUseCase";
import { SalvarEmpresaUseCase } from "../models/empresas/domain/SalvarUseCase";

describe("DeletarEmpresaTest", () =>{

    let deletarEmpresaUseCase : DeletarEmpresaUseCase;
    let buscarEmpresaPorCodigoUseCase : BuscarEmpresaPorCodigoUseCase;
    let salvarEmpresaUseCase: SalvarEmpresaUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const empresaRepository = new EmpresaRepository();
        deletarEmpresaUseCase = new DeletarEmpresaUseCase(empresaRepository)
        buscarEmpresaPorCodigoUseCase = new BuscarEmpresaPorCodigoUseCase(empresaRepository)
        salvarEmpresaUseCase = new SalvarEmpresaUseCase(empresaRepository)
        fakeService = FakeDataService();
    })

    it('deletar empresa cadastrada', async () => {

        const empresaCriacaoDto: EmpresaCriacaoDto = {
            razaoSocial: fakeService.nome,
            nomeFantasia: fakeService.nome,
            cnpj: fakeService.nome,
        }
        const empresa = await salvarEmpresaUseCase.execute(empresaCriacaoDto);

        expect(empresa).toBeDefined()

        await deletarEmpresaUseCase.execute(empresa.codigo);
        
        const empresaRetorno = await buscarEmpresaPorCodigoUseCase.execute(empresa.razaoSocial);
        expect(empresaRetorno).toBeNull();
    })





})