import { z } from "zod";
import { esquemaCadastroEnderecoEspecialista } from "../schemas/esquemaEspecialista";

export type FormCadastroEnderecoEspecialista = z.infer<typeof esquemaCadastroEnderecoEspecialista>;

export type EnderecoProps = {
  logradouro: string,
  bairro: string,
  localidade: string,
  uf: string
}