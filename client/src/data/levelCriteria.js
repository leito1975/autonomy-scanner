export const LEVEL_CRITERIA = {
    autonomy: [
        {
            es: {
                description: "Todas las acciones son ejecutadas manualmente por personas. No existe lógica automatizada que tome decisiones por sí sola; el sistema solo registra o visualiza.",
                examples: [
                    "Tecnología: agente de soporte que clasifica y responde tickets manualmente desde un CRM sin ninguna automatización",
                    "Energía/O&G: operador que abre y cierra válvulas físicamente en planta de gas y registra presiones en formulario papel",
                    "Salud: enfermera que registra signos vitales en planilla física cada 4 horas sin ningún sistema de alerta"
                ],
                questions: [
                    "¿Cada acción del sistema requiere que una persona la ordene o ejecute explícitamente?",
                    "¿No existe ningún script, PLC o algoritmo que actúe sin orden humana directa?",
                    "¿El sistema solo registra o visualiza datos, sin actuar por sí mismo?"
                ]
            },
            en: {
                description: "All actions are performed manually by people. No automated logic makes decisions on its own; the system only records or visualizes.",
                examples: [
                    "Technology: support agent who manually classifies and responds to tickets from a CRM with no automation",
                    "Energy/O&G: operator who manually opens/closes valves at gas plant and logs pressures on paper forms",
                    "Health: nurse who manually records vital signs on paper every 4 hours with no alert system"
                ],
                questions: [
                    "Does every action require a person to explicitly order or execute it?",
                    "Is there no script, PLC, or algorithm acting without direct human order?",
                    "Does the system only record or visualize data without acting on its own?"
                ]
            }
        },
        {
            es: {
                description: "El sistema ejecuta secuencias predefinidas de forma automática bajo reglas fijas (if/then). No hay modelo predictivo ni adaptación; las condiciones fueron programadas una vez.",
                examples: [
                    "Tecnología: reglas de negocio en plataforma de e-commerce que aplican descuentos automáticos cuando el carrito supera un monto fijo",
                    "Energía/O&G: PLC que activa alarma y cierra válvula automáticamente cuando la presión supera un umbral fijo configurado",
                    "Salud: sistema de alertas de enfermería que notifica al personal cuando la frecuencia cardíaca del paciente sale del rango configurado"
                ],
                questions: [
                    "¿Las reglas de actuación son fijas y no cambian con el tiempo ni aprenden de datos?",
                    "¿Un operador o developer programó las condiciones una vez y el sistema las ejecuta sin modificarlas?",
                    "¿No utiliza ML ni modelos estadísticos entrenados para tomar sus decisiones?"
                ]
            },
            en: {
                description: "The system executes predefined sequences automatically under fixed rules (if/then). No predictive model or adaptation; conditions were programmed once.",
                examples: [
                    "Technology: business rules on e-commerce platform that automatically apply discounts when cart exceeds a fixed amount",
                    "Energy/O&G: PLC that automatically triggers alarm and closes valve when pressure exceeds a fixed configured threshold",
                    "Health: nursing alert system that notifies staff when patient heart rate falls outside a configured range"
                ],
                questions: [
                    "Are the actuation rules fixed and do they not change over time or learn from data?",
                    "Did an operator or developer program the conditions once, and the system executes them unchanged?",
                    "Does it not use ML or trained statistical models to make its decisions?"
                ]
            }
        },
        {
            es: {
                description: "Incorpora modelos de ML/IA que analizan datos y generan recomendaciones o alertas, pero un humano debe aprobar o ejecutar cada acción resultante.",
                examples: [
                    "Tecnología: motor de recomendación de productos que sugiere artículos al usuario, quien decide libremente si los agrega al carrito",
                    "Energía/O&G: sistema de mantenimiento predictivo en compresores que alerta al técnico con días de anticipación, requiriendo que él programe la intervención",
                    "Salud: sistema de diagnóstico por imágenes que resalta hallazgos sospechosos en radiografías para revisión y validación del radiólogo"
                ],
                questions: [
                    "¿Un humano siempre aprueba o ejecuta la acción antes de que tenga efecto real?",
                    "¿El sistema genera recomendaciones o alertas, pero no actúa de forma autónoma sobre procesos o usuarios?",
                    "¿Hay un modelo entrenado con datos históricos que genera los insights o sugerencias?"
                ]
            },
            en: {
                description: "Incorporates ML/AI models that analyze data and generate recommendations or alerts, but a human must approve or execute each resulting action.",
                examples: [
                    "Technology: product recommendation engine that suggests items to users, who freely decide whether to add them to cart",
                    "Energy/O&G: compressor predictive maintenance system that alerts technician days in advance, requiring them to schedule the intervention",
                    "Health: medical imaging system that highlights suspicious findings in X-rays for radiologist review and validation"
                ],
                questions: [
                    "Does a human always approve or execute the action before it has any real effect?",
                    "Does the system generate recommendations or alerts without acting autonomously on processes or users?",
                    "Is there a historically trained model that generates the insights or suggestions?"
                ]
            }
        },
        {
            es: {
                description: "El sistema puede actuar autónomamente en escenarios operativos definidos, pero un humano supervisa y puede intervenir o anular en cualquier momento.",
                examples: [
                    "Tecnología: sistema de moderación de contenido que elimina publicaciones automáticamente según política, con equipo humano revisando apelaciones y casos límite",
                    "Energía/O&G: control avanzado de proceso (APC) en columna de destilación que ajusta variables en tiempo real con supervisor activo en sala de control",
                    "Salud: robot quirúrgico asistido que ejecuta movimientos de alta precisión definidos por el cirujano, quien supervisa y puede tomar el control en cualquier momento"
                ],
                questions: [
                    "¿El sistema puede ejecutar acciones con efecto real sin solicitar aprobación humana para cada una?",
                    "¿Existe un operador o equipo que supervisa y puede intervenir o anular en cualquier momento?",
                    "¿Está limitado a rangos operativos o escenarios bien definidos y acotados previamente?"
                ]
            },
            en: {
                description: "The system can act autonomously within defined operational scenarios, but a human supervises and can intervene or override at any time.",
                examples: [
                    "Technology: content moderation system that automatically removes posts per policy, with human team reviewing appeals and edge cases",
                    "Energy/O&G: advanced process control (APC) on distillation column adjusting variables in real time with active supervisor in control room",
                    "Health: surgical assistance robot that executes surgeon-defined high-precision movements, with surgeon supervising and able to take control at any time"
                ],
                questions: [
                    "Can the system execute actions with real effect without requesting human approval for each one?",
                    "Is there an operator or team that supervises and can intervene or override at any time?",
                    "Is it limited to previously well-defined and bounded operational ranges or scenarios?"
                ]
            }
        },
        {
            es: {
                description: "Opera completamente autónomo, toma decisiones complejas, aprende del entorno y se adapta. La supervisión humana es esporádica y estratégica, no operativa.",
                examples: [
                    "Tecnología: sistema de trading algorítmico de alta frecuencia que ejecuta miles de operaciones por segundo sin ninguna intervención humana",
                    "Energía/O&G: plataforma offshore con control de procesos y gestión de mantenimiento totalmente autónomo mediante Digital Twin operativo",
                    "Salud: sistema de dosificación adaptativa de medicamentos en UCI que ajusta dosis de sedación y analgesia continuamente en respuesta a parámetros del paciente"
                ],
                questions: [
                    "¿Opera de forma continua sin supervisión humana directa en las decisiones operativas?",
                    "¿Puede tomar decisiones en situaciones no previstas explícitamente en sus reglas originales?",
                    "¿Aprende y ajusta su comportamiento de forma continua con nuevos datos del entorno?"
                ]
            },
            en: {
                description: "Operates completely autonomously, makes complex decisions, learns from its environment and adapts. Human supervision is sporadic and strategic, not operational.",
                examples: [
                    "Technology: high-frequency algorithmic trading system executing thousands of operations per second with no human intervention",
                    "Energy/O&G: offshore platform with fully autonomous process control and maintenance management via operational Digital Twin",
                    "Health: adaptive medication dosing system in ICU that continuously adjusts sedation and analgesia doses in response to patient parameters"
                ],
                questions: [
                    "Does it operate continuously without direct human supervision over operational decisions?",
                    "Can it make decisions in situations not explicitly covered by its original rules?",
                    "Does it continuously learn and adjust its behavior with new environmental data?"
                ]
            }
        }
    ],
    governance: [
        {
            es: {
                description: "No existen controles, auditorías ni documentación del sistema. No hay política de uso, registro de decisiones ni responsable designado.",
                examples: [
                    "Tecnología: modelo de ML entrenado por un data scientist sin documentar, sin versionado en repositorio ni registro de experimentos",
                    "Energía/O&G: script Python desarrollado por un ingeniero para optimizar producción, sin documentación técnica ni control de cambios",
                    "Salud: algoritmo de triaje desarrollado por un médico sin aprobación regulatoria, sin documentación clínica ni responsable formal"
                ],
                questions: [
                    "¿Existe algún registro de cómo toma decisiones el sistema o qué datos usa?",
                    "¿Hay alguien formalmente responsable si el sistema falla o genera resultados incorrectos?",
                    "¿Existe documentación técnica o de proceso, aunque sea básica?"
                ]
            },
            en: {
                description: "No controls, audits, or documentation exist. No usage policy, decision log, or designated responsible party.",
                examples: [
                    "Technology: ML model trained by a data scientist without documentation, no repository versioning or experiment tracking",
                    "Energy/O&G: Python script developed by an engineer to optimize production, without technical documentation or change control",
                    "Health: triage algorithm developed by a physician without regulatory approval, clinical documentation, or formal owner"
                ],
                questions: [
                    "Is there any record of how the system makes decisions or what data it uses?",
                    "Is there someone formally responsible if the system fails or generates incorrect results?",
                    "Is there any technical or process documentation, even basic?"
                ]
            }
        },
        {
            es: {
                description: "Existen controles básicos: hay un responsable del sistema, documentación mínima y algún registro de actividad. Sin procesos formales de revisión.",
                examples: [
                    "Tecnología: API de scoring crediticio con README actualizado, responsable de equipo identificado y log de peticiones básico",
                    "Energía/O&G: SCADA con manual de operación básico, responsable de IT identificado y registro de accesos",
                    "Salud: sistema de historia clínica electrónica con administrador designado, backup diario configurado y listado de usuarios autorizados"
                ],
                questions: [
                    "¿Hay alguien que responde si el sistema falla o genera resultados incorrectos?",
                    "¿Existe alguna documentación del sistema, aunque sea mínima?",
                    "¿Se registra quién accede o modifica el sistema?"
                ]
            },
            en: {
                description: "Basic controls exist: there is a system owner, minimal documentation, and some activity log. No formal review processes.",
                examples: [
                    "Technology: credit scoring API with updated README, identified team owner, and basic request logging",
                    "Energy/O&G: SCADA with basic operations manual, identified IT responsible, and access log",
                    "Health: electronic health record system with designated administrator, configured daily backup, and list of authorized users"
                ],
                questions: [
                    "Is there someone who answers if the system fails or produces incorrect results?",
                    "Is there any system documentation, even minimal?",
                    "Is there a record of who accesses or modifies the system?"
                ]
            }
        },
        {
            es: {
                description: "Hay supervisión humana activa: revisiones periódicas, aprobación formal de cambios y mecanismos documentados para que operadores intervengan o anulen el sistema.",
                examples: [
                    "Tecnología: motor de detección de fraude financiero con comité de revisión mensual, proceso de apelación documentado y sign-off de compliance para cambios",
                    "Energía/O&G: sistema APC con comité de revisión mensual y proceso formal documentado para cambio de setpoints operativos",
                    "Salud: herramienta de diagnóstico asistido por IA con validación obligatoria del médico antes de asentar cualquier diagnóstico en la historia clínica"
                ],
                questions: [
                    "¿Los cambios al sistema requieren aprobación formal por parte de un responsable?",
                    "¿Existe un proceso documentado para que los operadores anulen o rechacen decisiones del sistema?",
                    "¿Se revisan periódicamente los resultados y decisiones que produce el sistema?"
                ]
            },
            en: {
                description: "Active human supervision: periodic reviews, formal change approval, and documented mechanisms for operators to intervene or override.",
                examples: [
                    "Technology: financial fraud detection engine with monthly review committee, documented appeals process, and compliance sign-off for changes",
                    "Energy/O&G: APC system with monthly review committee and formal documented process for changes to operational setpoints",
                    "Health: AI-assisted diagnostic tool with mandatory physician validation before recording any diagnosis in the patient record"
                ],
                questions: [
                    "Do system changes require formal approval from a responsible party?",
                    "Is there a documented process for operators to override or reject system decisions?",
                    "Are the results and decisions produced by the system reviewed periodically?"
                ]
            }
        },
        {
            es: {
                description: "Gobernanza estructurada: política de IA/automatización aprobada por dirección, comité de revisión activo, auditorías programadas, gestión de riesgos formal y roles claros.",
                examples: [
                    "Tecnología: plataforma de decisiones crediticias con política de uso de IA aprobada por directorio, auditorías trimestrales de equidad y explicabilidad obligatoria",
                    "Energía/O&G: sistema de optimización de yacimiento con política aprobada por directorio, revisiones trimestrales y risk register formal actualizado",
                    "Salud: sistema de IA clínica certificado por FDA/ANMAT, con plan de gestión de riesgos, monitoreo post-mercado y responsable de vigilancia designado"
                ],
                questions: [
                    "¿Existe una política formal de uso de IA/automatización aprobada a nivel directivo?",
                    "¿Hay un comité o función responsable que revisa el sistema con una cadencia definida?",
                    "¿El riesgo asociado a este sistema está formalmente registrado y gestionado?"
                ]
            },
            en: {
                description: "Structured governance: management-approved AI/automation policy, active review committee, scheduled audits, formal risk management, and clear roles.",
                examples: [
                    "Technology: credit decision platform with board-approved AI usage policy, quarterly fairness audits, and mandatory explainability",
                    "Energy/O&G: reservoir optimization system with board-approved policy, quarterly reviews, and formal updated risk register",
                    "Health: clinical AI system certified by FDA/ANMAT, with risk management plan, post-market monitoring, and designated surveillance owner"
                ],
                questions: [
                    "Is there a formal AI/automation usage policy approved at executive level?",
                    "Is there a committee or responsible function reviewing the system on a defined cadence?",
                    "Is the risk associated with this system formally registered and managed?"
                ]
            }
        },
        {
            es: {
                description: "Gobernanza adaptativa: framework de IA que se actualiza según performance real y contexto regulatorio, reporting automatizado a dirección y cultura de IA responsable consolidada.",
                examples: [
                    "Tecnología: empresa fintech con AI Governance framework alineado a regulaciones (BCRA, GDPR), monitoreo continuo de drift y bias en producción con alertas automáticas",
                    "Energía/O&G: operadora global con AI Governance Office, políticas alineadas al EU AI Act y reporting continuo de métricas de confiabilidad al directorio",
                    "Salud: red hospitalaria con comité de ética en IA, revisiones periódicas de equidad en modelos de triaje y reporting automático a autoridades sanitarias reguladoras"
                ],
                questions: [
                    "¿La gobernanza del sistema se actualiza dinámicamente según su performance real en producción?",
                    "¿Existe un framework de IA responsable maduro a nivel organizacional, no solo para este sistema?",
                    "¿El sistema reporta automáticamente métricas de confiabilidad y comportamiento a la dirección?"
                ]
            },
            en: {
                description: "Adaptive governance: AI framework updated based on real performance and regulatory context, automated management reporting, and a consolidated responsible AI culture.",
                examples: [
                    "Technology: fintech company with AI Governance framework aligned to regulations (Central Bank, GDPR), continuous production drift/bias monitoring with automatic alerts",
                    "Energy/O&G: global operator with AI Governance Office, EU AI Act-aligned policies, and continuous reliability metrics reporting to board",
                    "Health: hospital network with AI ethics committee, periodic fairness reviews of triage models, and automatic reporting to regulatory health authorities"
                ],
                questions: [
                    "Is the system's governance dynamically updated based on its actual production performance?",
                    "Is there a mature responsible AI framework at the organizational level, not just for this system?",
                    "Does the system automatically report reliability and behavior metrics to management?"
                ]
            }
        }
    ],
    economic: [
        {
            es: {
                description: "El sistema no puede generar transacciones, compromisos contractuales ni decisiones con consecuencias financieras directas. Su rol es puramente informativo o analítico.",
                examples: [
                    "Tecnología: sistema de logging de errores de aplicación que registra fallas sin capacidad de generar reembolsos, créditos ni acciones sobre cuentas",
                    "Energía/O&G: dashboard de visualización de producción que muestra métricas en tiempo real sin poder generar órdenes ni comprometer recursos",
                    "Salud: portal de información para pacientes con artículos de salud y preguntas frecuentes, sin ningún tipo de transacción o compromiso económico"
                ],
                questions: [
                    "¿Puede el sistema generar órdenes de compra, contratos, pagos o compromisos económicos?",
                    "¿Una decisión incorrecta del sistema podría causar pérdidas financieras directas a la organización?",
                    "¿Su función es exclusivamente visualizar o analizar datos sin impacto en procesos que mueven dinero?"
                ]
            },
            en: {
                description: "The system cannot generate transactions, contractual commitments, or decisions with direct financial consequences. Its role is purely informational or analytical.",
                examples: [
                    "Technology: application error logging system that records failures with no ability to generate refunds, credits, or account actions",
                    "Energy/O&G: production visualization dashboard showing real-time metrics with no ability to generate orders or commit resources",
                    "Health: patient information portal with health articles and FAQs, with no transactions or economic commitments of any kind"
                ],
                questions: [
                    "Can the system generate purchase orders, contracts, payments, or economic commitments?",
                    "Could an incorrect system decision cause direct financial losses to the organization?",
                    "Is its function exclusively to visualize or analyze data without impact on money-moving processes?"
                ]
            }
        },
        {
            es: {
                description: "Exposición financiera baja: el sistema puede generar costos pero de alcance limitado (hasta USD 50K por incidente). El impacto es contenible sin consecuencias sistémicas.",
                examples: [
                    "Tecnología: chatbot de atención al cliente que puede emitir cupones de descuento o créditos de hasta USD 20 por interacción sin aprobación humana",
                    "Energía/O&G: sistema de scheduling de mantenimiento que puede asignar horas extras a una cuadrilla de campo generando costo incremental acotado",
                    "Salud: sistema de gestión de turnos que puede reprogramar consultas generando costo de inactividad médica por slot vacío, impacto menor por evento"
                ],
                questions: [
                    "¿El costo máximo estimado de un error del sistema es inferior a USD 50K?",
                    "¿Se puede revertir o contener un error financiero antes de que escale a valores mayores?",
                    "¿Los compromisos que genera son de corto plazo y montos bajos?"
                ]
            },
            en: {
                description: "Low financial exposure: the system can generate costs but of limited scope (up to USD 50K per incident). The impact is containable without systemic consequences.",
                examples: [
                    "Technology: customer service chatbot that can issue discount coupons or credits up to USD 20 per interaction without human approval",
                    "Energy/O&G: maintenance scheduling system that can assign overtime to a field crew generating bounded incremental cost",
                    "Health: appointment management system that can reschedule consultations generating medical inactivity cost per empty slot, minor impact per event"
                ],
                questions: [
                    "Is the estimated maximum cost of a system error below USD 50K?",
                    "Can a financial error be reversed or contained before escalating to higher values?",
                    "Are the commitments it generates short-term and low-amount?"
                ]
            }
        },
        {
            es: {
                description: "Exposición moderada: el sistema genera compromisos con impacto financiero significativo (USD 50K–500K), generalmente reversible dentro de la operación normal.",
                examples: [
                    "Tecnología: motor de pricing dinámico de e-commerce que ajusta precios de catálogo en tiempo real, pudiendo afectar márgenes en forma significativa por campaña",
                    "Energía/O&G: sistema de optimización de blend de crudo que afecta el precio de venta de cargamentos completos con impacto de cientos de miles de dólares",
                    "Salud: sistema de gestión de camas hospitalarias que optimiza ocupación y asignación de quirófanos, con impacto directo en facturación mensual del hospital"
                ],
                questions: [
                    "¿Puede el sistema comprometer fondos o ingresos por más de USD 50K en una sola decisión?",
                    "¿Un error podría afectar márgenes, precios o facturación en forma significativa?",
                    "¿Las decisiones están dentro de límites delegados o requieren aprobación financiera adicional?"
                ]
            },
            en: {
                description: "Moderate exposure: the system generates commitments with significant financial impact (USD 50K–500K), generally reversible within normal operations.",
                examples: [
                    "Technology: e-commerce dynamic pricing engine that adjusts catalog prices in real time, potentially affecting margins significantly per campaign",
                    "Energy/O&G: crude oil blending optimization system affecting prices of complete cargo shipments with impact of hundreds of thousands of dollars",
                    "Health: hospital bed management system that optimizes occupancy and OR assignment, with direct impact on monthly hospital billing"
                ],
                questions: [
                    "Can the system commit funds or revenue over USD 50K in a single decision?",
                    "Could an error significantly affect margins, prices, or billing?",
                    "Are decisions within delegated limits or do they require additional financial approval?"
                ]
            }
        },
        {
            es: {
                description: "Exposición alta: decisiones con impacto financiero de millones de dólares, con riesgo de pérdidas operativas mayores o daño a contratos y relaciones de largo plazo.",
                examples: [
                    "Tecnología: plataforma de trading de criptomonedas que ejecuta órdenes de compra/venta por cuenta del usuario con límites automáticos de millones de dólares",
                    "Energía/O&G: sistema de trading de GNL que ejecuta contratos spot de corto plazo con valor de millones de dólares por operación",
                    "Salud: sistema de autorización de procedimientos médicos de alto costo que aprueba o rechaza cobertura de cirugías o tratamientos oncológicos de alto valor"
                ],
                questions: [
                    "¿Puede el sistema comprometer más de USD 500K en una sola decisión operativa?",
                    "¿Un error podría dañar contratos de largo plazo o relaciones comerciales estratégicas?",
                    "¿Las pérdidas potenciales podrían aparecer en los estados financieros trimestrales?"
                ]
            },
            en: {
                description: "High exposure: decisions with financial impact in the millions, with risk of major operational losses or damage to long-term contracts and relationships.",
                examples: [
                    "Technology: crypto trading platform executing buy/sell orders on user's behalf with automatic limits in the millions of dollars",
                    "Energy/O&G: LNG trading system executing short-term spot contracts worth millions of dollars per operation",
                    "Health: high-cost medical procedure authorization system that approves or rejects coverage for surgeries or high-value oncology treatments"
                ],
                questions: [
                    "Can the system commit more than USD 500K in a single operational decision?",
                    "Could an error damage long-term contracts or strategic commercial relationships?",
                    "Could potential losses appear in quarterly financial statements?"
                ]
            }
        },
        {
            es: {
                description: "Exposición crítica: el sistema puede generar decisiones con impacto en decenas o centenas de millones de dólares, con riesgo para activos estratégicos o valor corporativo.",
                examples: [
                    "Tecnología: sistema autónomo de gestión de portafolio de inversiones de banco que administra activos por encima de USD 100M con intervención humana mínima",
                    "Energía/O&G: IA de optimización de inversiones en capex de upstream con decisiones de perforación multianual que comprometen cientos de millones de dólares",
                    "Salud: sistema de asignación de presupuesto en red hospitalaria que define inversiones en equipamiento crítico (tomógrafos, aceleradores lineales) a nivel regional"
                ],
                questions: [
                    "¿Una decisión incorrecta del sistema podría generar pérdidas superiores a USD 10M?",
                    "¿El sistema puede comprometer activos estratégicos o contratos plurianuales?",
                    "¿El impacto financiero podría ser material a nivel corporativo o generar obligaciones regulatorias?"
                ]
            },
            en: {
                description: "Critical exposure: the system can make decisions with financial impact in the tens or hundreds of millions, with risk to strategic assets or corporate value.",
                examples: [
                    "Technology: autonomous bank investment portfolio management system administering assets above USD 100M with minimal human intervention",
                    "Energy/O&G: upstream capex investment optimization AI with multi-year drilling decisions committing hundreds of millions of dollars",
                    "Health: budget allocation system for hospital network that defines investments in critical equipment (CT scanners, linear accelerators) at regional level"
                ],
                questions: [
                    "Could an incorrect system decision generate losses exceeding USD 10M?",
                    "Can the system commit strategic assets or multi-year contracts?",
                    "Could the financial impact be material at the corporate level or generate regulatory obligations?"
                ]
            }
        }
    ],
    operational: [
        {
            es: {
                description: "Si el sistema falla, el impacto es despreciable: ninguna interrupción operativa, sin riesgo de seguridad, sin consecuencias contractuales ni para las personas.",
                examples: [
                    "Tecnología: sistema de análisis de sentimiento en redes sociales que genera reportes internos, sin conexión a procesos de negocio ni decisiones operativas",
                    "Energía/O&G: dashboard de KPIs de producción sin conexión a sistemas de control ni capacidad de actuación sobre equipos",
                    "Salud: portal de información de salud pública con artículos editoriales, sin conexión a sistemas clínicos ni datos de pacientes"
                ],
                questions: [
                    "¿El sistema está completamente desconectado de procesos productivos, clínicos o de seguridad?",
                    "¿Podría el sistema fallar durante días sin que nadie lo note ni afecte la operación?",
                    "¿Su función es puramente informativa o analítica, sin consecuencias operativas directas?"
                ]
            },
            en: {
                description: "If the system fails, the impact is negligible: no operational disruption, no safety risk, no contractual or human consequences.",
                examples: [
                    "Technology: social media sentiment analysis system generating internal reports, with no connection to business processes or operational decisions",
                    "Energy/O&G: production KPI dashboard with no connection to control systems or ability to act on equipment",
                    "Health: public health information portal with editorial articles, no connection to clinical systems or patient data"
                ],
                questions: [
                    "Is the system completely disconnected from productive, clinical, or safety processes?",
                    "Could the system fail for days without anyone noticing or operations being affected?",
                    "Is its function purely informational or analytical with no direct operational consequences?"
                ]
            }
        },
        {
            es: {
                description: "Impacto local: una falla afecta a un proceso o equipo específico sin propagarse. La recuperación es rápida y sin impacto en la operación global.",
                examples: [
                    "Tecnología: sistema de recomendación de un solo canal de e-commerce; su falla reduce conversión en ese canal pero no afecta el negocio general",
                    "Energía/O&G: sistema de monitoreo de una sola bomba de transferencia en batería de producción; hay redundancia disponible",
                    "Salud: sistema de gestión de turnos de una sola especialidad médica en una clínica; los turnos se pueden gestionar manualmente en caso de falla"
                ],
                questions: [
                    "¿Una falla se limita a un proceso, equipo o canal específico sin propagarse al resto?",
                    "¿La recuperación toma pocas horas sin afectar la operación o atención general?",
                    "¿Hay sistemas de respaldo o procesos manuales que pueden asumir las funciones ante una falla?"
                ]
            },
            en: {
                description: "Local impact: a failure affects a specific process or equipment without spreading. Recovery is quick and has no impact on overall operations.",
                examples: [
                    "Technology: recommendation system for a single e-commerce channel; its failure reduces conversion on that channel but doesn't affect the overall business",
                    "Energy/O&G: monitoring system for a single transfer pump in a production battery; redundancy is available",
                    "Health: appointment management system for a single medical specialty at a clinic; appointments can be managed manually if it fails"
                ],
                questions: [
                    "Does a failure stay limited to a specific process, equipment, or channel without spreading?",
                    "Does recovery take just a few hours without affecting overall operations or service?",
                    "Are there backup systems or manual processes that can take over in case of failure?"
                ]
            }
        },
        {
            es: {
                description: "Impacto departamental: una falla afecta un área o proceso completo, con interrupción parcial de la operación o servicio por horas o días.",
                examples: [
                    "Tecnología: plataforma de atención al cliente que gestiona todos los canales de soporte; su falla impide responder reclamos y afecta métricas de SLA",
                    "Energía/O&G: sistema de control de una planta completa de tratamiento de gas natural; su falla detiene procesamiento de todo el fluido de la planta",
                    "Salud: sistema de gestión de UCI de un hospital; su falla compromete el monitoreo coordinado de todos los pacientes críticos del servicio"
                ],
                questions: [
                    "¿Una falla puede interrumpir la operación de un área, servicio o unidad completa?",
                    "¿El tiempo de recuperación se mide en horas o días completos con impacto en el negocio o la atención?",
                    "¿Hay impacto en SLAs, contratos o en la calidad de atención si el sistema para por 24-48 horas?"
                ]
            },
            en: {
                description: "Departmental impact: a failure affects a complete area or process, with partial disruption of operations or service for hours or days.",
                examples: [
                    "Technology: customer service platform managing all support channels; its failure prevents responding to claims and affects SLA metrics",
                    "Energy/O&G: complete natural gas processing plant control system; its failure stops all fluid processing in the plant",
                    "Health: hospital ICU management system; its failure compromises coordinated monitoring of all critical patients in the unit"
                ],
                questions: [
                    "Can a failure disrupt the operations of a complete area, service, or unit?",
                    "Is recovery time measured in hours or full days with business or care impact?",
                    "Is there impact on SLAs, contracts, or service quality if the system stops for 24-48 hours?"
                ]
            }
        },
        {
            es: {
                description: "Impacto organizacional: una falla puede afectar múltiples áreas, la cadena de valor o la continuidad operativa de la organización, con pérdidas cuantificables.",
                examples: [
                    "Tecnología: core bancario que procesa todas las transacciones de la entidad; su falla impide operaciones de todos los clientes y genera riesgo regulatorio",
                    "Energía/O&G: sistema de control de la red de oleoductos de la compañía; su falla puede detener toda la cadena de producción y transporte",
                    "Salud: sistema de historias clínicas electrónicas de red hospitalaria multi-sede; su falla compromete la atención clínica segura en todas las sedes simultáneamente"
                ],
                questions: [
                    "¿Una falla puede detener operaciones en más de un área, sede o servicio de la organización?",
                    "¿El impacto incluye riesgo de incumplimiento de compromisos contractuales o regulatorios?",
                    "¿La alta dirección sería notificada de urgencia si el sistema falla?"
                ]
            },
            en: {
                description: "Organizational impact: a failure can affect multiple areas, the value chain, or the organization's operational continuity, with quantifiable losses.",
                examples: [
                    "Technology: bank core system processing all entity transactions; its failure prevents operations for all customers and generates regulatory risk",
                    "Energy/O&G: company pipeline network control system; its failure can stop the entire production and transport chain",
                    "Health: multi-site hospital network electronic health record system; its failure compromises safe clinical care at all sites simultaneously"
                ],
                questions: [
                    "Can a failure stop operations across more than one area, site, or service in the organization?",
                    "Does the impact include risk of failing to meet contractual or regulatory commitments?",
                    "Would senior management be urgently notified if the system fails?"
                ]
            }
        },
        {
            es: {
                description: "Impacto estratégico: una falla puede comprometer la continuidad del negocio, generar incidentes graves para personas o el ambiente, o crear riesgo regulatorio mayor.",
                examples: [
                    "Tecnología: sistema de pagos interbancarios que liquida operaciones de alto valor entre entidades financieras; una falla genera riesgo de contagio sistémico en el mercado",
                    "Energía/O&G: SCADA de red de distribución de gas natural urbana; una falla puede causar interrupción masiva de suministro o riesgo de explosión en zonas residenciales",
                    "Salud: sistema de triage y despacho de emergencias médicas de red de ambulancias; una falla en la asignación puede resultar en demoras críticas con riesgo de vida"
                ],
                questions: [
                    "¿Una falla podría causar lesiones graves, fatalidades, daño ambiental significativo o riesgo sistémico?",
                    "¿Un incidente podría aparecer en medios de comunicación, generar multas regulatorias mayores o daño reputacional grave?",
                    "¿La continuidad del negocio o la seguridad de las personas estaría en riesgo si el sistema falla más de pocas horas?"
                ]
            },
            en: {
                description: "Strategic impact: a failure can compromise business continuity, cause serious incidents affecting people or the environment, or create major regulatory risk.",
                examples: [
                    "Technology: interbank payment system settling high-value operations between financial entities; a failure creates systemic contagion risk in the market",
                    "Energy/O&G: urban natural gas distribution network SCADA; a failure can cause massive supply disruption or explosion risk in residential areas",
                    "Health: emergency medical triage and dispatch system for ambulance network; an assignment failure can result in critical delays with risk to life"
                ],
                questions: [
                    "Could a failure cause serious injuries, fatalities, significant environmental damage, or systemic risk?",
                    "Could an incident appear in the media, generate major regulatory fines, or cause serious reputational damage?",
                    "Would business continuity or people's safety be at risk if the system fails for more than a few hours?"
                ]
            }
        }
    ]
};
