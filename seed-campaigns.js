/**
 * seed-campaigns.js
 * Seeds all HushhAmbassify campaigns to Firestore using the REST API.
 * Run: node seed-campaigns.js
 * Requires: Node 18+ (uses built-in fetch)
 */

const PROJECT_ID  = 'hushh-9bd71';
const DB_URL      = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// ── All campaigns to seed ──────────────────────────────────────────────────
const campaigns = [
  {
    id: '1',
    emoji: '🎓',
    name: 'IIT Delhi Spring Blitz 2025',
    status: 'Active',
    start: '2025-03-01',
    end: '2025-03-31',
    campus: 'IIT Delhi',
    ambassadors: 12,
    goal: 1500,
    signups: 1200,
    reach: 5840,
    desc: 'Spring semester outreach campaign targeting IIT Delhi students via referral links and campus events. Focus on B.Tech 1st and 2nd year.',
    updatedBy: 'Sarah Mitchell'
  },
  {
    id: '2',
    emoji: '🚀',
    name: 'BITS Pilani Tech Drive',
    status: 'Active',
    start: '2025-02-15',
    end: '2025-03-15',
    campus: 'BITS Pilani',
    ambassadors: 8,
    goal: 800,
    signups: 520,
    reach: 3210,
    desc: 'Tech-focused drive leveraging BITS Pilani ambassador network for maximum reach via LinkedIn and WhatsApp groups.',
    updatedBy: 'Sarah Mitchell'
  },
  {
    id: '3',
    emoji: '⚡',
    name: 'NIT Trichy Hackathon Promo',
    status: 'Active',
    start: '2025-03-10',
    end: '2025-04-10',
    campus: 'NIT Trichy',
    ambassadors: 6,
    goal: 500,
    signups: 140,
    reach: 1920,
    desc: 'Promoting Hushh sign-ups alongside the NIT Trichy annual hackathon. Targets CS and IT students.',
    updatedBy: 'Sarah Mitchell'
  },
  {
    id: '4',
    emoji: '🌟',
    name: 'DSU Trichy — HushhAmbassify Drive',
    status: 'Active',
    start: '2025-03-20',
    end: '2025-04-20',
    campus: 'DSU, Trichy',
    ambassadors: 5,
    goal: 600,
    signups: 258,
    reach: 2180,
    desc: 'Targeting DSU Trichy students via WhatsApp groups, college fests, and classroom sessions. Focused on B.Tech 2nd & 3rd year students.',
    updatedBy: 'Sarah Mitchell'
  },
  {
    id: '5',
    emoji: '💻',
    name: 'Hushh Hackathon 2025',
    status: 'Active',
    start: '2025-04-05',
    end: '2025-04-06',
    campus: 'Pan-India',
    ambassadors: 15,
    goal: 1000,
    signups: 720,
    reach: 18400,
    desc: '48-hour pan-India hackathon hosted by HushhAmbassify. Tracks: AI, FinTech & Privacy. Prize pool ₹5,00,000. Ambassadors promoting via LinkedIn and engineering WhatsApp groups.',
    updatedBy: 'Sarah Mitchell'
  },
  {
    id: '6',
    emoji: '🎯',
    name: 'VIT Vellore Semester Kick-off',
    status: 'Completed',
    start: '2025-01-01',
    end: '2025-02-28',
    campus: 'VIT Vellore',
    ambassadors: 10,
    goal: 1000,
    signups: 987,
    reach: 6100,
    desc: 'Semester kick-off outreach at VIT Vellore. Campaign is now completed with 98.7% goal achievement.',
    updatedBy: 'Sarah Mitchell'
  }
];

// ── Convert JS value to Firestore REST API value format ───────────────────
function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return { integerValue: String(val) };
    return { doubleValue: val };
  }
  if (typeof val === 'string') return { stringValue: val };
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) fields[k] = toFirestoreValue(v);
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function toFirestoreDoc(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    fields[k] = toFirestoreValue(v);
  }
  // Add server-side timestamp placeholder (REST uses string format)
  fields['updatedAt'] = { stringValue: new Date().toISOString() };
  return { fields };
}

// ── Seed each campaign via REST PATCH (upsert) ────────────────────────────
async function seedCampaigns() {
  console.log(`\n🌱 Seeding ${campaigns.length} campaigns to Firestore...\n`);
  console.log(`📡 Project: ${PROJECT_ID}`);
  console.log(`📦 Collection: campaigns\n`);

  let saved = 0;
  let failed = 0;

  for (const camp of campaigns) {
    const url = `${DB_URL}/campaigns/${camp.id}?updateMask.fieldPaths=id&updateMask.fieldPaths=emoji&updateMask.fieldPaths=name&updateMask.fieldPaths=status&updateMask.fieldPaths=start&updateMask.fieldPaths=end&updateMask.fieldPaths=campus&updateMask.fieldPaths=ambassadors&updateMask.fieldPaths=goal&updateMask.fieldPaths=signups&updateMask.fieldPaths=reach&updateMask.fieldPaths=desc&updateMask.fieldPaths=updatedBy&updateMask.fieldPaths=updatedAt`;

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toFirestoreDoc(camp))
      });

      if (res.ok) {
        console.log(`  ✅ [${camp.id}] ${camp.emoji} ${camp.name}`);
        saved++;
      } else {
        const err = await res.json();
        console.error(`  ❌ [${camp.id}] ${camp.name} — ${err.error?.status}: ${err.error?.message}`);
        failed++;
      }
    } catch (e) {
      console.error(`  ❌ [${camp.id}] ${camp.name} — Network error: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅ Saved:  ${saved}/${campaigns.length}`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed}/${campaigns.length}`);
    console.log(`\n⚠️  If you see PERMISSION_DENIED errors:`);
    console.log(`   → Go to Firebase Console → Firestore → Rules`);
    console.log(`   → Make sure campaigns collection has: allow read, write: if true;`);
  } else {
    console.log(`\n🎉 All campaigns seeded successfully!`);
    console.log(`   Open ambassador-portal.html → Campaign Updates to verify.`);
  }
  console.log(`${'─'.repeat(50)}\n`);
}

seedCampaigns();
