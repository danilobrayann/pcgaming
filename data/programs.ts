export type OsType = 'windows' | 'linux';

export interface Program {
  id: string;
  name: string;
  description: string;
  os: OsType[];
  categories: string[];
  installCmd: Partial<Record<OsType, string>>;
}

export const CATEGORIES = [
  { id: 'all', label: 'TODOS' },
  { id: 'browsers', label: 'NAVEGADORES' },
  { id: 'gamer', label: 'GAMER' },
  { id: 'dev', label: 'DEV' },
  { id: 'productivity', label: 'PRODUTIVIDADE' },
  { id: 'utilities', label: 'UTILITÁRIOS' },
  { id: 'media', label: 'MÍDIA' },
  { id: 'design', label: 'DESIGN' },
];

export const PROGRAMS: Program[] = [
  // Browsers
  {
    id: 'opera-gx',
    name: 'Opera GX',
    description: 'Navegador para gamers com limitadores de CPU/RAM e RGB',
    os: ['windows'],
    categories: ['browsers', 'gamer'],
    installCmd: { windows: 'winget install -e --id Opera.OperaGX' },
  },
  {
    id: 'google-chrome',
    name: 'Google Chrome',
    description: 'Navegador web mais popular',
    os: ['windows', 'linux'],
    categories: ['browsers'],
    installCmd: {
      windows: 'winget install -e --id Google.Chrome',
      linux: 'wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && sudo sh -c \'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list\' && sudo apt update && sudo apt install -y google-chrome-stable',
    },
  },
  {
    id: 'firefox',
    name: 'Mozilla Firefox',
    description: 'Navegador open-source focado em privacidade',
    os: ['windows', 'linux'],
    categories: ['browsers'],
    installCmd: {
      windows: 'winget install -e --id Mozilla.Firefox',
      linux: 'sudo apt install -y firefox',
    },
  },
  {
    id: 'brave',
    name: 'Brave Browser',
    description: 'Navegador rápido com bloqueador nativo',
    os: ['windows', 'linux'],
    categories: ['browsers'],
    installCmd: {
      windows: 'winget install -e --id Brave.Brave',
      linux: 'sudo apt install -y brave-browser', // Simplified for brevity in bulk, assuming repo added
    },
  },
  
  // Gamer
  {
    id: 'steam',
    name: 'Steam',
    description: 'A maior plataforma de jogos digitais do mundo',
    os: ['windows', 'linux'],
    categories: ['gamer'],
    installCmd: {
      windows: 'winget install -e --id Valve.Steam',
      linux: 'sudo apt install -y steam',
    },
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Comunicação essencial para gamers',
    os: ['windows', 'linux'],
    categories: ['gamer', 'utilities'],
    installCmd: {
      windows: 'winget install -e --id Discord.Discord',
      linux: 'sudo snap install discord',
    },
  },
  {
    id: 'epic-games',
    name: 'Epic Games Launcher',
    description: 'Loja da Epic Games (Fortnite, Unreal Engine)',
    os: ['windows'],
    categories: ['gamer'],
    installCmd: { windows: 'winget install -e --id EpicGames.EpicGamesLauncher' },
  },
  {
    id: 'obs-studio',
    name: 'OBS Studio',
    description: 'Software de gravação e streaming',
    os: ['windows', 'linux'],
    categories: ['gamer', 'media'],
    installCmd: {
      windows: 'winget install -e --id OBSProject.OBSStudio',
      linux: 'sudo apt install -y obs-studio',
    },
  },
  {
    id: 'gog-galaxy',
    name: 'GOG Galaxy',
    description: 'Cliente da loja GOG e integrador de bibliotecas',
    os: ['windows'],
    categories: ['gamer'],
    installCmd: { windows: 'winget install -e --id GOG.Galaxy' },
  },
  {
    id: 'ea-app',
    name: 'EA App',
    description: 'Plataforma de jogos da Electronic Arts',
    os: ['windows'],
    categories: ['gamer'],
    installCmd: { windows: 'winget install -e --id ElectronicArts.EADesktop' },
  },
  {
    id: 'battlenet',
    name: 'Battle.net',
    description: 'Launcher da Blizzard (WoW, Overwatch, Diablo)',
    os: ['windows'],
    categories: ['gamer'],
    installCmd: { windows: 'winget install -e --id Blizzard.BattleNet' },
  },
  {
    id: 'geforce-experience',
    name: 'GeForce Experience',
    description: 'Drivers e otimização para placas NVIDIA',
    os: ['windows'],
    categories: ['gamer', 'utilities'],
    installCmd: { windows: 'winget install -e --id Nvidia.GeForceExperience' },
  },
  {
    id: 'msi-afterburner',
    name: 'MSI Afterburner',
    description: 'Monitoramento e Overclock de GPU',
    os: ['windows'],
    categories: ['gamer', 'utilities'],
    installCmd: { windows: 'winget install -e --id Guru3D.Afterburner' },
  },

  // Dev
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'O editor de código mais utilizado do mundo',
    os: ['windows', 'linux'],
    categories: ['dev'],
    installCmd: {
      windows: 'winget install -e --id Microsoft.VisualStudioCode',
      linux: 'sudo snap install code --classic',
    },
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Controle de versão',
    os: ['windows', 'linux'],
    categories: ['dev'],
    installCmd: {
      windows: 'winget install -e --id Git.Git',
      linux: 'sudo apt install -y git',
    },
  },
  {
    id: 'nodejs',
    name: 'Node.js (LTS)',
    description: 'Runtime JavaScript',
    os: ['windows', 'linux'],
    categories: ['dev'],
    installCmd: {
      windows: 'winget install -e --id OpenJS.NodeJS.LTS',
      linux: 'sudo apt install -y nodejs npm',
    },
  },
  {
    id: 'docker',
    name: 'Docker Desktop',
    description: 'Plataforma de containers',
    os: ['windows', 'linux'],
    categories: ['dev'],
    installCmd: {
      windows: 'winget install -e --id Docker.DockerDesktop',
      linux: 'sudo apt install -y docker.io docker-compose',
    },
  },
  {
    id: 'python',
    name: 'Python 3',
    description: 'Linguagem de programação versátil',
    os: ['windows', 'linux'],
    categories: ['dev'],
    installCmd: {
      windows: 'winget install -e --id Python.Python.3.11',
      linux: 'sudo apt install -y python3 python3-pip',
    },
  },
  {
    id: 'postman',
    name: 'Postman',
    description: 'Plataforma para teste de APIs',
    os: ['windows', 'linux'],
    categories: ['dev'],
    installCmd: {
      windows: 'winget install -e --id Postman.Postman',
      linux: 'sudo snap install postman',
    },
  },
  {
    id: 'dbeaver',
    name: 'DBeaver',
    description: 'Gerenciador universal de banco de dados',
    os: ['windows', 'linux'],
    categories: ['dev'],
    installCmd: {
      windows: 'winget install -e --id dbeaver.dbeaver',
      linux: 'sudo snap install dbeaver-ce',
    },
  },

  // Productivity
  {
    id: 'notion',
    name: 'Notion',
    description: 'Espaço de trabalho all-in-one para notas e organização',
    os: ['windows'],
    categories: ['productivity'],
    installCmd: { windows: 'winget install -e --id Notion.Notion' },
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Mensageiro corporativo',
    os: ['windows', 'linux'],
    categories: ['productivity'],
    installCmd: {
      windows: 'winget install -e --id SlackTechnologies.Slack',
      linux: 'sudo snap install slack',
    },
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Videoconferências e reuniões online',
    os: ['windows', 'linux'],
    categories: ['productivity'],
    installCmd: {
      windows: 'winget install -e --id Zoom.Zoom',
      linux: 'sudo snap install zoom-client',
    },
  },
  {
    id: 'office',
    name: 'Microsoft 365 (Office)',
    description: 'Word, Excel, PowerPoint',
    os: ['windows'],
    categories: ['productivity'],
    installCmd: { windows: 'winget install -e --id Microsoft.Office' },
  },

  // Utilities
  {
    id: '7zip',
    name: '7-Zip',
    description: 'Compactador de arquivos de alta compressão',
    os: ['windows'],
    categories: ['utilities'],
    installCmd: { windows: 'winget install -e --id 7zip.7zip' },
  },
  {
    id: 'winrar',
    name: 'WinRAR',
    description: 'Famoso compactador de arquivos',
    os: ['windows'],
    categories: ['utilities'],
    installCmd: { windows: 'winget install -e --id RARLab.WinRAR' },
  },
  {
    id: 'rufus',
    name: 'Rufus',
    description: 'Criação de pendrives bootáveis',
    os: ['windows'],
    categories: ['utilities'],
    installCmd: { windows: 'winget install -e --id Rufus.Rufus' },
  },
  {
    id: 'powertoys',
    name: 'PowerToys',
    description: 'Ferramentas avançadas para Windows',
    os: ['windows'],
    categories: ['utilities'],
    installCmd: { windows: 'winget install -e --id Microsoft.PowerToys' },
  },
  {
    id: 'qbittorrent',
    name: 'qBittorrent',
    description: 'Cliente Torrent leve e sem anúncios',
    os: ['windows', 'linux'],
    categories: ['utilities'],
    installCmd: {
      windows: 'winget install -e --id qBittorrent.qBittorrent',
      linux: 'sudo apt install -y qbittorrent',
    },
  },

  // Media & Design
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Streaming de música',
    os: ['windows', 'linux'],
    categories: ['media'],
    installCmd: {
      windows: 'winget install -e --id Spotify.Spotify',
      linux: 'sudo snap install spotify',
    },
  },
  {
    id: 'vlc',
    name: 'VLC Media Player',
    description: 'Reprodutor de mídia open source que roda tudo',
    os: ['windows', 'linux'],
    categories: ['media'],
    installCmd: {
      windows: 'winget install -e --id VideoLAN.VLC',
      linux: 'sudo apt install -y vlc',
    },
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Ferramenta de design de interface (UI/UX)',
    os: ['windows'],
    categories: ['design'],
    installCmd: { windows: 'winget install -e --id Figma.Figma' },
  },
  {
    id: 'blender',
    name: 'Blender',
    description: 'Suite de criação 3D open-source',
    os: ['windows', 'linux'],
    categories: ['design', 'media'],
    installCmd: {
      windows: 'winget install -e --id BlenderFoundation.Blender',
      linux: 'sudo snap install blender --classic',
    },
  },
  {
    id: 'gimp',
    name: 'GIMP',
    description: 'Editor de imagens open-source',
    os: ['windows', 'linux'],
    categories: ['design'],
    installCmd: {
      windows: 'winget install -e --id GIMP.GIMP',
      linux: 'sudo apt install -y gimp',
    },
  },
];
