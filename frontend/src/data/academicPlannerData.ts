export interface StudentDifficulty {
  area: string;
  reason: string;
}

export interface TeachingStrategy {
  type: string;
  description: string;
}

export interface Topic {
  id: string;
  name: string;
  subtopics: string[];
  learningObjectives: string[];
  periodsRequired: number;
  completionDate: string;
  status: 'completed' | 'in-progress' | 'pending';
  studentDifficulties: StudentDifficulty[];
  teachingStrategies: TeachingStrategy[];
}

export interface Chapter {
  id: string;
  name: string;
  weightage: number;
  marksDistribution: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: Topic[];
  status: 'completed' | 'in-progress' | 'pending';
}

export interface Assessment {
  id: string;
  type: string;
  title: string;
  chaptersCovered: string[];
  scheduledDate: string;
  weightage: number;
  status: 'scheduled' | 'completed' | 'pending';
}

export interface RevisionDay {
  date: string;
  dayLabel: string;
  chapters: string[];
  topics: string[];
  activities: string[];
}

export interface RevisionPlan {
  startDate: string;
  endDate: string;
  importantTopics: string[];
  highWeightageChapters: string[];
  frequentlyTestedConcepts: string[];
  studentFocusAreas: string[];
  dailySchedule: RevisionDay[];
}

export interface Progress {
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  pendingTopics: number;
  completionPercentage: number;
  totalAssessments: number;
  completedAssessments: number;
}

export interface AcademicPlan {
  id: string;
  className: string;
  section: string;
  subject: string;
  board: string;
  academicYear: string;
  periodsPerWeek: number;
  createdAt: string;
  chapters: Chapter[];
  assessments: Assessment[];
  revisionPlan: RevisionPlan;
  progress: Progress;
}

export const DEMO_PLANS: AcademicPlan[] = [
  {
    id: "plan-10-sci",
    className: "Class 10",
    section: "A",
    subject: "Science",
    board: "CBSE",
    academicYear: "2026-27",
    periodsPerWeek: 6,
    createdAt: "2026-04-01",
    progress: {
      totalTopics: 33,
      completedTopics: 8,
      inProgressTopics: 5,
      pendingTopics: 20,
      completionPercentage: 24,
      totalAssessments: 6,
      completedAssessments: 1,
    },
    chapters: [
      {
        id: "ch-1", name: "Chemical Reactions and Equations", weightage: 6, marksDistribution: 6, difficulty: "Medium",
        status: "completed",
        topics: [
          {
            id: "ch1-t1", name: "Chemical Equations", periodsRequired: 2, completionDate: "2026-04-08", status: "completed",
            subtopics: ["Writing chemical equations", "Balancing chemical equations", "State symbols"],
            learningObjectives: ["Students will be able to write word equations", "Students will balance chemical equations using hit-and-trial method"],
            studentDifficulties: [
              { area: "Balancing complex equations with polyatomic ions", reason: "Students often miscount atoms when polyatomic ions appear on both sides" },
              { area: "Understanding state symbols (aq, s, l, g)", reason: "Abstract concept — students cannot physically observe the states in a textbook" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Use colored beads or marbles to represent different atoms. Students physically move beads to balance equations." },
              { type: "Visual", description: "Show animated PPT where atoms rearrange during balancing" }
            ]
          },
          {
            id: "ch1-t2", name: "Types of Chemical Reactions", periodsRequired: 2, completionDate: "2026-04-12", status: "completed",
            subtopics: ["Combination reactions", "Decomposition reactions", "Displacement reactions", "Double displacement reactions", "Exothermic and Endothermic"],
            learningObjectives: ["Students will identify reaction types from examples", "Students will predict products of common reactions"],
            studentDifficulties: [
              { area: "Differentiating displacement vs double displacement", reason: "Both involve swapping — students confuse which swaps with what" },
              { area: "Exothermic vs Endothermic", reason: "Cannot feel temperature change from textbook diagrams" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Demonstrate each reaction type with simple lab demos (Mg burning = combination, electrolysis of water = decomposition)" },
              { type: "Real-life", description: "Connect exothermic to self-heating packs, endothermic to cold packs" }
            ]
          },
          {
            id: "ch1-t3", name: "Redox Reactions", periodsRequired: 1, completionDate: "2026-04-15", status: "completed",
            subtopics: ["Oxidation", "Reduction", "Corrosion", "Rancidity"],
            learningObjectives: ["Students will identify oxidation and reduction in reactions", "Students will explain corrosion prevention methods"],
            studentDifficulties: [
              { area: "Simultaneous oxidation and reduction", reason: "Students think oxidation and reduction happen separately" },
              { area: "Corrosion vs Rancidity", reason: "Both involve deterioration — students mix up chemical vs food context" }
            ],
            teachingStrategies: [
              { type: "Story", description: "Use 'OX loses electrons (OIL RIG)' mnemonic story to remember oxidation is loss, reduction is gain" },
              { type: "Visual", description: "Show before/after images of rusted iron and rancid food" }
            ]
          }
        ]
      },
      {
        id: "ch-2", name: "Acids, Bases and Salts", weightage: 5, marksDistribution: 5, difficulty: "Medium",
        status: "completed",
        topics: [
          {
            id: "ch2-t1", name: "Properties of Acids and Bases", periodsRequired: 2, completionDate: "2026-04-22", status: "completed",
            subtopics: ["Acid-base indicators", "pH scale", "Universal indicator"],
            learningObjectives: ["Students will test substances with indicators", "Students will interpret pH values"],
            studentDifficulties: [
              { area: "pH scale direction (acidic vs basic)", reason: "Students often think pH 12 is acidic because 12 > 7" },
              { area: "Natural vs synthetic indicators", reason: "Hard to remember which indicator gives which color change" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Students test common household substances (lemon, soap, vinegar) with turmeric and litmus paper" },
              { type: "Visual", description: "pH scale as a number line with color-coded zones — red = acid, blue = base" }
            ]
          },
          {
            id: "ch2-t2", name: "Reactions of Acids and Bases", periodsRequired: 1, completionDate: "2026-04-25", status: "in-progress",
            subtopics: ["Neutralization reaction", "Reaction with metals", "Reaction with carbonates"],
            learningObjectives: ["Students will write neutralization equations", "Students will test gas evolved in acid-metal reactions"],
            studentDifficulties: [
              { area: "Neutralization products (salt + water)", reason: "Students think neutralization always produces a neutral salt — ignore water" },
              { area: "Gas evolution tests", reason: "Cannot visualize which gas is produced without actual lab demonstration" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Class demo: add HCl to NaOH with phenolphthalein — watch pink color disappear at neutralization" },
              { type: "Real-life", description: "Connect to antacid tablets neutralizing stomach acid" }
            ]
          },
          {
            id: "ch2-t3", name: "Salts and their Uses", periodsRequired: 1, completionDate: "2026-04-28", status: "in-progress",
            subtopics: ["Common salts (NaCl, NaHCO₃, CaOCl₂)", "pH in daily life", "Water of crystallization"],
            learningObjectives: ["Students will list uses of common salts", "Students will demonstrate water of crystallization"],
            studentDifficulties: [
              { area: "Water of crystallization concept", reason: "Abstract — students think water is 'wet' inside crystals" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Heat blue CuSO₄·5H₂O to show white anhydrous form, then add water to revert" },
              { type: "Real-life", description: "Connect to baking soda in cooking, bleaching powder in water treatment" }
            ]
          }
        ]
      },
      {
        id: "ch-3", name: "Metals and Non-metals", weightage: 5, marksDistribution: 5, difficulty: "Hard",
        status: "in-progress",
        topics: [
          {
            id: "ch3-t1", name: "Physical Properties", periodsRequired: 1, completionDate: "2026-05-05", status: "in-progress",
            subtopics: ["Malleability and ductility", "Thermal and electrical conductivity", "Sonorous property"],
            learningObjectives: ["Students will differentiate metals from non-metals based on physical properties"],
            studentDifficulties: [
              { area: "Exceptions (graphite conducts, iodine is shiny)", reason: "Students memorize general rules but get confused by exceptions" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Show a comparison chart with real images of metals and non-metals side by side" }
            ]
          },
          {
            id: "ch3-t2", name: "Chemical Properties", periodsRequired: 2, completionDate: "2026-05-10", status: "pending",
            subtopics: ["Reaction with oxygen", "Reaction with water", "Reaction with acids", "Reaction with chlorine"],
            learningObjectives: ["Students will predict reactivity based on position in periodic table"],
            studentDifficulties: [
              { area: "Variable reactivity of metals with water (Na vs Fe)", reason: "Students expect all metals to react similarly" },
              { area: "Ionic compound formation", reason: "Electron transfer is invisible — students struggle with abstract concept" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Demonstrate Na + water (teacher only), Mg + steam, Fe + steam — compare reactivity" },
              { type: "Story", description: "Tell the story of the 'Reactivity Series Ladder' — highest metals are 'eager to react'" }
            ]
          },
          {
            id: "ch3-t3", name: "Reactivity Series and Extraction", periodsRequired: 1, completionDate: "2026-05-15", status: "pending",
            subtopics: ["Reactivity series", "Displacement reactions", "Extraction methods (roasting, calcination, electrolysis)"],
            learningObjectives: ["Students will use reactivity series to predict displacement", "Students will match extraction method to reactivity"],
            studentDifficulties: [
              { area: "Electrolysis vs thermal reduction", reason: "Students cannot remember which extraction method applies to which metal" },
              { area: "Displacement direction", reason: "Students often reverse which metal displaces which" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Card sorting game — match metal to extraction method, then arrange in reactivity order" },
              { type: "Visual", description: "Flowchart showing extraction method based on position in reactivity series" }
            ]
          },
          {
            id: "ch3-t4", name: "Corrosion and Alloys", periodsRequired: 1, completionDate: "2026-05-18", status: "pending",
            subtopics: ["Rusting conditions", "Prevention methods", "Alloys and their properties"],
            learningObjectives: ["Students will explain rust prevention", "Students will justify why alloys are used over pure metals"],
            studentDifficulties: [
              { area: "Conditions required for rusting (O₂ + H₂O both needed)", reason: "Simplified explanations omit that both air and water are needed" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Set up 3 test tubes — nail in water, nail in air, nail in boiled water with oil layer — observe after 3 days" }
            ]
          }
        ]
      },
      {
        id: "ch-4", name: "Carbon and its Compounds", weightage: 8, marksDistribution: 8, difficulty: "Hard",
        status: "pending",
        topics: [
          {
            id: "ch4-t1", name: "Bonding in Carbon", periodsRequired: 2, completionDate: "2026-05-25", status: "pending",
            subtopics: ["Covalent bonding", "Catenation", "Allotropes (diamond, graphite, fullerene)"],
            learningObjectives: ["Students will explain why carbon forms covalent bonds", "Students will compare allotropes of carbon"],
            studentDifficulties: [
              { area: "Covalent vs Ionic bond", reason: "Students apply ionic bond rules (transfer) to carbon compounds" },
              { area: "Diamond vs Graphite structure", reason: "Both are carbon but have different properties — confusing" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "3D models of diamond (tetrahedral network) and graphite (layered structure) using ball-and-stick kits" },
              { type: "Real-life", description: "Show pencil (graphite) vs diamond jewelry — same element, different properties" }
            ]
          },
          {
            id: "ch4-t2", name: "Hydrocarbons", periodsRequired: 2, completionDate: "2026-06-02", status: "pending",
            subtopics: ["Saturated vs unsaturated", "IUPAC nomenclature", "Isomers"],
            learningObjectives: ["Students will name hydrocarbons using IUPAC rules", "Students will draw structural isomers"],
            studentDifficulties: [
              { area: "IUPAC naming of branched chains", reason: "Students cannot identify the longest carbon chain correctly" },
              { area: "Structural isomerism", reason: "Same formula, different structures — students think they are the same compound" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Use molecular model kits to build isomers of C₄H₁₀ — students see structural differences physically" },
              { type: "Visual", description: "Step-by-step IUPAC naming flowchart with examples" }
            ]
          },
          {
            id: "ch4-t3", name: "Functional Groups", periodsRequired: 1, completionDate: "2026-06-08", status: "pending",
            subtopics: ["Alcohols", "Carboxylic acids", "Esters", "Esterification reaction"],
            learningObjectives: ["Students will identify functional groups", "Students will write esterification equations"],
            studentDifficulties: [
              { area: "Identifying functional groups quickly", reason: "Multiple groups (−OH, −COOH, −COO−) look similar to beginners" },
              { area: "Esterification mechanism", reason: "Students forget that H₂O is eliminated from −OH of acid and −H of alcohol" }
            ],
            teachingStrategies: [
              { type: "Story", description: "Use 'Functional Group Families' analogy — each group has its own 'personality' and reactions" },
              { type: "Activity", description: "Flashcard game: match functional group name to its structure and examples" }
            ]
          },
          {
            id: "ch4-t4", name: "Soaps and Detergents", periodsRequired: 1, completionDate: "2026-06-12", status: "pending",
            subtopics: ["Structure of soap molecule", "Micelle formation", "Cleansing action", "Soap vs detergent"],
            learningObjectives: ["Students will explain micelle formation", "Students will compare soap and detergent effectiveness"],
            studentDifficulties: [
              { area: "Micelle formation mechanism", reason: "Abstract — students cannot visualize hydrophobic and hydrophilic ends arranging in water" },
              { area: "Soap vs detergent in hard water", reason: "Why soap fails but detergent works — chemical mechanism is not intuitive" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Animated diagram showing micelle formation — hydrophobic tails inward, hydrophilic heads outward" },
              { type: "Experiment", description: "Test soap in tap water vs distilled water — observe scum formation" }
            ]
          }
        ]
      },
      {
        id: "ch-5", name: "Life Processes", weightage: 7, marksDistribution: 7, difficulty: "Medium",
        status: "pending",
        topics: [
          {
            id: "ch5-t1", name: "Nutrition", periodsRequired: 2, completionDate: "2026-06-20", status: "pending",
            subtopics: ["Autotrophic nutrition", "Photosynthesis mechanism", "Heterotrophic nutrition", "Human digestive system"],
            learningObjectives: ["Students will describe the photosynthesis process", "Students will label human digestive system"],
            studentDifficulties: [
              { area: "Light reaction vs Dark reaction", reason: "Both occur in chloroplasts — students think dark reaction happens at night" },
              { area: "Role of chlorophyll vs other pigments", reason: "Students think only chlorophyll absorbs light" },
              { area: "Peristalsis movement", reason: "Involuntary muscle movement is hard to visualize from text" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Animated video of photosynthesis showing light-dependent and light-independent stages side by side" },
              { type: "Activity", description: "Perform starch test on variegated leaf to prove chlorophyll is needed for photosynthesis" },
              { type: "Real-life", description: "Compare digestive system to a 'food processing factory' with different stations" }
            ]
          },
          {
            id: "ch5-t2", name: "Respiration", periodsRequired: 1, completionDate: "2026-06-25", status: "pending",
            subtopics: ["Aerobic vs anaerobic respiration", "Human respiratory system", "Mechanism of breathing"],
            learningObjectives: ["Students will compare aerobic and anaerobic respiration", "Students will explain the breathing mechanism"],
            studentDifficulties: [
              { area: "Anaerobic respiration in humans (muscles)", reason: "Students think humans only do aerobic respiration" },
              { area: "Gas exchange at alveoli", reason: "Diffusion gradient concept is abstract" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Use limewater test to show CO₂ in exhaled air vs inhaled air" },
              { type: "Visual", description: "Diagram showing oxygenated vs deoxygenated blood flow through heart and lungs" }
            ]
          },
          {
            id: "ch5-t3", name: "Transportation", periodsRequired: 2, completionDate: "2026-07-02", status: "pending",
            subtopics: ["Human circulatory system", "Blood vessels (arteries, veins, capillaries)", "Lymphatic system", "Transport in plants"],
            learningObjectives: ["Students will trace blood flow through the heart", "Students will explain transpiration pull"],
            studentDifficulties: [
              { area: "Double circulation path (systemic vs pulmonary)", reason: "Students trace blood incorrectly — think it goes heart→body→heart directly" },
              { area: "Transpiration pull mechanism", reason: "Invisible process — students cannot see water moving up xylem" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Use a flow chart with arrows showing deoxygenated (blue) and oxygenated (red) blood path through all 4 chambers" },
              { type: "Experiment", description: "Place celery stalk in colored water — observe colored water rising in xylem after a few hours" }
            ]
          },
          {
            id: "ch5-t4", name: "Excretion", periodsRequired: 1, completionDate: "2026-07-08", status: "pending",
            subtopics: ["Human excretory system", "Nephron structure", "Urine formation", "Plant excretion"],
            learningObjectives: ["Students will label nephron structure", "Students will describe urine formation"],
            studentDifficulties: [
              { area: "Three steps of urine formation (filtration, reabsorption, secretion)", reason: "Students cannot sequence these steps correctly" },
              { area: "Role of nephron as filtering unit", reason: "Microscopic structure — cannot visualize how filtration happens" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Animated video of nephron showing blood entering, filtration, reabsorption, and urine exit step by step" },
              { type: "Real-life", description: "Compare nephron to a 'water purification system' with filter, collection, and reuse" }
            ]
          }
        ]
      },
      {
        id: "ch-6", name: "Control and Coordination", weightage: 5, marksDistribution: 5, difficulty: "Easy",
        status: "pending",
        topics: [
          {
            id: "ch6-t1", name: "Nervous System", periodsRequired: 2, completionDate: "2026-07-18", status: "pending",
            subtopics: ["Neuron structure and function", "Reflex arc", "Human brain structure", "Protection of brain"],
            learningObjectives: ["Students will draw and label a neuron", "Students will explain reflex arc pathway"],
            studentDifficulties: [
              { area: "Direction of nerve impulse (dendrite → axon → synapse)", reason: "Students think impulse travels randomly in neuron" },
              { area: "Reflex arc vs conscious action", reason: "Students confuse which actions are reflex and which are voluntary" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Draw a large neuron on the board with students acting as dendrites, cell body, axon — walk through impulse direction" },
              { type: "Activity", description: "Classic knee-jerk reflex test — students experience reflex firsthand" }
            ]
          },
          {
            id: "ch6-t2", name: "Hormones in Animals", periodsRequired: 1, completionDate: "2026-07-22", status: "pending",
            subtopics: ["Endocrine glands and their hormones", "Feedback mechanism", "Thyroid, Adrenal, Pancreas"],
            learningObjectives: ["Students will match glands to their hormones", "Students will explain feedback mechanism"],
            studentDifficulties: [
              { area: "Negative feedback mechanism", reason: "Abstract — students think 'feedback' always means positive" },
              { area: "Multiple hormones from pituitary", reason: "'Master gland' concept — students overwhelmed by number of hormones" }
            ],
            teachingStrategies: [
              { type: "Story", description: "Tell the story of a 'Thermostat' analogy for feedback — when room cools, heater turns on (negative feedback)" },
              { type: "Visual", description: "Create a 'Glands and Hormones' summary table with functions and deficiency effects" }
            ]
          },
          {
            id: "ch6-t3", name: "Plant Movements", periodsRequired: 1, completionDate: "2026-07-25", status: "pending",
            subtopics: ["Tropic movements (photo, geo, hydro, thigmo)", "Nastic movements", "Plant hormones (auxin, gibberellin)"],
            learningObjectives: ["Students will differentiate tropic from nastic movements", "Students will explain role of auxin in phototropism"],
            studentDifficulties: [
              { area: "Tropic vs Nastic movements", reason: "Both involve plant movement — students confuse direction-dependent vs independent" },
              { area: "Uneven auxin distribution effect", reason: "Cannot visualize how auxin causes cell elongation on one side" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Place a potted plant near a window — observe bending toward light over 1 week" },
              { type: "Visual", description: "Timelapse video of plant growing toward light (phototropism) and roots growing down (gravitropism)" }
            ]
          }
        ]
      },
      {
        id: "ch-7", name: "How do Organisms Reproduce", weightage: 6, marksDistribution: 6, difficulty: "Medium",
        status: "pending",
        topics: [
          {
            id: "ch7-t1", name: "Asexual Reproduction", periodsRequired: 1, completionDate: "2026-08-03", status: "pending",
            subtopics: ["Binary fission (Amoeba, Leishmania)", "Budding (Hydra, Yeast)", "Spore formation (Rhizopus)", "Vegetative propagation"],
            learningObjectives: ["Students will compare different modes of asexual reproduction", "Students will give examples of each mode"],
            studentDifficulties: [
              { area: "Binary fission vs budding", reason: "Both produce offspring from one parent — students cannot distinguish" },
              { area: "Multiple fission vs binary fission", reason: "Number of offspring confuses students" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Show timelapse videos of Amoeba splitting (binary fission) and Hydra budding side by side for comparison" },
              { type: "Activity", description: "Grow Rhizopus on bread — students observe sporangia and spores after 3-4 days" }
            ]
          },
          {
            id: "ch7-t2", name: "Sexual Reproduction in Plants", periodsRequired: 1, completionDate: "2026-08-08", status: "pending",
            subtopics: ["Flower structure", "Pollination (self vs cross)", "Fertilization", "Seed and fruit formation"],
            learningObjectives: ["Students will label parts of a flower", "Students will trace pollen tube growth"],
            studentDifficulties: [
              { area: "Double fertilization in angiosperms", reason: "Unique to flowering plants — students wonder why 'double'" },
              { area: "Self vs Cross pollination", reason: "Students think self-pollination is more common" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Dissect a real flower (Hibiscus or Lily) and identify all reproductive parts" },
              { type: "Story", description: "Use the 'Pollen Tube Journey' story — pollen grain travels down style to reach ovule" }
            ]
          },
          {
            id: "ch7-t3", name: "Human Reproductive System", periodsRequired: 2, completionDate: "2026-08-18", status: "pending",
            subtopics: ["Male reproductive system", "Female reproductive system", "Menstrual cycle", "Fertilization and implantation"],
            learningObjectives: ["Students will label male and female reproductive systems", "Students will describe the menstrual cycle"],
            studentDifficulties: [
              { area: "Menstrual cycle hormonal regulation", reason: "Multiple hormones (FSH, LH, estrogen, progesterone) — students confuse roles" },
              { area: "Fallopian tube vs uterus function", reason: "Students mix up where fertilization occurs vs where implantation occurs" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Use a calendar-based diagram to show the 28-day cycle with hormone levels graphed alongside" },
              { type: "Real-life", description: "Connect to health education — discuss menstrual hygiene and common myths" }
            ]
          },
          {
            id: "ch7-t4", name: "Reproductive Health", periodsRequired: 1, completionDate: "2026-08-22", status: "pending",
            subtopics: ["Contraception methods", "Sexually transmitted diseases (STDs)", "IVF and assisted reproductive technologies"],
            learningObjectives: ["Students will differentiate contraception methods", "Students will list preventive measures for STDs"],
            studentDifficulties: [
              { area: "STD symptoms (often asymptomatic)", reason: "Students think STDs always show visible symptoms" }
            ],
            teachingStrategies: [
              { type: "Discussion", description: "Group discussion on reproductive health myths and facts — encourage question box for anonymity" }
            ]
          }
        ]
      },
      {
        id: "ch-8", name: "Heredity and Evolution", weightage: 5, marksDistribution: 5, difficulty: "Hard",
        status: "pending",
        topics: [
          {
            id: "ch8-t1", name: "Heredity", periodsRequired: 2, completionDate: "2026-09-02", status: "pending",
            subtopics: ["Mendel's experiments", "Monohybrid cross", "Dihybrid cross", "Dominant and recessive traits"],
            learningObjectives: ["Students will perform monohybrid cross using Punnett square", "Students will calculate phenotypic ratios"],
            studentDifficulties: [
              { area: "Dominant vs recessive — why traits skip generations", reason: "Students think recessive gene disappears if not expressed" },
              { area: "Punnett square ratios (3:1, 9:3:3:1)", reason: "Ratio concept is mathematical — students struggle with probability" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Use coin toss to teach probability in monohybrid cross — heads = dominant, tails = recessive" },
              { type: "Visual", description: "Mendel's pea plant chart showing all 7 traits with dominant/recessive comparison" }
            ]
          },
          {
            id: "ch8-t2", name: "Evolution", periodsRequired: 1, completionDate: "2026-09-08", status: "pending",
            subtopics: ["Darwin's theory", "Natural selection", "Speciation", "Fossil evidence"],
            learningObjectives: ["Students will explain natural selection", "Students will describe how fossils support evolution"],
            studentDifficulties: [
              { area: "Natural selection vs 'use and disuse' (Lamarck)", reason: "Students commonly confuse Lamarck's and Darwin's theories" },
              { area: "Speciation mechanism (geographical isolation)", reason: "Hard to imagine how one species becomes two without seeing it happen" }
            ],
            teachingStrategies: [
              { type: "Story", description: "Tell Darwin's finches story — how different beaks evolved for different food sources on Galapagos islands" },
              { type: "Visual", description: "Show fossil sequence of horse evolution — gradual change over 50 million years" }
            ]
          },
          {
            id: "ch8-t3", name: "Human Evolution", periodsRequired: 1, completionDate: "2026-09-12", status: "pending",
            subtopics: ["Stages of human evolution", "Tracing ancestry", "DNA evidence"],
            learningObjectives: ["Students will sequence human evolution stages"],
            studentDifficulties: [
              { area: "Linear vs branching evolution", reason: "Students think humans evolved in a straight line from monkeys" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Show the 'human family tree' branching diagram — emphasize common ancestors, not linear descent" }
            ]
          }
        ]
      },
      {
        id: "ch-9", name: "Light — Reflection and Refraction", weightage: 6, marksDistribution: 6, difficulty: "Medium",
        status: "pending",
        topics: [
          {
            id: "ch9-t1", name: "Reflection of Light", periodsRequired: 2, completionDate: "2026-09-22", status: "pending",
            subtopics: ["Laws of reflection", "Plane mirror image formation", "Spherical mirrors (concave, convex)", "Mirror formula"],
            learningObjectives: ["Students will apply laws of reflection", "Students will use mirror formula 1/f = 1/u + 1/v"],
            studentDifficulties: [
              { area: "Sign convention in mirror formula", reason: "Students mix up positive and negative signs for u, v, f" },
              { area: "Ray diagrams of image formation", reason: "Drawing accurate ray diagrams requires precision — students draw casually" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Use a 'Sign Convention House' mnemonic — 'Cartesian sign convention: distances against incident light are negative'" },
              { type: "Activity", description: "Use a concave mirror and candle to form real image on screen — students observe image characteristics" }
            ]
          },
          {
            id: "ch9-t2", name: "Refraction of Light", periodsRequired: 2, completionDate: "2026-10-02", status: "pending",
            subtopics: ["Laws of refraction", "Refractive index", "Snell's law", "Lens formula"],
            learningObjectives: ["Students will apply Snell's law", "Students will calculate refractive index"],
            studentDifficulties: [
              { area: "Light bends towards vs away from normal", reason: "Students memorize direction but forget speed change logic behind it" },
              { area: "Refractive index of multiple media", reason: "Comparing n₁ → n₂ then n₂ → n₃ is confusing" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Place a pencil in a glass of water — observe bending. Then use a laser pointer with a glass block to trace refraction angles" },
              { type: "Story", description: "The 'Swimming Pool Illusion' story — why pools look shallower than they actually are" }
            ]
          },
          {
            id: "ch9-t3", name: "Spherical Lenses", periodsRequired: 1, completionDate: "2026-10-08", status: "pending",
            subtopics: ["Convex and concave lenses", "Image formation by lenses", "Lens formula applications", "Power of lens"],
            learningObjectives: ["Students will differentiate converging and diverging lenses", "Students will calculate power of a lens"],
            studentDifficulties: [
              { area: "Convex = converging, Concave = diverging", reason: "Students swap which lens converges and which diverges" },
              { area: "Power of lens (P = 1/f in meters)", reason: "Unit confusion — diopter definition is abstract" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Use 'Convex = Converge' alliteration mnemonic. Show parallel beam through both lens types" },
              { type: "Real-life", description: "Bring reading glasses (convex) and nearsighted glasses (concave) — students see effect firsthand" }
            ]
          }
        ]
      },
      {
        id: "ch-10", name: "The Human Eye and Colourful World", weightage: 4, marksDistribution: 4, difficulty: "Easy",
        status: "pending",
        topics: [
          {
            id: "ch10-t1", name: "Human Eye Structure", periodsRequired: 1, completionDate: "2026-10-18", status: "pending",
            subtopics: ["Eye parts and functions", "Accommodation of eye", "Myopia and Hypermetropia", "Cataract"],
            learningObjectives: ["Students will label eye structure", "Students will explain how ciliary muscles change focal length"],
            studentDifficulties: [
              { area: "Accommodation mechanism (ciliary muscles + lens)", reason: "Students think lens changes shape by itself without muscle involvement" },
              { area: "Myopia vs Hypermetropia correction", reason: "Which lens corrects which defect — students commonly swap them" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Diagram comparing normal, myopic, and hypermetropic eyes with corrective lenses shown" },
              { type: "Real-life", description: "Ask students who wear glasses: 'Are you nearsighted or farsighted? What type of lens do you use?'" }
            ]
          },
          {
            id: "ch10-t2", name: "Refraction through Prism", periodsRequired: 1, completionDate: "2026-10-22", status: "pending",
            subtopics: ["Prism refraction", "Dispersion of white light", "Rainbow formation"],
            learningObjectives: ["Students will explain dispersion", "Students will describe rainbow formation"],
            studentDifficulties: [
              { area: "VIBGYOR order in dispersion", reason: "Students often reverse the color order" },
              { area: "Secondary rainbow in opposite order", reason: "Double reflection explanation is complex for students" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Use a glass prism to disperse white light — students see VIBGYOR on the wall" },
              { type: "Story", description: "Tell Newton's experiment story — how he discovered that white light is composed of 7 colors" }
            ]
          },
          {
            id: "ch10-t3", name: "Atmospheric Refraction", periodsRequired: 1, completionDate: "2026-10-25", status: "pending",
            subtopics: ["Twinkling of stars", "Advanced sunrise and delayed sunset", "Scattering of light", "Tyndall effect"],
            learningObjectives: ["Students will explain why stars twinkle", "Students will relate scattering to sky color"],
            studentDifficulties: [
              { area: "Stars twinkle, planets don't", reason: "Students think stars have intrinsic twinkling property" },
              { area: "Red sky at sunrise/sunset", reason: "Rayleigh scattering theory depends on wavelength — hard for students to grasp" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Animated simulation showing light from a star traveling through atmospheric layers of varying density" },
              { type: "Real-life", description: "Ask 'Why is the sky blue?' and 'Why is the sun red at sunset?' — then explain Rayleigh scattering" }
            ]
          }
        ]
      }
    ],
    assessments: [
      { id: "assess-1", type: "Unit Test", title: "Unit Test 1 — Chemistry", chaptersCovered: ["Chemical Reactions and Equations", "Acids, Bases and Salts"], scheduledDate: "2026-05-02", weightage: 10, status: "completed" },
      { id: "assess-2", type: "Unit Test", title: "Unit Test 2 — Chemistry", chaptersCovered: ["Metals and Non-metals", "Carbon and its Compounds"], scheduledDate: "2026-06-20", weightage: 10, status: "scheduled" },
      { id: "assess-3", type: "Unit Test", title: "Unit Test 3 — Biology", chaptersCovered: ["Life Processes", "Control and Coordination"], scheduledDate: "2026-08-01", weightage: 10, status: "scheduled" },
      { id: "assess-4", type: "Half-Yearly Exam", title: "Half-Yearly Examination", chaptersCovered: ["Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and its Compounds", "Life Processes", "Control and Coordination"], scheduledDate: "2026-09-15", weightage: 30, status: "scheduled" },
      { id: "assess-5", type: "Unit Test", title: "Unit Test 4 — Biology + Physics", chaptersCovered: ["How do Organisms Reproduce", "Heredity and Evolution", "Light — Reflection and Refraction"], scheduledDate: "2026-10-30", weightage: 10, status: "scheduled" },
      { id: "assess-6", type: "Pre-Board Exam", title: "Pre-Board Examination (Full Syllabus)", chaptersCovered: ["Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and its Compounds", "Life Processes", "Control and Coordination", "How do Organisms Reproduce", "Heredity and Evolution", "Light — Reflection and Refraction", "The Human Eye and Colourful World"], scheduledDate: "2027-01-10", weightage: 40, status: "scheduled" },
    ],
    revisionPlan: {
      startDate: "2027-01-15",
      endDate: "2027-02-15",
      importantTopics: [
        "Balancing chemical equations", "pH scale and neutralization", "Reactivity series and extraction",
        "Carbon compounds — functional groups", "Photosynthesis and respiration", "Reflex arc",
        "Mendelian genetics — monohybrid cross", "Mirror formula and lens formula"
      ],
      highWeightageChapters: [
        "Carbon and its Compounds (8 marks)", "Life Processes (7 marks)",
        "Chemical Reactions and Equations (6 marks)", "Light — Reflection and Refraction (6 marks)",
        "How do Organisms Reproduce (6 marks)"
      ],
      frequentlyTestedConcepts: [
        "Balancing equations", "pH calculations", "Properties of ethanoic acid",
        "Digestive system diagram", "Reflex arc diagram", "Punnett square problems",
        "Mirror formula numericals", "Power of lens numericals"
      ],
      studentFocusAreas: [
        "Sign convention in optics numericals", "Difference between displacement and double displacement",
        "IUPAC naming practice", "Mendelian cross ratios", "Hormone and gland matching"
      ],
      dailySchedule: [
        { date: "2027-01-15", dayLabel: "Day 1", chapters: ["Chemical Reactions and Equations"], topics: ["Balancing equations", "Types of reactions", "Redox"], activities: ["Solve 10 balancing problems", "Write 5 examples of each reaction type"] },
        { date: "2027-01-16", dayLabel: "Day 2", chapters: ["Acids, Bases and Salts"], topics: ["Indicators", "pH scale", "Neutralization", "Common salts"], activities: ["pH chart practice", "Write 5 neutralization equations", "Table of salts with uses"] },
        { date: "2027-01-17", dayLabel: "Day 3", chapters: ["Metals and Non-metals"], topics: ["Physical properties", "Chemical properties", "Reactivity series", "Extraction"], activities: ["Reactivity series mnemonic drill", "Match extraction method to metal", "Diagram: electrolytic refining"] },
        { date: "2027-01-18", dayLabel: "Day 4", chapters: ["Carbon and its Compounds"], topics: ["Covalent bonding", "Allotropes", "Hydrocarbons", "IUPAC naming"], activities: ["Name 10 compounds using IUPAC", "Draw isomers of C₄H₁₀", "Compare diamond vs graphite"] },
        { date: "2027-01-19", dayLabel: "Day 5", chapters: ["Carbon and its Compounds"], topics: ["Functional groups", "Ethanol and Ethanoic acid", "Esters", "Soaps"], activities: ["Functional group identification quiz", "Esterification equation practice", "Micelle diagram"] },
        { date: "2027-01-20", dayLabel: "Day 6", chapters: ["Chemical Reactions", "Acids Bases"], topics: ["Full revision + MCQs"], activities: ["30 MCQs from both chapters", "Previous year board questions"] },
        { date: "2027-01-22", dayLabel: "Day 7", chapters: ["Life Processes"], topics: ["Photosynthesis", "Digestive system", "Respiration"], activities: ["Label digestive system diagram", "Write photosynthesis equation", "Compare aerobic/anaerobic"] },
        { date: "2027-01-23", dayLabel: "Day 8", chapters: ["Life Processes"], topics: ["Circulatory system", "Excretory system", "Transport in plants"], activities: ["Trace blood flow through heart", "Label nephron diagram", "Explain transpiration pull"] },
        { date: "2027-01-24", dayLabel: "Day 9", chapters: ["Control and Coordination"], topics: ["Neuron structure", "Reflex arc", "Brain", "Hormones"], activities: ["Draw reflex arc", "Match glands to hormones", "Label brain diagram"] },
        { date: "2027-01-25", dayLabel: "Day 10", chapters: ["Life Processes", "Control and Coordination"], topics: ["Full revision + Diagram practice"], activities: ["Draw 5 important diagrams from memory", "20 MCQs", "Write 3-mark answers"] },
        { date: "2027-01-27", dayLabel: "Day 11", chapters: ["How do Organisms Reproduce"], topics: ["Asexual reproduction", "Sexual reproduction in plants", "Human reproductive system"], activities: ["Compare binary fission vs budding", "Label flower parts", "Draw male/female reproductive system"] },
        { date: "2027-01-29", dayLabel: "Day 12", chapters: ["Heredity and Evolution"], topics: ["Mendel's experiments", "Monohybrid cross", "Darwin's theory", "Speciation"], activities: ["Solve 3 Punnett square problems", "Explain natural selection with example", "Arrange human evolution stages"] },
        { date: "2027-01-31", dayLabel: "Day 13", chapters: ["Reproduction", "Heredity"], topics: ["Full revision + Previous year questions"], activities: ["Solve 10 previous year questions", "Quick revision of all diagrams"] },
        { date: "2027-02-02", dayLabel: "Day 14", chapters: ["Light — Reflection and Refraction"], topics: ["Reflection laws", "Spherical mirrors", "Mirror formula"], activities: ["Mirror formula numericals (5 problems)", "Ray diagrams for concave mirror"] },
        { date: "2027-02-04", dayLabel: "Day 15", chapters: ["Light — Reflection and Refraction"], topics: ["Refraction laws", "Snell's law", "Lens formula"], activities: ["Snell's law numericals", "Lens formula problems (5)", "Sign convention practice"] },
        { date: "2027-02-06", dayLabel: "Day 16", chapters: ["The Human Eye and Colourful World"], topics: ["Eye structure", "Myopia/Hypermetropia", "Prism dispersion", "Scattering"], activities: ["Label eye diagram", "Myopia vs hypermetropia table", "Explain why sky is blue"] },
        { date: "2027-02-08", dayLabel: "Day 17", chapters: ["Light — Full"], topics: ["Full optics revision"], activities: ["20 numericals (mirror + lens)", "5 diagram questions", "Previous year board paper"] },
        { date: "2027-02-10", dayLabel: "Day 18", chapters: ["All Chemistry (Ch 1-4)"], topics: ["Full chemistry revision"], activities: ["40 MCQs", "Write 10 balanced equations", "IUPAC naming test"] },
        { date: "2027-02-12", dayLabel: "Day 19", chapters: ["All Biology (Ch 5-8)"], topics: ["Full biology revision"], activities: ["40 MCQs", "5 diagram-based questions", "Write long answers for 3 topics"] },
        { date: "2027-02-14", dayLabel: "Day 20", chapters: ["Full Syllabus"], topics: ["Complete revision + Mock test"], activities: ["3-hour mock test (full syllabus)", "Self-evaluation", "Focus on weak areas"] }
      ]
    }
  },
  {
    id: "plan-5-maths",
    className: "Class 5",
    section: "A",
    subject: "Mathematics",
    board: "CBSE",
    academicYear: "2026-27",
    periodsPerWeek: 5,
    createdAt: "2026-04-01",
    progress: {
      totalTopics: 18,
      completedTopics: 4,
      inProgressTopics: 2,
      pendingTopics: 12,
      completionPercentage: 22,
      totalAssessments: 4,
      completedAssessments: 0,
    },
    chapters: [
      {
        id: "mch-1", name: "The Fish Tale", weightage: 5, marksDistribution: 5, difficulty: "Easy",
        status: "completed",
        topics: [
          {
            id: "mch1-t1", name: "Understanding the Fish Market", periodsRequired: 1, completionDate: "2026-04-06", status: "completed",
            subtopics: ["Fish prices and weight calculation", "Addition and subtraction of money", "Real-life market scenarios"],
            learningObjectives: ["Students will calculate total cost of fish purchase", "Students will solve word problems involving money"],
            studentDifficulties: [
              { area: "Conversion of kilograms to grams in money context", reason: "Students get confused when prices are per kg but quantity is in grams" }
            ],
            teachingStrategies: [
              { type: "Real-life", description: "Role-play a fish market in class — students act as buyers and sellers" }
            ]
          },
          {
            id: "mch1-t2", name: "Speed, Distance and Time", periodsRequired: 1, completionDate: "2026-04-08", status: "completed",
            subtopics: ["Relation between speed, distance and time", "Boat speed upstream vs downstream"],
            learningObjectives: ["Students will calculate speed given distance and time"],
            studentDifficulties: [
              { area: "Upstream vs downstream speed concept", reason: "Students add instead of subtract when calculating net speed" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Use a toy boat in a water tub to demonstrate upstream (against flow) and downstream (with flow)" }
            ]
          },
          {
            id: "mch1-t3", name: "Data from Fishing Records", periodsRequired: 1, completionDate: "2026-04-10", status: "completed",
            subtopics: ["Reading tables", "Simple bar graphs", "Interpreting fishing data"],
            learningObjectives: ["Students will read and interpret data from tables"],
            studentDifficulties: [
              { area: "Reading multiple columns in a table", reason: "Students focus on one column and miss comparisons" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Create a class 'fish catch' chart — each student records 'daily catch' and we make a bar graph together" }
            ]
          }
        ]
      },
      {
        id: "mch-2", name: "Shapes and Angles", weightage: 8, marksDistribution: 8, difficulty: "Medium",
        status: "completed",
        topics: [
          {
            id: "mch2-t1", name: "Recognizing Angles", periodsRequired: 1, completionDate: "2026-04-16", status: "completed",
            subtopics: ["Right angle identification", "Angle as a measure of turn", "Comparing angles"],
            learningObjectives: ["Students will identify right angles in everyday objects", "Students will compare angles"],
            studentDifficulties: [
              { area: "Angle as 'amount of turn' vs 'corner'", reason: "Students think angle is just a corner shape, not a measure of rotation" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Use two paper strips pinned together — students rotate one strip to create different angles" }
            ]
          },
          {
            id: "mch2-t2", name: "Measuring and Classifying Angles", periodsRequired: 2, completionDate: "2026-04-22", status: "in-progress",
            subtopics: ["Using a protractor", "Acute, obtuse, right angles", "Angle measurement in shapes"],
            learningObjectives: ["Students will measure angles using a protractor", "Students will classify angles by size"],
            studentDifficulties: [
              { area: "Reading the correct scale on a protractor (inner vs outer)", reason: "Protractors have two scales — students read the wrong one" },
              { area: "Identifying obtuse vs reflex angles", reason: "Both are 'big' angles — students struggle to differentiate" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Color the two protractor scales differently — red for outer, blue for inner — then practice with color-coded worksheets" }
            ]
          },
          {
            id: "mch2-t3", name: "Angles in Polygons", periodsRequired: 1, completionDate: "2026-04-26", status: "in-progress",
            subtopics: ["Angles in triangles", "Angles in quadrilaterals", "Angle sum property"],
            learningObjectives: ["Students will verify angle sum of triangle (180°)"],
            studentDifficulties: [
              { area: "Angle sum property proof", reason: "Students memorize 180° but cannot explain why" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Have students cut out triangles, tear off the three corners, and arrange them to form a straight line (180°)" }
            ]
          }
        ]
      },
      {
        id: "mch-3", name: "How Many Squares?", weightage: 6, marksDistribution: 6, difficulty: "Medium",
        status: "pending",
        topics: [
          {
            id: "mch3-t1", name: "Area by Counting Squares", periodsRequired: 1, completionDate: "2026-05-05", status: "pending",
            subtopics: ["Counting full squares", "Handling half and partial squares", "Estimating area of irregular shapes"],
            learningObjectives: ["Students will find area by counting unit squares"],
            studentDifficulties: [
              { area: "Adding half squares to full squares", reason: "Students count half squares as 1 instead of 0.5" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Trace hand on graph paper and count squares to find area of palm" }
            ]
          },
          {
            id: "mch3-t2", name: "Area of Rectangles and Squares", periodsRequired: 1, completionDate: "2026-05-10", status: "pending",
            subtopics: ["Formula for area of rectangle (l × b)", "Area of square (side × side)", "Word problems"],
            learningObjectives: ["Students will apply area formula for rectangles and squares"],
            studentDifficulties: [
              { area: "Confusing area (l×b) with perimeter (2(l+b))", reason: "Both involve length and breadth — students mix up formulas" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Show a rectangle divided into unit squares — students 'see' why area = l × b (count the squares)" }
            ]
          },
          {
            id: "mch3-t3", name: "Area of Irregular Shapes", periodsRequired: 1, completionDate: "2026-05-14", status: "pending",
            subtopics: ["Using grid paper", "Estimation techniques", "Real-life applications"],
            learningObjectives: ["Students will estimate area of irregular shapes"],
            studentDifficulties: [
              { area: "What counts as 'more than half' a square", reason: "Judging partial coverage is subjective — inconsistent student estimates" }
            ],
            teachingStrategies: [
              { type: "Real-life", description: "Find area of leaves, notebooks, classroom objects using grid paper" }
            ]
          }
        ]
      },
      {
        id: "mch-4", name: "Parts and Wholes (Fractions)", weightage: 10, marksDistribution: 10, difficulty: "Hard",
        status: "pending",
        topics: [
          {
            id: "mch4-t1", name: "Understanding Fractions", periodsRequired: 2, completionDate: "2026-05-25", status: "pending",
            subtopics: ["Numerator and denominator", "Fraction as part of a whole", "Fraction as part of a collection"],
            learningObjectives: ["Students will identify numerator and denominator", "Students will represent fractions visually"],
            studentDifficulties: [
              { area: "Denominator = total parts (not pieces taken)", reason: "Students think denominator is the number of shaded parts" },
              { area: "Equal parts concept", reason: "Students divide shapes into unequal parts but still call it a fraction" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Use pizza-cutting activity — each student gets a paper 'pizza' and divides into equal slices" },
              { type: "Visual", description: "Show fractions as 'parts of a whole' using real objects (chocolate bar, apple, roti)" }
            ]
          },
          {
            id: "mch4-t2", name: "Equivalent Fractions", periodsRequired: 1, completionDate: "2026-06-02", status: "pending",
            subtopics: ["Finding equivalent fractions", "Simplifying fractions", "Comparing fractions"],
            learningObjectives: ["Students will find equivalent fractions", "Students will compare unlike fractions"],
            studentDifficulties: [
              { area: "Comparing fractions with different denominators", reason: "Students compare numerators directly without finding common denominator" },
              { area: "Equivalent fractions — why 1/2 = 2/4 = 3/6", reason: "Students think different numbers mean different values" }
            ],
            teachingStrategies: [
              { type: "Visual", description: "Use fraction strips — show 1/2 strip aligns with 2/4 and 3/6 strips" },
              { type: "Activity", description: "Fraction wall activity: build a wall using fraction strips and find equivalent fractions" }
            ]
          },
          {
            id: "mch4-t3", name: "Addition and Subtraction of Fractions", periodsRequired: 2, completionDate: "2026-06-12", status: "pending",
            subtopics: ["Like fractions addition", "Unlike fractions addition", "Mixed fractions"],
            learningObjectives: ["Students will add and subtract fractions with like denominators", "Students will convert mixed to improper fractions"],
            studentDifficulties: [
              { area: "Adding fractions with different denominators", reason: "Students add denominators as well (e.g., 1/3 + 1/4 = 2/7)" },
              { area: "Mixed fraction conversion", reason: "Students forget whether to multiply or divide during conversion" }
            ],
            teachingStrategies: [
              { type: "Story", description: "The 'Common Denominator Club' story — fractions need same 'membership' before they can be added" },
              { type: "Visual", description: "Use fraction circles to physically add 1/4 + 1/2 — show that 1/2 = 2/4, then add" }
            ]
          }
        ]
      },
      {
        id: "mch-5", name: "Does it Look the Same?", weightage: 4, marksDistribution: 4, difficulty: "Easy",
        status: "pending",
        topics: [
          {
            id: "mch5-t1", name: "Symmetry in Shapes", periodsRequired: 1, completionDate: "2026-06-20", status: "pending",
            subtopics: ["Line symmetry", "Folding test for symmetry", "Symmetry in everyday objects"],
            learningObjectives: ["Students will identify lines of symmetry in shapes"],
            studentDifficulties: [
              { area: "Multiple lines of symmetry", reason: "Students stop after finding one line and don't check for more" }
            ],
            teachingStrategies: [
              { type: "Activity", description: "Paper folding activity — fold paper cutouts to find all lines of symmetry" }
            ]
          },
          {
            id: "mch5-t2", name: "Mirror Images and Reflections", periodsRequired: 1, completionDate: "2026-06-24", status: "pending",
            subtopics: ["Mirror symmetry", "Alphabet symmetry", "Rotational symmetry"],
            learningObjectives: ["Students will identify mirror images", "Students will find symmetric letters of alphabet"],
            studentDifficulties: [
              { area: "Mirror image reverses direction (left-right)", reason: "Students expect mirror image to be identical, not reversed" }
            ],
            teachingStrategies: [
              { type: "Experiment", description: "Use a small mirror — students hold it next to letters and numbers to see reflections" }
            ]
          }
        ]
      },
      {
        id: "mch-6", name: "Be My Multiple, I'll be Your Factor", weightage: 9, marksDistribution: 9, difficulty: "Hard",
        status: "pending",
        topics: [
          {
            id: "mch6-t1", name: "Multiples and Factors", periodsRequired: 2, completionDate: "2026-07-05", status: "pending",
            subtopics: ["Finding multiples", "Finding factors", "Prime and composite numbers", "Factor trees"],
            learningObjectives: ["Students will list multiples of a number", "Students will find prime factors using factor tree"],
            studentDifficulties: [
              { area: "Difference between multiples and factors", reason: "Students think multiples and factors are the same" },
              { area: "Factor tree — splitting until prime", reason: "Students stop splitting too early (not reaching prime factors)" }
            ],
            teachingStrategies: [
              { type: "Story", description: "The 'Factor and Multiple Family' — multiples are 'children' (grow bigger), factors are 'parents' (divide the number)" },
              { type: "Activity", description: "Factor tree art — create colorful factor trees for numbers 24, 36, 48 on chart paper" }
            ]
          },
          {
            id: "mch6-t2", name: "LCM and HCF", periodsRequired: 2, completionDate: "2026-07-15", status: "pending",
            subtopics: ["Finding LCM by listing method", "Finding HCF by listing method", "Prime factorization method", "Real-life applications"],
            learningObjectives: ["Students will find LCM of two numbers", "Students will find HCF of two numbers"],
            studentDifficulties: [
              { area: "LCM vs HCF — which is larger", reason: "Students confuse when LCM is used vs HCF" },
              { area: "Prime factorization method for LCM", reason: "Students miss common factors when using prime factorization" }
            ],
            teachingStrategies: [
              { type: "Real-life", description: "LCM: When do two buses (every 15 min and 20 min) meet again? HCF: How to divide 24 apples and 36 oranges equally?" },
              { type: "Visual", description: "Venn diagram method — place common factors in intersection, multiply all numbers in the diagram" }
            ]
          }
        ]
      }
    ],
    assessments: [
      { id: "massess-1", type: "Unit Test", title: "Unit Test 1", chaptersCovered: ["The Fish Tale", "Shapes and Angles"], scheduledDate: "2026-05-02", weightage: 15, status: "scheduled" },
      { id: "massess-2", type: "Chapter Test", title: "Chapter Test — How Many Squares?", chaptersCovered: ["How Many Squares?"], scheduledDate: "2026-05-20", weightage: 10, status: "scheduled" },
      { id: "massess-3", type: "Unit Test", title: "Unit Test 2 — Fractions", chaptersCovered: ["Parts and Wholes"], scheduledDate: "2026-06-25", weightage: 20, status: "scheduled" },
      { id: "massess-4", type: "Revision Test", title: "Revision Test (Chapters 1-6)", chaptersCovered: ["The Fish Tale", "Shapes and Angles", "How Many Squares?", "Parts and Wholes", "Does it Look the Same?", "Be My Multiple, I'll be Your Factor"], scheduledDate: "2026-07-30", weightage: 25, status: "scheduled" },
    ],
    revisionPlan: {
      startDate: "2027-02-01",
      endDate: "2027-03-01",
      importantTopics: [
        "Equivalent fractions", "Addition and subtraction of fractions", "Area of rectangles and squares",
        "Multiples and factors", "LCM and HCF", "Symmetry identification"
      ],
      highWeightageChapters: [
        "Parts and Wholes (10 marks)", "Be My Multiple, I'll be Your Factor (9 marks)",
        "Shapes and Angles (8 marks)", "How Many Squares? (6 marks)"
      ],
      frequentlyTestedConcepts: [
        "Fraction comparison", "Area by counting squares", "Angle measurement",
        "Factor trees", "LCM word problems", "Money word problems"
      ],
      studentFocusAreas: [
        "Fraction addition (unlike denominators)", "Perimeter vs area confusion",
        "LCM vs HCF application", "Symmetry lines in complex shapes"
      ],
      dailySchedule: [
        { date: "2027-02-01", dayLabel: "Day 1", chapters: ["The Fish Tale"], topics: ["Money word problems", "Speed, distance, time"], activities: ["Solve 10 word problems", "Data interpretation from tables"] },
        { date: "2027-02-03", dayLabel: "Day 2", chapters: ["Shapes and Angles"], topics: ["Angle types", "Using a protractor", "Angle sum of triangle"], activities: ["Measure 10 angles with protractor", "Verify triangle angle sum by cutting"] },
        { date: "2027-02-05", dayLabel: "Day 3", chapters: ["How Many Squares?"], topics: ["Area by counting", "Area formula", "Irregular shapes"], activities: ["Find area of 5 objects using grid", "Area vs perimeter worksheet"] },
        { date: "2027-02-08", dayLabel: "Day 4", chapters: ["Parts and Wholes"], topics: ["Fractions basics", "Equivalent fractions"], activities: ["Fraction wall activity", "Find 3 equivalent fractions for each"] },
        { date: "2027-02-10", dayLabel: "Day 5", chapters: ["Parts and Wholes"], topics: ["Fraction addition", "Fraction subtraction", "Mixed fractions"], activities: ["20 fraction problems", "Convert 10 mixed ↔ improper"] },
        { date: "2027-02-12", dayLabel: "Day 6", chapters: ["Does it Look the Same?"], topics: ["Line symmetry", "Mirror images", "Alphabet symmetry"], activities: ["Find symmetry in 20 shapes", "Mirror reflection worksheet"] },
        { date: "2027-02-15", dayLabel: "Day 7", chapters: ["Be My Multiple, I'll be Your Factor"], topics: ["Multiples", "Factors", "Prime factorization"], activities: ["Factor trees for 10 numbers", "List multiples of 12 numbers"] },
        { date: "2027-02-18", dayLabel: "Day 8", chapters: ["Be My Multiple, I'll be Your Factor"], topics: ["LCM", "HCF", "Word problems"], activities: ["LCM/HCF of 10 pairs", "Solve 5 real-life word problems"] },
        { date: "2027-02-22", dayLabel: "Day 9", chapters: ["Ch 1-3 Revision"], topics: ["Full revision of first 3 chapters"], activities: ["30 MCQs", "Solve 5 diagram questions"] },
        { date: "2027-02-25", dayLabel: "Day 10", chapters: ["Ch 4-6 Revision"], topics: ["Full revision of last 3 chapters"], activities: ["30 MCQs", "10 word problems", "Self-assessment"] },
        { date: "2027-02-28", dayLabel: "Day 11", chapters: ["Full Syllabus"], topics: ["Complete revision + Mock test"], activities: ["1-hour class test", "Review mistakes", "Focus on weak areas"] }
      ]
    }
  }
];

export const CLASS_SUBJECT_OPTIONS = [
  { className: "Class 5", subject: "Mathematics", board: "CBSE", planId: "plan-5-maths" },
  { className: "Class 5", subject: "Science", board: "CBSE", planId: null },
  { className: "Class 5", subject: "English", board: "CBSE", planId: null },
  { className: "Class 6", subject: "Science", board: "CBSE", planId: null },
  { className: "Class 6", subject: "Mathematics", board: "CBSE", planId: null },
  { className: "Class 7", subject: "Science", board: "CBSE", planId: null },
  { className: "Class 7", subject: "Mathematics", board: "CBSE", planId: null },
  { className: "Class 8", subject: "Science", board: "CBSE", planId: null },
  { className: "Class 8", subject: "Mathematics", board: "CBSE", planId: null },
  { className: "Class 9", subject: "Science", board: "CBSE", planId: null },
  { className: "Class 9", subject: "Mathematics", board: "CBSE", planId: null },
  { className: "Class 10", subject: "Science", board: "CBSE", planId: "plan-10-sci" },
  { className: "Class 10", subject: "Mathematics", board: "CBSE", planId: null },
];
