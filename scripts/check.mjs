import { createClient } from "@supabase/supabase-js";

const url = "https://uxdisfhxmfsrnixrimwi.supabase.co";
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4ZGlzZmh4bWZzcm5peHJpbXdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjA0MDE3NCwiZXhwIjoyMDk3NjE2MTc0fQ._2951SLDh1q7-FmE9YIxGr0lTq3J5csAMAsocJaagVc";
const admin = createClient(url, serviceKey);

const { data } = await admin.from("judostore-v1").select("brand, name, price, currency, price_display").order("brand");

console.log("\n💴 가격 데이터 샘플 (전체):\n");
for (const p of data ?? []) {
  console.log(`[${p.brand}] ${p.name.slice(0, 40).padEnd(40)} | price: ${String(p.price ?? "null").padStart(8)} | currency: ${p.currency ?? "null"} | display: ${p.price_display ?? "null"}`);
}

// 통화별 분류
const currencies = {};
for (const p of data ?? []) {
  const c = p.currency ?? "null";
  if (!currencies[c]) currencies[c] = [];
  currencies[c].push(p.price);
}

console.log("\n📊 통화별 분류:");
for (const [c, prices] of Object.entries(currencies)) {
  console.log(`  ${c}: ${prices.length}개, 가격 범위 ${Math.min(...prices.filter(Boolean))} ~ ${Math.max(...prices.filter(Boolean))}`);
}
