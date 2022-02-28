import { IPais } from '../interfaces';
export class Pais implements IPais {
    id!: number;
    nome!: string;
    capital!: string;
    regiao!: string;
    subRegiao!: string;
    area!: number;
}
