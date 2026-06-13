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
  faqs: { q: string; a: string }[];
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
      "Production-grade embedded systems on ESP32, STM32 and Arduino — from schematic decisions to OTA-ready firmware on certified hardware.",
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
    faqs: [
      {
        q: "What microcontrollers do you typically use for custom hardware projects?",
        a: "We work primarily with ESP32 (for wireless-heavy, low-cost applications) and STM32 / ARM Cortex-M (for high-precision, safety-critical industrial controls). We also support Nordic Semiconductor nRF52/nRF53 series for ultra-low power Bluetooth LE designs."
      },
      {
        q: "How do you ensure firmware reliability and prevent bricked devices?",
        a: "We design firmware with hardware watchdog timers, build fail-safe OTA update pipelines using A/B redundant flash partition layouts, and enforce cryptographic signature verification to ensure only verified, uncorrupted firmware runs on the device."
      },
      {
        q: "Can you assist with the transition from prototype to bulk manufacturing?",
        a: "Yes. We design schematics and PCB layouts in KiCad/EasyEDA with Design for Manufacturing (DFM) principles in mind, build custom test rigs for factory calibration, and prepare manufacturing files (Gerbers, BOM, Pick & Place) for assembly houses."
      }
    ]
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
      "Real-time intelligence on the device — we train, quantise and deploy ML models that run on microcontrollers with kilobytes of RAM.",
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
    faqs: [
      {
        q: "What microcontrollers can run your TinyML models?",
        a: "We deploy models to resource-constrained Cortex-M0/M4/M7 cores, ESP32, and specialized neural accelerators. Our models are optimized to run in as little as 16KB of RAM and 64KB of Flash."
      },
      {
        q: "How do you optimize deep learning models for edge hardware?",
        a: "We use quantization (converting weights from Float32 to Int8), neural network pruning to eliminate inactive connections, and compile using optimized kernels like CMSIS-NN to achieve sub-50ms inference times."
      },
      {
        q: "How do you collect and prepare training datasets from hardware sensors?",
        a: "We design custom data-logging firmware that streams raw high-frequency sensor readings (accelerometer, ECG, gas sensors) to our secure servers, where we clean, label, and build datasets using tools like Edge Impulse."
      }
    ]
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
      "AIoT joins connected hardware, edge intelligence and cloud orchestration. We architect the whole stack so devices learn, adapt and scale.",
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
    faqs: [
      {
        q: "How do you handle connectivity dropouts or poor signal in the field?",
        a: "We implement offline-first data queuing on the edge device using flash memory or EEPROM, and send data using the lightweight MQTT protocol with Quality of Service (QoS) guarantees to resume synchronization automatically when connected."
      },
      {
        q: "What cloud protocols and brokers do you use for telemetry ingestion?",
        a: "We use MQTT over TLS/DTLS with AWS IoT Core or HiveMQ as the primary broker. This integrates directly with serverless functions and databases (like TimescaleDB or PostgreSQL) to ingest and store metrics."
      },
      {
        q: "How is device security managed across the fleet?",
        a: "Security is built in at all layers: unique X.509 client certificates per device, encrypted storage for secure keys, secure boot on the hardware level, and TLS 1.3 encryption for all data in transit."
      }
    ]
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
    faqs: [
      {
        q: "How long does it take to build a functional Proof of Concept (PoC)?",
        a: "A typical functional prototype takes 4 to 8 weeks. This includes schematic capture, initial PCB fabrication, basic 3D-printed enclosure assembly, and core firmware bring-up to validate key functions."
      },
      {
        q: "Do you support mechanical design and enclosures?",
        a: "Yes, we collaborate with mechanical designers to create 3D-printable or injection-moldable enclosure designs using Fusion 360, ensuring components fit perfectly and satisfy thermal constraints."
      },
      {
        q: "How do you help reduce the Bill of Materials (BOM) cost?",
        a: "During the schematic design phase, we prioritize components with multiple source alternatives, choose highly integrated microcontrollers that eliminate external peripheral chips, and optimize passive component footprints to reduce assembly costs."
      }
    ]
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
      "Backends for connected hardware: telemetry ingestion at scale, device management, secure APIs and dashboards operations teams actually use.",
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
    faqs: [
      {
        q: "What database architectures do you use for high-frequency IoT data?",
        a: "We utilize time-series databases like TimescaleDB (built on PostgreSQL) or InfluxDB to handle millions of telemetry messages daily. We design optimized indexes and data aggregation policies to keep dashboard query latency below 200ms."
      },
      {
        q: "How do you handle device authentication and authorization in the backend?",
        a: "Devices authenticate using Mutual TLS (mTLS) with client certificates, or using secure JWT tokens over HTTPS/WebSockets. Our API gateways enforce fine-grained access policies so devices can only access their designated resources."
      },
      {
        q: "Can the backend scale to support thousands of active devices?",
        a: "Yes. We build stateless containerized services using Docker, deploy on Kubernetes or scalable cloud runtimes, and utilize message queues like Redis or RabbitMQ to buffer ingestion traffic and prevent system overload."
      }
    ]
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
      "Cross-platform mobile apps and real-time web dashboards that pair, monitor and control your connected hardware.",
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
    faqs: [
      {
        q: "How do users pair their smartphones with the IoT devices?",
        a: "We implement secure Bluetooth Low Energy (BLE) pairing or local Wi-Fi provisioning (softAP). The app discovers the device, performs an encrypted handshake, sends the local Wi-Fi credentials, and registers the device in the user's account."
      },
      {
        q: "Why do you use Flutter for IoT mobile app development?",
        a: "Flutter allows us to build native iOS and Android apps from a single codebase, drastically reducing development cost and ensuring identical BLE communication behavior and UI rendering across platforms."
      },
      {
        q: "Do the mobile apps support offline operations when internet is unavailable?",
        a: "Yes, we design mobile apps with local SQLite databases. Telemetry is saved locally, and control actions are queued and synchronized with the cloud backend once the phone reconnects to the internet."
      }
    ]
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
      "Automation that turns machines into data and data into uptime — predictive maintenance, condition monitoring and production analytics.",
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
    faqs: [
      {
        q: "Can you integrate with existing factory systems like SCADA or PLCs?",
        a: "Yes, we support standard industrial protocols including Modbus RTU/TCP, OPC-UA, and Ethernet/IP. We build custom edge gateways that bridge legacy factory machinery to modern MQTT dashboards."
      },
      {
        q: "How does your predictive maintenance system estimate machine health?",
        a: "We retrofit vibration sensors and current transformers to critical assets (motors, pumps, gearboxes), run high-frequency FFT (Fast Fourier Transform) analysis on-device, and use anomaly classifiers to detect mechanical wear days before failure."
      },
      {
        q: "What certifications do your industrial edge gateways support?",
        a: "We design layouts to meet electrical noise standards (EN 61000 series), support optoisolated inputs/outputs to prevent ground loops, and package components in dustproof IP65 or IP67 enclosures for harsh factory floors."
      }
    ]
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
      "Connected medical and wellness devices — from smart IV monitors to remote patient monitoring — engineered for reliability and privacy.",
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
    faqs: [
      {
        q: "How do you ensure patient data privacy and HIPAA compliance?",
        a: "All health telemetry is encrypted at rest (AES-256) and in transit (TLS 1.3). We separate patient identity data from telemetry data in our databases, use end-to-end encryption for remote monitoring, and build on HIPAA-compliant cloud infra."
      },
      {
        q: "Do you support ISO 13485 and IEC 62304 standards for medical devices?",
        a: "We write firmware and design hardware following strict documentation practices, including risk analysis (ISO 14971), structured code reviews, trace matrices, and static analysis tools aligned with medical software lifecycle standards."
      },
      {
        q: "How do you achieve reliable, low-noise signal acquisition for ECG or PPG?",
        a: "We design custom analog front-ends with high common-mode rejection ratio (CMRR) instrumentation amplifiers, add hardware active filtering, and implement software-level DSP (digital signal processing) filters to isolate physiological signals from mains noise."
      }
    ]
  },
];