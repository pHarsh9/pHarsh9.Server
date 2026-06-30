import mongoose from "mongoose";

const PROJECTS_SEED = [
  {
    slug: "collaborative-workspace",
    projectNumber: "PROJECT 041 — COLLABORATIVE PROTOCOLS",
    category: "Web Application",
    title: "Collaborative Workspace",
    subtitle: "Collaborative\nWorkspace",
    specs: [
      { label: "Sync Overhead", value: "1.2 KB" },
      { label: "Socket Ping", value: "12ms" },
      { label: "Stack", value: "Next.js, WebSockets, Yjs CRDTs" },
      { label: "Topology", value: "Distributed Mesh" }
    ],
    summary: "Real-time collaborative workspace client supporting concurrent document syncing.",
    figTitle: "FIG 01. LATENCY TOPOLOGY HEATMAP",
    figCaption: "Real-time sync canvas detailing peer socket handshakes and delta replication.",
    diagramImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQg6at-ASt0WJMUFpORBW3bdXrSJilihgcBsLYYkZWmah7HuHP-ypLlYYMuiMa2Jhx8EB_kNYFkhIjxT0Gl0naRt6pK0SSszfZz8N2OKzSi21SMBtP0JTyoZaui31_MK7ZA17TJpl2MKny7SPFfOnGsLWN1gO-TcDgqeoVztaMKm6BuhGHyZWeH5sPxuvM5QfXWeNICcGm0pPvpOwIqWWnoEqlBz5EbulUs9SNcJDxcq_5uVdd-GNjg0zTeM0kW5vhRaxT6Fn2BMc",
    abstractHeader: "Eliminating state synchronization conflicts at scale.",
    abstractBody: "By leveraging Conflict-free Replicated Data Types (CRDTs) and multiplexed WebSocket connections, this real-time client handles massive concurrent document edits. We minimized delta payloads to guarantee instantaneous document rendering across global edge servers.",
    codeBlock: {
      code: `// Process peer document delta changes using Yjs CRDTs\nexport function applyPeerDelta(doc: Y.Doc, encodedDelta: Uint8Array) {\n  try {\n    Y.applyUpdate(doc, encodedDelta, 'socket-origin');\n    const syncState = Y.encodeStateVector(doc);\n    broadcastDeltaVector(syncState);\n  } catch (error) {\n    console.error('State reconciliation failed:', error);\n  }\n}`,
      language: "TYPESCRIPT",
      filename: "SYNC_ENGINE.TS"
    },
    metrics: [
      { label: "SYNC DELAY", value: "12ms", desc: "Real-time delta exchange speeds." },
      { label: "USER CAPACITY", value: "50k", desc: "Concurrent active socket streams." },
      { label: "INTEGRATION", value: "NEXT.JS", desc: "Edge middleware optimized runtime." },
      { label: "STATUS", value: "PRODUCTION", desc: "v3.2 stable build active.", isHighlight: true }
    ],
    bottomImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ3Cl_ydzh7YB6vXp_NUhVn4QrGxKVb9jcuBFJjfhXhdaUQYpvkpB0BU6rGcu0pI0W5R6TUK5UiaqB0SsDSPSQNNk-434MAmEU3tjIZBXzbh5L5Aik_lRA4OjftRa6PqTEAEevvnSW-byrQSGkR0ZGYrPvLOUnpOF7_brGz4M9mbV_6QFZgPfCm4FFwo4J7BxD1Lxg2gkDG8zLStMYfhdyDlCS6PYzmA0XLwhpAOgov_XqHt8Li9z1oaT1tn3cdDO53qXVoYChn30",
    bottomText: "We believe that interfaces, when properly engineered, possess a fluid elegance that makes software feel transparent. Collaborative Workspace is the physical manifestation of that belief.",
    isActive: true
  },
  {
    slug: "native-commerce",
    projectNumber: "PROJECT 092 — MOBILE ARCHITECTURE",
    category: "Mobile Application",
    title: "Native Commerce",
    subtitle: "Native\nCommerce",
    specs: [
      { label: "Rendering Frame", value: "60 FPS" },
      { label: "Cold Launch", value: "0.8s" },
      { label: "Stack", value: "React Native, GraphQL, Swift" },
      { label: "Topology", value: "Federated Schema" }
    ],
    summary: "A high-fidelity cross-platform e-commerce app optimized for native iOS & Android rendering.",
    figTitle: "FIG 01. MOBILE CACHING SCHEMA",
    figCaption: "Offline schema detailing SQLite thread pools and image disk caching.",
    diagramImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGrs6GTkhUkxGHKpROslnX89mmXb_llS0Rp1PFznf4kSWhWd8ayl2gfjryiLyo6cCBEPWJ2xFuxLzIoer-Z6CLVfbcenL1dLwis6RHutW0TBX97U6Le-Vrn2afrYMO1EXum5jLse0cr3juWnYo8OkaaQ7f33tW8c3NnMBXSuDbjsPsx8zqW5atqjZ9DvUKcsadHiJgq2uqFS9A39746H23wZ3qAvia3H64FL5uWFspvNPO5iU8YtV_JNv3ogXxfHb5egMSP-YQAcE",
    abstractHeader: "Optimizing native rendering pathways and offline state.",
    abstractBody: "Designed with React Native and custom Swift TurboModules, the client achieves fluid native-tier layouts. A local SQLite caching layer provides complete offline access and optimistic UI updates for real-time inventory adjustments.",
    codeBlock: {
      code: `// Fetch native offline database cache values\nimport { SQLiteDatabase } from 'react-native-sqlite-storage';\n\nexport async function queryCachedCatalog(db: SQLiteDatabase, category: string) {\n  const query = 'SELECT * FROM products WHERE category = ? LIMIT 100';\n  const [results] = await db.executeSql(query, [category]);\n  return results.rows.raw();\n}`,
      language: "TYPESCRIPT",
      filename: "OFFLINE_CACHE.TS"
    },
    metrics: [
      { label: "RENDER RATE", value: "60 FPS", desc: "Fluid native layout speeds." },
      { label: "COLD START", value: "0.8s", desc: "Optimized native engine launch." },
      { label: "OFFLINE SYNC", value: "100%", desc: "Conflict-free local data integration." },
      { label: "STATUS", value: "APP STORE", desc: "v1.8 native build live.", isHighlight: true }
    ],
    bottomImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGrs6GTkhUkxGHKpROslnX89mmXb_llS0Rp1PFznf4kSWhWd8ayl2gfjryiLyo6cCBEPWJ2xFuxLzIoer-Z6CLVfbcenL1dLwis6RHutW0TBX97U6Le-Vrn2afrYMO1EXum5jLse0cr3juWnYo8OkaaQ7f33tW8c3NnMBXSuDbjsPsx8zqW5atqjZ9DvUKcsadHiJgq2uqFS9A39746H23wZ3qAvia3H64FL5uWFspvNPO5iU8YtV_JNv3ogXxfHb5egMSP-YQAcE",
    bottomText: "Our mobile layouts treat physical hardware limits as variables to be mastered. Smooth animations are not decorative; they form the core language of correct native applications.",
    isActive: true
  },
  {
    slug: "serverless-analytics",
    projectNumber: "PROJECT 103 — BACKEND SYSTEMS",
    category: "Backend System",
    title: "Serverless Analytics",
    subtitle: "Serverless\nAnalytics",
    specs: [
      { label: "Ingestion Speed", value: "200k/s" },
      { label: "Cold Startup", value: "15ms" },
      { label: "Stack", value: "Go, AWS Lambda, Node.js, Redis" },
      { label: "Topology", value: "Event-Driven Serverless Mesh" }
    ],
    summary: "Event-driven telemetry processing engine handling billions of serverless events at minimal runtime scale.",
    figTitle: "FIG 01. INGESTION PIPELINE FLOW",
    figCaption: "Diagram illustrating multi-threaded Go ingest queues writing to highly scalable Redis state vectors.",
    diagramImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNf8Vhi_qKABODyzFkmgZfoeizCEIjlgbqxSYhML4gzFkGO0qldlTY7A_hg0s-d7r6_wNFwWfRd2FjBWe1NCNjOWmFAkcAUpJb-xVymffCy3rSUUIUVF_Aqhxb5jWsaarL1cdizFVi3ZLkA6j8ZLZVXbMX3N1UpT5XAUcTUDgYuV857hVIyZ8IFq7sTajyrFbZ2tGUIeSrpOY7_2fxmuwt88-B8wkrwQCASpJCqyKpvqOfXC5vxQyMkUhmpVBHyUlIad42JiiX7o8",
    abstractHeader: "Streaming backend telemetry with Go concurrency.",
    abstractBody: "Constructed with AWS serverless triggers and concurrent Go channels, the ingestion core processes raw data streams with 0.8ms average latency. The state metrics are cached directly to Redis caches before being batched into the relational stores.",
    codeBlock: {
      code: `// Process serverless stream event telemetry vectors\nfunc ProcessTelemetry(ctx context.Context, events []Event) error {\n  for _, event := range events {\n    go func(e Event) {\n      metricsChan <- parseEventMetric(e)\n    }(event)\n  }\n  return nil\n}`,
      language: "GO",
      filename: "TELEMETRY_CORE.GO"
    },
    metrics: [
      { label: "INGEST RATE", value: "200k/s", desc: "Telemetry events parsed per second." },
      { label: "COLD LATENCY", value: "15ms", desc: "Serverless invocation startup delay." },
      { label: "IO OVERHEAD", value: "0.8ms", desc: "Write transit speed into memory cache." },
      { label: "STATUS", value: "STABLE BUILD", desc: "v2.5 deployment running.", isHighlight: true }
    ],
    bottomImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNf8Vhi_qKABODyzFkmgZfoeizCEIjlgbqxSYhML4gzFkGO0qldlTY7A_hg0s-d7r6_wNFwWfRd2FjBWe1NCNjOWmFAkcAUpJb-xVymffCy3rSUUIUVF_Aqhxb5jWsaarL1cdizFVi3ZLkA6j8ZLZVXbMX3N1UpT5XAUcTUDgYuV857hVIyZ8IFq7sTajyrFbZ2tGUIeSrpOY7_2fxmuwt88-B8wkrwQCASpJCqyKpvqOfXC5vxQyMkUhmpVBHyUlIad42JiiX7o8",
    bottomText: "Backend servers are the backbones of applications. Serverless Analytics proves that event telemetry can scale securely without sacrificing latency or reliability.",
    isActive: true
  },
  {
    slug: "latency-mesh",
    projectNumber: "PROJECT 114 — DISTRIBUTED NETWORKS",
    category: "Web Application",
    title: "Latency Mesh",
    subtitle: "Latency\nMesh",
    specs: [
      { label: "Transit Lag", value: "3ms" },
      { label: "Routing Efficiency", value: "98.9%" },
      { label: "Stack", value: "React, WebRTC, Rust WASM" },
      { label: "Topology", value: "P2P WebMesh" }
    ],
    summary: "Decentralized P2P peer routing layer optimizing real-time video/data packet delivery on browser runtimes.",
    figTitle: "FIG 01. PEER TRANSMISSION MATRIX",
    figCaption: "Diagram of Rust-compiled WASM transport modules exchanging multiplexed datagrams directly.",
    diagramImage: "/uploads/projects/latency-mesh.png",
    abstractHeader: "Establishing secure peer datagram pathways via WebRTC.",
    abstractBody: "Using customized Rust signaling bindings compiled to WebAssembly, this web application manages ICE handshakes dynamically. Users exchange high-throughput payload blocks directly on the client, minimizing central server overhead.",
    codeBlock: {
      code: `// Initialize WebRTC P2P DataChannel state\nexport async function initDataChannel(peer: RTCPeerConnection) {\n  const channel = peer.createDataChannel('telemetry-mesh');\n  channel.onmessage = (event) => {\n    processIncomingPayload(event.data);\n  };\n}`,
      language: "TYPESCRIPT",
      filename: "WEBMESH_ROUTER.TS"
    },
    metrics: [
      { label: "TRANSIT LAG", value: "3ms", desc: "Local routing transit delay." },
      { label: "ROUTING EFF", value: "98.9%", desc: "Direct peer delivery success." },
      { label: "PEER LIMIT", value: "20k", desc: "Active direct socket links." },
      { label: "STATUS", value: "STABLE", desc: "v1.2 client build active.", isHighlight: true }
    ],
    bottomImage: "/uploads/projects/latency-mesh.png",
    bottomText: "Browser engines are no longer just layout tools; they are native operating nodes. Latency Mesh pushes web peer concurrency to its technical boundaries.",
    isActive: true
  },
  {
    slug: "kernel-hypervisor",
    projectNumber: "PROJECT 125 — VIRTUAL RUNTIMES",
    category: "Backend System",
    title: "Kernel Hypervisor",
    subtitle: "Kernel\nHypervisor",
    specs: [
      { label: "Startup Overhead", value: "4ms" },
      { label: "Isolation Level", value: "Hardware" },
      { label: "Stack", value: "Rust, Linux KVM, Docker, gRPC" },
      { label: "Topology", value: "Micro-Sandbox Mesh" }
    ],
    summary: "Secure sandboxed kernel execution engine running high-throughput client code safely on host OS clusters.",
    figTitle: "FIG 01. KVM HYPERVISOR BOUNDARIES",
    figCaption: "Telemetric boundary diagram showcasing container virtualization isolated at the hardware ring level.",
    diagramImage: "/uploads/projects/hypervisor-core.png",
    abstractHeader: "Delivering isolated sandboxes with direct Linux KVM.",
    abstractBody: "This backend system builds custom hypervisor configurations by executing directly against the Linux virtualization subsystem. Startup latency is restricted to 4ms, ensuring that code sandbox instantiations happen fast under high loads.",
    codeBlock: {
      code: `// Spawn sandboxed guest microVM thread using Rust KVM API\npub fn spawn_microvm(config: VMConfig) -> Result<GuestThread, Error> {\n    let kvm = Kvm::new()?;\n    let vm = kvm.create_vm()?;\n    vm.register_memory_region(config.mem_slot)?;\n    Ok(GuestThread::start(vm))\n}`,
      language: "RUST",
      filename: "HYPERVISOR_CORE.RS"
    },
    metrics: [
      { label: "START TIME", value: "4ms", desc: "MicroVM startup instantiation." },
      { label: "CPU SLICE", value: "0.2%", desc: "Sandbox compute host overhead." },
      { label: "MEM ALLOC", value: "8MB", desc: "Memory footprint per instance." },
      { label: "STATUS", value: "PRODUCTION", desc: "v4.0 sandbox engine live.", isHighlight: true }
    ],
    bottomImage: "/uploads/projects/hypervisor-core.png",
    bottomText: "Hardware boundaries represent the ultimate guarantees of software security. Kernel Hypervisor enforces isolation at speed.",
    isActive: true
  },
  {
    slug: "neural-telemetry",
    projectNumber: "PROJECT 138 — BIOMETRIC PLATFORMS",
    category: "Mobile Application",
    title: "Neural Telemetry",
    subtitle: "Neural\nTelemetry",
    specs: [
      { label: "Inference Lag", value: "8ms" },
      { label: "Battery Drain", value: "<1%/hr" },
      { label: "Stack", value: "Swift, Kotlin, CoreML, TensorFlow Lite" },
      { label: "Topology", value: "On-Device Neural Engine" }
    ],
    summary: "Mobile device telemetry tracker performing real-time biometric and neural state evaluations entirely on device.",
    figTitle: "FIG 01. LOCAL INFERENCE PATHWAY",
    figCaption: "Biometric processing flow from hardware sensors directly into Swift-integrated CoreML neural adapters.",
    diagramImage: "/uploads/projects/neural-telemetry.png",
    abstractHeader: "Real-time biometric processing directly on local hardware.",
    abstractBody: "By bypassing server networks, this mobile application performs complex biometric and tensor processing directly on the Apple/Android neural engines. On-device inference latency is restricted to 8ms to conserve mobile power cycles.",
    codeBlock: {
      code: `// Evaluate local device biometric models using CoreML\nimport CoreML\n\nfunc predictNeuralState(features: MLFeatureProvider) throws -> BiometricState {\n    let model = try TelemetryBiometrics(configuration: MLModelConfiguration())\n    let output = try model.prediction(input: features)\n    return output.state\n}`,
      language: "SWIFT",
      filename: "NEURAL_CLASSIFIER.SWIFT"
    },
    metrics: [
      { label: "INFERENCE", value: "8ms", desc: "Local neural engine response time." },
      { label: "POWER LOAD", value: "<1%/h", desc: "Average continuous battery drain." },
      { label: "LOCAL CAP", value: "100%", desc: "Data processing handled off-network." },
      { label: "STATUS", value: "BETA", desc: "iOS/Android test builds active.", isHighlight: true }
    ],
    bottomImage: "/uploads/projects/neural-telemetry.png",
    bottomText: "Telemetry is most powerful when it remains completely personal. Neural Telemetry proves on-device models can replace remote cloud clusters entirely.",
    isActive: true
  }
];

const EXPERIENCES_SEED = [
  {
    company: "Monolith Labs",
    role: "Lead Full Stack Architect",
    period: "2024 — PRESENT",
    description: "Directing development of high-concurrency client products, serverless microservice meshes, and cross-platform native portals.",
    bulletPoints: [
      "Architected real-time WebSocket state management using React and Next.js, cutting network transit latency by 35%.",
      "Designed native iOS and Android modules in React Native (Expo) supporting custom offline-first synchronization.",
      "Supervised transition of GraphQL API backends to edge runtime middleware, reducing TTFB by 40% globally."
    ],
    isActive: true
  },
  {
    company: "Core Backplane",
    role: "Senior Software Engineer",
    period: "2021 — 2024",
    description: "Developed scalable API backends and interactive single-page dashboards utilizing modern React ecosystems.",
    bulletPoints: [
      "Co-authored concurrent database adapters in Go and Node.js to stream telemetry data at 200k items/second.",
      "Refactored legacy web applications to Next.js server components, optimizing page weight and rendering speeds.",
      "Designed reusable custom CSS UI component libraries with strict accessibility and localization protocols."
    ],
    isActive: true
  },
  {
    company: "Mesh Protocol",
    role: "Full Stack Web Developer",
    period: "2019 — 2021",
    description: "Built interactive dashboard interfaces and RESTful server microservices.",
    bulletPoints: [
      "Developed pixel-perfect, responsive client components matching designer blueprints with Tailwind CSS.",
      "Implemented automated integration test suites for client and server runtime pathways using Jest and Playwright.",
      "Optimized asset loading bundles, cutting web app cold load speeds from 3.5s to under 1.2s."
    ],
    isActive: true
  }
];

const SKILLS_SEED = [
  {
    category: "Languages",
    skills: ["TYPESCRIPT", "JAVASCRIPT", "GO", "SWIFT", "KOTLIN", "PYTHON", "SQL", "HTML / CSS"],
    isActive: true
  },
  {
    category: "Frameworks",
    skills: ["REACT", "NEXT.JS", "REACT NATIVE (EXPO)", "NODE.JS", "EXPRESS", "TAILWIND CSS", "GRAPHQL"],
    isActive: true
  },
  {
    category: "Infrastructure",
    skills: ["POSTGRESQL", "REDIS", "AMAZON WEB SERVICES (AWS)", "VERCEL", "DOCKER", "WEBSOCKETS", "APIS"],
    isActive: true
  }
];

const PROFILE_SEED = {
  monogram: "pHarsh9",
  fullName: "Harsh Sharma",
  heroSlogan: "FULL STACK WEB DEVELOPER & MOBILE APPLICATION ENGINEER CONSTRUCTING SCALABLE DIGITAL ARCHITECTURES.",
  bioTitle: "HARSH SHARMA (PHARSH9)",
  bioDescription: "A full stack web developer and mobile application engineer with a passion for designing scalable, high-concurrency software and high-fidelity native layouts.",
  field: "FULL STACK, MOBILE",
  focus: "SYSTEM ARCHITECTURE",
  location: "INDIA [GMT +5:30]",
  availability: "OPEN FOR CONTRACTS",
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "GitHub", url: "https://github.com/pHarsh9" }
  ],
  copyrightText: "© 2026 PHARSH9 SYSTEMS. ALL RIGHTS RESERVED.",
  isActive: true
};

const seedDatabase = async (dbURI, label) => {
  try {
    const conn = await mongoose.createConnection(dbURI).asPromise();
    console.log(`Connected to ${label}`);

    const projectCol = conn.db.collection("projectmasters");
    const expCol = conn.db.collection("experiencemasters");
    const skillCol = conn.db.collection("skillmasters");

    // Clean and insert projects
    await projectCol.deleteMany({});
    await projectCol.insertMany(PROJECTS_SEED.map(p => ({
      ...p,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
    console.log(`  Seeded ${PROJECTS_SEED.length} projects in ${label}.`);

    // Clean and insert experiences
    await expCol.deleteMany({});
    await expCol.insertMany(EXPERIENCES_SEED.map(e => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
    console.log(`  Seeded ${EXPERIENCES_SEED.length} experiences in ${label}.`);

    // Clean and insert skills
    await skillCol.deleteMany({});
    await skillCol.insertMany(SKILLS_SEED.map(s => ({
      ...s,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
    console.log(`  Seeded ${SKILLS_SEED.length} skills in ${label}.`);

    // Clean and insert profile settings
    const profileCol = conn.db.collection("profilemasters");
    await profileCol.deleteMany({});
    await profileCol.insertOne({
      ...PROFILE_SEED,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log(`  Seeded profile configuration in ${label}.`);

    // Clean and insert dynamic admin menus
    const groupCol = conn.db.collection("menugroupmasters");
    const menuCol = conn.db.collection("menumasters");

    let group = await groupCol.findOne({ menuGroupName: "Portfolio Management" });
    if (!group) {
      const result = await groupCol.insertOne({
        menuGroupName: "Portfolio Management",
        sequence: 10,
        isActive: true,
        isLink: false,
        menuUrl: "#",
        icon: "RiProfileLine",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      group = { _id: result.insertedId };
    }

    const menusToInsert = [
      { menuName: "Profile Master", menuUrl: "/profile-master", sequence: 1 },
      { menuName: "Project Master", menuUrl: "/project-master", sequence: 2 },
      { menuName: "Experience Master", menuUrl: "/experience-master", sequence: 3 },
      { menuName: "Skill Master", menuUrl: "/skill-master", sequence: 4 },
      { menuName: "Inquiry Logs", menuUrl: "/inquiry-logs", sequence: 5 },
    ];

    for (const m of menusToInsert) {
      const existingMenu = await menuCol.findOne({ menuName: m.menuName, menuGroup: group._id });
      if (!existingMenu) {
        await menuCol.insertOne({
          menuName: m.menuName,
          menuGroup: group._id,
          menuUrl: m.menuUrl,
          sequence: m.sequence,
          isActive: true,
          isParent: false,
          parentMenu: null,
          icon: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    console.log(`  Seeded 'Portfolio Management' group & menus in ${label}.`);

    await conn.close();
  } catch (err) {
    console.error(`Error seeding ${label}:`, err);
  }
};

const run = async () => {
  const localURI = "mongodb://localhost:27017/pentagon";
  const atlasURI = "mongodb+srv://hp910patel_db_user:7TKz52s5amxQW9TM@cluster0.ytqefgj.mongodb.net/portfolios?retryWrites=true&w=majority&appName=Cluster0";

  await seedDatabase(localURI, "Local (pentagon)");
  await seedDatabase(atlasURI, "Atlas (portfolios)");
  console.log("Database seeding completed successfully!");
};

run();
