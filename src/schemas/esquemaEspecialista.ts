import { z } from "zod";

export const esquemaCadastroEnderecoEspecialista = z.object({
    avatar: z.instanceof(FileList).transform((lista) => lista.item(0)!),
    endereco: z.object({
        cep: z.string().min(8, 'Informe um CEP válido'),
        rua: z.string().min(1, 'Campo obrigatório'),
        numero: z.string().min(1, 'Campo obrigatório'),
        bairro: z.string().min(1, 'Campo obrigatório'),
        localidade: z.string().min(1, 'Campo obrigatório')
    })
});