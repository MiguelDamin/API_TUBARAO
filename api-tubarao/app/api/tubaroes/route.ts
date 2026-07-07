import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        const { data: listaDeTubaroes, error } = await supabase
            .from("tubaroes")
            .select("*");

        if (error) {
            throw error;
        }

        return NextResponse.json(listaDeTubaroes, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });

    } catch (erro) {
        console.error("Erro na rota da API:", erro);
        return NextResponse.json(
            { erro: "Erro ao buscar dados no banco de dados do Supabase." },
            { status: 500 }
        );
    }
}