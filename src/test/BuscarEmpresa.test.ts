
import { FakeDataService } from "../../src/services/fake.data.service";
import { EmpresaCriacaoDto } from "../models/empresas/data/entity/Empresa";
import { EmpresaRepository } from "../models/empresas/data/repository/EmpresaRepository";
import { BuscarEmpresaPorCodigoUseCase } from "../models/empresas/domain/BuscarEmpresaPorCodigoUseCase";
import { SalvarEmpresaUseCase } from "../models/empresas/domain/SalvarEmpresaUseCase";

describe("Busca de Empresa", () => {

    let buscarEmpresaPorCodigoUseCase : BuscarEmpresaPorCodigoUseCase; 
    let salvarEmpresaUseCase: SalvarEmpresaUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const empresaRoutes = new EmpresaRepository();
        buscarEmpresaPorCodigoUseCase = new BuscarEmpresaPorCodigoUseCase(empresaRoutes) 
        salvarEmpresaUseCase = new SalvarEmpresaUseCase(empresaRoutes)
        fakeService = FakeDataService();
    })

    it('Buscar empresa por Código', async () => {

        const empresaCriacaoDto: EmpresaCriacaoDto = {
            razaoSocial: fakeService.nome,
            nomeFantasia: fakeService.nome,
            cnpj: fakeService.nome
        }
        const empresa = await salvarEmpresaUseCase.execute(empresaCriacaoDto);

        const empresaBusca = await buscarEmpresaPorCodigoUseCase.execute(empresa.codigo);

        expect(empresaBusca).toBeDefined();
        expect(empresa.codigo).toBe(empresaBusca!.codigo)
        expect(empresa.razaoSocial).toBe(empresaBusca!.razaoSocial)
        expect(empresa.nomeFantasia).toBe(empresaBusca!.nomeFantasia)
        expect(empresa.cnpj).toBe(empresaBusca!.cnpj)
    })

    it('verificar Empresa não encontrada', async () => {

        const codigo = '00'
        const empresaBusca = await buscarEmpresaPorCodigoUseCase.execute(codigo);

        expect(empresaBusca).toBeNull();

    })


})