import type { MatchBlogData } from '@/components/match/MatchBlog';

export const blogs: Record<string, MatchBlogData> = {

  'mexico-vs-south-africa': {
    preview: [
      'Mexico open the 2026 FIFA World Cup at Estadio Azteca in Mexico City — one of the most iconic stadiums in football history and the same ground where Diego Maradona scored his legendary "Hand of God" goal in 1986. Playing in front of a ferocious home crowd, El Tri are heavy favourites to claim three points in what promises to be an electric atmosphere.',
      'South Africa make their return to World Cup football after missing the 2022 edition in Qatar. Bafana Bafana qualified through a hard-fought CAF playoff campaign and arrive with momentum, but will need to contain Mexico\'s attacking quality from the first whistle.',
      'Mexico have never lost a World Cup group stage match on home soil, a record that stretches back decades. However, they will be wary of a South African side that has nothing to lose and everything to gain on football\'s biggest stage.',
    ],
    home: {
      name: 'Mexico',
      flag: 'mx',
      form: ['W', 'W', 'D', 'W', 'L'],
      news: 'Santiago Giménez leads the line after an outstanding club season in Europe. Hirving Lozano returns to full fitness and is expected to start on the right wing. Manager Jaime Lozano has a fully fit squad with no major injury concerns.',
      keyPlayers: [
        { name: 'Santiago Giménez', role: 'Striker — 23 club goals this season' },
        { name: 'Hirving Lozano', role: 'Winger — pace & direct threat' },
        { name: 'Edson Álvarez', role: 'Midfielder — engine of the team' },
      ],
    },
    away: {
      name: 'South Africa',
      flag: 'za',
      form: ['W', 'D', 'W', 'L', 'W'],
      news: 'Bafana Bafana travel without suspended defender Rushine De Reuck. Percy Tau is fit after a minor ankle knock and will be crucial in creating chances. Coach Hugo Broos plans a compact 4-5-1 to frustrate Mexico early.',
      keyPlayers: [
        { name: 'Percy Tau', role: 'Forward — creative spark' },
        { name: 'Themba Zwane', role: 'Winger — danger man on the break' },
        { name: 'Ronwen Williams', role: 'Goalkeeper — CAF best GK 2024' },
      ],
    },
    h2h: { played: 3, homeWins: 2, draws: 1, awayWins: 0, lastMatch: 'Mexico 2-1 South Africa (2010)' },
    prediction: { score: '3-1', analysis: 'Mexico\'s home advantage and superior squad depth should prove decisive. Expect Giménez to open his World Cup account in front of a raucous Azteca crowd.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), Televisa (Mexico), SABC (South Africa)',
  },

  'korea-vs-czechia': {
    preview: [
      'South Korea and Czechia meet in Group C at AT&T Stadium in Dallas — a fixture between two sides capable of a surprise run in this tournament. Korea are built around the world-class Son Heung-min, who enters what is likely his final World Cup determined to make a lasting impact.',
      'Czechia qualified through the European playoffs and arrive with a settled squad featuring Bundesliga and Premier League talent. Tomáš Souček brings box-to-box power in midfield, while Patrik Schick remains a serious goal threat despite fitness concerns leading up to the tournament.',
      'Korea were outstanding at Qatar 2022, reaching the last 16. They\'ve built on that, investing in dual-nationality players and a high-pressing style under their European coach. Czechia, meanwhile, lost narrowly to Portugal in qualifying and know they must win their opening game to stay alive.',
    ],
    home: {
      name: 'Korea',
      flag: 'kr',
      form: ['W', 'W', 'D', 'W', 'W'],
      news: 'Son Heung-min is fully fit and in excellent form coming off a strong Premier League season. Lee Jae-sung returns from a knee ligament injury sustained in February. Hwang Hee-chan partners Son up front in a dynamic 4-2-3-1.',
      keyPlayers: [
        { name: 'Son Heung-min', role: 'Captain — top scorer & leader' },
        { name: 'Lee Kang-in', role: 'Midfielder — creativity & set pieces' },
        { name: 'Kim Min-jae', role: 'Centre-back — best defender in Asia' },
      ],
    },
    away: {
      name: 'Czechia',
      flag: 'cz',
      form: ['W', 'L', 'W', 'D', 'W'],
      news: 'Patrik Schick was a doubt after a hamstring issue but has been declared fit. Vladimír Coufal provides solid cover at right-back. Slavia Prague midfielder Lukáš Provod is in outstanding domestic form and expected to start.',
      keyPlayers: [
        { name: 'Patrik Schick', role: 'Striker — clinical finisher' },
        { name: 'Tomáš Souček', role: 'Midfielder — physicality & goals' },
        { name: 'Vladimír Coufal', role: 'Right-back — experience & deliveries' },
      ],
    },
    h2h: { played: 5, homeWins: 2, draws: 1, awayWins: 2, lastMatch: 'Korea 3-3 Czechia (Friendly, 2019)' },
    prediction: { score: '2-1', analysis: 'Son Heung-min in a World Cup on the big stage is virtually unstoppable. Korea\'s pace and pressing should edge an entertaining affair against an experienced but ageing Czechia side.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), MBC (Korea), CT Sport (Czechia)',
  },

  'canada-vs-bosnia': {
    preview: [
      'Canada face Bosnia and Herzegovina in Group D at BC Place, Vancouver — one of only two World Cup venues on Canadian soil. The hosts carry enormous expectations: this is Canada\'s first World Cup on home turf and arguably the golden generation of Canadian football, featuring Alphonso Davies, Jonathan David, and Tajon Buchanan.',
      'Bosnia & Herzegovina qualified via the European playoffs for their second ever World Cup appearance. Miralem Pjanić, now 36, could be in his final tournament and will be determined to bow out with a statement performance. Edin Džeko, Bosnia\'s all-time leading scorer, retired in 2024, leaving a gap up front.',
      'Canada\'s attacking depth is remarkable — Jonathan David finished as Ligue 1 top scorer, Buchanan impressed in Serie A, and Davies remains one of Europe\'s premier left-backs. If they fire in tandem, Bosnia will struggle to cope.',
    ],
    home: {
      name: 'Canada',
      flag: 'ca',
      form: ['W', 'W', 'W', 'D', 'W'],
      news: 'Alphonso Davies is fully fit after a busy Champions League campaign. Jonathan David leads the line in brilliant club form. Liam Millar provides pace on the flank. Manager Jesse Marsch has no injury concerns and is expected to play an adventurous 4-3-3.',
      keyPlayers: [
        { name: 'Jonathan David', role: 'Striker — 30+ club goals this season' },
        { name: 'Alphonso Davies', role: 'Left-back / winger — pace & crossing' },
        { name: 'Tajon Buchanan', role: 'Winger — direct dribbler' },
      ],
    },
    away: {
      name: 'Bosnia',
      flag: 'ba',
      form: ['L', 'W', 'D', 'W', 'L'],
      news: 'Miralem Pjanić returns from international retirement for one last World Cup. Ermedin Demirović leads the attack and is in good club form. Several key players arrived in camp late due to club obligations, which may affect cohesion in this opener.',
      keyPlayers: [
        { name: 'Ermedin Demirović', role: 'Striker — consistent scorer' },
        { name: 'Miralem Pjanić', role: 'Midfielder — experience & vision' },
        { name: 'Sead Kolašinac', role: 'Defender — veteran leader' },
      ],
    },
    h2h: { played: 2, homeWins: 1, draws: 1, awayWins: 0, lastMatch: 'Canada 2-0 Bosnia (Friendly, 2021)' },
    prediction: { score: '3-0', analysis: 'Canada\'s home crowd and attacking firepower should be too much for a Bosnia side still finding its identity without Džeko. A comfortable victory for the hosts.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), TSN (Canada), BHT1 (Bosnia)',
  },

  'usa-vs-paraguay': {
    preview: [
      'The United States open their 2026 campaign at MetLife Stadium in East Rutherford, New Jersey — the largest of the three host nations\' venues. With an 82,500 capacity expected to be filled with passionate home support, the USMNT have an enormous advantage on their side from the first whistle.',
      'Paraguay qualified through CONMEBOL\'s brutal South American qualifying, finishing fifth and only scraping through via playoff. Driven by striker Miguel Almirón and marshalled by veteran goalkeeper Antony Silva, La Albirroja are dangerous on the counter but lack the creative quality to dominate possession games.',
      'Christian Pulisic enters the tournament in the best form of his career, coming off a stellar domestic season. The USA\'s youthful squad — averaging just 24 years old — is built for exactly this occasion. A packed MetLife crowd roaring from the start could make this feel like a home playoff game for the ages.',
    ],
    home: {
      name: 'USA',
      flag: 'us',
      form: ['W', 'W', 'W', 'W', 'D'],
      news: 'Christian Pulisic leads the squad in excellent condition. Weston McKennie returns after missing the Confederations Cup with injury. Folarin Balogun spearheads the attack after choosing USMNT over Nigeria. Gregg Berhalter has a fully fit squad for the opener.',
      keyPlayers: [
        { name: 'Christian Pulisic', role: 'Captain — key chance creator' },
        { name: 'Folarin Balogun', role: 'Striker — clinical in front of goal' },
        { name: 'Tyler Adams', role: 'Midfielder — defensive anchor' },
      ],
    },
    away: {
      name: 'Paraguay',
      flag: 'py',
      form: ['L', 'W', 'D', 'L', 'W'],
      news: 'Miguel Almirón is fit and will captain the side from midfield. Striker Julio Enciso, who impressed at Brighton, has recovered from a ligament injury and is in the squad. Paraguay\'s defensive structure will be key — coach Gustavo Alfaro typically sets up in a hard-to-beat 4-4-2.',
      keyPlayers: [
        { name: 'Miguel Almirón', role: 'Midfielder — driving force' },
        { name: 'Julio Enciso', role: 'Forward — unpredictable talent' },
        { name: 'Antony Silva', role: 'Goalkeeper — experienced stopper' },
      ],
    },
    h2h: { played: 4, homeWins: 2, draws: 1, awayWins: 1, lastMatch: 'USA 0-0 Paraguay (Friendly, 2023)' },
    prediction: { score: '3-1', analysis: 'The USA\'s combination of home advantage, squad depth and Pulisic\'s form makes them comfortable winners. Expect the MetLife crowd to drive them to a statement opening victory.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), Fox Sports (USA), Tigo Sports (Paraguay)',
  },

  'haiti-vs-scotland': {
    preview: [
      'Haiti and Scotland contest a fascinating Group E opener at NRG Stadium in Houston — a match between two sides with contrasting stories but identical ambitions. For Haiti, reaching the World Cup is a historic achievement for a nation still rebuilding. For Scotland, it ends a 28-year wait since their last World Cup appearance in France 1998.',
      'Scotland qualified via the European playoffs, beating Ukraine in a tense two-legged tie. Steve Clarke\'s side is built on Premier League and Championship-based talent, with Scott McTominay emerging as a genuine international star after a stunning 2024-25 club season at Napoli.',
      'Haiti, coached by a French manager, play direct, physical football with a hardworking midfield. Their qualification campaign stunned CONCACAF — they\'ll look to frustrate Scotland in the opening stages and hit on the break. In the Texas heat, fitness and intensity will be just as important as quality.',
    ],
    home: {
      name: 'Haiti',
      flag: 'ht',
      form: ['W', 'D', 'W', 'W', 'L'],
      news: 'Duckens Nazon leads the attack after impressive CONCACAF qualifying form. Steeven Saba adds creativity in central midfield. Haiti have a cohesive unit with most players having played together for 3+ years under the same coach. No major injuries reported.',
      keyPlayers: [
        { name: 'Duckens Nazon', role: 'Striker — top CONCACAF scorer' },
        { name: 'Steeven Saba', role: 'Midfielder — heart of the team' },
        { name: 'Josué Duverger', role: 'Goalkeeper — dependable shot-stopper' },
      ],
    },
    away: {
      name: 'Scotland',
      flag: 'gb',
      form: ['W', 'W', 'D', 'W', 'W'],
      news: 'Scott McTominay is in sensational form after his move to Napoli. Andy Robertson is fit after a shoulder problem in April. Che Adams leads the line and scored 4 goals in qualifying. Steve Clarke is expected to set up in a 3-4-3 with plenty of overlapping wing-backs.',
      keyPlayers: [
        { name: 'Scott McTominay', role: 'Midfielder — leader & goalscorer' },
        { name: 'Andy Robertson', role: 'Left-back — delivery & energy' },
        { name: 'Che Adams', role: 'Striker — pressing & finishing' },
      ],
    },
    h2h: { played: 1, homeWins: 0, draws: 0, awayWins: 1, lastMatch: 'Scotland 2-0 Haiti (Friendly, 2022)' },
    prediction: { score: '1-2', analysis: 'Scotland\'s Premier League quality and McTominay\'s form should be enough to edge it. Haiti will make it uncomfortable, but Scotland\'s experience on the biggest stage should see them through.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), Sky Sports (UK), Télémax (Haiti)',
  },

  'australia-vs-turkiye': {
    preview: [
      'Australia and Türkiye face off at the Rose Bowl in Pasadena — one of the most storied venues in American football history — in what promises to be a competitive Group F opener. The Socceroos qualified through the AFC playoffs while Türkiye, semi-finalists at Euro 2024, come as one of the tournament\'s dark horses.',
      'Türkiye\'s rise under manager Vincenzo Montella has been remarkable. Hakan Çalhanoğlu, the Inter Milan maestro, pulls the strings from deep, while Arda Güler — who lit up Euro 2024 as an 18-year-old — enters the World Cup as one of the most exciting teenagers in world football.',
      'Australia under Graham Arnold are experienced at World Cups. Mathew Ryan is one of the best goalkeepers at this tournament, and Harry Souttar organises a disciplined defence. The Socceroos\' big question is goals — with Mitchell Duke and Adam Taggart competing up front, they\'ll need to be clinical against a Turkish side that can punish any mistakes.',
    ],
    home: {
      name: 'Australia',
      flag: 'au',
      form: ['D', 'W', 'W', 'L', 'W'],
      news: 'Mathew Ryan is fit after a late knock at club level. Mitchell Duke leads the attack after scoring the crucial playoff winner. Martin Boyle is unavailable through injury. Riley McGree provides the creative spark from midfield with solid Premier League form.',
      keyPlayers: [
        { name: 'Mathew Ryan', role: 'Goalkeeper — world-class saves' },
        { name: 'Harry Souttar', role: 'Centre-back — dominant in the air' },
        { name: 'Riley McGree', role: 'Midfielder — creative engine' },
      ],
    },
    away: {
      name: 'Türkiye',
      flag: 'tr',
      form: ['W', 'W', 'W', 'D', 'W'],
      news: 'Hakan Çalhanoğlu is in exceptional form coming off a stellar Serie A season with Inter. Arda Güler has been outstanding in training. Yılmaz Erdoğan is a doubt with a calf injury, potentially opening the door for Kerem Aktürkoğlu on the right wing.',
      keyPlayers: [
        { name: 'Hakan Çalhanoğlu', role: 'Midfielder — passes & long shots' },
        { name: 'Arda Güler', role: 'Attacking mid — Euro 2024 sensation' },
        { name: 'Cenk Tosun', role: 'Striker — experience up front' },
      ],
    },
    h2h: { played: 2, homeWins: 1, draws: 0, awayWins: 1, lastMatch: 'Australia 1-1 Türkiye (Friendly, 2023)' },
    prediction: { score: '1-2', analysis: 'Türkiye\'s creative quality through Güler and Çalhanoğlu should prove the difference. Australia will be competitive but Türkiye\'s depth in the final third is a clear step above.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), Optus Sport (Australia), TRT (Türkiye)',
  },

  'brazil-vs-morocco': {
    preview: [
      'Brazil versus Morocco is the standout fixture of the entire group stage — a blockbuster clash at MetLife Stadium between the five-time world champions and the side that shocked the world at Qatar 2022 by reaching the semi-finals. Over 82,000 fans will pack into East Rutherford for what could be a World Cup classic.',
      'Brazil, still searching for a sixth world title after their heartbreaking quarter-final exit in Qatar, come into this tournament with a renewed sense of purpose. Vinicius Jr — arguably the world\'s best player — is the focal point, with Rodrygo, Raphinha and a remarkable supporting cast. Brazil\'s blend of flair and physicality under their coach has them among the genuine favourites.',
      'Morocco are anything but intimidated. The Atlas Lions became Africa\'s greatest ever World Cup side in Qatar, and they\'ve only strengthened since. Achraf Hakimi at right-back, Hakim Ziyech creating, and a back four that barely conceded in qualifying — this is a match that will define Group G and potentially the entire tournament.',
    ],
    home: {
      name: 'Brazil',
      flag: 'br',
      form: ['W', 'W', 'W', 'D', 'W'],
      news: 'Vinicius Jr is fully fit and has been brilliant in pre-tournament friendlies. Neymar\'s participation remains uncertain due to his knee — he has been included in the squad but may start on the bench. Endrick, 18, is in outstanding form and pushing for a starting spot. Alisson Becker is fit in goal.',
      keyPlayers: [
        { name: 'Vinicius Jr', role: 'Winger — world\'s top player' },
        { name: 'Rodrygo', role: 'Forward — big-game performer' },
        { name: 'Bruno Guimarães', role: 'Midfielder — control & goals' },
      ],
    },
    away: {
      name: 'Morocco',
      flag: 'ma',
      form: ['W', 'W', 'D', 'W', 'W'],
      news: 'Achraf Hakimi returns after missing two pre-tournament friendlies with a minor muscle issue. Hakim Ziyech is in outstanding form. Yassine Bounou (Bono) is fully fit and arguably the best goalkeeper at this World Cup. Morocco are at full strength for this opening match.',
      keyPlayers: [
        { name: 'Achraf Hakimi', role: 'Right-back — best in the world' },
        { name: 'Hakim Ziyech', role: 'Attacking mid — creator & scorer' },
        { name: 'Yassine Bounou', role: 'Goalkeeper — penalty specialist' },
      ],
    },
    h2h: { played: 6, homeWins: 4, draws: 1, awayWins: 1, lastMatch: 'Brazil 2-0 Morocco (Friendly, 2023)' },
    prediction: { score: '2-1', analysis: 'Brazil\'s individual quality and depth should edge it, but Morocco will make them earn every single goal. Expect Vinicius to be the decisive factor in a fiercely contested 90 minutes.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), Globo (Brazil), 2M (Morocco)',
  },

  'qatar-vs-switzerland': {
    preview: [
      'Qatar and Switzerland meet in Group H at Estadio Azteca, Mexico City — a venue with enormous World Cup history. Qatar are the defending host nation making their second consecutive World Cup appearance, while Switzerland arrive as one of Europe\'s most consistent qualifying sides.',
      'Qatar\'s 2022 experience on home soil ended disappointingly, with the host nation eliminated in the group stage for the first time ever. Coach Félix Sánchez has since been replaced, and Qatar have worked hard to build a more competitive squad through their naturalisation programme and the steady development of Al Sadd and Al Hilal players.',
      'Switzerland, under Murat Yakin, are a settled and well-organised side. Granit Xhaka captains from midfield with authority, Xherdan Shaqiri provides veteran experience, and Breel Embolo leads the line. The Swiss are a tough team to beat — they\'ve reached the last 16 in each of the last four World Cups.',
    ],
    home: {
      name: 'Qatar',
      flag: 'qa',
      form: ['W', 'D', 'L', 'W', 'D'],
      news: 'Akram Afif leads the Qatar attack as the Asian Cup Golden Ball winner. Almoez Ali provides pace and goals from the right. Qatar travel without defender Abdelkarim Hassan who is suspended. Coach Carlos Queiroz sets up in a disciplined 4-3-3 that aims to control possession.',
      keyPlayers: [
        { name: 'Akram Afif', role: 'Winger — best player in Asia' },
        { name: 'Almoez Ali', role: 'Striker — clinical finisher' },
        { name: 'Meshaal Barsham', role: 'Goalkeeper — shot-stopper' },
      ],
    },
    away: {
      name: 'Switzerland',
      flag: 'ch',
      form: ['W', 'W', 'W', 'D', 'W'],
      news: 'Granit Xhaka leads the squad as captain in exceptional Bundesliga form with Bayer Leverkusen. Breel Embolo has found form in Ligue 1. Noah Okafor is pushing for a starting berth after a strong Club World Cup campaign. Switzerland have zero injury concerns.',
      keyPlayers: [
        { name: 'Granit Xhaka', role: 'Midfielder — captain & leader' },
        { name: 'Breel Embolo', role: 'Striker — physical & technical' },
        { name: 'Xherdan Shaqiri', role: 'Forward — veteran game-changer' },
      ],
    },
    h2h: { played: 3, homeWins: 1, draws: 0, awayWins: 2, lastMatch: 'Qatar 1-3 Switzerland (Friendly, 2023)' },
    prediction: { score: '1-2', analysis: 'Switzerland\'s European pedigree and Xhaka\'s leadership make them strong favourites. Qatar will compete but ultimately the Swiss squad depth should prove decisive.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), SRF (Switzerland), beIN Sport (Qatar)',
  },

  'ivory-coast-vs-ecuador': {
    preview: [
      'Ivory Coast and Ecuador contest Group I at Levi\'s Stadium in Santa Clara — a match between two well-organised sides from different confederations, both capable of making it through. The Elephants are Africa\'s most exciting team at this tournament, while Ecuador have become one of CONMEBOL\'s most reliable qualifiers.',
      'Ivory Coast\'s golden generation — Didier Drogba\'s era — is long gone, but a new wave of talent has emerged. Sébastien Haller leads the attack after overcoming testicular cancer to continue his career, while Nicolas Pépé and Simon Adingra provide pace on the flanks. They\'re more than capable of a deep run.',
      'Ecuador, under coach Félix Torres, qualified comfortably through South America\'s brutal ten-team league. Enner Valencia, their record scorer, remains the focal point despite his age, while younger talents like Moisés Caicedo have elevated this squad to a new level. This promises to be a tightly contested opener.',
    ],
    home: {
      name: 'Ivory Coast',
      flag: 'ci',
      form: ['W', 'W', 'D', 'W', 'L'],
      news: 'Sébastien Haller is fully fit after a difficult year. Franck Kessié returns from international exile and adds crucial Premier League experience in midfield. Simon Adingra, fresh off a brilliant Brighton season, starts on the right. Coach Emerse Faé has a settled group with strong team spirit from their AFCON triumph.',
      keyPlayers: [
        { name: 'Sébastien Haller', role: 'Striker — physical & clinical' },
        { name: 'Franck Kessié', role: 'Midfielder — box-to-box power' },
        { name: 'Simon Adingra', role: 'Winger — pace & direct play' },
      ],
    },
    away: {
      name: 'Ecuador',
      flag: 'ec',
      form: ['W', 'D', 'W', 'W', 'D'],
      news: 'Enner Valencia leads the attack as captain. Moisés Caicedo is the most sought-after player in this squad after his Chelsea breakthrough — he\'ll be key in controlling midfield. Gonzalo Plata returns from a loan spell in a rich vein of form. Ecuador are at full strength.',
      keyPlayers: [
        { name: 'Enner Valencia', role: 'Striker — record goalscorer' },
        { name: 'Moisés Caicedo', role: 'Midfielder — world-class talent' },
        { name: 'Gonzalo Plata', role: 'Winger — pace & direct play' },
      ],
    },
    h2h: { played: 4, homeWins: 2, draws: 1, awayWins: 1, lastMatch: 'Ivory Coast 2-1 Ecuador (Friendly, 2022)' },
    prediction: { score: '1-1', analysis: 'Two evenly matched sides should produce a competitive draw. Caicedo\'s midfield control for Ecuador will be the key battle against Kessié. Goals from set pieces likely.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), Rti (Ivory Coast), TC Televisión (Ecuador)',
  },

  'germany-vs-curacao': {
    preview: [
      'Germany play their opening World Cup match since their catastrophic 2018 group stage exit, and they\'ve drawn arguably the most favourable opening fixture of the tournament — hosting Curaçao, making their World Cup debut, at AT&T Stadium in Dallas. This is Germany\'s statement match.',
      'Die Mannschaft have undergone a complete overhaul under Julian Nagelsmann. Florian Wirtz and Jamal Musiala — both 22 — form one of the most exciting attacking midfield partnerships in world football. Thomas Müller, now 36, may be making his last World Cup bow. Expect Germany to attack from the first whistle.',
      'Curaçao\'s qualification is one of the great underdog stories of this World Cup cycle. The small Caribbean island — population 150,000 — upset Costa Rica in the CONCACAF playoffs, powered by European-based professionals including Leandro Bacuna and Cuco Martina\'s younger relatives. They have nothing to lose and will play with freedom.',
    ],
    home: {
      name: 'Germany',
      flag: 'de',
      form: ['W', 'W', 'W', 'W', 'D'],
      news: 'Florian Wirtz and Jamal Musiala are fully fit and in outstanding form coming off a brilliant Bundesliga season. Thomas Müller was included in a surprise call-up and is expected to start. Manuel Neuer remains first choice in goal. Kai Havertz leads the attack after a strong Arsenal season.',
      keyPlayers: [
        { name: 'Florian Wirtz', role: 'Attacking mid — best young player in world' },
        { name: 'Jamal Musiala', role: 'Attacking mid — dribbler & creator' },
        { name: 'Kai Havertz', role: 'Striker — technical finisher' },
      ],
    },
    away: {
      name: 'Curaçao',
      flag: 'cw',
      form: ['W', 'L', 'W', 'D', 'W'],
      news: 'Leandro Bacuna captains the side with pride. The squad is made up entirely of European-based professionals, mostly playing in the Dutch Eredivisie and lower English leagues. Coach Remko Bicentini sets up defensively in a 5-4-1, hoping to frustrate Germany and nick something on the counter.',
      keyPlayers: [
        { name: 'Leandro Bacuna', role: 'Captain — leadership & experience' },
        { name: 'Cuco Martina Jr', role: 'Right-back — athletic & direct' },
        { name: 'Rangelo Janga', role: 'Forward — pace on the break' },
      ],
    },
    h2h: { played: 0, homeWins: 0, draws: 0, awayWins: 0, lastMatch: 'First ever meeting' },
    prediction: { score: '5-1', analysis: 'Germany will use this match to settle into the tournament with a statement performance. Wirtz and Musiala should run riot against a Curaçao defence that will be overwhelmed by the quality on show.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), ARD/ZDF (Germany), Extra (Curaçao)',
  },

  'netherlands-vs-japan': {
    preview: [
      'The Netherlands and Japan meet in Group K at Gillette Stadium in Foxborough, Massachusetts — one of the most anticipated clashes of the opening round. The Oranje are genuine World Cup contenders, while Japan have proven at back-to-back World Cups that they are capable of beating the very best.',
      'Louis van Gaal\'s successor has inherited a squad of remarkable talent. Virgil van Dijk leads a formidable defence, Frenkie de Jong controls from midfield, and a front line featuring Cody Gakpo, Xavi Simons and Memphis Depay offers devastating variety. The Dutch enter as one of Europe\'s top seeds.',
      'Japan\'s performances at Qatar 2022 — beating Germany and Spain in the group stage — sent a message to the world. Under Hajime Moriyasu, they play a high-pressing, counter-attacking style that has surprised multiple major nations. Takumi Minamino, Ao Tanaka and a new generation of Bundesliga and Premier League-based stars make them more dangerous than ever.',
    ],
    home: {
      name: 'Netherlands',
      flag: 'nl',
      form: ['W', 'W', 'D', 'W', 'W'],
      news: 'Virgil van Dijk is fit after a hectic Premier League season. Frenkie de Jong overcomes a minor ankle issue to start. Cody Gakpo leads the line after a brilliant Liverpool campaign. Ryan Gravenberch provides midfield depth. The Dutch have no serious injury concerns ahead of their opening match.',
      keyPlayers: [
        { name: 'Cody Gakpo', role: 'Forward — goals & creativity' },
        { name: 'Xavi Simons', role: 'Attacking mid — explosive talent' },
        { name: 'Virgil van Dijk', role: 'Centre-back — defensive anchor' },
      ],
    },
    away: {
      name: 'Japan',
      flag: 'jp',
      form: ['W', 'W', 'W', 'D', 'W'],
      news: 'Takumi Minamino is in brilliant form at AS Monaco. Ao Tanaka anchors the midfield with Championship experience. Hiroki Sakai is expected to start at right-back. Japan train with high intensity — Moriyasu is likely to deploy a reactive 4-5-1 that transitions rapidly into attack.',
      keyPlayers: [
        { name: 'Takumi Minamino', role: 'Forward — pressing & goals' },
        { name: 'Ao Tanaka', role: 'Midfielder — hard-working engine' },
        { name: 'Takehiro Tomiyasu', role: 'Defender — physical & versatile' },
      ],
    },
    h2h: { played: 7, homeWins: 5, draws: 1, awayWins: 1, lastMatch: 'Netherlands 4-2 Japan (Friendly, 2023)' },
    prediction: { score: '2-1', analysis: 'Netherlands have too much quality to lose this, but Japan\'s counter-pressing will create problems. Expect a hard-fought Dutch win, with Gakpo and Simons providing the decisive moments.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), NOS (Netherlands), NHK (Japan)',
  },

  'sweden-vs-tunisia': {
    preview: [
      'Sweden face Tunisia in Group L at Arrowhead Stadium in Kansas City — a match between two sides desperate to qualify from what looks like an open group. Sweden qualified through the European playoffs while Tunisia, regulars at the World Cup since 1978, bring North African flair and tactical discipline.',
      'Sweden\'s golden generation — the Zlatan era — is over, but a new group of talent has stepped up. Alexander Isak, after a breakthrough Newcastle season, leads the line with pace, technique and composure in front of goal. Dejan Kulusevski provides the creativity from a wide midfield position.',
      'Tunisia, under their Spanish coach, have developed one of Africa\'s most tactically sophisticated setups. Wahbi Khazri provides veteran leadership while Issam Jebali finished as one of CAF qualifying\'s top scorers. In the Kansas City heat, a slow start from either side could prove costly.',
    ],
    home: {
      name: 'Sweden',
      flag: 'se',
      form: ['W', 'D', 'W', 'W', 'L'],
      news: 'Alexander Isak is in sensational form after his Premier League breakthrough season. Dejan Kulusevski recovered from a foot issue in time for the tournament. Viktor Gyökeres, the Portuguese league\'s top scorer, adds firepower from the bench. Sweden\'s 4-3-3 is well-drilled and hard to break down.',
      keyPlayers: [
        { name: 'Alexander Isak', role: 'Striker — pace, technique & goals' },
        { name: 'Dejan Kulusevski', role: 'Winger — creativity & pressing' },
        { name: 'Viktor Gyökeres', role: 'Striker — 50+ goals this season' },
      ],
    },
    away: {
      name: 'Tunisia',
      flag: 'tn',
      form: ['W', 'W', 'D', 'L', 'W'],
      news: 'Wahbi Khazri returns to the squad as captain. Issam Jebali leads the attack after his prolific African qualifying campaign. Ellyes Skhiri is a key midfield figure after leaving Cologne for Eintracht Frankfurt. Tunisia are fully fit and motivated for what they see as a winnable group.',
      keyPlayers: [
        { name: 'Issam Jebali', role: 'Striker — clinical finisher' },
        { name: 'Ellyes Skhiri', role: 'Midfielder — physical & progressive' },
        { name: 'Wahbi Khazri', role: 'Forward — veteran leader' },
      ],
    },
    h2h: { played: 2, homeWins: 1, draws: 1, awayWins: 0, lastMatch: 'Sweden 1-1 Tunisia (Friendly, 2021)' },
    prediction: { score: '2-0', analysis: 'Sweden\'s quality up front — Isak and potentially Gyökeres off the bench — should prove too much for Tunisia\'s defence. A clean sheet win sets Sweden up perfectly in the group.' },
    broadcastInfo: 'M6 (France), beIN Sport 1 (MENA), SVT (Sweden), Watania (Tunisia)',
  },

  'belgium-vs-tunisia': {
    preview: [
      'La Belgique affronte la Tunisie dans un match amical international ce 6 juin 2026 — une confrontation entre les Diables Rouges et les Aigles de Carthage très attendue des supporters francophones et arabophones, à quelques jours du coup d\'envoi de la Coupe du Monde 2026.',
      'Ce match de préparation est une opportunité pour les deux sélectionneurs d\'affiner leurs systèmes de jeu et tester leurs rotations avant le Mondial. Pour la Belgique, menée par Kevin De Bruyne, c\'est l\'occasion de trouver les automatismes offensifs. Pour la Tunisie, c\'est le dernier test grandeur nature avant de défier les cadors mondiaux.',
      'Les Aigles de Carthage ont toujours su hausser leur niveau face aux équipes européennes. Issam Jebali, Ellyes Skhiri et Wahbi Khazri forment un trio capable de créer des difficultés à n\'importe quelle défense. Ce match amical s\'annonce plus serré qu\'il n\'y paraît.',
    ],
    home: {
      name: 'Belgium',
      flag: 'be',
      form: ['W', 'W', 'W', 'D', 'W'],
      news: 'Kevin De Bruyne mène le groupe belge en grande forme après une saison exceptionnelle en club. Romelu Lukaku est à 100 % après avoir soigné une blessure à la cheville. Thibaut Courtois revient en pleine confiance après sa saison à Madrid. Le sélectionneur a un groupe compétitif sans blessés majeurs.',
      keyPlayers: [
        { name: 'Kevin De Bruyne', role: 'Milieu — maestro, passes décisives & buts' },
        { name: 'Romelu Lukaku', role: 'Attaquant — finisseur implacable' },
        { name: 'Thibaut Courtois', role: 'Gardien — l\'un des meilleurs au monde' },
      ],
    },
    away: {
      name: 'Tunisia',
      flag: 'tn',
      form: ['W', 'W', 'D', 'L', 'W'],
      news: 'Wahbi Khazri revient comme capitaine avec beaucoup d\'expérience. Issam Jebali mène l\'attaque après une campagne africaine prolifique. Ellyes Skhiri est une pièce maîtresse du milieu de terrain après son passage en Bundesliga. La Tunisie aborde ce Mondial 2026 avec un groupe soudé et motivé.',
      keyPlayers: [
        { name: 'Issam Jebali', role: 'Attaquant — finisseur clinique' },
        { name: 'Ellyes Skhiri', role: 'Milieu — physique & progressif' },
        { name: 'Wahbi Khazri', role: 'Attaquant — capitaine expérimenté' },
      ],
    },
    h2h: { played: 3, homeWins: 2, draws: 1, awayWins: 0, lastMatch: 'Belgium 3-1 Tunisia (WC 2018, Moscou)' },
    prediction: { score: '2-1', analysis: 'La Belgique s\'impose de justesse dans un match amical disputé. La Tunisie crée des difficultés mais la qualité individuelle de De Bruyne et Lukaku fait la différence. Match serré jusqu\'au bout.' },
    broadcastInfo: 'L\'Équipe TV (France/Belgique, gratuit), beIN Sport 1 (MENA), Arryadia TNT (Maroc), RMC Sport (France)',
  },

};
