export type Service = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  overview: string;
  outcomes: string[];
  process: { step: string; desc: string }[];
  industries: string[];
  stack: string[];
};

export const services: Service[] = [
  {
    slug: "embedded-systems",
    number: "01",
    title: "Embedded Systems Development",
    tagline: "From silicon to system",
    description:
      "Design and development of embedded solutions for industrial, healthcare, and consumer applications.",
    items: [
      "ESP32 Development",
      "STM32 Development",
      "Arduino Prototyping",
      "Sensor Integration",
      "Firmware Development",
      "Device Optimization",
    ],
    overview:
      "We engineer reliable, production-grade embedded systems on ESP32, STM32 and Arduino — from schematic-level decisions to OTA-ready firmware running on certified hardware.",
    outcomes: [
      "Low-power firmware optimised for battery life",
      "Robust drivers for sensors, actuators and radios",
      "OTA update pipelines and secure boot",
      "Manufacturable hardware with bring-up support",
    ],
    process: [
      { step: "Requirements & MCU selection", desc: "Match silicon to constraints — power, cost, certification." },
      { step: "Schematic & firmware bring-up", desc: "Peripherals, drivers, RTOS scaffolding, debug harness." },
      { step: "Optimisation & hardening", desc: "Power profiling, fault tolerance, watchdogs, secure boot." },
      { step: "Production & OTA", desc: "Provisioning, factory test, OTA channels and rollback." },
    ],
    industries: ["Industrial", "Healthcare", "Consumer IoT", "Energy"],
    stack: ["ESP32", "STM32", "FreeRTOS", "Zephyr", "Arduino", "C/C++"],
  },
  {
    slug: "edge-ai-tinyml",
    number: "02",
    title: "Edge AI & TinyML Solutions",
    tagline: "Intelligence on a chip",
    description:
      "Deploy machine learning models directly on microcontrollers and edge devices for real-time intelligence.",
    items: [
      "TinyML Development",
      "TensorFlow Lite for Microcontrollers",
      "Edge AI Deployment",
      "Predictive Analytics",
      "Anomaly Detection",
      "Smart Sensor Intelligence",
    ],
    overview:
      "We bring real-time intelligence to the device itself — training, quantising and deploying ML models that run on microcontrollers with kilobytes of RAM.",
    outcomes: [
      "Sub-100ms inference on MCU-class hardware",
      "Models quantised to int8 with minimal accuracy loss",
      "Edge-resident anomaly and classification pipelines",
      "Privacy-preserving on-device intelligence",
    ],
    process: [
      { step: "Data collection from device", desc: "Sensor sampling, labelling and dataset versioning." },
      { step: "Model design & training", desc: "Compact architectures tuned for the target MCU." },
      { step: "Quantisation & conversion", desc: "TFLite Micro / CMSIS-NN pipelines and benchmarking." },
      { step: "Field deployment", desc: "On-device evaluation, drift monitoring, model OTA." },
    ],
    industries: ["Predictive Maintenance", "Healthcare Wearables", "Smart Agriculture", "Industrial Safety"],
    stack: ["TensorFlow Lite Micro", "Edge Impulse", "CMSIS-NN", "Python", "C++"],
  },
  {
    slug: "aiot",
    number: "03",
    title: "AIoT — AI of Things",
    tagline: "Connected. Intelligent. Autonomous.",
    description:
      "Build intelligent connected devices that combine IoT, AI, and cloud technologies into a single platform.",
    items: [
      "Smart Device Development",
      "Remote Monitoring Systems",
      "Predictive Maintenance",
      "Industrial IoT Platforms",
      "Smart Healthcare Devices",
      "Energy Monitoring Systems",
    ],
    overview:
      "AIoT joins connected hardware, edge intelligence and cloud orchestration into a single product. We architect the whole stack so devices learn, adapt and scale to fleets.",
    outcomes: [
      "End-to-end device-to-cloud-to-dashboard pipelines",
      "Predictive maintenance with measurable downtime reduction",
      "Fleet-scale device provisioning and management",
      "Actionable analytics for operations teams",
    ],
    process: [
      { step: "Architecture", desc: "Edge vs cloud split, messaging, security boundaries." },
      { step: "Device + cloud build", desc: "Firmware, gateway, broker, APIs in parallel." },
      { step: "Intelligence layer", desc: "On-device ML plus cloud analytics and alerts." },
      { step: "Pilot & scale", desc: "Field pilot, observability, then fleet rollout." },
    ],
    industries: ["Manufacturing", "Healthcare", "Energy", "Smart Buildings"],
    stack: ["MQTT", "AWS IoT", "ESP32", "Python", "Grafana", "PostgreSQL"],
  },
  {
    slug: "product-development",
    number: "04",
    title: "Product Development & Prototyping",
    tagline: "Idea to working prototype",
    description: "Transform ideas into working products — from concept and validation to MVP.",
    items: [
      "Hardware Prototyping",
      "PCB Design Support",
      "Proof of Concept Development",
      "MVP Development",
      "Product Validation",
      "Technical Consulting",
    ],
    overview:
      "We turn napkin sketches into working prototypes — fast. Concept validation, PCB iteration and MVP firmware in weeks, not quarters.",
    outcomes: [
      "Working demo hardware for investor & customer demos",
      "Validated technical assumptions before full build",
      "Bill-of-materials and manufacturability guidance",
      "Clear product roadmap from PoC to production",
    ],
    process: [
      { step: "Discovery", desc: "Problem framing, technical feasibility, BOM sketch." },
      { step: "Rapid prototype", desc: "Breadboard, dev kits, first firmware spike." },
      { step: "PCB & enclosure", desc: "Custom board design, mechanical fit, DfM review." },
      { step: "MVP handoff", desc: "Documented, demoable hardware ready for pilots." },
    ],
    industries: ["Startups", "R&D Labs", "Innovation Teams", "Academia"],
    stack: ["KiCad", "EasyEDA", "ESP32", "STM32", "Fusion 360"],
  },
  {
    slug: "cloud-backend",
    number: "05",
    title: "Cloud & Backend Development",
    tagline: "Scalable systems for connected products",
    description: "Develop scalable backend systems for connected products and device fleets.",
    items: [
      "Django Development",
      "REST API Development",
      "MQTT Integration",
      "Database Design",
      "Device Management Platforms",
      "Analytics Dashboards",
    ],
    overview:
      "Backends built for connected hardware: telemetry ingestion at scale, device management, secure APIs and dashboards that operations teams actually use.",
    outcomes: [
      "Telemetry pipelines handling thousands of devices",
      "Secure REST + MQTT APIs with role-based access",
      "Time-series storage tuned for IoT workloads",
      "Admin dashboards for fleet management",
    ],
    process: [
      { step: "Data model & API design", desc: "Entities, contracts, auth, versioning." },
      { step: "Ingestion & storage", desc: "Brokers, queues, time-series DBs, retention." },
      { step: "Services & dashboards", desc: "Business logic, alerts, admin UIs." },
      { step: "Observability", desc: "Logging, metrics, alerting, runbooks." },
    ],
    industries: ["IoT Platforms", "SaaS", "Healthcare", "Logistics"],
    stack: ["Django", "FastAPI", "PostgreSQL", "TimescaleDB", "MQTT", "Docker"],
  },
  {
    slug: "mobile-web",
    number: "06",
    title: "Mobile & Web Applications",
    tagline: "Control surfaces for smart devices",
    description: "Create modern applications for monitoring and controlling smart devices.",
    items: [
      "Flutter App Development",
      "Android Applications",
      "IoT Dashboards",
      "Real-Time Monitoring Platforms",
      "Reporting & Analytics",
    ],
    overview:
      "The control surface for your hardware: cross-platform mobile apps and real-time web dashboards that pair, monitor and control connected devices.",
    outcomes: [
      "Cross-platform mobile apps from a single codebase",
      "Real-time dashboards with live device telemetry",
      "BLE / Wi-Fi pairing and provisioning flows",
      "Custom analytics and reporting views",
    ],
    process: [
      { step: "UX & flows", desc: "User journeys for pairing, monitoring, configuration." },
      { step: "Build", desc: "Flutter / React frontends wired to live device data." },
      { step: "Realtime layer", desc: "WebSocket / MQTT streams with offline-first state." },
      { step: "Release", desc: "App store deployment, OTA web releases, analytics." },
    ],
    industries: ["Consumer IoT", "Healthcare", "Industrial Ops"],
    stack: ["Flutter", "React", "TypeScript", "WebSocket", "MQTT"],
  },
  {
    slug: "industrial-automation",
    number: "07",
    title: "Industrial Automation",
    tagline: "Operational intelligence",
    description: "Improve operational efficiency through intelligent automation.",
    items: [
      "Machine Monitoring",
      "Predictive Maintenance",
      "Motor Health Analysis",
      "Production Analytics",
      "Condition Monitoring",
      "Asset Tracking",
    ],
    overview:
      "Retrofit and greenfield automation that turns machines into data sources — and data into uptime. Predictive maintenance, condition monitoring and production analytics on shop floors.",
    outcomes: [
      "Reduced unplanned downtime",
      "Live OEE and production KPIs",
      "Early warnings for motor and bearing failure",
      "Asset traceability across the plant",
    ],
    process: [
      { step: "Site assessment", desc: "Machines, signals, network constraints." },
      { step: "Retrofit hardware", desc: "Edge gateways, vibration / current sensors." },
      { step: "Analytics & alerts", desc: "Models for anomaly and degradation." },
      { step: "Integrate", desc: "MES / SCADA / ERP integrations and rollout." },
    ],
    industries: ["Manufacturing", "Process Industries", "Heavy Equipment", "Utilities"],
    stack: ["Modbus", "OPC-UA", "MQTT", "Edge AI", "Grafana"],
  },
  {
    slug: "healthcare",
    number: "08",
    title: "Healthcare Technology",
    tagline: "Care, monitored intelligently",
    description: "Develop innovative healthcare monitoring and automation products.",
    items: [
      "Smart IV Monitoring Systems",
      "Patient Monitoring Devices",
      "Healthcare IoT Solutions",
      "Medical Device Prototyping",
      "Remote Health Monitoring",
    ],
    overview:
      "Connected medical and wellness devices — from smart IV monitors to remote patient monitoring — engineered with reliability, privacy and clinical workflow in mind.",
    outcomes: [
      "Reliable monitoring with clinical-grade signal quality",
      "Remote patient monitoring with caregiver dashboards",
      "Devices designed with regulatory pathways in mind",
      "Secure, HIPAA-aware data handling",
    ],
    process: [
      { step: "Clinical requirements", desc: "Stakeholder interviews, workflow mapping." },
      { step: "Device prototype", desc: "Sensing, firmware, enclosure, safety review." },
      { step: "Connectivity & cloud", desc: "BLE / Wi-Fi, secure cloud, dashboards." },
      { step: "Pilot & iterate", desc: "Clinical pilots, feedback, hardening." },
    ],
    industries: ["Hospitals", "Home Care", "MedTech Startups", "Wellness"],
    stack: ["ESP32", "STM32", "BLE", "FHIR", "TLS / DTLS"],
  },
];