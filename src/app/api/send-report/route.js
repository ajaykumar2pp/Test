import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ResumeReport from "@/components/pdf/ResumeReport";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, reportData } = body;

    // console.log("Reported Data Check :", reportData)

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generate PDF Buffer
    const pdfBuffer = await renderToBuffer(<ResumeReport data={reportData} />);

    await transporter.sendMail({
      from: `"Resume Analyzer" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Resume Analysis Report",
 html: `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f9fafb; border-radius:12px; border:1px solid #e5e7eb;">

    <h2 style="margin:0; font-size:20px; color:#111827;">
      📄 ATS Resume Analysis Report
    </h2>

    <p style="margin-top:10px; font-size:14px; color:#4b5563; line-height:1.6;">
      Your resume report has been successfully generated using our AI-powered system.
    </p>

    <p style="margin-top:10px; font-size:14px; color:#4b5563; line-height:1.6;">
      Please find the attached PDF report for detailed insights, ATS score, and improvement suggestions.
    </p>

    <div style="margin-top:15px; padding:12px; background:#eef2ff; border-radius:8px; font-size:13px; color:#3730a3;">
      🚀 This report is optimized for recruiters and ATS systems.
    </div>

  </div>
`,

      attachments: [
        {
          filename: "ATS-Resume-Report.pdf",
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Report sent successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
