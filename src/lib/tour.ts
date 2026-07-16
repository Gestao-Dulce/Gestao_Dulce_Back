import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function iniciarTutorial() {
  const path = window.location.pathname;
  let steps: any[] = [];

  // 1. Passo inicial comum a todas as telas (Menu de Navegação)
  const stepNav = {
    element: "#tour-nav",
    popover: {
      title: "Menu de Navegação 🧭",
      description: "Aqui você navega entre as telas do sistema para gerenciar Clientes, Vendas, Produtos, Contas e Etiquetas.",
      side: "right",
      align: "start"
    }
  };

  // 2. Passo final comum a todas as telas (Lulu IA)
  const stepLulu = {
    element: "#tour-ai-chat",
    popover: {
      title: "Lulu — Sua Assistente 🍪",
      description: "Precisa de ajuda com relatórios ou quer tirar dúvidas sobre faturamento e dados? Converse com a Lulu, nossa inteligência artificial!",
      side: "left",
      align: "end"
    }
  };

  // 3. Define os passos específicos com base no caminho atual (pathname)
  if (path === "/" || path === "/dashboard") {
    steps = [
      {
        element: "#tour-logo",
        popover: {
          title: "Dashboard da Doces Lucelian 🍬",
          description: "Bem-vindo ao seu painel financeiro geral! Este é o ponto central para acompanhar a saúde da sua fábrica de doces.",
          side: "right",
          align: "start"
        }
      },
      stepNav,
      {
        element: "#tour-metrics",
        popover: {
          title: "Painel de Resumo Financeiro 📊",
          description: "Acompanhe de forma consolidada o Faturamento Bruto, Contas Pagas, Lucro Líquido e Contas Pendentes do período.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-theme-toggle",
        popover: {
          title: "Modo Escuro / Claro 🌓",
          description: "Clique aqui para mudar o visual do sistema entre o modo escuro e claro de forma instantânea.",
          side: "bottom",
          align: "center"
        }
      },
      stepLulu
    ];
  } else if (path.startsWith("/clientes")) {
    steps = [
      stepNav,
      {
        element: "#tour-clientes-add",
        popover: {
          title: "Novo Cliente 👤",
          description: "Clique aqui para cadastrar novos clientes, preenchendo dados de contato, documento e o endereço completo para envio.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-clientes-search",
        popover: {
          title: "Busca de Clientes 🔍",
          description: "Digite o nome do cliente ou o documento (CPF/CNPJ) para filtrar a lista instantaneamente.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "#tour-clientes-table",
        popover: {
          title: "Tabela de Clientes 📋",
          description: "Acompanhe todos os clientes cadastrados, o status financeiro de suas pendências (em dia, pendente ou atrasado) e o total comprado.",
          side: "top",
          align: "center"
        }
      },
      stepLulu
    ];
  } else if (path.startsWith("/produtos")) {
    steps = [
      stepNav,
      {
        element: "#tour-produtos-add",
        popover: {
          title: "Novo Produto 📦",
          description: "Registre aqui novos doces e produtos, definindo a unidade de medida (Ex: Cento, Kg, Unidade) e o valor de venda.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-produtos-table",
        popover: {
          title: "Tabela de Preços e Catálogo 💰",
          description: "Veja todo o seu catálogo ativo com os valores cadastrados e edite ou remova produtos rapidamente.",
          side: "top",
          align: "center"
        }
      },
      stepLulu
    ];
  } else if (path.startsWith("/vendas")) {
    steps = [
      stepNav,
      {
        element: "#tour-vendas-add",
        popover: {
          title: "Lançar Nova Venda 🛒",
          description: "Abra o carrinho de vendas para selecionar o cliente, adicionar múltiplos doces, definir quantidades, dar descontos e marcar se foi paga.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-vendas-search",
        popover: {
          title: "Pesquisa e Filtros 📆",
          description: "Procure vendas por produto, Nota Fiscal, ou filtre por data inicial/final e status de pagamento da venda.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "#tour-vendas-table",
        popover: {
          title: "Histórico de Vendas 📝",
          description: "Confira a listagem com todos os pedidos realizados, formas de pagamento, quantidades totais e se estão com pagamento quitado ou pendente.",
          side: "top",
          align: "center"
        }
      },
      stepLulu
    ];
  } else if (path.startsWith("/contas-a-pagar")) {
    steps = [
      stepNav,
      {
        element: "#tour-contas-add",
        popover: {
          title: "Nova Conta a Pagar 💸",
          description: "Registre novos compromissos financeiros como despesas de fornecedores, despesas fixas ou folhas de pagamento de funcionários.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-contas-table",
        popover: {
          title: "Controle e Quitação de Contas 📅",
          description: "Monitore os vencimentos do mês selecionado. Você pode marcar as contas como pagas clicando no botão ao lado de cada uma.",
          side: "top",
          align: "center"
        }
      },
      stepLulu
    ];
  } else if (path.startsWith("/etiquetas")) {
    steps = [
      stepNav,
      {
        element: "#venda-select",
        popover: {
          title: "Selecionar Venda 🏷️",
          description: "Escolha uma venda concluída. O sistema carregará automaticamente as informações do cliente e produtos associados.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "#tour-etiquetas-docs",
        popover: {
          title: "Documentos de Postagem ✉️",
          description: "Escolha se deseja gerar a etiqueta de envio dos Correios, o formulário de Declaração de Conteúdo A4 exigido nas postagens, ou ambos.",
          side: "bottom",
          align: "center"
        }
      },
      {
        element: "#tour-etiquetas-print",
        popover: {
          title: "Imprimir Etiquetas 🖨️",
          description: "Clique aqui para imprimir os documentos. O sistema formata e oculta as barras do site automaticamente para a folha impressa.",
          side: "bottom",
          align: "center"
        }
      },
      stepLulu
    ];
  } else if (path.startsWith("/usuarios")) {
    steps = [
      stepNav,
      {
        element: "#tour-usuarios-add",
        popover: {
          title: "Novo Operador 🔑",
          description: "Crie novos acessos para o painel de gerenciamento informando o e-mail/login e cadastrando a senha inicial.",
          side: "right",
          align: "start"
        }
      },
      {
        element: "#tour-usuarios-table",
        popover: {
          title: "Tabela de Operadores 👥",
          description: "Gerencie os logins ativos com acesso ao sistema e remova ou limpe a senha dos usuários quando necessário.",
          side: "top",
          align: "center"
        }
      },
      stepLulu
    ];
  } else {
    // Rota desconhecida ou genérica
    steps = [
      {
        element: "#tour-logo",
        popover: {
          title: "Doces Lucelian 🍬",
          description: "Bem-vindo ao sistema de gestão financeira!",
          side: "right",
          align: "start"
        }
      },
      stepNav,
      stepLulu
    ];
  }

  // Executa o tour configurado
  const d = driver({
    showProgress: true,
    nextBtnText: "Próximo >",
    prevBtnText: "< Anterior",
    doneBtnText: "Entendi! 👍",
    allowClose: true,
    steps: steps
  });

  d.drive();
}
