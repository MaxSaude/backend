
import { FakeDataService } from "../../services/fake.data.service";
import { EmpresaCriacaoDto, EmpresaUpdateDto } from "../../models/empresas/data/entity/Empresa";
import { EmpresaRepository } from "../../models/empresas/data/repository/EmpresaRepository";
import { AlterarEmpresaUseCase } from "../../models/empresas/domain/AlterarUseCase";
import { SalvarEmpresaUseCase } from "../../models/empresas/domain/SalvarUseCase";
import prisma from "../../config/database";


describe("AlteracaoEmpresaTest", () =>{

    let alterarEmpresaUseCase: AlterarEmpresaUseCase;
    let salvarEmpresaUseCase: SalvarEmpresaUseCase; 
    let fakeService: any;

    beforeEach(async ()=>{
        const empresaRepository = new EmpresaRepository();
        alterarEmpresaUseCase = new AlterarEmpresaUseCase(empresaRepository);
        salvarEmpresaUseCase = new SalvarEmpresaUseCase(empresaRepository);
        fakeService = FakeDataService();

        await prisma.empresa.deleteMany();
    })

    it('Alterar empresa cadastrada', async () => {

        const empresaCriacaoDto: EmpresaCriacaoDto = {
            razaoSocial: fakeService.nome,
            nomeFantasia: fakeService.nome,
            cnpj: fakeService.nome,
            telefone: fakeService.nome,
            cidade: fakeService.nome,
            bairro: fakeService.nome,
            estado: fakeService.nome, 
            endereco: fakeService.nome,
            numero: fakeService.nome,
            complemento: fakeService.nome,
        }
        const empresa = await salvarEmpresaUseCase.execute(empresaCriacaoDto);

        const empresaAlterarDto : EmpresaUpdateDto = {
            razaoSocial: fakeService.nome,
            nomeFantasia: "UPDATE EMPRESA",
            cnpj: "UPDATE EMPRESA",
            telefone: "UPDATE EMPRESA",
            cidade: "UPDATE EMPRESA",
            bairro: "UPDATE EMPRESA",
            estado: "UPDATE EMPRESA",
            endereco: "UPDATE EMPRESA",
            numero: "UPDATE EMPRESA",
            complemento: "UPDATE EMPRESA",
        }

        const empresaUpdate = 
            await alterarEmpresaUseCase.execute(empresa.codigo, empresaAlterarDto);

        expect(empresaUpdate).toBeDefined()
        expect(empresaUpdate.codigo).toBe(empresa.codigo);
        expect(empresaUpdate.razaoSocial).toBe(empresaAlterarDto.razaoSocial);
        expect(empresaUpdate.nomeFantasia).toBe(empresaAlterarDto.nomeFantasia);
        expect(empresaUpdate.cnpj).toBe(empresaAlterarDto.cnpj);
        expect(empresaUpdate.telefone).toBe(empresaAlterarDto.telefone);
        expect(empresaUpdate.cidade).toBe(empresaAlterarDto.cidade);
        expect(empresaUpdate.bairro).toBe(empresaAlterarDto.bairro);
        expect(empresaUpdate.estado).toBe(empresaAlterarDto.estado);
        expect(empresaUpdate.endereco).toBe(empresaAlterarDto.endereco);
        expect(empresaUpdate.numero).toBe(empresaAlterarDto.numero);
        expect(empresaUpdate.complemento).toBe(empresaAlterarDto.complemento);
    })

})