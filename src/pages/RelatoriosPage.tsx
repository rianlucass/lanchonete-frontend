
import { useEffect, useState } from "react";
import ReportsDashboard, {
  type ReportsData,
} from "../components/ReportsDashboard";

export default function RelatoriosPage() {
  const [data, setData] = useState<ReportsData | null>(null);

  useEffect(() => {
    

    // Por enquanto: só inicializa com estrutura vazia
    const emptyData: ReportsData = {
      vendasHoje: 0,
      variacaoVendasHoje: 0,
      pedidosHoje: 0,
      ticketMedio: 0,
      produtosAtivos: 0,
      produtosMaisVendidosHoje: [],
      formasPagamentoHoje: [],
      vendasSemana: [],
    };

    setData(emptyData);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF7ED]">
        <span className="text-sm text-slate-500">
          Carregando relatórios...
        </span>
      </div>
    );
  }

  return <ReportsDashboard data={data} />;
}
