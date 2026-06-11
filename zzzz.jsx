generator client {
  provider = "prisma-client-js"
  output   = "../src/app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum Role {
  ADMIN
  USER
}

model User {
  id       String @id @default(cuid())
  fullName String
  email    String @unique
  password String
  gender   String

  role Role @default(USER)

  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relation
  resumeAnalyses ResumeAnalysis[]
  feedbacks      Feedback[]

  @@map("user")
}

model ResumeAnalysis {
  id String @id @default(cuid())

  atsScore        Int
  matchPercentage Int

  resumeQuality        Int
  recruiterReadability Int

  resumeSummary String?

  missingSkills   String[]
  missingKeywords String[]

  finalVerdict String?

  // Skill Analysis
  matchedSkills      Json?
  recommendedSkills  String[]
  skillGapPercentage Int?

  // Section Analysis
  sectionWiseAnalysis Json?

  // Keyword Analysis
  priorityKeywords String[]
  atsImpactLevel   String?

  // Resume Insights
  resumeStrengths        String[]
  resumeWeaknesses       String[]
  improvementSuggestions String[]

  // Career Coach
  overallAdvice           String?
  recommendedLearningPath String[]
  recommendedProjects     String[]
  nextCareerSteps         String[]

  // Interview Questions
  technicalQuestions  String[]
  projectQuestions    String[]
  behavioralQuestions String[]
  hrQuestions         String[]

  // File Metadata
  fileUrl  String?
  fileName String?
  fileSize Int?
  fileType String?

  createdAt DateTime @default(now())

  // User Relation
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("resume_analyses")
}

model Feedback {
  id      String @id @default(cuid())
  rating  Int
  message String

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@map("feedbacks")
}
