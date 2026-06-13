import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontSize: 11,
    fontFamily: "Helvetica",
    flexDirection: "column",
  },

  header: {
    marginBottom: 20,
    borderBottom: "2 solid #7c3aed",
    paddingBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    marginTop: 5,
    color: "#6b7280",
    fontSize: 10,
  },

  gridRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },

  card: {
    flex: 1,
    border: "1 solid #e5e7eb",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9fafb",
    marginRight: 8,
  },

  cardTitle: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 4,
  },

  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  section: {
    marginBottom: 10,
    border: "1 solid #e5e7eb",
    borderRadius: 8,
    padding: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
  },

  paragraph: {
    lineHeight: 1.5,
    color: "#374151",
  },

  listItem: {
    marginBottom: 4,
  },

  skillRow: {
    marginBottom: 10,
  },

  skillLabel: {
    marginBottom: 3,
    fontSize: 10,
  },

  progressBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
  },

  progressFill: {
    height: 8,
    backgroundColor: "#22c55e",
    borderRadius: 10,
  },

  badge: {
    padding: 4,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 4,
    backgroundColor: "#fef3c7",
    fontSize: 9,
  },

  verdict: {
    marginTop: 10,
    color: "#059669",
    fontWeight: "bold",
  },
});

export default function ResumeReport({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Resume Analysis Report</Text>

          <Text style={styles.subtitle}>AI Powered ATS Resume Analysis</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resume Information</Text>

          <Text style={styles.text}>Details used for this resume analysis</Text>

          <View style={{ marginTop: 10 }}>
            {/* TOP ROW */}
            <View style={styles.gridRow}>
              <View style={[styles.card, { backgroundColor: "#eef2ff" }]}>
                <Text style={styles.label}>Company Name</Text>
                <Text style={[styles.value, { color: "#4f46e5" }]}>
                  {data?.companyName || "Not Provided"}
                </Text>
              </View>

              <View style={[styles.card, { backgroundColor: "#ecfeff" }]}>
                <Text style={styles.label}>Job Title</Text>
                <Text style={[styles.value, { color: "#0891b2" }]}>
                  {data?.jobRole || "Not Provided"}
                </Text>
              </View>
            </View>

            {/* BOTTOM ROW */}
            <View style={styles.gridRow}>
              <View style={[styles.card, { backgroundColor: "#fefce8" }]}>
                <Text style={styles.label}>Resume Name</Text>
                <Text style={[styles.value, { color: "#ca8a04" }]}>
                  {data?.fileName || "Unknown"}
                </Text>
              </View>

              <View style={[styles.card, { backgroundColor: "#f0fdf4" }]}>
                <Text style={styles.label}>Analyzed On</Text>
                <Text style={[styles.value, { color: "#16a34a" }]}>
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Score Cards */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ATS Score</Text>
            <Text style={styles.cardValue}>{data?.aiAnalysis?.atsScore}/100</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Match %</Text>
            <Text style={styles.cardValue}>{data?.aiAnalysis?.matchPercentage}%</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Verdict</Text>
            <Text style={styles.cardValue}>Strong Fit</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>

          <Text style={styles.paragraph}>{data?.aiAnalysis?.resumeSummary}</Text>

          <Text style={styles.verdict}>{data?.aiAnalysis?.finalVerdict}</Text>
        </View>

        {/* Score Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Score Breakdown</Text>

          <Text>
            ATS Compatibility: {data?.aiAnalysis?.resumeScoreGauge?.atsCompatibility}%
          </Text>

          <Text>Resume Quality: {data?.aiAnalysis?.resumeScoreGauge?.resumeQuality}%</Text>

          <Text>
            Recruiter Readability: {data?.aiAnalysis?.resumeScoreGauge?.recruiterReadability}
            %
          </Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skill Match Analysis</Text>

          {data?.aiAnalysis?.skillMatchAnalysis?.matchedSkills?.map((skill, index) => (
            <View key={index} style={styles.skillRow}>
              <Text style={styles.skillLabel}>
                {skill.skill} ({skill.score}%)
              </Text>

              <View style={styles.progressBackground}>
                <View
                  style={{
                    ...styles.progressFill,
                    width: `${skill.score}%`,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Strengths */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resume Strengths</Text>

          {data?.aiAnalysis?.resumeStrengths?.map((item, index) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>

        {/* Weaknesses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resume Weaknesses</Text>

          {data?.aiAnalysis?.resumeWeaknesses?.map((item, index) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>

        {/* Missing Keywords */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Missing Keywords</Text>

          {data?.aiAnalysis?.missingKeywordsAnalysis?.keywords?.map((keyword, index) => (
            <Text key={index} style={styles.listItem}>
              • {keyword}
            </Text>
          ))}
        </View>

        {/* Improvements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Improvement Suggestions</Text>

          {data?.aiAnalysis?.improvementSuggestions?.map((item, index) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Career Coach</Text>

          <Text style={styles.paragraph}>
            {data?.aiAnalysis?.careerCoach?.overallAdvice}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Learning Path</Text>

          {data?.aiAnalysis?.careerCoach?.recommendedLearningPath?.map((item, index) => (
            <Text key={index}>• {item}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interview Questions</Text>

          {data?.aiAnalysis?.interviewQuestions?.technical?.map((question, index) => (
            <Text key={index} style={styles.listItem}>
              {index + 1}. {question}
            </Text>
          ))}
        </View>
      </Page>

      {/* PAGE 2 */}
      {/* <Page size="A4" style={styles.page}>
        
      </Page> */}
    </Document>
  );
}
