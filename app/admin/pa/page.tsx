import { fetchContent } from "../actions";
import type { AdminContentData, PaSettings } from "../actions";
import { AdminPaWorkbench } from "../components/AdminPaWorkbench";
import {
  paAgreementGeneral,
  paChallenges,
  paReportGeneral,
  paReportStandards,
  paWorkload2569
} from "@/lib/pa-data";

function getDefaultPaSettings(content: AdminContentData): PaSettings {
  const defaults: PaSettings = {
    general: {
      name: paAgreementGeneral[0].value,
      position: paAgreementGeneral[1].value,
      school: paAgreementGeneral[2].value,
      affiliation: paAgreementGeneral[3].value,
      salary: paAgreementGeneral[4].value,
      agreementPeriod: paAgreementGeneral[5].value,
      classroomType: paAgreementGeneral[6].value,
      workloadHours: "43",
      preface: paReportGeneral.preface,
      pdfTitle: "แบบบันทึกข้อตกลงในการปฎิบัติงาน PA",
      agreementPdfUrl: "/pa-agreement-2569.pdf",
      agreementDownloadUrl: "/api/download/pa-agreement"
    },
    reportGeneral: {
      education: paReportGeneral.education,
      leave: paReportGeneral.leave
    },
    workloadGroups: paWorkload2569,
    reportStandards: paReportStandards,
    challenges: paChallenges
  };

  if (!content.paSettings) {
    return defaults;
  }

  return {
    ...defaults,
    ...content.paSettings,
    general: {
      ...defaults.general,
      ...content.paSettings.general
    },
    reportGeneral: {
      ...defaults.reportGeneral,
      ...content.paSettings.reportGeneral
    },
    workloadGroups: content.paSettings.workloadGroups?.length ? content.paSettings.workloadGroups : defaults.workloadGroups,
    reportStandards: (content.paSettings.reportStandards?.length ? content.paSettings.reportStandards : defaults.reportStandards).map((domain) => ({
      ...domain,
      items: domain.items.map((item) => ({
        ...item,
        selfAssessmentLevel: ["1", "2", "3", "4"].includes(item.selfAssessmentLevel || "") ? item.selfAssessmentLevel : "3"
      }))
    })),
    challenges: (content.paSettings.challenges?.length ? content.paSettings.challenges : defaults.challenges).map((challenge) => ({
      ...challenge,
      selfAssessmentLevel: ["1", "2", "3", "4"].includes(challenge.selfAssessmentLevel || "") ? challenge.selfAssessmentLevel : "3"
    }))
  };
}

export default async function AdminPaPage() {
  const content = (await fetchContent()) as AdminContentData;
  return <AdminPaWorkbench initialSettings={getDefaultPaSettings(content)} />;
}
