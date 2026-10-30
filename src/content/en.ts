import type { Dictionary } from './types'

// All English copy. Mirrors the structure of pt.ts.
const en: Dictionary = {
  nav: { work: 'Work', about: 'About', contact: 'Contact', menu: 'Menu', close: 'Close' },

  hero: {
    eyebrow: 'Chrystian Ariel · Product Designer',
    lines: ['Curious about AI.', 'Obsessed with detail.'],
    intro:
      'I’ve been designing digital products for healthcare, fintech and data for over 8 years. I use AI every day to move faster through the repetitive parts — and spend the time I save on what shouldn’t be rushed.',
    scroll: 'Scroll to explore',
  },

  manifesto: {
    eyebrow: '( How I work )',
    text: 'AI speeds up research, synthesis and variations. It doesn’t decide for the user, it doesn’t validate a mental health flow, and it doesn’t notice spacing that’s off the grid.',
    highlight: 'Those parts are still mine.',
  },

  work: { eyebrow: '( Selected work )', title: 'Work', view: 'View case' },

  process: {
    eyebrow: '( Process )',
    title: 'Fast where it can be. Slow where it matters.',
    steps: [
      {
        tag: 'Human',
        title: 'Listen',
        text: 'Interviews, conversations with specialists and stakeholders. Understanding the real problem before opening Figma.',
      },
      {
        tag: 'AI + Human',
        title: 'Organize',
        text: 'AI to cluster transcripts, spot patterns and draft hypotheses. I check every cluster against the original source.',
      },
      {
        tag: 'Human',
        title: 'Decide',
        text: 'Flows, priorities and trade-offs are decided with the team and validated with users. I don’t outsource judgment.',
      },
      {
        tag: 'AI + Human',
        title: 'Refine',
        text: 'AI for microcopy variations, error states and checks. The finish — grid, rhythm, accessibility — is done by hand.',
      },
    ],
  },

  contact: {
    eyebrow: '( Contact )',
    title: 'Let’s talk?',
    text: 'Open to new projects, teams and good conversations about design and AI.',
    email: 'chrystian.ariel@gmail.com',
    cv: 'Download CV',
  },

  about: {
    eyebrow: '( About )',
    title: 'Hi, I’m Chrys.',
    paragraphs: [
      'I’m a Product Designer who loves building digital experiences that connect people and technology. I work where user experience, product strategy and collaboration meet, turning complex problems into clear, useful and scalable solutions.',
      'I work with multicultural, distributed teams across Latin America and the United States, with a research-, design- and data-driven approach to product decisions.',
      'AI became part of my day as a fast teammate: great at organizing, exploring and reviewing. But the moments that define a product — listening to a patient, negotiating a flow with the team, nailing the last detail of a component — still take time and attention.',
    ],
    experienceTitle: 'Experience',
    experience: [
      { role: 'Product Designer · UI Designer', company: 'Instituto de Pesquisas Eldorado', period: '2020 — now' },
      { role: 'Product Designer', company: 'Fasters', period: '2018 — 2020' },
      { role: 'User Interface Designer', company: 'Web Produtora', period: '2017 — 2018' },
    ],
    educationTitle: 'Education',
    education: [
      { course: 'Postgraduate in User Experience Design and Beyond', school: 'PUCRS' },
      { course: 'Bachelor in Social Communication — Advertising', school: 'ULBRA' },
    ],
    beyondTitle: 'Outside Figma',
    beyond:
      'Mentoring junior designers, prototyping 2D games in Unity and Godot, and studying React and Angular — which helps me speak the same language as the dev team.',
  },

  caseUi: {
    back: 'Back to work',
    next: 'Next project',
    role: 'Role',
    year: 'Year',
    platform: 'Platform',
    aiTitle: 'Where AI helped — and where it didn’t',
    aiUsed: 'AI-assisted',
    aiHuman: 'No shortcuts',
    imagePending: 'Images coming soon',
  },

  footer: { rights: 'All rights reserved.', built: 'Designed and coded with care (and a bit of AI).', top: 'Back to top' },

  cases: {
    conemo: {
      name: 'CONEMO',
      tags: 'Healthcare · Mental Health',
      year: '2024',
      tagline: 'An emotional-control app for patients with depression, anxiety and insomnia in Brazil’s public health system.',
      sections: [
        {
          title: 'About the project',
          paragraphs: [
            'CONEMO (short for Emotional Control in Portuguese) is a mobile app developed by researchers at the University of São Paulo (USP) in partnership with Brazilian and international research centers.',
            'Designed as a complement to the treatment of patients with symptoms of depression, anxiety and insomnia, the tool was built on data gathered from therapeutic and behavioral sessions. The app aims to broaden and ease access to mental health resources through low-intensity daily interventions.',
            'The CONEMO ecosystem has three products: the patient app, a web screening questionnaire that defines who can join the program, and an admin system used by professionals at Basic Health Units (UBSs).',
          ],
        },
        {
          title: 'Main challenges',
          items: [
            {
              label: 'Usability',
              text: 'As a mental health app, the main challenge was to create a tool that offered privacy and safety as well as easy navigation. Given the breadth of the audience — people of different ages, digital literacy and emotional states — extensive research was needed to understand usage flows and mid- to long-term engagement.',
            },
            {
              label: 'Integration',
              text: 'Another key aspect was integrating the app with the participating Basic Health Units, which required defining integration flows between the units and the people using the tool.',
            },
            {
              label: 'Ethics',
              text: 'Patient health data calls for ethical care in collection and monitoring, demanding transparent design decisions around consent and data storage.',
            },
          ],
        },
        {
          title: 'My contribution',
          paragraphs: [
            'I worked on synthesizing user research data together with the script of information provided by health professionals. With what was needed for the user journey, I helped organize the internal journeys and separate daily activities from other media such as audio and video, creating the user flow and the interactions with each element of that journey.',
          ],
          bullets: [
            {
              label: 'App journeys (Depression, Anxiety and Insomnia)',
              text: 'I structured the sessions — welcome, content, video with transcript and homework — and created reusable screen templates (list, table and task) so the content produced by USP could be applied without redesigning each session.',
            },
            {
              label: 'Interactive tasks',
              text: 'full and short sleep diaries, 0–10 anxiety scales with drag control, a reorderable list of anxiety-causing situations, and logging of breathing and relaxation techniques.',
            },
            {
              label: 'Screening questionnaire (web)',
              text: 'a question flow based on depression, anxiety and insomnia screening scales, with a consent form and eligibility rules such as a minimum age of 18.',
            },
            {
              label: 'Admin system',
              text: 'a dashboard for UBS professionals with usage indicators, participant list, risk flags and contact logs.',
            },
            {
              label: 'Shared style guide for app and web',
              text: 'Urbanist typeface, one color per journey (teal for Depression, orange for Anxiety, purple for Insomnia), a component library and implementation notes for the dev team.',
            },
          ],
        },
        {
          title: 'Analysis and process',
          paragraphs: [
            'The gamification follows a structure similar to learning apps like Duolingo, Babbel and Memrise: treatment is split into journeys, journeys into short sessions, and progress is always visible. In the Depression journey, patients get sessions three times a week; in the Anxiety and Insomnia journeys, there are 7 sessions over about 6 weeks, each lasting 2 to 10 minutes. Sessions unlock gradually, at a set interval, so patients practice what they learned before moving on.',
            'We created daily journey tracking with activities based on questions about routine — something specific like “Did you go shopping today?” or more general like “Did you talk to someone today?”. The patient picks an enjoyable activity for the next few days and, in the following session, the app asks whether they did it and how they felt. The answer always gets a warm response: if they did it, the app reinforces the benefit of being more active; if not, it suggests breaking it into smaller steps and starting with the easiest one.',
            'Progress is also tracked through on-screen self-assessments about the day’s feelings: 0–10 anxiety scales, daily symptom logs (yes or no) and the sleep diary, with bedtime, wake-up time and night awakenings. These answers are sent to a web app where health professionals follow each participant’s journey, latest activity, risk flags and adverse events, and use of the help button. They cross this with the patient’s regular care, log every contact and suggest treatments targeted to the level identified in the app.',
          ],
        },
        {
          title: 'Results',
          items: [
            {
              label: 'Less overload on Basic Health Units',
              text: 'CONEMO connects in-app patient follow-up with monitoring by health professionals. Moving part of the treatment to digital reduces the constant need for in-person appointments.',
            },
            {
              label: 'Broader access to psychological care',
              text: 'the app offers an accessible digital therapeutic approach for patients with depression, anxiety and insomnia, unifying daily in-app tracking with the services provided at participating units.',
            },
            {
              label: 'Easier, gamified intervention',
              text: 'each session encourages activities based on Cognitive Behavioral Therapy (CBT) techniques. Instead of points or badges, CONEMO rewards patients with visible progress: a completed-sessions counter per journey, a completion animation at the end of each session, gradual unlocking of new steps, an “up to date” notice in the sleep diary and positive reinforcement messages after each activity.',
            },
          ],
          paragraphs: [
            'The app proved to be a solution with potential for integration into the public health system, with low maintenance cost and easy expansion to different regions of the country, benefiting populations with limited access to traditional psychotherapy.',
          ],
        },
        {
          title: 'Impact',
          stats: [
            { value: '50%', label: 'reduction in participants’ depressive symptoms, according to clinical studies' },
            { value: '↓', label: 'lower patient dropout during treatment' },
          ],
          paragraphs: [
            'Data from in-app psychological follow-up showed a reduction in patient dropout during treatment. According to clinical studies, CONEMO reduced participants’ depressive symptoms by up to 50%, while also improving secondary variables such as reduced isolation and inactivity.',
          ],
        },
      ],
    },

    drumwave: {
      name: 'DrumWave',
      tags: 'Fintech · Data Economy',
      year: '2024',
      tagline: 'Turning data into a financial asset — and making that feel simple for businesses.',
      sections: [
        {
          title: 'About the project',
          paragraphs: [
            'DrumWave is a platform that treats personal and corporate data as a financial asset, letting users consciously monetize their digital information. Based in California, the startup proposes that users decide how their personal data is traded, making it manageable and monetizable.',
            'The core product is the dWallet®, a digital data wallet in two versions: the Personal dWallet, an app for individuals, and the Business dWallet, a web platform for companies, called Data Reserve in English. My work focused on the Business dWallet, in Portuguese and English.',
          ],
        },
        {
          title: 'What users needed to understand',
          table: {
            head: ['Question', 'How the platform answers'],
            rows: [
              ['What their data is', 'Each dataset is registered as a NamedSchema, a record describing the data, its attributes and its owner (e.g. general customer data, banking data, location, device info).'],
              ['Where it is stored', 'In the dWallet, under shared custody: the company holding the data and the person it belongs to sign a certificate proving that relationship.'],
              ['How it creates value', 'Registered and certified data can be licensed through buy/sell Offers and used in Data Apps; payments go in and out via PIX.'],
              ['What can be done with it', 'Register, certify, create or accept offers, license for a set period, buy Data Apps and invite other companies and people into the ecosystem.'],
            ],
          },
        },
        {
          title: 'Main challenges',
          paragraphs: [
            'The idea of monetizing personal data is still unfamiliar to most people. We had to figure out how to turn a complex data-valuation system into intuitive experiences.',
            'Most people have never actively managed or monetized their data. Research and interviews showed users confused about ownership, value and consent regarding digital data.',
            'Another challenge was separating DrumWave’s experiences and features for individuals and organizations. Individuals, companies and Data Agents — companies that distribute dWallets and review offers — have different goals, permissions and vocabularies, and each profile needed to recognize itself in the interface.',
            'Since it deals with sensitive data, every interaction had to reinforce the security, control and clarity the tool offers.',
          ],
        },
        {
          title: 'My contribution',
          paragraphs: [
            'I worked as Product Designer on the Business dWallet, from flow mapping to dev handoff. I designed the business account sign-up and activation journey, the NamedSchemas, Certificates, Offers and Data Apps areas, and the Data Agent dashboard.',
            'I was also responsible for design documentation: style guide, component library, Portuguese and English versions of the flows, tablet and smartphone adaptation, and the platform’s transactional emails. I also ran usability tests for every new feature together with the product team.',
          ],
        },
        {
          title: 'Process',
          paragraphs: [
            'One of the first steps was mapping where an average user would get stuck understanding the platform. Interviews with different audiences revealed difficulty grasping the value of shared data, consent and the management of monetized information. This called for progressive disclosure: instead of presenting every concept at once, the platform reveals each feature when it becomes useful, with helper text, empty states that explain the next step, and patterns that guide navigation while teaching how the platform works.',
            'Usability tests were run with every new feature to ensure a simple, understandable experience. Using behavioral metrics, we assessed task completion, drop-off points and perceived trust to validate and evolve navigation.',
          ],
        },
        {
          title: 'Execution and solutions',
          items: [
            {
              label: 'Modular design',
              text: 'We built a component library — buttons, fields, selectors, file upload, cards, menus and charts — that works like building blocks. Each new feature was assembled from the same pieces, speeding up delivery and keeping visual and interaction cohesion as scope grew. The whole system follows an 8 px spacing grid, which made adapting to desktop (1440 px), tablet (798 px) and smartphone (390 px) easier.',
            },
          ],
          stats: [
            { value: '3', label: 'user profiles: Personal, Business and Data Agent' },
            { value: '2', label: 'languages: Portuguese and English' },
            { value: '3', label: 'screen sizes' },
            { value: '5', label: 'steps in business sign-up' },
          ],
        },
        {
          title: 'A vocabulary of its own',
          paragraphs: [
            'Because data monetization is so new, we introduced product-specific terms, always paired with a short on-screen explanation:',
          ],
          bullets: [
            { label: 'dWallet®', text: 'the digital wallet where people and companies store, manage and track the value of their data.' },
            { label: 'Data Savings', text: 'the Personal dWallet account, where a person accumulates the value generated by their own data.' },
            { label: 'Data Reserve', text: 'the business account, where a company registers its datasets and turns them into a new revenue line.' },
            { label: 'NamedSchema', text: 'the standardized record of a dataset, with description, attribute dictionary and owner.' },
            { label: 'Shared custody certificate', text: 'the document signed by the company and the data subject proving who holds and who owns the data.' },
            { label: 'Offer', text: 'a proposal to buy or sell data, with defined audience, price per certificate and license term.' },
            { label: 'Data Agent', text: 'the company that distributes dWallets, provides infrastructure and approves offers before they go to market.' },
          ],
        },
        {
          title: 'Security and transparency',
          paragraphs: ['These concerns translated into concrete interface decisions:'],
          bullets: [
            { label: 'Identity verification', text: 'sign-up only with a valid corporate email and CNPJ, upload of company and legal representative documents, and review before account activation.' },
            { label: 'Access control', text: 'a main admin sets other users’ permissions; passwords meet minimum security requirements and reset links expire in 30 minutes.' },
            { label: 'Alerts on every sensitive action', text: 'emails confirm password changes and account deletion and tell users to get in touch if they don’t recognize the action.' },
            { label: 'Explicit consent', text: 'certificates show who signed, when and which data is involved, and each party can sign or decline; the agency agreement states the user remains the owner of their data.' },
            { label: 'Always-visible status', text: 'labels like registered, active, awaiting signature and declined, plus clear messages for expired access, denied access and system failures.' },
            { label: 'Data quality', text: 'when uploading a file, the platform shows how many rows were validated and how many have errors, and offers a correction file.' },
          ],
        },
      ],
      ai: {
        used: [
          'Drafting short explanations for the product vocabulary, in PT and EN',
          'Consistency review between Portuguese and English versions',
          'Generating realistic dummy data for prototypes and tests',
        ],
        human: [
          'Interviews and usability tests for every new feature',
          'Architecture of the three profiles and their permissions',
          'Security and consent decisions on every sensitive action',
        ],
      },
    },

    tris: {
      name: 'TRIS',
      tags: 'Healthcare · Gamification',
      year: '2024',
      tagline: 'Rewards, medals and a Bluetooth breathalyzer to support people who want to drink less.',
      sections: [
        {
          title: 'About the project',
          paragraphs: [
            'TRIS is a clinical research mobile app that supports people in treatment to reduce alcohol consumption. Participants connect a breathalyzer to their phone via Bluetooth and submit samples throughout the day; each approved, alcohol-negative sample earns a cash reward. The project includes the participant app and a web admin system for the research team.',
          ],
        },
        {
          title: 'Main challenges',
          items: [
            { label: 'Reliability', text: 'Since the reward is financial, every sample had to provably come from the participant. The collection flow combines a face photo and a breath into the breathalyzer, comparing the image with a photo registered on first access.' },
            { label: 'Motivation', text: 'Staying sober takes daily engagement for weeks. The challenge was to create incentives that rewarded consistency without punishing participants who had a hard day.' },
            { label: 'Honesty', text: 'Participants could skip samples on days they drank. The interface had to encourage submission even then.' },
          ],
        },
        {
          title: 'My contribution',
          paragraphs: [
            'I designed the app and admin flows, from wireframes to final screens: photo registration, breathalyzer pairing, sample collection, history, balance and reward redemption. In the admin system, I designed sample validation, payment approval and per-participant research parameter settings. I also built the project style guide, with Red Hat Display typography and status components.',
          ],
        },
        {
          title: 'Analysis and process',
          paragraphs: [
            'Gamification relies on three mechanics. First, medals and divisions: bronze for 1 sober day, silver for 4 consecutive days and gold for 7, with messages encouraging participants to move up or keep their division. Second, the sobriety record, showing the longest streak and inviting participants to beat it. Third, cash rewards: each day with approved samples adds to the balance, which can be redeemed from R$ 1.00, within up to 15 business days.',
            'Collection follows a rhythm set by the research team: the time of the first daily collection, the interval between collections and how long participants have to respond before a collection expires. Participants get up to 3 attempts per sample, and a calendar shows the history of approved, failed and missed samples.',
            'In the admin system, researchers compare the sample photo with the registered one, validate the breathalyzer result, track each participant’s weekly alcohol level and approve or decline redemption requests.',
          ],
          stats: [
            { value: '1', label: 'day for the bronze medal' },
            { value: '4', label: 'consecutive days for silver' },
            { value: '7', label: 'consecutive days for gold' },
          ],
        },
        {
          title: 'Results',
          items: [
            { label: 'Encouraging honesty', text: 'the app warns that a missed sample counts as the highest alcohol level, making submission always the best choice — even after drinking.' },
            { label: 'Transparent rewards', text: 'statement, pending balance and the reason for each failed sample (positive result, unsuitable photo or missed collection) are always visible to the participant.' },
            { label: 'Research management in one place', text: 'the team configures parameters, validates samples and approves payments in the same dashboard, with indicators for active participants, collection rate and total rewards.' },
          ],
        },
        {
          title: 'Impact',
          paragraphs: ['Clinical study in progress — results will be shared here once published.'],
        },
      ],
    },
  },
}

export default en
