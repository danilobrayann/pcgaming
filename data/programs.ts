export type OsType = "windows" | "linux";

export interface ProgramDetails {
  summary: string;
  features: string[];
  idealFor: string;
  website: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  os: OsType[];
  categories: string[];
  installCmd: Partial<Record<OsType, string>>;
  logo: string;
  popular?: boolean;
  details?: ProgramDetails;
}

export const CATEGORIES = [
  { id: "all", label: "TODOS" },
  { id: "browsers", label: "NAVEGADORES" },
  { id: "gamer", label: "GAMER" },
  { id: "dev", label: "DEV" },
  { id: "ai", label: "INTELIGÊNCIA ARTIFICIAL" },
  { id: "productivity", label: "PRODUTIVIDADE" },
  { id: "utilities", label: "UTILITÁRIOS" },
  { id: "media", label: "MÍDIA" },
  { id: "design", label: "DESIGN" },
  { id: "communication", label: "COMUNICAÇÃO" },
  { id: "security", label: "SEGURANÇA" },
];

const createProgramDetails = (program: Program): ProgramDetails => {
  const categoryLabel =
    program.categories[0]?.replace(/-/g, " ") || "produtividade";

  const genericFeatures = [
    "Instalação rápida",
    "Compatibilidade com Windows e Linux",
    "Uso prático para produtividade",
  ];

  return {
    summary:
      program.description ||
      `Ferramenta útil para ${categoryLabel} com foco em performance e produtividade.`,
    features: program.details?.features?.length
      ? program.details.features
      : genericFeatures,
    idealFor:
      program.details?.idealFor ||
      `Usuários que querem otimizar seu fluxo com ${program.name}.`,
    website:
      program.details?.website ||
      `https://www.google.com/search?q=${encodeURIComponent(program.name)}`,
  };
};

const PROGRAMS_BASE: Program[] = [
  // Browsers
  {
    id: "opera-gx",
    name: "Opera GX",
    description: "Navegador para gamers com limitadores de CPU/RAM e RGB",
    os: ["windows"],
    categories: ["browsers", "gamer"],
    installCmd: { windows: "winget install -e --id Opera.OperaGX" },
    logo: "https://cdn.simpleicons.org/operagx/FF1B2D",
  },
  {
    id: "google-chrome",
    name: "Google Chrome",
    description: "Navegador web rápido, seguro e muito popular do Google",
    os: ["windows", "linux"],
    categories: ["browsers"],
    installCmd: {
      windows: "winget install -e --id Google.Chrome",
      linux:
        "wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && sudo sh -c 'echo \"deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main\" >> /etc/apt/sources.list.d/google-chrome.list' && sudo apt update && sudo apt install -y google-chrome-stable",
    },
    logo: "https://cdn.simpleicons.org/googlechrome/4285F4",
    popular: true,
    details: {
      summary:
        "Navegador rápido, estável e compatível com praticamente todos os sites e serviços web.",
      features: [
        "Sincronização com conta Google",
        "Compatibilidade ampla",
        "Extensões e produtividade",
      ],
      idealFor:
        "Usuários que querem navegação leve, confiável e compatível com quase tudo.",
      website: "https://www.google.com/chrome/",
    },
  },
  {
    id: "firefox",
    name: "Mozilla Firefox",
    description: "Navegador open-source focado em privacidade",
    os: ["windows", "linux"],
    categories: ["browsers"],
    installCmd: {
      windows: "winget install -e --id Mozilla.Firefox",
      linux: "sudo apt install -y firefox",
    },
    logo: "https://cdn.simpleicons.org/firefox/FF7139",
  },
  {
    id: "brave",
    name: "Brave Browser",
    description: "Navegador rápido com bloqueador nativo",
    os: ["windows", "linux"],
    categories: ["browsers", "security"],
    installCmd: {
      windows: "winget install -e --id Brave.Brave",
      linux: "sudo apt install -y brave-browser",
    },
    logo: "https://cdn.simpleicons.org/brave/FF3400",
  },
  {
    id: "microsoft-edge",
    name: "Microsoft Edge",
    description: "Navegador moderno construído sobre o Chromium",
    os: ["windows", "linux"],
    categories: ["browsers"],
    installCmd: {
      windows: "winget install -e --id Microsoft.Edge",
      linux: "sudo apt install -y microsoft-edge-stable",
    },
    logo: "https://cdn.simpleicons.org/microsoftedge/0078D7",
  },
  {
    id: "vivaldi",
    name: "Vivaldi",
    description: "Navegador altamente customizável",
    os: ["windows", "linux"],
    categories: ["browsers"],
    installCmd: {
      windows: "winget install -e --id VivaldiTechnologies.Vivaldi",
      linux: "sudo apt install -y vivaldi-stable",
    },
    logo: "https://cdn.simpleicons.org/vivaldi/EF3939",
  },

  // Gamer
  {
    id: "steam",
    name: "Steam",
    description: "A maior plataforma de jogos digitais do mundo",
    os: ["windows", "linux"],
    categories: ["gamer"],
    installCmd: {
      windows: "winget install -e --id Valve.Steam",
      linux: "sudo apt install -y steam",
    },
    logo: "https://cdn.simpleicons.org/steam/171D25",
  },
  {
    id: "epic-games",
    name: "Epic Games",
    description: "Loja da Epic Games (Fortnite, Unreal Engine)",
    os: ["windows"],
    categories: ["gamer"],
    installCmd: {
      windows: "winget install -e --id EpicGames.EpicGamesLauncher",
    },
    logo: "https://cdn.simpleicons.org/epicgames/white",
  },
  {
    id: "gog-galaxy",
    name: "GOG Galaxy",
    description: "Cliente da loja GOG e integrador de bibliotecas",
    os: ["windows"],
    categories: ["gamer"],
    installCmd: { windows: "winget install -e --id GOG.Galaxy" },
    logo: "https://cdn.simpleicons.org/gogdotcom/93268F",
  },
  {
    id: "ea-app",
    name: "EA App",
    description: "Plataforma de jogos da Electronic Arts",
    os: ["windows"],
    categories: ["gamer"],
    installCmd: { windows: "winget install -e --id ElectronicArts.EADesktop" },
    logo: "https://cdn.simpleicons.org/ea/white",
  },
  {
    id: "battlenet",
    name: "Battle.net",
    description: "Launcher da Blizzard (WoW, Overwatch, Diablo)",
    os: ["windows"],
    categories: ["gamer"],
    installCmd: { windows: "winget install -e --id Blizzard.BattleNet" },
    logo: "https://cdn.simpleicons.org/battledotnet/00AEFF",
  },
  {
    id: "ubisoft-connect",
    name: "Ubisoft Connect",
    description: "O ecossistema de serviços da Ubisoft",
    os: ["windows"],
    categories: ["gamer"],
    installCmd: { windows: "winget install -e --id Ubisoft.Connect" },
    logo: "https://cdn.simpleicons.org/ubisoft/white",
  },
  {
    id: "geforce-experience",
    name: "GeForce Experience",
    description: "Drivers e otimização para placas NVIDIA",
    os: ["windows"],
    categories: ["gamer", "utilities"],
    installCmd: { windows: "winget install -e --id Nvidia.GeForceExperience" },
    logo: "https://cdn.simpleicons.org/nvidia/76B900",
  },
  {
    id: "msi-afterburner",
    name: "MSI Afterburner",
    description: "Monitoramento e Overclock de GPU",
    os: ["windows"],
    categories: ["gamer", "utilities"],
    installCmd: { windows: "winget install -e --id Guru3D.Afterburner" },
    logo: "https://cdn.simpleicons.org/msi/FF0000",
  },

  // Communication
  {
    id: "discord",
    name: "Discord",
    description: "Comunicação essencial por voz, vídeo e texto",
    os: ["windows", "linux"],
    categories: ["gamer", "communication"],
    installCmd: {
      windows: "winget install -e --id Discord.Discord",
      linux: "sudo snap install discord",
    },
    logo: "https://cdn.simpleicons.org/discord/5865F2",
    popular: true,
    details: {
      summary:
        "Plataforma de comunicação para comunidades, amigos e grupos com áudio, vídeo e texto em tempo real.",
      features: [
        "Canais e mensagens em texto",
        "Calls em grupo e voz",
        "Comunidades, bots e integração",
      ],
      idealFor:
        "Jogadores, comunidades e times que precisam conversar em tempo real.",
      website: "https://discord.com/",
    },
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Aplicativo de mensagens popular",
    os: ["windows"],
    categories: ["communication"],
    installCmd: { windows: "winget install -e --id WhatsApp.WhatsApp" },
    logo: "https://cdn.simpleicons.org/whatsapp/25D366",
  },
  {
    id: "telegram",
    name: "Telegram Desktop",
    description: "Mensageiro rápido e seguro em nuvem",
    os: ["windows", "linux"],
    categories: ["communication"],
    installCmd: {
      windows: "winget install -e --id Telegram.TelegramDesktop",
      linux: "sudo apt install -y telegram-desktop",
    },
    logo: "https://cdn.simpleicons.org/telegram/26A5E4",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Mensageiro e colaboração corporativa",
    os: ["windows", "linux"],
    categories: ["communication", "productivity"],
    installCmd: {
      windows: "winget install -e --id SlackTechnologies.Slack",
      linux: "sudo snap install slack",
    },
    logo: "https://cdn.simpleicons.org/slack/E01E5A",
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Videoconferências e reuniões online",
    os: ["windows", "linux"],
    categories: ["communication", "productivity"],
    installCmd: {
      windows: "winget install -e --id Zoom.Zoom",
      linux: "sudo snap install zoom-client",
    },
    logo: "https://cdn.simpleicons.org/zoom/0B5CFF",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description: "Hub de trabalho em equipe no Microsoft 365",
    os: ["windows", "linux"],
    categories: ["communication", "productivity"],
    installCmd: {
      windows: "winget install -e --id Microsoft.Teams",
      linux: "sudo snap install teams-for-linux",
    },
    logo: "https://cdn.simpleicons.org/microsoftteams/6264A7",
  },

  // Dev
  {
    id: "vscode",
    name: "VS Code",
    description: "O editor de código da Microsoft super popular",
    os: ["windows", "linux"],
    categories: ["dev"],
    installCmd: {
      windows: "winget install -e --id Microsoft.VisualStudioCode",
      linux: "sudo snap install code --classic",
    },
    logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC",
    popular: true,
    details: {
      summary:
        "Editor leve, rápido e extremamente extensível para desenvolvimento moderno.",
      features: [
        "IntelliSense inteligente",
        "Terminal embutido",
        "Extensões e temas",
      ],
      idealFor:
        "Programadores e desenvolvedores que querem produtividade e flexibilidade.",
      website: "https://code.visualstudio.com/",
    },
  },
  {
    id: "git",
    name: "Git",
    description: "Sistema de controle de versão distribuído",
    os: ["windows", "linux"],
    categories: ["dev"],
    installCmd: {
      windows: "winget install -e --id Git.Git",
      linux: "sudo apt install -y git",
    },
    logo: "https://cdn.simpleicons.org/git/F05032",
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "Ambiente de execução JavaScript",
    os: ["windows", "linux"],
    categories: ["dev"],
    installCmd: {
      windows: "winget install -e --id OpenJS.NodeJS.LTS",
      linux: "sudo apt install -y nodejs npm",
    },
    logo: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  {
    id: "docker",
    name: "Docker Desktop",
    description: "Plataforma para desenvolver, enviar e rodar apps",
    os: ["windows", "linux"],
    categories: ["dev"],
    installCmd: {
      windows: "winget install -e --id Docker.DockerDesktop",
      linux: "sudo apt install -y docker.io docker-compose",
    },
    logo: "https://cdn.simpleicons.org/docker/2496ED",
  },
  {
    id: "python",
    name: "Python",
    description: "Linguagem de programação para múltiplos propósitos",
    os: ["windows", "linux"],
    categories: ["dev"],
    installCmd: {
      windows: "winget install -e --id Python.Python.3.12",
      linux: "sudo apt install -y python3 python3-pip",
    },
    logo: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    id: "postman",
    name: "Postman",
    description: "Plataforma para construir e usar APIs",
    os: ["windows", "linux"],
    categories: ["dev"],
    installCmd: {
      windows: "winget install -e --id Postman.Postman",
      linux: "sudo snap install postman",
    },
    logo: "https://cdn.simpleicons.org/postman/FF6C37",
  },
  {
    id: "insomnia",
    name: "Insomnia",
    description: "Design de API e cliente para GraphQL e REST",
    os: ["windows", "linux"],
    categories: ["dev"],
    installCmd: {
      windows: "winget install -e --id Kong.Insomnia",
      linux: "sudo snap install insomnia",
    },
    logo: "https://cdn.simpleicons.org/insomnia/4000BF",
  },
  {
    id: "dbeaver",
    name: "DBeaver",
    description: "Gerenciador universal de banco de dados",
    os: ["windows", "linux"],
    categories: ["dev"],
    installCmd: {
      windows: "winget install -e --id dbeaver.dbeaver",
      linux: "sudo snap install dbeaver-ce",
    },
    logo: "https://cdn.simpleicons.org/dbeaver/382923",
  },

  // Productivity
  {
    id: "notion",
    name: "Notion",
    description: "Espaço de trabalho para notas, docs e tarefas",
    os: ["windows"],
    categories: ["productivity"],
    installCmd: { windows: "winget install -e --id Notion.Notion" },
    logo: "https://cdn.simpleicons.org/notion/white",
    popular: true,
    details: {
      summary:
        "Bloco de anotações e organização para tarefas, projetos e documentação pessoal ou profissional.",
      features: [
        "Banco de conhecimento",
        "Tabelas e listas",
        "Colaboração em equipe",
      ],
      idealFor:
        "Pessoas que precisam organizar estudos, projetos e documentação em um só lugar.",
      website: "https://www.notion.so/",
    },
  },
  {
    id: "obsidian",
    name: "Obsidian",
    description: "Ferramenta de anotações baseada em Markdown e links",
    os: ["windows", "linux"],
    categories: ["productivity"],
    installCmd: {
      windows: "winget install -e --id Obsidian.Obsidian",
      linux: "sudo snap install obsidian --classic",
    },
    logo: "https://cdn.simpleicons.org/obsidian/483699",
  },
  {
    id: "office",
    name: "Microsoft 365",
    description: "Pacote Office: Word, Excel, PowerPoint",
    os: ["windows"],
    categories: ["productivity"],
    installCmd: { windows: "winget install -e --id Microsoft.Office" },
    logo: "https://cdn.simpleicons.org/microsoftoffice/D83B01",
  },
  {
    id: "libreoffice",
    name: "LibreOffice",
    description: "Alternativa open-source ao Microsoft Office",
    os: ["windows", "linux"],
    categories: ["productivity"],
    installCmd: {
      windows: "winget install -e --id TheDocumentFoundation.LibreOffice",
      linux: "sudo apt install -y libreoffice",
    },
    logo: "https://cdn.simpleicons.org/libreoffice/18A303",
  },
  {
    id: "anydesk",
    name: "AnyDesk",
    description: "Software de acesso remoto rápido",
    os: ["windows", "linux"],
    categories: ["productivity", "utilities"],
    installCmd: {
      windows: "winget install -e --id AnyDeskSoftwareGmbH.AnyDesk",
      linux: "sudo apt install -y anydesk",
    },
    logo: "https://cdn.simpleicons.org/anydesk/EF443B",
  },

  // Utilities
  {
    id: "7zip",
    name: "7-Zip",
    description: "Compactador de arquivos de alta compressão",
    os: ["windows"],
    categories: ["utilities"],
    installCmd: { windows: "winget install -e --id 7zip.7zip" },
    logo: "https://cdn.simpleicons.org/7zip/white",
  },
  {
    id: "winrar",
    name: "WinRAR",
    description: "Famoso compactador e gerenciador de arquivos",
    os: ["windows"],
    categories: ["utilities"],
    installCmd: { windows: "winget install -e --id RARLab.WinRAR" },
    logo: "https://cdn.simpleicons.org/winrar/white",
  },
  {
    id: "rufus",
    name: "Rufus",
    description: "Criação rápida de pendrives bootáveis",
    os: ["windows"],
    categories: ["utilities"],
    installCmd: { windows: "winget install -e --id Rufus.Rufus" },
    logo: "https://cdn.simpleicons.org/rufus/white",
  },
  {
    id: "powertoys",
    name: "PowerToys",
    description: "Ferramentas avançadas da Microsoft para Windows",
    os: ["windows"],
    categories: ["utilities"],
    installCmd: { windows: "winget install -e --id Microsoft.PowerToys" },
    logo: "https://cdn.simpleicons.org/microsoft/00A4EF",
  },
  {
    id: "qbittorrent",
    name: "qBittorrent",
    description: "Cliente Torrent leve, open-source e sem anúncios",
    os: ["windows", "linux"],
    categories: ["utilities"],
    installCmd: {
      windows: "winget install -e --id qBittorrent.qBittorrent",
      linux: "sudo apt install -y qbittorrent",
    },
    logo: "https://cdn.simpleicons.org/qbittorrent/2F67BA",
  },
  {
    id: "everything",
    name: "Everything",
    description: "Pesquisa instantânea de arquivos no Windows",
    os: ["windows"],
    categories: ["utilities"],
    installCmd: { windows: "winget install -e --id voidtools.Everything" },
    logo: "https://cdn.simpleicons.org/windows/0078D6",
  },

  // Media
  {
    id: "spotify",
    name: "Spotify",
    description: "Serviço de streaming de música, podcast e vídeo",
    os: ["windows", "linux"],
    categories: ["media"],
    installCmd: {
      windows: "winget install -e --id Spotify.Spotify",
      linux: "sudo snap install spotify",
    },
    logo: "https://cdn.simpleicons.org/spotify/1DB954",
    popular: true,
    details: {
      summary:
        "Streaming de música, podcast e audiobooks com biblioteca enorme e playlists personalizadas.",
      features: [
        "Biblioteca enorme de músicas",
        "Playlists e recomendações",
        "Download para escutar offline",
      ],
      idealFor:
        "Usuários que gostam de música, podcast e entretenimento em segundo plano.",
      website: "https://www.spotify.com/",
    },
  },
  {
    id: "vlc",
    name: "VLC Media Player",
    description: "Reprodutor de mídia open source que roda quase tudo",
    os: ["windows", "linux"],
    categories: ["media"],
    installCmd: {
      windows: "winget install -e --id VideoLAN.VLC",
      linux: "sudo apt install -y vlc",
    },
    logo: "https://cdn.simpleicons.org/vlcmediaplayer/FF8800",
  },
  {
    id: "obs-studio",
    name: "OBS Studio",
    description: "Software poderoso de gravação e streaming",
    os: ["windows", "linux"],
    categories: ["media", "gamer"],
    installCmd: {
      windows: "winget install -e --id OBSProject.OBSStudio",
      linux: "sudo apt install -y obs-studio",
    },
    logo: "https://cdn.simpleicons.org/obsstudio/302E31",
  },

  // Design
  {
    id: "figma",
    name: "Figma",
    description: "Ferramenta colaborativa de design de interface (UI/UX)",
    os: ["windows"],
    categories: ["design"],
    installCmd: { windows: "winget install -e --id Figma.Figma" },
    logo: "https://cdn.simpleicons.org/figma/F24E1E",
    popular: true,
    details: {
      summary:
        "Ferramenta de design colaborativo para interfaces, protótipos e produto digital.",
      features: [
        "Protótipos interativos",
        "Colaboração em tempo real",
        "Sistema de componentes e design systems",
      ],
      idealFor:
        "Designers, PMs e equipes que criam interfaces e produtos digitais.",
      website: "https://www.figma.com/",
    },
  },
  {
    id: "blender",
    name: "Blender",
    description: "Suite de criação 3D open-source fantástica",
    os: ["windows", "linux"],
    categories: ["design", "media"],
    installCmd: {
      windows: "winget install -e --id BlenderFoundation.Blender",
      linux: "sudo snap install blender --classic",
    },
    logo: "https://cdn.simpleicons.org/blender/F5792A",
  },
  {
    id: "gimp",
    name: "GIMP",
    description: "Editor de imagens open-source avançado",
    os: ["windows", "linux"],
    categories: ["design"],
    installCmd: {
      windows: "winget install -e --id GIMP.GIMP",
      linux: "sudo apt install -y gimp",
    },
    logo: "https://cdn.simpleicons.org/gimp/5C5543",
  },
  {
    id: "inkscape",
    name: "Inkscape",
    description: "Editor de gráficos vetoriais open-source",
    os: ["windows", "linux"],
    categories: ["design"],
    installCmd: {
      windows: "winget install -e --id Inkscape.Inkscape",
      linux: "sudo apt install -y inkscape",
    },
    logo: "https://cdn.simpleicons.org/inkscape/000000",
  },

  // Security
  {
    id: "bitwarden",
    name: "Bitwarden",
    description: "Gerenciador de senhas seguro e open-source",
    os: ["windows", "linux"],
    categories: ["security"],
    installCmd: {
      windows: "winget install -e --id Bitwarden.Bitwarden",
      linux: "sudo snap install bitwarden",
    },
    logo: "https://cdn.simpleicons.org/bitwarden/175DDC",
  },
  {
    id: "malwarebytes",
    name: "Malwarebytes",
    description: "Proteção avançada contra malwares e vírus",
    os: ["windows"],
    categories: ["security"],
    installCmd: { windows: "winget install -e --id Malwarebytes.Malwarebytes" },
    logo: "https://cdn.simpleicons.org/malwarebytes/005EEA",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Assistente de Inteligência Artificial da OpenAI",
    os: ["windows", "linux"],
    categories: ["ai", "productivity", "dev"],
    installCmd: {
      windows: "winget install -e --id lencx.ChatGPT",
      linux: "sudo snap install chatgpt-desktop",
    },
    logo: "https://cdn.simpleicons.org/openai/412991",
    popular: true,
    details: {
      summary:
        "Assistente de IA para responder perguntas, criar conteúdos, resumir textos e ajudar em tarefas do dia a dia.",
      features: [
        "Geração de texto",
        "Resumo e análise de documentos",
        "Suporte a produtividade e desenvolvimento",
      ],
      idealFor:
        "Quem quer acelerar estudo, trabalho, programação e criação de conteúdo.",
      website: "https://chat.openai.com/",
    },
  },
  {
    id: "claude",
    name: "Claude",
    description: "IA para escrita, análise de contexto e produtividade",
    os: ["windows", "linux"],
    categories: ["ai", "productivity", "dev"],
    installCmd: {
      windows: "winget install -e --id Anthropic.Claude",
      linux: "sudo snap install claude",
    },
    logo: "https://cdn.simpleicons.org/claude/000000",
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "Editor de código com IA integrada para produtividade e dev",
    os: ["windows", "linux"],
    categories: ["ai", "dev"],
    installCmd: {
      windows: "winget install -e --id Cursor.Cursor",
      linux: "sudo snap install cursor --classic",
    },
    logo: "https://cdn.simpleicons.org/cursor/000000",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Assistente de IA do Google para geração e apoio criativo",
    os: ["windows", "linux"],
    categories: ["ai", "productivity"],
    installCmd: {
      windows: "winget install -e --id Google.Gemini",
      linux: "sudo snap install google-gemini",
    },
    logo: "https://cdn.simpleicons.org/google/4285F4",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "Busca com IA para respostas rápidas e bem fundamentadas",
    os: ["windows", "linux"],
    categories: ["ai", "productivity", "dev"],
    installCmd: {
      windows: "winget install -e --id Perplexity.Perplexity",
      linux: "sudo snap install perplexity",
    },
    logo: "https://cdn.simpleicons.org/perplexity/2085FF",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Modelo de IA focado em código, texto e raciocínio",
    os: ["windows", "linux"],
    categories: ["ai", "dev", "productivity"],
    installCmd: {
      windows: "winget install -e --id DeepSeek.DeepSeek",
      linux: "sudo snap install deepseek",
    },
    logo: "https://cdn.simpleicons.org/deepseek/1E3A8A",
  },
  {
    id: "cpu-z",
    name: "CPU-Z",
    description: "Monitoramento e informações de hardware e processador",
    os: ["windows"],
    categories: ["utilities"],
    installCmd: { windows: "winget install -e --id CPUID.CPU-Z" },
    logo: "https://cdn.simpleicons.org/cpu/FF4500",
  },
  {
    id: "cpuid-rog-cpu-z",
    name: "CPUID ROG CPU-Z",
    description: "Versão especial do CPU-Z com a skin Asus ROG",
    os: ["windows"],
    categories: ["gamer", "utilities"],
    installCmd: { windows: "winget install -e --id CPUID.CPU-Z.ROG" },
    logo: "https://cdn.simpleicons.org/asus/FF0029",
  },
  {
    id: "free-download-manager",
    name: "Free Download Manager (FDM)",
    description: "Acelerador e gerenciador de downloads",
    os: ["windows"],
    categories: ["utilities"],
    installCmd: {
      windows: "winget install -e --id SoftDeluxe.FreeDownloadManager",
    },
    logo: "https://cdn.simpleicons.org/download/00C853",
  },
  {
    id: "antigravity",
    name: "Antigravity (IA)",
    description:
      "Seu assistente IA favorito desenvolvido pela Google Deepmind! 🚀",
    os: ["windows", "linux"],
    categories: ["dev", "utilities", "productivity", "gamer"],
    installCmd: {
      windows:
        'echo "O Antigravity já está integrado e trabalhando com você! 🤖❤️"',
      linux:
        'echo "O Antigravity já está integrado e trabalhando com você! 🤖❤️"',
    },
    logo: "https://cdn.simpleicons.org/google/4285F4",
  },
  {
    id: "github-desktop",
    name: "GitHub Desktop",
    description: "Cliente visual para GitHub com gestão fácil de repositórios",
    os: ["windows", "linux"],
    categories: ["dev", "productivity"],
    installCmd: {
      windows: "winget install -e --id GitHub.GitHubDesktop",
      linux: "sudo apt install -y github-desktop",
    },
    logo: "https://cdn.simpleicons.org/github/181717",
  },
  {
    id: "audacity",
    name: "Audacity",
    description: "Editor de áudio gratuito e muito leve para gravação e edição",
    os: ["windows", "linux"],
    categories: ["media", "utilities"],
    installCmd: {
      windows: "winget install -e --id Audacity.Audacity",
      linux: "sudo apt install -y audacity",
    },
    logo: "https://cdn.simpleicons.org/audacity/000000",
  },
  {
    id: "shotcut",
    name: "Shotcut",
    description: "Editor de vídeo open-source com suporte amplo de formatos",
    os: ["windows", "linux"],
    categories: ["media", "design"],
    installCmd: {
      windows: "winget install -e --id Meltytech.Shotcut",
      linux: "sudo apt install -y shotcut",
    },
    logo: "https://cdn.simpleicons.org/shotcut/4EAAFF",
  },
  {
    id: "kdenlive",
    name: "Kdenlive",
    description: "Montagem profissional de vídeo com recursos avançados",
    os: ["linux", "windows"],
    categories: ["media", "design"],
    installCmd: {
      windows: "winget install -e --id KDE.Kdenlive",
      linux: "sudo apt install -y kdenlive",
    },
    logo: "https://cdn.simpleicons.org/kdenlive/3D80C7",
  },
  {
    id: "minecraft-launcher",
    name: "Minecraft Launcher",
    description: "Acesso rápido ao seu mundo e modpacks favoritos",
    os: ["windows", "linux"],
    categories: ["gamer"],
    installCmd: {
      windows: "winget install -e --id Mojang.MinecraftLauncher",
      linux: "sudo apt install -y minecraft-launcher",
    },
    logo: "https://cdn.simpleicons.org/minecraft/62B47C",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "Assistente de IA para produtividade e desenvolvimento",
    os: ["windows", "linux"],
    categories: ["ai", "dev", "productivity"],
    installCmd: {
      windows: "winget install -e --id GitHub.Copilot",
      linux:
        'echo "Ative o Copilot pelo editor de código ou extensão do GitHub"',
    },
    logo: "https://cdn.simpleicons.org/githubcopilot/000000",
    popular: true,
    details: {
      summary:
        "Assistente de IA para desenvolvimento, sugestões de código e suporte em trabalhos de programação.",
      features: [
        "Autocompletar código",
        "Explicar trechos e erros",
        "Acelerar fluxo de trabalho de dev",
      ],
      idealFor:
        "Programadores e equipes que querem ganhar velocidade e reduzir erros.",
      website: "https://github.com/features/copilot",
    },
  },
  {
    id: "onedrive",
    name: "OneDrive",
    description: "Sincronização de arquivos e backup na nuvem da Microsoft",
    os: ["windows"],
    categories: ["productivity", "utilities"],
    installCmd: { windows: "winget install -e --id Microsoft.OneDrive" },
    logo: "https://cdn.simpleicons.org/microsoftonedrive/0078D4",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description:
      "Armazenamento em nuvem e compartilhamento simples de arquivos",
    os: ["windows", "linux"],
    categories: ["productivity", "utilities"],
    installCmd: {
      windows: "winget install -e --id Dropbox.Dropbox",
      linux: "sudo apt install -y dropbox",
    },
    logo: "https://cdn.simpleicons.org/dropbox/0061FF",
  },
  {
    id: "pocket-casts",
    name: "Pocket Casts",
    description: "Podcast player com sincronização e reprodução inteligente",
    os: ["windows", "linux"],
    categories: ["media"],
    installCmd: {
      windows: "winget install -e --id PocketCasts.PocketCasts",
      linux: "sudo snap install pocketcasts",
    },
    logo: "https://cdn.simpleicons.org/pocketcasts/FF5B5D",
  },
  {
    id: "calibre",
    name: "Calibre",
    description: "Biblioteca e gerenciador de eBooks e PDF",
    os: ["windows", "linux"],
    categories: ["productivity", "media"],
    installCmd: {
      windows: "winget install -e --id KovidGoyal.Calibre",
      linux: "sudo apt install -y calibre",
    },
    logo: "https://cdn.simpleicons.org/calibre/FF7B00",
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    description: "Nuvem privada e sincronização de arquivos autogerida",
    os: ["windows", "linux"],
    categories: ["security", "productivity"],
    installCmd: {
      windows: "winget install -e --id Nextcloud.Nextcloud",
      linux: "sudo apt install -y nextcloud-client",
    },
    logo: "https://cdn.simpleicons.org/nextcloud/0082C9",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description:
      "Armazenamento e sincronização de arquivos no ecossistema Google",
    os: ["windows", "linux"],
    categories: ["productivity", "utilities"],
    installCmd: {
      windows: "winget install -e --id Google.Drive",
      linux: "sudo snap install google-drive",
    },
    logo: "https://cdn.simpleicons.org/googledrive/4285F4",
    popular: true,
    details: {
      summary:
        "Serviço de armazenamento em nuvem para sincronizar arquivos e colaborar de forma prática.",
      features: [
        "Backup de arquivos",
        "Compartilhamento rápido",
        "Sincronização em vários dispositivos",
      ],
      idealFor:
        "Quem usa documentos, fotos e arquivos em múltiplos dispositivos.",
      website: "https://drive.google.com/",
    },
  },
  {
    id: "canva",
    name: "Canva",
    description:
      "Ferramenta visual para criar artes, posts e apresentações rapidamente",
    os: ["windows", "linux"],
    categories: ["design", "productivity"],
    installCmd: {
      windows: "winget install -e --id Canva.Canva",
      linux: "sudo snap install canva",
    },
    logo: "https://cdn.simpleicons.org/canva/00C4CC",
    popular: true,
    details: {
      summary:
        "Plataforma para criação visual com templates prontos e grande produtividade para design rápido.",
      features: [
        "Modelos prontos",
        "Design para redes sociais",
        "Trabalho em equipe e exportação",
      ],
      idealFor:
        "Quem precisa criar imagens, posts e apresentações sem muita curva de aprendizado.",
      website: "https://www.canva.com/",
    },
  },
  {
    id: "capcut",
    name: "CapCut",
    description:
      "Editor de vídeo rápido, moderno e ideal para conteúdo digital",
    os: ["windows", "linux"],
    categories: ["media", "design"],
    installCmd: {
      windows: "winget install -e --id CapCut.CapCut",
      linux: "sudo snap install capcut",
    },
    logo: "https://cdn.simpleicons.org/capcut/000000",
    popular: true,
    details: {
      summary:
        "Editor visual fácil para vídeos curtos, reels e conteúdo criativo para redes sociais.",
      features: [
        "Edição rápida de vídeo",
        "Filtros e música",
        "Recortes para redes sociais",
      ],
      idealFor:
        "Criadores de conteúdo e quem produz vídeos com rapidez e impacto visual.",
      website: "https://www.capcut.com/",
    },
  },
  {
    id: "grok",
    name: "Grok",
    description:
      "Assistente de IA com foco em resposta direta e conteúdo em tempo real",
    os: ["windows", "linux"],
    categories: ["ai", "productivity"],
    installCmd: {
      windows: "winget install -e --id xAI.Grok",
      linux: "sudo snap install grok",
    },
    logo: "https://cdn.simpleicons.org/x/000000",
    popular: true,
    details: {
      summary:
        "IA para respostas rápidas, consulta de informação e produtividade em conversas rápidas.",
      features: [
        "Perguntas rápidas",
        "Geração de texto",
        "Apoio a brainstorming e produtividade",
      ],
      idealFor:
        "Usuários que querem respostas ágeis e conversas mais diretas com IA.",
      website: "https://grok.com/",
    },
  },
];

export const PROGRAMS: Program[] = PROGRAMS_BASE.map((program) => ({
  ...program,
  details: program.details ?? createProgramDetails(program),
}));
