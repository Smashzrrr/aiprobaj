import { NextResponse, type NextRequest } from "next/server";
import { dekodirajEmail, odjavi, provjeriToken } from "@/lib/odjava";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: samo vodi na stranicu s potvrdom. Ne odjavljuje, jer link skeneri i
// pregledi mailova otvaraju linkove bez pitanja.
export async function GET(req: NextRequest) {
  const url = new URL("/odjava", req.url);
  for (const k of ["e", "t"]) {
    const v = req.nextUrl.searchParams.get(k);
    if (v) url.searchParams.set(k, v);
  }
  return NextResponse.redirect(url, 303);
}

// POST: odjavljuje. Dva klijenta:
// 1. Mail klijent (one-click, RFC 8058): body "List-Unsubscribe=One-Click",
//    e i t u URL-u iz List-Unsubscribe headera. Odgovor 200, bez redirecta.
// 2. Forma sa stranice /odjava: e i t u URL-u ili poljima. Odgovor 303 natrag
//    na stranicu sa statusom.
export async function POST(req: NextRequest) {
  let form: URLSearchParams | null = null;
  const ct = req.headers.get("content-type") || "";
  try {
    if (ct.includes("application/x-www-form-urlencoded")) {
      form = new URLSearchParams(await req.text());
    } else if (ct.includes("multipart/form-data")) {
      const fd = await req.formData();
      form = new URLSearchParams();
      for (const [k, v] of fd) if (typeof v === "string") form.set(k, v);
    }
  } catch {
    form = null;
  }
  const oneClick = form?.get("List-Unsubscribe") === "One-Click";
  const e = req.nextUrl.searchParams.get("e") ?? form?.get("e") ?? null;
  const t = req.nextUrl.searchParams.get("t") ?? form?.get("t") ?? "";

  const natrag = (status: string) => {
    const url = new URL("/odjava", req.url);
    url.searchParams.set("status", status);
    if (status === "greska" && e && t) {
      url.searchParams.set("e", e);
      url.searchParams.set("t", t);
    }
    return NextResponse.redirect(url, 303);
  };

  const email = dekodirajEmail(e);
  if (!email || !provjeriToken(email, t)) {
    return oneClick
      ? new NextResponse("Neispravan link za odjavu.", { status: 400 })
      : natrag("neispravan");
  }

  const ok = await odjavi(email, oneClick ? "one-click" : "link");
  if (!ok) {
    return oneClick
      ? new NextResponse("Odjava trenutno nije uspjela.", { status: 500 })
      : natrag("greska");
  }
  return oneClick ? new NextResponse("Odjavljeno.", { status: 200 }) : natrag("odjavljen");
}
