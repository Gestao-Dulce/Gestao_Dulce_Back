import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function iniciarTutorial() {
  const d = driver({
    showProgress: true,
    nextBtnText: "Próximo >",
    prevBtnText: "< Anterior",
    doneBtnText: "Concluir 🎉",
    allowClose: true,
    steps: [
      {
        element: "#tour-logo",
        popover: {
          title: "Doces Lucelian 🍬",
          description: "Bem-vindo ao sistema de gestão financeira! Aqui você tem controle total sobre suas receitas, despesas e faturamento.",
          side: "right",
          align: "start"
        }
      },
      {
        element: "#tour-nav",
        popover: {
          title: "Menu de Navegação 🧭",
          description: "Navegue entre o Dashboard, Clientes, Produtos, Vendas, Contas a Pagar e a geração de Etiquetas de envio postal.",
          side: "right",
          align: "start"
        }
      },
      {
        element: "#tour-theme-toggle",
        popover: {
          title: "Alterar Tema 🌓",
          description: "Prefere trabalhar à noite? Alterne facilmente entre o Modo Escuro e o Modo Claro com um único clique.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-ai-chat",
        popover: {
          title: "Lulu — Sua Assistente 🍪",
          description: "Precisa de ajuda ou quer consultar faturamentos e vendas? Clique na Lulu para conversar ou ditar perguntas por voz clicando no microfone!",
          side: "left",
          align: "end"
        }
      }
    ]
  });

  // Se o usuário estiver na tela de Dashboard e as métricas existirem, adicionamos o passo de métricas
  const metricsEl = document.getElementById("tour-metrics");
  if (metricsEl) {
    d.setSteps([
      {
        element: "#tour-logo",
        popover: {
          title: "Doces Lucelian 🍬",
          description: "Bem-vindo ao sistema de gestão financeira! Aqui você tem controle total sobre suas receitas, despesas e faturamento.",
          side: "right",
          align: "start"
        }
      },
      {
        element: "#tour-nav",
        popover: {
          title: "Menu de Navegação 🧭",
          description: "Navegue entre o Dashboard, Clientes, Produtos, Vendas, Contas a Pagar e a geração de Etiquetas de envio postal.",
          side: "right",
          align: "start"
        }
      },
      {
        element: "#tour-metrics",
        popover: {
          title: "Resumo Financeiro 📊",
          description: "Acompanhe de forma resumida o Faturamento Bruto, Contas Pagas, Lucro Líquido e Contas Pendentes do período.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-theme-toggle",
        popover: {
          title: "Alterar Tema 🌓",
          description: "Prefere trabalhar à noite? Alterne facilmente entre o Modo Escuro e o Modo Claro com um único clique.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-ai-chat",
        popover: {
          title: "Lulu — Sua Assistente 🍪",
          description: "Precisa de ajuda ou quer consultar faturamentos e vendas? Clique na Lulu para conversar ou ditar perguntas por voz clicando no microfone!",
          side: "left",
          align: "end"
        }
      }
    ]);
  }

  d.drive();
}
