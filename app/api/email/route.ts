import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !sheetId) {
      return NextResponse.json(
        { error: "Missing Google env variables" },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await auth.authorize();

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:C",
      valueInputOption: "RAW",
      requestBody: {
        values: [[email, new Date().toISOString(), "carcost_v1"]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("EMAIL API ERROR FULL:", error);
    console.error("EMAIL API ERROR MESSAGE:", error?.message);
    console.error("EMAIL API ERROR RESPONSE:", error?.response?.data);

    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}