/**
 * seed-ambassadors.js
 * Run: node seed-ambassadors.js
 * Uploads all HushhAmbassify ambassador profiles to Firebase Firestore.
 * Uses the Firestore REST API with an API key — no Admin SDK needed.
 */

const PROJECT_ID = 'hushh-9bd71';
const API_KEY    = 'AIzaSyCAE7NAySckcGH4tXvOQuKd7nujklzhxws';
const BASE_URL   = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const AMBASSADORS = [
  {
    refCode: 'ARJUN-IITD-2026',
    name: 'Arjun Kumar', fname: 'Arjun', lname: 'Kumar',
    college: 'IIT Delhi', email: 'arjun.kumar@iitd.ac.in',
    phone: '+91 98765 43210', course: 'B.Tech', year: '3rd Year',
    branch: 'Computer Science', status: 'Approved',
    initials: 'AK', color: '#1E40AF',
    signups: 183, convRate: '42%', activityStatus: 'Active',
    joinedAt: 'Sep 2025',
    bio: 'Top ambassador at IIT Delhi, leading the tech community initiative.',
  },
  {
    refCode: 'SNEHA-BITS-2026',
    name: 'Sneha Rao', fname: 'Sneha', lname: 'Rao',
    college: 'BITS Pilani', email: 'sneha.rao@bits.ac.in',
    phone: '+91 97654 32109', course: 'B.Tech', year: '4th Year',
    branch: 'Electronics', status: 'Approved',
    initials: 'SR', color: '#10B981',
    signups: 164, convRate: '38%', activityStatus: 'Active',
    joinedAt: 'Sep 2025',
    bio: 'Passionate about connecting BITS students with the Hushh ecosystem.',
  },
  {
    refCode: 'ROHAN-NIT-2026',
    name: 'Rohan Verma', fname: 'Rohan', lname: 'Verma',
    college: 'NIT Trichy', email: 'rohan.verma@nit.ac.in',
    phone: '+91 96543 21098', course: 'B.Tech', year: '3rd Year',
    branch: 'Mechanical Engineering', status: 'Approved',
    initials: 'RV', color: '#8B5CF6',
    signups: 142, convRate: '35%', activityStatus: 'Active',
    joinedAt: 'Oct 2025',
    bio: 'Building a strong Hushh community across NIT Trichy campus.',
  },
  {
    refCode: 'MEERA-VIT-2026',
    name: 'Meera Nair', fname: 'Meera', lname: 'Nair',
    college: 'VIT Vellore', email: 'meera.nair@vit.ac.in',
    phone: '+91 95432 10987', course: 'M.Tech', year: '1st Year',
    branch: 'Biotechnology', status: 'Approved',
    initials: 'MN', color: '#F59E0B',
    signups: 128, convRate: '31%', activityStatus: 'On Leave',
    joinedAt: 'Oct 2025',
    bio: 'Connecting science and tech students at VIT Vellore.',
  },
  {
    refCode: 'KARTHIK-IIIT-2026',
    name: 'Karthik S', fname: 'Karthik', lname: 'S',
    college: 'IIIT Hyderabad', email: 'karthik.s@iiit.ac.in',
    phone: '+91 94321 09876', course: 'B.Tech', year: '2nd Year',
    branch: 'Computer Science', status: 'Approved',
    initials: 'KS', color: '#EF4444',
    signups: 115, convRate: '29%', activityStatus: 'Active',
    joinedAt: 'Nov 2025',
    bio: 'AI/ML enthusiast driving Hushh adoption at IIIT Hyderabad.',
  },
  {
    refCode: 'PRIYA-BITS-2026',
    name: 'Priya Sharma', fname: 'Priya', lname: 'Sharma',
    college: 'BITS Pilani', email: 'priya.sharma@bits.ac.in',
    phone: '+91 93210 98765', course: 'MBA', year: '1st Year',
    branch: 'Management', status: 'Approved',
    initials: 'PS', color: '#EC4899',
    signups: 98, convRate: '27%', activityStatus: 'Active',
    joinedAt: 'Nov 2025',
    bio: 'MBA student focusing on entrepreneurship and startup ecosystems.',
  },
  {
    refCode: 'ADITYA-IITB-2026',
    name: 'Aditya Raj', fname: 'Aditya', lname: 'Raj',
    college: 'IIT Bombay', email: 'aditya.raj@iitb.ac.in',
    phone: '+91 92109 87654', course: 'B.Tech', year: '3rd Year',
    branch: 'Electrical Engineering', status: 'Approved',
    initials: 'AR', color: '#06B6D4',
    signups: 94, convRate: '25%', activityStatus: 'Active',
    joinedAt: 'Dec 2025',
    bio: 'Leading the IIT Bombay chapter with a focus on tech innovation.',
  },
  {
    refCode: 'TANVI-IITM-2026',
    name: 'Tanvi Gupta', fname: 'Tanvi', lname: 'Gupta',
    college: 'IIT Madras', email: 'tanvi.gupta@iitm.ac.in',
    phone: '+91 91098 76543', course: 'B.Tech', year: '2nd Year',
    branch: 'Data Science', status: 'Approved',
    initials: 'TG', color: '#84CC16',
    signups: 87, convRate: '24%', activityStatus: 'Active',
    joinedAt: 'Dec 2025',
    bio: 'Data science enthusiast building connections across IIT Madras.',
  },
  {
    refCode: 'RAVI-NITW-2026',
    name: 'Ravi Shankar', fname: 'Ravi', lname: 'Shankar',
    college: 'NIT Warangal', email: 'ravi.shankar@nitw.ac.in',
    phone: '+91 90987 65432', course: 'B.Tech', year: '4th Year',
    branch: 'Civil Engineering', status: 'Approved',
    initials: 'RS', color: '#F97316',
    signups: 79, convRate: '22%', activityStatus: 'Active',
    joinedAt: 'Jan 2026',
    bio: 'Growing the Hushh community at NIT Warangal.',
  },
  {
    refCode: 'ANANYA-VITC-2026',
    name: 'Ananya P', fname: 'Ananya', lname: 'P',
    college: 'VIT Chennai', email: 'ananya.p@vitchennai.ac.in',
    phone: '+91 89876 54321', course: 'B.Tech', year: '2nd Year',
    branch: 'Information Technology', status: 'Approved',
    initials: 'AP', color: '#94A3B8',
    signups: 72, convRate: '21%', activityStatus: 'Inactive',
    joinedAt: 'Jan 2026',
    bio: 'IT student building the Hushh network at VIT Chennai.',
  },
  {
    refCode: 'DEV-IITKGP-2026',
    name: 'Dev Malhotra', fname: 'Dev', lname: 'Malhotra',
    college: 'IIT Kharagpur', email: 'dev.malhotra@iitkgp.ac.in',
    phone: '+91 88765 43210', course: 'B.Tech', year: '3rd Year',
    branch: 'Computer Science', status: 'Approved',
    initials: 'DM', color: '#1E40AF',
    signups: 68, convRate: '20%', activityStatus: 'Active',
    joinedAt: 'Feb 2026',
    bio: 'Driving growth at IIT Kharagpur through peer-to-peer referrals.',
  },
  {
    refCode: 'KAVYA-NITC-2026',
    name: 'Kavya R', fname: 'Kavya', lname: 'R',
    college: 'NIT Calicut', email: 'kavya.r@nitc.ac.in',
    phone: '+91 87654 32109', course: 'B.Tech', year: '2nd Year',
    branch: 'Computer Science', status: 'Approved',
    initials: 'KR', color: '#10B981',
    signups: 61, convRate: '19%', activityStatus: 'Active',
    joinedAt: 'Feb 2026',
    bio: 'Building lasting connections at NIT Calicut for Hushh.',
  },
  {
    refCode: 'DEMO',
    name: 'Demo Ambassador', fname: 'Demo', lname: 'Ambassador',
    college: 'Demo Campus', email: 'demo@hushh.ai',
    phone: '+91 00000 00000', course: 'B.Tech', year: '1st Year',
    branch: 'Computer Science', status: 'Approved',
    initials: 'DA', color: '#6366F1',
    signups: 0, convRate: '0%', activityStatus: 'Active',
    joinedAt: 'Mar 2026',
    bio: 'Demo account for testing the student enrollment flow.',
  },
];

// Convert a JS object to Firestore REST API field format
function toFirestoreFields(obj) {
  const fields = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string')       fields[key] = { stringValue: val };
    else if (typeof val === 'number')  fields[key] = { integerValue: val.toString() };
    else if (typeof val === 'boolean') fields[key] = { booleanValue: val };
    else if (val === null)             fields[key] = { nullValue: 'NULL_VALUE' };
    else if (Array.isArray(val))       fields[key] = { arrayValue: { values: val.map(v => ({ stringValue: String(v) })) } };
    else                               fields[key] = { stringValue: String(val) };
  }
  return fields;
}

async function upsertAmbassador(ambassador) {
  const docId = ambassador.refCode;
  const url = `${BASE_URL}/ambassadors/${docId}?key=${API_KEY}`;
  const payload = {
    fields: toFirestoreFields({
      ...ambassador,
      uid: ambassador.refCode,          // synthetic UID
      seededAt: new Date().toISOString(),
    }),
  };

  const res = await fetch(url, {
    method: 'PATCH',  // creates or overwrites (idempotent)
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText.slice(0, 200)}`);
  }
  return await res.json();
}

async function main() {
  console.log(`\n🚀 HushhAmbassify — Firebase Ambassador Seeder`);
  console.log(`   Project: ${PROJECT_ID}`);
  console.log(`   Collection: ambassadors`);
  console.log(`   Records: ${AMBASSADORS.length}\n`);
  console.log('─'.repeat(60));

  let ok = 0, failed = 0;

  for (const amb of AMBASSADORS) {
    process.stdout.write(`  ⏳  ${amb.name.padEnd(22)} [${amb.refCode}] … `);
    try {
      await upsertAmbassador(amb);
      console.log('✅  Done');
      ok++;
    } catch (err) {
      console.log(`❌  Failed: ${err.message}`);
      failed++;
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('─'.repeat(60));
  console.log(`\n🏁  Result: ${ok} uploaded · ${failed} failed\n`);

  if (failed === 0) {
    console.log('🎉  All ambassadors are now live in Firestore!');
    console.log('    Collection: ambassadors');
    console.log('    The student-enrollment.html form will auto-load these codes.');
  } else {
    console.log('⚠️  Some uploads failed. Check Firestore security rules:');
    console.log('    Rules > collection "ambassadors" should allow write.');
  }
}

main().catch(console.error);
