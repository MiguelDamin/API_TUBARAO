
import { NextResponse } from 'next/server';

// 1. O Contrato: Definimos os tipos (o formato) de cada tubarão
interface Tubarao {
    id: number;
    nomePopular: string;
    nomeCientifico: string;
    tamanhoMaximoMetros: number;
    habitat: string;
    riscoExtincao: string;
}

// 2. O Banco de Dados "Fake": Nosso array com as informações
const listaDeTubaroes: Tubarao[] = [
    {
        id: 1,
        nomePopular: "Tubarão-Branco",
        nomeCientifico: "Carcharodon carcharias",
        tamanhoMaximoMetros: 6.1,
        habitat: "Águas costeiras temperadas",
        riscoExtincao: "Vulnerável"
    },
    {
        id: 2,
        nomePopular: "Tubarão-Baleia",
        nomeCientifico: "Rhincodon typus",
        tamanhoMaximoMetros: 12.0,
        habitat: "Águas oceânicas tropicais",
        riscoExtincao: "Em Perigo"
    },
    {
        id: 3,
        nomePopular: "Tubarão-Martelo-Grande",
        nomeCientifico: "Sphyrna mokarran",
        tamanhoMaximoMetros: 6.0,
        habitat: "Águas costeiras tropicais e subtropicais",
        riscoExtincao: "Criticamente em Perigo"
    }
];

// 3. O Endpoint: A função que devolve os dados quando a rota é acessada
export async function GET() {
    return NextResponse.json(listaDeTubaroes, {
        status: 200,
        // Liberamos o CORS aqui para o outro grupo conseguir acessar!
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
        },
    });
}