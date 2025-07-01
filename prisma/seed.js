import {
  PrismaClient,
  LevelEnum,
  CategoryEnum,
  QuestionType,
  QuestionnaireType,
  SectionType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.roleMapping.createMany({
    data: [
      {
        role: "Lead Support Engineer",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Architect",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Lead Data Scientist",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Accountant",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Lead Software Engineer",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Network Data Engineer - RAN",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Associate Site reliability engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Engineering Lead - Software Engineering",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Lead Software Engineer",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Manager - IT & Sysops",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Architect",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Director - COE Central Ops",
        level: LevelEnum.Leadership,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Intermediate IT",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Manager - Software Engineering",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Team Lead Sysops",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Director - Product Management",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Team Lead - Software Engineering",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Team Lead - Software Engineering",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Software Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Director - Solutions Business Development",
        level: LevelEnum.Leadership,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Software Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Project and Proposal Manager",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Architecture Director",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Team Lead IT - CALA",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Director Support",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Director - Sales Engineering",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Machine Learning Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Quality Assurance Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Quality Assurance Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Customer Support Specialist Team Lead",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Customer Support Specialist - Transmission SME",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Lead Analyst Specialist",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Intermediate IT Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Manager - Compensation, Benefits and Administration",
        level: LevelEnum.Manager,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Business Analyst",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "RF Design Lead",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Director - People and Culture",
        level: LevelEnum.Leadership,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Manager - Talent Acquisition & Development",
        level: LevelEnum.Manager,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Business Analyst",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Talent Acquisition & Development - Team Lead",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Manager - Project Controls",
        level: LevelEnum.Manager,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "IBS & PN Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior sysOps/DevOps",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior DevOps",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Team Lead - Quality Assurance Engineering",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Manager",
        level: LevelEnum.Manager,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Director - Product Engineering",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Site Reliability Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Associate Software Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Intermediate Business Analyst",
        level: LevelEnum.IC,
        category: CategoryEnum.Technical,
      },
      {
        role: "Associate Ericsson Integration Engineer",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Product Manager",
        level: LevelEnum.Manager,
        category: CategoryEnum.Technical,
      },
      {
        role: "Team Lead - Talent Acquisition and Development",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Accountant",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Dev & QA Director",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Infosec and Project Manager",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Customer Support Specialist",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Financial Analyst",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Senior Manager FP&A",
        level: LevelEnum.Manager,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Talent and Communication Specialist",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Compensation, Benefits & Administration Officer",
        level: LevelEnum.IC,
        category: CategoryEnum.NonTechnical,
      },
      {
        role: "Team Lead IT - MENA",
        level: LevelEnum.Supervisory,
        category: CategoryEnum.Technical,
      },
      {
        role: "Director Manager PMU",
        level: LevelEnum.Leadership,
        category: CategoryEnum.Technical,
      },
      {
        role: "Senior Project Manager",
        level: LevelEnum.Manager,
        category: CategoryEnum.NonTechnical,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✔ Role Mapping ready");

  const antoine = await prisma.user.upsert({
    where: { email: "antoine.karam@yuvo.com" },
    update: {},
    create: {
      name: "Antoine Karam",
      email: "antoine.karam@yuvo.com",
      role: "Engineering Lead - Software Engineering",
    },
  });
  const joseph = await prisma.user.upsert({
    where: { email: "joseph.njeim@yuvo.com" },
    update: {},
    create: {
      name: "Joseph Njeim",
      email: "joseph.njeim@yuvo.com",
      role: "Business Analyst",
    },
  });
  const rayan = await prisma.user.upsert({
    where: { email: "rayan.arab@yuvo.com" },
    update: {},
    create: {
      name: "Rayan Arab",
      email: "rayan.arab@yuvo.com",
      role: "Senior Product Manager",
    },
  });

  const mira = await prisma.user.upsert({
    where: { email: "mira.boualia@yuvo.com" },
    update: {},
    create: {
      name: "Mira Bou Alia",
      email: "mira.boualia@yuvo.com",
      role: "Senior Manager",
    },
  });

  console.log("✔ User Antoine,Mira,Joseph,Rayan ready");
  await prisma.user.update({
    where: { id: antoine.id },
    data: { managerId: mira.id },
  });
  await prisma.user.update({
    where: { id: joseph.id },
    data: { managerId: rayan.id },
  });
  console.log("✔ User Antoine,Joseph assigned to managers");

  let cycle = await prisma.cycle.findFirst({
    where: { name: "Q4 2025" },
  });
  if (cycle == null) {
    cycle = await prisma.cycle.create({
      data: {
        name: "Q4 2025",
        startDate: new Date("2025-7-01"),
        endDate: new Date("2025-9-30"),
      },
    });
  }
  console.log(`✔ Cycle "Q4 2025" ready (id=${cycle.id})`);
  const valuesQuestions = {
    Adaptability:
      "Display adaptability, flexibility, versatility, adjustment, and a readiness to change with circumstances.",
    Resilience:
      "Exhibit dedication, devotion, commitment, and a strong commitment to getting the job done.",
    Empowerment:
      "Inspire and uplift others by fostering a culture of support, encouraging independence, nurturing self-sufficiency, and instilling a strong belief in each person's unique potential.",
    Innovation:
      "Drive innovation, creativity, ingenuity, originality, and a continuous pursuit of novel solutions.",
  };

  const createdValuesQuestions = await Promise.all(
    Object.keys(valuesQuestions).map(async (text) => {
      let question = await prisma.question.findFirst({
        where: { text },
      });
      if (question == null) {
        question = await prisma.question.create({
          data: {
            text,
            description: valuesQuestions[text],
            type: QuestionType.RatingScale,
          },
        });
      }
      return question;
    })
  );

  console.log(
    `✔ ${createdValuesQuestions.length} Values questions created/checked.`
  );

  const competencies = {
    IC: {
      NonTechnical: {
        Reliability:
          "Be dependable, be consistent, be available, complete work properly, and on time.",
        Collaboration:
          "Willingness to communicate and work harmoniously with others in getting a job done, respond positively to instructions and procedures and foster effective collaboration within the team.",
        "Process Thinking":
          "Ability to understand and apply systematic approaches to work, enhancing efficiency and quality.",
        "Critical Thinking":
          "Capable of evaluating options and making decisions within the scope of own work.",
        "Productivity/ Efficiency":
          "Produces significant amounts of work, maintains quality, manages time effectively, and works independently.",
      },
      Technical: {
        Reliability:
          "Be dependable, be consistent, be available, complete work properly, and on time.",
        Collaboration:
          "Willingness to communicate and work harmoniously with others in getting a job done, respond positively to instructions and procedures and foster effective collaboration within the team.",
        "Process Thinking":
          "Ability to understand and apply systematic approaches to work, enhancing efficiency and quality.",
        "Critical Thinking":
          "Capable of evaluating options and making decisions within the scope of own work.",
        "Productivity/ Efficiency":
          "Produces significant amounts of work, maintains quality, manages time effectively, and works independently.",
        "Product Knowledge":
          "Understand and effectively work with product offerings, contributing to their development and improvement.",
        "Code Fluency & Quality":
          "Ability to write high-quality code that is clean, efficient, and maintainable.",
        "Customer Centricity":
          "Actively seeks customer insights and implements changes to enhance customer-centricity in team projects.",
      },
    },
    Supervisory: {
      NonTechnical: {
        Reliability:
          "Be dependable, be consistent, be available, complete work properly, and on time.",
        Collaboration:
          "Willingness to communicate and work harmoniously with others in getting a job done, respond positively to instructions and procedures and foster effective collaboration within the team.",
        "Planning, Organizing and Work Breakdown":
          "The ability to analyze work, set goals, develop plans of action, utilize time, and carry out assignments carefully, including breaking down the project roadmap into manageable chunks to ensure clarity and alignment across all stakeholders.",
        "Inspiring and Influencing":
          "The ability to create a motivating climate, achieve teamwork, train, and measure work in progress, take corrective action",
        "Decision-Making":
          "The ability to make decisions, the quality and timeliness of those decisions.",
        "Dealing With Ambiguity":
          "Ability to navigate uncertainty or unclear situations, making decisions with incomplete information.",
      },
      Technical: {
        Reliability:
          "Be dependable, be consistent, be available, complete work properly, and on time.",
        Collaboration:
          "Willingness to communicate and work harmoniously with others in getting a job done, respond positively to instructions and procedures and foster effective collaboration within the team.",
        "Planning, Organizing and Work Breakdown":
          "The ability to analyze work, set goals, develop plans of action, utilize time, and carry out assignments carefully, including breaking down the project roadmap into manageable chunks to ensure clarity and alignment across all stakeholders.",
        "Inspiring and Influencing":
          "The ability to create a motivating climate, achieve teamwork, train, and measure work in progress, take corrective action",
        "Decision-Making":
          "The ability to make decisions, the quality and timeliness of those decisions",
        "Dealing With Ambiguity":
          "Ability to navigate uncertainty or unclear situations, making decisions with incomplete information",
        "Business Acumen":
          "Leads business initiatives, leveraging industry insights to create a competitive advantage.",
        "End-to-End System Knowledge":
          "Leads the exploration and evaluation of new technologies and system enhancements to drive efficiency and effectiveness",
      },
    },
    Leadership: {
      NonTechnical: {
        Reliability:
          "Be dependable, be consistent, be available, complete work properly, and on time.",
        Collaboration:
          "Willingness to communicate and work harmoniously with others in getting a job done, respond positively to instructions and procedures and foster effective collaboration within the team.",
        "Planning, Organizing and Work Breakdown":
          "The ability to analyze work, set goals, develop plans of action, utilize time, and carry out assignments carefully, including breaking down the project roadmap into manageable chunks to ensure clarity and alignment across all stakeholders.",
        "Inspiring and Influencing":
          "The ability to create a motivating climate, achieve teamwork, train, and measure work in progress, take corrective action.",
        "Decision-Making":
          "The ability to make decisions, the quality and timeliness of those decisions.",
        "Dealing With Ambiguity":
          "Ability to navigate uncertainty or unclear situations, making decisions with incomplete information.",
        "Economic Awareness":
          "Sets industry benchmarks for economic awareness, shaping strategies that maximize financial performance and value creation.",
        "Delegation and Succession Planning":
          "Elevating yourself from the day-to-day tasks, creating successors within your team, and, if successors are not available, proactively speaking up about it to ensure a strategic and effective delegation process.",
      },
      Technical: {
        Reliability:
          "Be dependable, be consistent, be available, complete work properly, and on time",
        Collaboration:
          "Willingness to communicate and work harmoniously with others in getting a job done, respond positively to instructions and procedures and foster effective collaboration within the team.",
        "Planning, Organizing and Work Breakdown":
          "The ability to analyze work, set goals, develop plans of action, utilize time, and carry out assignments carefully, including breaking down the project roadmap into manageable chunks to ensure clarity and alignment across all stakeholders.",
        "Inspiring and Influencing":
          "The ability to create a motivating climate, achieve teamwork, train, and measure work in progress, take corrective action.",
        "Decision-Making":
          "The ability to make decisions, the quality and timeliness of those decisions.",
        "Dealing With Ambiguity":
          "Ability to navigate uncertainty or unclear situations, making decisions with incomplete information.",
        "Economic Awareness":
          "Sets industry benchmarks for economic awareness, shaping strategies that maximize financial performance and value creation.",
        "End-to-End System Knowledge":
          "Leads the exploration and evaluation of new technologies and system enhancements to drive efficiency and effectiveness.",
        "Solution Design":
          "Shapes industry best practices in system and solution design and develops groundbreaking designs that influence the organization.",
        "Delegation and Succession Planning":
          "Elevating yourself from the day-to-day tasks, creating successors within your team, and, if successors are not available, proactively speaking up about it to ensure a strategic and effective delegation process.",
      },
    },
  };

  const allCompetencyEntries = [];

  for (const levelKey of Object.keys(competencies)) {
    const byCategory = competencies[levelKey];
    for (const categoryKey of Object.keys(byCategory)) {
      const questionMap = byCategory[categoryKey];
      for (const text of Object.keys(questionMap)) {
        const description = questionMap[text];
        allCompetencyEntries.push({ text, description });
      }
    }
  }
  const uniqueCompetencyEntries = Array.from(
    allCompetencyEntries.reduce((map, entry) => {
        if (!map.has(entry.text)) {
          map.set(entry.text, entry);
        }
        return map;
      },
      new Map()).values()
  );
  const createdCompetencyQuestions = await Promise.all(
    uniqueCompetencyEntries.map(async ({ text, description }) => {
      let question = await prisma.question.findFirst({
        where: { text },
      });
      if (question == null) {
        question = await prisma.question.create({
          data: {
            text,
            description,
            type: QuestionType.RatingScale,
          },
        });
      }
      return question;
    })
  );

  console.log(
    `✔ ${createdCompetencyQuestions.length} Competency questions created/checked.`
  );

  const combos = [
    { level: LevelEnum.IC, category: CategoryEnum.NonTechnical },
    { level: LevelEnum.IC, category: CategoryEnum.Technical },
    { level: LevelEnum.Supervisory, category: CategoryEnum.NonTechnical },
    { level: LevelEnum.Supervisory, category: CategoryEnum.Technical },
    { level: LevelEnum.Leadership, category: CategoryEnum.NonTechnical },
    { level: LevelEnum.Leadership, category: CategoryEnum.Technical },
  ];
  for (const { level, category } of combos) {
    for (const qType of [QuestionnaireType.Self, QuestionnaireType.Manager]) {
      const name = `${level}-${category}-${qType}`;
      let questionnaire = await prisma.questionnaire.findFirst({
        where: { name, version: 1 },
      });
      if (!questionnaire) {
        questionnaire = await prisma.questionnaire.create({
          data: {
            name,
            version: 1,
            level,
            category,
            type: qType,
            isActive: true,
          },
        });
      }

      console.log(
        `    ✔ Questionnaire "${name}" ready (id=${questionnaire.id})`
      );
      let secValues = await prisma.section.findFirst({
        where: {
          questionnaireId: questionnaire.id,
          title: "Values",
        },
      });
      if (!secValues) {
        secValues = await prisma.section.create({
          data: {
            title: "Values",
            type: SectionType.QUESTIONS,
            orderIndex: 1,
            questionnaire: { connect: { id: questionnaire.id } },
          },
        });
        for (let idx = 0; idx < createdValuesQuestions.length; idx++) {
          const q = createdValuesQuestions[idx];
          await prisma.sectionQuestion.create({
            data: {
              section: { connect: { id: secValues.id } },
              question: { connect: { id: q.id } },
              orderIndex: idx + 1,
              required: false,
            },
          });
        }

        let secCompetencies = await prisma.section.findFirst({
          where: {
            questionnaireId: questionnaire.id,
            title: "Competencies",
          },
        });
        if (!secCompetencies) {
          secCompetencies = await prisma.section.create({
            data: {
              title: "Competencies",
              type: SectionType.QUESTIONS,
              orderIndex: 2,
              questionnaire: { connect: { id: questionnaire.id } },
            },
          });
          const comboQuestionMap = competencies[level][category];
          const questionTexts = Object.keys(comboQuestionMap);
          for (let idx = 0; idx < questionTexts.length; idx++) {
            const text = questionTexts[idx];
            const question = createdCompetencyQuestions.find(
              (qq) => qq.text === text
            );
            if (!question) {
              console.warn(
                `⚠️  Skipping missing competency question: "${text}"`
              );
              continue;
            }
            await prisma.sectionQuestion.create({
              data: {
                section: { connect: { id: secCompetencies.id } },
                question: { connect: { id: question.id } },
                orderIndex: idx + 1,
                required: false,
              },
            });
          }
        }
        const secObjectives = await prisma.section.findFirst({
          where: {
            questionnaireId: questionnaire.id,
            title: "Objectives",
          },
        });
        if (!secObjectives) {
          await prisma.section.create({
            data: {
              title: "Objectives",
              type: SectionType.OBJECTIVES,
              orderIndex: 3,
              questionnaire: { connect: { id: questionnaire.id } },
            },
          });
        }
        console.log(`        ✔ Sections for "${name}" created/checked.`);
      }
    }
  }
  console.log("✅ Seed data created!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
