import type { MatchBlogData } from '@/components/match/MatchBlog';

export const uclBlogs: Record<string, MatchBlogData> = {

  'arsenal-vs-psg': {
    preview: [
      'The UEFA Champions League Final 2026 at the Allianz Arena in Munich is the most anticipated club football match of the decade. Arsenal FC and Paris Saint-Germain — two giants who have never before met at this stage — will battle for Europe\'s ultimate prize before 75,000 fans on 30 May 2026.',
      'Arsenal\'s journey through this campaign has been nothing short of extraordinary. Mikel Arteta\'s side topped Group D unbeaten, then eliminated Sporting CP, Atlético Madrid, and Bayern Munich in a pulsating semi-final. Their high-press, possession-based game has won admiring glances across the continent.',
      'PSG, under Luis Enrique, finally look the complete European team: blending Ousmane Dembélé\'s electrifying pace with Bradley Barcola\'s creativity and Gonçalo Ramos\'s lethal finishing. Having dispatched Real Madrid in the semis, they arrive in Munich full of confidence. This is the summit of club football — and it is live free on La 1, M6, and Canal+ Sport.',
    ],
    home: {
      name: 'Arsenal',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      form: ['W', 'W', 'W', 'D', 'W'],
      news: 'Bukayo Saka is fully fit after a knock against Bayern. Martin Ødegaard captains the side. Gabriel Magalhães and William Saliba remain the most solid central defensive partnership in Europe.',
      keyPlayers: [
        { name: 'Bukayo Saka', role: 'Right Wing — Key creator & scorer' },
        { name: 'Martin Ødegaard', role: 'Captain & Playmaker' },
        { name: 'Leandro Trossard', role: 'Impact sub / Left Wing' },
      ],
    },
    away: {
      name: 'PSG',
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
      form: ['W', 'W', 'D', 'W', 'W'],
      news: 'Gonçalo Ramos leads the attack after a 28-goal season. Ousmane Dembélé is in career-best form. Gianluigi Donnarumma — the best goalkeeper in the world right now — anchors a solid defensive unit.',
      keyPlayers: [
        { name: 'Ousmane Dembélé', role: 'Right Wing — Speed & dribbling threat' },
        { name: 'Gonçalo Ramos', role: 'Striker — UCL top scorer' },
        { name: 'Vitinha', role: 'Central Midfield — Engine room' },
      ],
    },
    h2h: {
      played: 4,
      homeWins: 2,
      draws: 1,
      awayWins: 1,
      lastMatch: 'PSG 2-1 Arsenal (2024 CL group stage)',
    },
    prediction: {
      score: '1-1',
      analysis: 'An extraordinarily tight contest. Arsenal\'s defensive structure will frustrate PSG in normal time but Dembélé\'s pace always poses danger. Expect a 1-1 draw at 90 minutes, with the Gunners edging it on penalties — but both teams have the quality to win it in open play.',
    },
    broadcastInfo: 'La 1 RTVE (Spain · Free), M6 (France · Free), Canal+ Sport (MENA), beIN Sport (Middle East), TRT (Turkey)',
  },

  'crystal-palace-vs-rayo': {
    preview: [
      'The UEFA Europa Conference League Final 2026 in Athens brings together two unforgettable stories: Crystal Palace, English football\'s classic sleeping giant now awoken under their ambitious ownership, and Rayo Vallecano, the working-class Madrid club making their first ever European final.',
      'Crystal Palace reached the final by eliminating Feyenoord, Slavia Prague, and Villarreal — finishing each knockout tie with dogged determination and clinical set-piece goals. Oliver Glasner\'s side conceded only three goals across the knockout rounds, underlining their defensive discipline.',
      'Rayo Vallecano\'s run is the fairytale of this year\'s European season. Regularly battling relegation in LaLiga, they channelled their passion into a stunning Conference League run, beating Basel, PAOK, and then Rapid Vienna in a thrilling semi-final. The match airs live and free on TRT 1.',
    ],
    home: {
      name: 'Crystal Palace',
      form: ['W', 'D', 'W', 'W', 'W'],
      news: 'Michael Olise is fit after minor fatigue issues. Jean-Philippe Mateta leads the attack with 12 European goals this season. Édouard Mendy is in excellent form between the posts.',
      keyPlayers: [
        { name: 'Michael Olise', role: 'Attacking Midfield — Creator & set-piece taker' },
        { name: 'Jean-Philippe Mateta', role: 'Striker — 12 European goals this season' },
        { name: 'Cheick Doucouré', role: 'Defensive Midfield — Engine & cover' },
      ],
    },
    away: {
      name: 'Rayo Vallecano',
      form: ['W', 'W', 'L', 'W', 'D'],
      news: 'Isi Palazón carries the creative load for Rayo. Radamel Falcao — yes, the legend himself — has contributed three vital goals in Europe this season in a player-coach hybrid role. A suspended midfielder is a concern going in.',
      keyPlayers: [
        { name: 'Isi Palazón', role: 'Right Wing — Speed & crossing' },
        { name: 'Raúl de Tomás', role: 'Striker — Clinical finisher' },
        { name: 'Pathé Ciss', role: 'Defensive Midfield — Disruptor' },
      ],
    },
    h2h: {
      played: 0,
      homeWins: 0,
      draws: 0,
      awayWins: 0,
      lastMatch: 'First ever meeting',
    },
    prediction: {
      score: '1-0',
      analysis: 'Crystal Palace\'s superior defensive record and set-piece quality gives them the edge. Mateta is likely to find the net from an Olise delivery. Expect a tight 1-0 to Palace, though Rayo will threaten on the break through Palazón\'s pace.',
    },
    broadcastInfo: 'TRT 1 (Turkey · Free), BT Sport / TNT Sports (UK), beIN Sport (MENA)',
  },

};
