export async function GET() {
  return new Response(process.env.GOOGLE_CLIENT_EMAIL);
}