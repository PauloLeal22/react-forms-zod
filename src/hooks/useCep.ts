import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EnderecoProps, FormCadastroEnderecoEspecialista } from "../types/especialistaTipo";
import { esquemaCadastroEnderecoEspecialista } from "../schemas/esquemaEspecialista";
import { useCallback, useEffect } from "react";

const useCep = () => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormCadastroEnderecoEspecialista>({
        resolver: zodResolver(esquemaCadastroEnderecoEspecialista),
        mode: 'all',
        defaultValues: {
            avatar: new File([''], 'dummy.jpg', { type: 'image/jpeg' }),
            endereco: {
                cep: '',
                rua: '',
                numero: '',
                bairro: '',
                localidade: ''
            }
        }
    });

    const cep = watch('endereco.cep');

    const aoSubmeter = (dados: FormCadastroEnderecoEspecialista) => {
        console.log(dados);
    }

    const handleSetDados = useCallback((dados: EnderecoProps) => {
        setValue('endereco.bairro', dados.bairro);
        setValue('endereco.rua', dados.logradouro);
        setValue('endereco.localidade', `${dados.localidade}, ${dados.uf}`);
    }, [setValue]);

    const buscaEndereco = useCallback(async (cep: string) => {
        const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await result.json();
        handleSetDados(dados);
    }, [handleSetDados]);

    useEffect(() => {
        if (cep.length !== 8) {
            return;
        }

        buscaEndereco(cep);
    }, [cep, buscaEndereco]);

    return {
        handleSubmit,
        register,
        errors,
        aoSubmeter
    }
}

export default useCep;
