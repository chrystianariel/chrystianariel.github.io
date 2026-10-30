import type { Dictionary } from './types'

// Todo o texto em português. A versão em inglês (en.ts) segue a mesma estrutura.
const pt: Dictionary = {
  nav: { work: 'Trabalhos', about: 'Sobre', contact: 'Contato', menu: 'Menu', close: 'Fechar' },

  hero: {
    eyebrow: 'Chrystian Ariel · Product Designer',
    lines: ['Curioso com IA.', 'Obcecado por detalhe.'],
    intro:
      'Desenho produtos digitais para saúde, fintech e dados há mais de 8 anos. Uso IA todos os dias para ir mais rápido no que é repetitivo, e uso o tempo que sobra no que não pode ser apressado.',
    scroll: 'Role para ver',
  },

  manifesto: {
    eyebrow: '( Como eu trabalho )',
    text: 'A IA acelera a pesquisa, a síntese e as variações. Ela não decide pelo usuário, não valida um fluxo de saúde mental e não percebe um espaçamento fora da grade.',
    highlight: 'Essas partes continuam sendo minhas.',
  },

  work: { eyebrow: '( Trabalhos selecionados )', title: 'Trabalhos', view: 'Ver case' },

  process: {
    eyebrow: '( Processo )',
    title: 'Rápido onde pode. Lento onde importa.',
    steps: [
      {
        tag: 'Humano',
        title: 'Escutar',
        text: 'Entrevistas, conversas com especialistas e stakeholders. Entender o problema real antes de abrir o Figma.',
      },
      {
        tag: 'IA + Humano',
        title: 'Organizar',
        text: 'IA para agrupar transcrições, mapear padrões e gerar hipóteses. Eu reviso cada agrupamento contra a fonte original.',
      },
      {
        tag: 'Humano',
        title: 'Decidir',
        text: 'Fluxos, prioridades e trade-offs são decididos com o time e validados com usuários. Não terceirizo julgamento.',
      },
      {
        tag: 'IA + Humano',
        title: 'Detalhar',
        text: 'IA para variações de microcopy, estados de erro e checagens. O acabamento — grade, ritmo, acessibilidade — é feito à mão.',
      },
    ],
  },

  contact: {
    eyebrow: '( Contato )',
    title: 'Vamos conversar?',
    text: 'Aberto a novos projetos, times e boas conversas sobre design e IA.',
    email: 'chrystian.ariel@gmail.com',
    cv: 'Baixar CV',
  },

  about: {
    eyebrow: '( Sobre )',
    title: 'Oi, eu sou o Chrys.',
    paragraphs: [
      'Sou Product Designer e gosto de criar experiências digitais que conectam pessoas e tecnologia. Atuo no encontro entre experiência do usuário, estratégia de produto e colaboração, transformando problemas complexos em soluções claras, úteis e escaláveis.',
      'Trabalho com times multiculturais e distribuídos na América Latina e nos Estados Unidos, com uma visão orientada por pesquisa, design e dados para apoiar decisões de produto.',
      'A IA entrou no meu dia a dia como uma colega de trabalho rápida: ótima para organizar, explorar e revisar. Mas os momentos que definem um produto — ouvir um paciente, negociar um fluxo com o time, acertar o último detalhe de um componente — continuam pedindo tempo e atenção.',
    ],
    experienceTitle: 'Experiência',
    experience: [
      { role: 'Product Designer · UI Designer', company: 'Instituto de Pesquisas Eldorado', period: '2020 — atual' },
      { role: 'Product Designer', company: 'Fasters', period: '2018 — 2020' },
      { role: 'User Interface Designer', company: 'Web Produtora', period: '2017 — 2018' },
    ],
    educationTitle: 'Formação',
    education: [
      { course: 'Pós-graduação em User Experience Design and Beyond', school: 'PUCRS' },
      { course: 'Comunicação Social — Publicidade e Propaganda', school: 'ULBRA' },
    ],
    beyondTitle: 'Fora do Figma',
    beyond:
      'Mentoria para designers juniores, protótipos de jogos 2D em Unity e Godot, e estudos de React e Angular — o que me ajuda a conversar de igual para igual com o time de desenvolvimento.',
  },

  caseUi: {
    back: 'Voltar aos trabalhos',
    next: 'Próximo projeto',
    role: 'Papel',
    year: 'Ano',
    platform: 'Plataforma',
    aiTitle: 'Onde a IA entrou — e onde não entrou',
    aiUsed: 'Com apoio de IA',
    aiHuman: 'Sem atalhos',
    imagePending: 'Imagens em breve',
  },

  footer: { rights: 'Todos os direitos reservados.', built: 'Desenhado e codado com cuidado (e um pouco de IA).', top: 'Voltar ao topo' },

  cases: {
    conemo: {
      name: 'CONEMO',
      tags: 'Healthcare · Saúde Mental',
      year: '2024',
      tagline: 'Um app de controle emocional para pacientes com depressão, ansiedade e insônia no SUS.',
      sections: [
        {
          title: 'Sobre o projeto',
          paragraphs: [
            'CONEMO (abreviação de Controle Emocional) é um aplicativo mobile desenvolvido por pesquisadores da Universidade de São Paulo (USP) em parceria com centros de pesquisa brasileiros e internacionais.',
            'Concebido como um complemento no tratamento de pacientes com sintomas de depressão, ansiedade e insônia, a ferramenta foi desenvolvida com base em dados obtidos em sessões terapêuticas e comportamentais. O aplicativo busca ampliar e facilitar o acesso a recursos de saúde mental a partir de intervenções diárias de baixa intensidade.',
            'O ecossistema do CONEMO é formado por três produtos: o aplicativo do paciente, um questionário web de triagem, que define quem pode entrar no programa, e um sistema administrativo usado pelos profissionais das Unidades Básicas de Saúde.',
          ],
        },
        {
          title: 'Principais desafios',
          items: [
            {
              label: 'Usabilidade',
              text: 'Por tratar-se de um aplicativo focado em saúde mental, o principal desafio foi criar uma ferramenta que oferecesse privacidade e segurança ao usuário, assim como facilidade de navegação. Considerando a amplitude do público-alvo — pessoas de diferentes idades, letramento digital e estado emocional —, foi necessária uma ampla pesquisa para compreender os fluxos de uso e o engajamento dos usuários a médio e longo prazo.',
            },
            {
              label: 'Integração',
              text: 'Outro aspecto de importante resolução foi a integração entre o aplicativo e as Unidades Básicas de Saúde (UBSs) participantes, o que exigiu o estabelecimento de fluxos de integração entre as unidades e os usuários da ferramenta.',
            },
            {
              label: 'Ética',
              text: 'Dados relativos à saúde dos pacientes exigem cuidado ético na sua coleta e monitoramento, demandando decisões de design transparentes em relação ao consentimento e ao armazenamento deste material.',
            },
          ],
        },
        {
          title: 'Minha contribuição',
          paragraphs: [
            'Atuei na síntese dos dados de pesquisa com usuários juntamente com o roteiro das informações fornecidas pelos profissionais de saúde. Com as informações necessárias para a jornada do usuário no aplicativo, ajudei a organizar as jornadas internas e a separar as atividades diárias e outras formas de mídia, como áudio e vídeo, criando o fluxo do usuário e as interações com cada elemento daquela jornada.',
          ],
          bullets: [
            {
              label: 'Jornadas do aplicativo (Depressão, Ansiedade e Insônia)',
              text: 'estruturei as sessões — boas-vindas, conteúdo, vídeo com transcrição e tarefas de casa — e criei modelos de tela reutilizáveis (lista, tabela e tarefa) para que o conteúdo produzido pela USP fosse aplicado sem redesenhar cada sessão.',
            },
            {
              label: 'Tarefas interativas',
              text: 'diário do sono nas versões completa e curta, escalas de ansiedade de 0 a 10 com controle de arraste, lista reordenável de situações que causam ansiedade e registro das técnicas de respiração e relaxamento.',
            },
            {
              label: 'Questionário de triagem (web)',
              text: 'fluxo de perguntas baseado em escalas de rastreio de depressão, ansiedade e insônia, com termo de consentimento e regras de elegibilidade, como a idade mínima de 18 anos.',
            },
            {
              label: 'Sistema administrativo',
              text: 'painel para os profissionais das UBSs com indicadores de uso, lista de participantes, sinalizações de risco e registro de contatos.',
            },
            {
              label: 'Style guide compartilhado entre app e web',
              text: 'tipografia Urbanist, uma cor para cada jornada (verde-água para Depressão, laranja para Ansiedade e roxo para Insônia), biblioteca de componentes e notas de implementação para o time de desenvolvimento.',
            },
          ],
        },
        {
          title: 'Análise e processo',
          paragraphs: [
            'A base da gamificação segue uma estrutura parecida com a usada em aplicativos de ensino como Duolingo, Babbel e Memrise: o tratamento é dividido em jornadas, as jornadas em sessões curtas e o progresso fica sempre visível. Na jornada de Depressão, o paciente recebe sessões três vezes por semana; nas jornadas de Ansiedade e Insônia, são 7 sessões ao longo de cerca de 6 semanas, cada uma com duração de 2 a 10 minutos. As sessões são liberadas aos poucos, em um intervalo definido, para que o paciente pratique o que aprendeu antes de avançar.',
            'Criamos um acompanhamento da jornada diária com atividades baseadas em perguntas sobre a rotina, podendo ser uma atividade específica, como “Saiu para fazer compras hoje?”, ou algo mais geral, como “Conversou com alguém hoje?”. O paciente escolhe uma atividade prazerosa para realizar nos próximos dias e, na sessão seguinte, o aplicativo pergunta se ele conseguiu fazê-la e como se sentiu. A resposta sempre recebe um retorno acolhedor: se a atividade foi feita, o app reforça o benefício de estar mais ativo; se não foi, sugere dividi-la em partes menores e começar pela mais fácil.',
            'O progresso também é marcado por uma série de avaliações pessoais, feitas em tela, sobre as sensações e os sentimentos do dia: escalas de 0 a 10 para o grau de ansiedade, registro diário de sintomas (sim ou não) e o diário do sono, com horários de deitar, acordar e despertares durante a noite. Essas respostas são enviadas para uma aplicação web em que os profissionais de saúde acompanham a jornada de cada participante, a última atividade realizada, sinalizações de risco e eventos adversos e o uso do botão de ajuda. Com isso, cruzam as informações com o acompanhamento regular do paciente, registram cada contato feito e sugerem tratamentos direcionados ao nível identificado na interação com o aplicativo.',
          ],
        },
        {
          title: 'Resultados',
          items: [
            {
              label: 'Redução na sobrecarga nas Unidades Básicas de Saúde',
              text: 'o CONEMO integra o acompanhamento do paciente através do aplicativo com o monitoramento de profissionais do sistema de saúde. Ao transpor para o digital parte desse tratamento, é possível reduzir a necessidade constante de consultas presenciais.',
            },
            {
              label: 'Maior acesso ao atendimento psicológico',
              text: 'o aplicativo proporciona uma abordagem terapêutica digital e acessível para pacientes com depressão, ansiedade e insônia, unificando o acompanhamento diário através da ferramenta com os serviços prestados nas Unidades Básicas de Saúde participantes.',
            },
            {
              label: 'Intervenção facilitada e gamificada',
              text: 'cada sessão no aplicativo incentiva a realização de atividades baseadas em técnicas de Terapia Cognitivo-Comportamental (TCC). Em vez de pontos ou medalhas, a gamificação do CONEMO recompensa o paciente com progresso visível: contador de sessões concluídas em cada jornada, animação de conclusão ao final de cada sessão, liberação gradual de novas etapas, aviso de “em dia” no diário do sono e mensagens de reforço positivo após cada atividade.',
            },
          ],
          paragraphs: [
            'O aplicativo mostrou-se uma solução com potencial para ser integrada ao sistema público de saúde, pois apresenta baixo custo de manutenção e facilidade de expansão para diferentes regiões do país, beneficiando populações com acesso limitado à psicoterapia tradicional.',
          ],
        },
        {
          title: 'Impacto',
          stats: [
            { value: '50%', label: 'de redução nos sintomas depressivos dos participantes, segundo estudos clínicos' },
            { value: '↓', label: 'menor desistência de pacientes durante o tratamento' },
          ],
          paragraphs: [
            'Dados obtidos pelo acompanhamento psicológico através do aplicativo demonstraram redução na desistência de pacientes durante o tratamento. Segundo estudos clínicos, o CONEMO reduziu em até 50% os sintomas depressivos dos participantes, além de impactar variáveis secundárias, como a diminuição do isolamento e da inatividade dos pacientes.',
          ],
        },
      ],
    },

    drumwave: {
      name: 'DrumWave',
      tags: 'Fintech · Economia de Dados',
      year: '2024',
      tagline: 'Transformar dados em ativo financeiro — e fazer isso parecer simples para empresas.',
      sections: [
        {
          title: 'Sobre o projeto',
          paragraphs: [
            'A DrumWave surgiu como uma plataforma que trata dados pessoais e corporativos como um ativo financeiro, permitindo ao usuário monetizar suas informações digitais conscientemente. Sediada na Califórnia, a startup propõe que o usuário possa decidir como negocia seus dados pessoais, tornando-os passíveis de gestão e monetização.',
            'O produto central é a dWallet®, uma carteira digital de dados em duas versões: a Personal dWallet, aplicativo para pessoas físicas, e a Business dWallet, plataforma web para empresas, chamada de Data Reserve na versão em inglês. Meu trabalho se concentrou na Business dWallet, nas versões em português e inglês.',
          ],
        },
        {
          title: 'O que o usuário precisava entender',
          table: {
            head: ['Pergunta', 'Como a plataforma responde'],
            rows: [
              ['O que são seus dados', 'Cada conjunto de dados é registrado como um NamedSchema, uma ficha que descreve o dado, seus atributos e quem é o dono (por exemplo: dados gerais do cliente, dados bancários, localização, informações do dispositivo).'],
              ['Onde eles estão armazenados', 'Na dWallet, sob custódia compartilhada: a empresa que guarda o dado e a pessoa a quem ele pertence assinam um certificado que comprova essa relação.'],
              ['Como eles geram valor', 'Dados registrados e certificados podem ser licenciados em Ofertas de compra e venda e usados em Data Apps; os pagamentos entram e saem via PIX.'],
              ['Quais ações podem ser feitas', 'Registrar, certificar, criar ou aceitar ofertas, licenciar por um período definido, comprar Data Apps e convidar outras empresas e pessoas para o ecossistema.'],
            ],
          },
        },
        {
          title: 'Principais desafios',
          paragraphs: [
            'A ideia de monetizar dados pessoais ainda é pouco familiar para a maioria dos usuários. Assim, foi necessário pensar em como transformar um sistema complexo de valorização de dados em experiências intuitivas.',
            'A maioria das pessoas nunca gerenciou ou monetizou ativamente seus dados. Pesquisas e entrevistas realizadas para o desenvolvimento do projeto mostraram usuários confusos sobre a percepção de propriedade, valor e consentimento em relação aos dados digitais.',
            'Outro desafio foi separar as experiências e funcionalidades da DrumWave para indivíduos e organizações. Pessoas físicas, empresas e Agentes de Dados — empresas que distribuem dWallets e analisam ofertas — têm objetivos, permissões e vocabulários diferentes, e cada perfil precisava se reconhecer na interface.',
            'Por lidar com dados sensíveis dos usuários, foi fundamental projetar a interface de modo que cada interação reforçasse a segurança, o controle e a clareza oferecidos pela ferramenta.',
          ],
        },
        {
          title: 'Minha contribuição',
          paragraphs: [
            'Atuei como Product Designer na Business dWallet, do mapeamento dos fluxos à entrega para desenvolvimento. Desenhei a jornada de cadastro e ativação de contas empresariais, as áreas de NamedSchemas, Certificados, Ofertas e Data Apps e o painel do Agente de Dados.',
            'Também fui responsável pela documentação de design: style guide, biblioteca de componentes, versões em português e inglês dos fluxos, adaptação para tablet e smartphone e os e-mails transacionais da plataforma. Conduzi ainda os testes de usabilidade a cada nova funcionalidade, junto com o time de produto.',
          ],
        },
        {
          title: 'Processo',
          paragraphs: [
            'Um dos processos iniciais foi mapear os possíveis impasses que um usuário médio teria para compreender os usos da plataforma. Entrevistas com diferentes públicos mostraram dificuldades em entender aspectos como o valor dos dados concedidos, o consentimento e a gestão das informações monetizadas. Essas dificuldades exigiram um onboarding progressivo (progressive disclosure): em vez de apresentar todos os conceitos de uma vez, a plataforma revela cada funcionalidade no momento em que ela se torna útil, com textos de apoio, estados vazios que explicam o próximo passo e padrões que orientam a navegação ao mesmo tempo que ensinam como a plataforma funciona.',
            'Testes de usabilidade eram realizados a cada implementação de uma funcionalidade nova, visando garantir uma experiência simples e compreensível. A partir das métricas comportamentais obtidas, avaliávamos a taxa de conclusão de tarefas, os pontos de desistência e a percepção de confiança para validar e evoluir a navegação.',
          ],
        },
        {
          title: 'Execução e soluções',
          items: [
            {
              label: 'Design modular',
              text: 'Para otimizar o processo de criação, montamos uma biblioteca de componentes — botões, campos, seletores, upload de arquivos, cards, menus e gráficos — que funciona como peças de montar. Cada nova funcionalidade era construída a partir dessas mesmas peças, o que acelerou a entrega e manteve a coesão visual e de interação do produto, mesmo com o escopo crescendo. Todo o sistema segue uma grade de espaçamento em múltiplos de 8 px, o que facilitou a adaptação para desktop (1440 px), tablet (798 px) e smartphone (390 px).',
            },
          ],
          stats: [
            { value: '3', label: 'perfis de usuário: Personal, Business e Agente de Dados' },
            { value: '2', label: 'idiomas: português e inglês' },
            { value: '3', label: 'tamanhos de tela' },
            { value: '5', label: 'etapas no cadastro empresarial' },
          ],
        },
        {
          title: 'Vocabulário próprio',
          paragraphs: [
            'Devido ao caráter recente da monetização de dados, percebemos a necessidade de introduzir nomenclaturas específicas para o produto, sempre acompanhadas de uma explicação curta na própria tela:',
          ],
          bullets: [
            { label: 'dWallet®', text: 'a carteira digital onde pessoas e empresas guardam, gerenciam e acompanham o valor dos seus dados.' },
            { label: 'Poupança de Dados (Data Savings)', text: 'a conta da Personal dWallet, em que a pessoa acumula o valor gerado pelos próprios dados.' },
            { label: 'Reserva de Dados (Data Reserve)', text: 'a conta empresarial, em que a empresa registra seus conjuntos de dados e os transforma em uma nova linha de receita.' },
            { label: 'NamedSchema', text: 'o registro padronizado de um conjunto de dados, com descrição, dicionário de atributos e proprietário.' },
            { label: 'Certificado de custódia compartilhada', text: 'o documento assinado pela empresa e pelo titular que comprova quem guarda e quem é dono do dado.' },
            { label: 'Oferta', text: 'a proposta de compra ou venda de dados, com público, preço por certificado e prazo de licença definidos.' },
            { label: 'Agente de Dados', text: 'a empresa que distribui dWallets, oferece infraestrutura e aprova as ofertas antes de serem publicadas no mercado.' },
          ],
        },
        {
          title: 'Segurança e transparência',
          paragraphs: ['Essas preocupações se traduziram em decisões concretas de interface:'],
          bullets: [
            { label: 'Verificação de identidade', text: 'cadastro apenas com e-mail corporativo e CNPJ válidos, envio de documentos da empresa e dos representantes legais e análise antes da ativação da conta.' },
            { label: 'Controle de acesso', text: 'um administrador principal define as permissões dos demais usuários; senhas seguem requisitos mínimos de segurança e links de redefinição expiram em 30 minutos.' },
            { label: 'Avisos a cada ação sensível', text: 'e-mails confirmam alterações de senha e exclusão de conta e orientam o usuário a entrar em contato caso não reconheça a ação.' },
            { label: 'Consentimento explícito', text: 'os certificados mostram quem assinou, quando e quais dados estão envolvidos, e cada parte pode assinar ou recusar; o acordo de agenciamento afirma que o usuário continua dono dos seus dados.' },
            { label: 'Status sempre visível', text: 'rótulos como registrado, ativo, aguardando assinatura e recusado, além de mensagens claras para acesso expirado, acesso negado e falhas no sistema.' },
            { label: 'Qualidade dos dados', text: 'ao enviar um arquivo, a plataforma mostra quantas linhas foram validadas e quantas têm erro e oferece um arquivo de correção.' },
          ],
        },
      ],
      // TODO (Chrys): revise estes itens.
      ai: {
        used: [
          'Rascunhos das explicações curtas do vocabulário próprio, em PT e EN',
          'Revisão de consistência entre as versões em português e inglês',
          'Geração de dados fictícios realistas para protótipos e testes',
        ],
        human: [
          'Entrevistas e testes de usabilidade a cada nova funcionalidade',
          'Arquitetura dos três perfis e suas permissões',
          'Decisões de segurança e consentimento em cada ação sensível',
        ],
      },
    },

    tris: {
      name: 'TRIS',
      tags: 'Healthcare · Gamificação',
      year: '2024',
      tagline: 'Recompensas, medalhas e um bafômetro via Bluetooth para apoiar quem quer beber menos.',
      sections: [
        {
          title: 'Sobre o projeto',
          paragraphs: [
            'TRIS é um aplicativo mobile de pesquisa clínica que apoia pessoas em tratamento para reduzir o consumo de álcool. O participante conecta um bafômetro ao celular via Bluetooth e envia amostras ao longo do dia; cada amostra aprovada, negativa para álcool, gera uma recompensa em dinheiro. O projeto inclui o aplicativo do participante e um sistema administrativo web para a equipe de pesquisa.',
          ],
        },
        {
          title: 'Principais desafios',
          items: [
            { label: 'Confiabilidade', text: 'Como a recompensa é financeira, cada amostra precisava ser comprovadamente do participante. O fluxo de coleta combina foto do rosto e sopro no bafômetro, comparando a imagem com uma foto cadastrada no primeiro acesso.' },
            { label: 'Motivação', text: 'Manter a abstinência exige engajamento diário por semanas. O desafio foi criar incentivos que valorizassem a constância sem punir o participante que teve um dia difícil.' },
            { label: 'Honestidade', text: 'O participante poderia deixar de enviar amostras nos dias em que bebeu. A interface precisava incentivar o envio mesmo nesses casos.' },
          ],
        },
        {
          title: 'Minha contribuição',
          paragraphs: [
            'Desenhei os fluxos do aplicativo e do sistema administrativo, dos wireframes às telas finais: cadastro de foto, conexão com o bafômetro, coleta de amostras, histórico, saldo e resgate de recompensas. No sistema administrativo, desenhei a validação de amostras, a aprovação de pagamentos e a configuração dos parâmetros da pesquisa para cada participante. Também montei o style guide do projeto, com tipografia Red Hat Display e os componentes de status.',
          ],
        },
        {
          title: 'Análise e processo',
          paragraphs: [
            'A gamificação se apoia em três mecânicas. A primeira são as medalhas e divisões: bronze ao completar 1 dia de abstinência, prata com 4 dias consecutivos e ouro com 7, com mensagens que incentivam o participante a subir ou manter a divisão. A segunda é o recorde de abstinência, que mostra o maior período alcançado e convida o participante a superá-lo. A terceira são as recompensas em dinheiro: cada dia com amostras aprovadas soma um valor ao saldo, que pode ser resgatado a partir de R$ 1,00, com prazo de até 15 dias úteis.',
            'A coleta segue um ritmo definido pela equipe de pesquisa: o horário da primeira coleta do dia, o intervalo entre coletas e o tempo para responder ao aviso antes que a coleta expire. O participante tem até 3 tentativas por amostra, e um calendário mostra o histórico de amostras aprovadas, reprovadas e não coletadas.',
            'No sistema administrativo, os pesquisadores comparam a foto da amostra com a foto cadastrada, validam o resultado do bafômetro, acompanham o nível de álcool semanal de cada participante e aprovam ou recusam as solicitações de resgate.',
          ],
          stats: [
            { value: '1', label: 'dia para a medalha de bronze' },
            { value: '4', label: 'dias consecutivos para a prata' },
            { value: '7', label: 'dias consecutivos para o ouro' },
          ],
        },
        {
          title: 'Resultados',
          items: [
            { label: 'Incentivo à honestidade', text: 'o aplicativo avisa que uma amostra não enviada é considerada como o nível mais alto de álcool, o que torna o envio sempre a melhor escolha, mesmo após um consumo.' },
            { label: 'Transparência nas recompensas', text: 'extrato, saldo pendente e motivo de cada amostra reprovada (resultado positivo, foto inadequada ou coleta não realizada) ficam sempre visíveis para o participante.' },
            { label: 'Gestão da pesquisa em um só lugar', text: 'a equipe configura parâmetros, valida amostras e aprova pagamentos no mesmo painel, com indicadores de participantes ativos, taxa de coleta e valor total de recompensas.' },
          ],
        },
        {
          title: 'Impacto',
          paragraphs: ['Estudo clínico em andamento — os resultados serão publicados aqui assim que forem divulgados.'],
        },
      ],
    },
  },
}

export default pt
