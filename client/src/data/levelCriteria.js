export const LEVEL_CRITERIA = {
    autonomy: [
        {
            es: {
                description: "Todas las acciones son ejecutadas manualmente por operadores humanos. No existe lógica automatizada que tome decisiones por sí sola.",
                examples: [
                    "Registro manual de presiones en pozos con formularios en papel o planilla Excel",
                    "Apertura y cierre de válvulas ejecutada físicamente por operador en planta de gas",
                    "Lectura de medidores de caudal en recorrida de ronda con formulario papel"
                ],
                questions: [
                    "¿Requiere un operador presente para cada acción del sistema?",
                    "¿No existe ningún PLC, script o algoritmo que actúe sin orden humana directa?",
                    "¿El sistema solo registra o visualiza datos, sin actuar por sí mismo?"
                ]
            },
            en: {
                description: "All actions are performed manually by human operators. No automated logic makes decisions on its own.",
                examples: [
                    "Manual wellhead pressure logging on paper forms or Excel",
                    "Valve open/close physically executed by field operator at gas plant",
                    "Flow meter readings during manual rounds with paper forms"
                ],
                questions: [
                    "Does every action require an operator to be physically present?",
                    "Is there no PLC, script, or algorithm acting without direct human order?",
                    "Does the system only record or visualize data without acting on its own?"
                ]
            }
        },
        {
            es: {
                description: "El sistema ejecuta secuencias predefinidas de forma automática bajo reglas fijas (if/then). No hay modelo predictivo ni adaptación dinámica.",
                examples: [
                    "PLC que activa alarma o cierra válvula cuando la presión supera un umbral fijo",
                    "SCADA con lógica de enclavamiento automático para protección de equipos",
                    "Bomba de inyección que arranca y para según nivel de tanque por setpoint fijo"
                ],
                questions: [
                    "¿Las reglas de actuación son fijas y no se adaptan con el tiempo?",
                    "¿Un operador programó las condiciones una vez y el sistema las ejecuta sin modificarlas?",
                    "¿No utiliza ML ni modelos estadísticos para tomar decisiones?"
                ]
            },
            en: {
                description: "The system executes predefined sequences automatically under fixed rules (if/then). No predictive model or dynamic adaptation.",
                examples: [
                    "PLC that triggers alarm or closes valve when pressure exceeds a fixed threshold",
                    "SCADA with automatic interlock logic for equipment protection",
                    "Injection pump that starts/stops based on fixed tank level setpoint"
                ],
                questions: [
                    "Are the actuation rules fixed and non-adaptive over time?",
                    "Did an operator program the conditions once, and the system executes them unchanged?",
                    "Does it not use ML or statistical models to make decisions?"
                ]
            }
        },
        {
            es: {
                description: "Incorpora modelos de ML/IA que analizan datos y generan recomendaciones o alertas, pero un humano debe aprobar o ejecutar cada acción resultante.",
                examples: [
                    "Sistema de mantenimiento predictivo en compresores que alerta al técnico con días de anticipación",
                    "Optimizador de yacimiento que sugiere ajustes de choke, requiriendo confirmación del ingeniero",
                    "Modelo de detección de anomalías en líneas de proceso que genera tickets de revisión humana"
                ],
                questions: [
                    "¿Un humano siempre aprueba antes de que se ejecute la acción recomendada?",
                    "¿El sistema genera insights o recomendaciones, pero no actúa de forma autónoma?",
                    "¿Hay un modelo entrenado con datos históricos involucrado en el análisis?"
                ]
            },
            en: {
                description: "Incorporates ML/AI models that analyze data and generate recommendations or alerts, but a human must approve or execute each resulting action.",
                examples: [
                    "Compressor predictive maintenance system that alerts technician days in advance",
                    "Reservoir optimizer that suggests choke adjustments requiring engineer confirmation",
                    "Anomaly detection model for process lines that generates human review tickets"
                ],
                questions: [
                    "Does a human always approve before the recommended action is executed?",
                    "Does the system generate insights or recommendations without acting autonomously?",
                    "Is there a historically trained model involved in the analysis?"
                ]
            }
        },
        {
            es: {
                description: "El sistema puede actuar autónomamente en escenarios operativos definidos, pero un operador humano supervisa y puede intervenir o anular en cualquier momento.",
                examples: [
                    "Control avanzado de proceso (APC) en columna de destilación que ajusta variables en tiempo real con supervisor en sala de control",
                    "Drone de inspección de oleoductos que vuela ruta autónoma con piloto remoto en standby",
                    "Sistema ESD que ejecuta secuencia de cierre automático con validación posterior del supervisor"
                ],
                questions: [
                    "¿El sistema puede ejecutar acciones sin solicitar aprobación humana para cada una?",
                    "¿Existe un operador que supervisa y puede intervenir o anular en cualquier momento?",
                    "¿Está limitado a rangos operativos o escenarios bien definidos y acotados?"
                ]
            },
            en: {
                description: "The system can act autonomously within defined operational scenarios, but a human operator supervises and can intervene or override at any time.",
                examples: [
                    "Advanced process control (APC) on distillation column adjusting variables in real time with supervisor in control room",
                    "Pipeline inspection drone flying autonomous route with remote pilot on standby",
                    "ESD system executing automatic shutdown sequence with subsequent supervisor validation"
                ],
                questions: [
                    "Can the system execute actions without requesting human approval for each one?",
                    "Is there an operator who supervises and can intervene or override at any time?",
                    "Is it limited to well-defined and bounded operational ranges or scenarios?"
                ]
            }
        },
        {
            es: {
                description: "Opera completamente autónomo, toma decisiones complejas, aprende del entorno y se adapta. La supervisión humana es esporádica y de alto nivel.",
                examples: [
                    "Plataforma offshore con control de procesos y mantenimiento totalmente autónomo mediante Digital Twin operativo",
                    "Sistema de trading de energía que gestiona portafolio de contratos de gas de forma autónoma con mínima intervención",
                    "Red de sensores inteligentes en oleoducto que detecta, diagnostica y despacha mantenimiento sin intervención humana"
                ],
                questions: [
                    "¿Opera de forma continua sin supervisión humana directa?",
                    "¿Puede tomar decisiones en situaciones no previstas explícitamente en sus reglas?",
                    "¿Aprende y ajusta su comportamiento de forma continua con nuevos datos?"
                ]
            },
            en: {
                description: "Operates completely autonomously, makes complex decisions, learns from its environment and adapts. Human supervision is sporadic and high-level.",
                examples: [
                    "Offshore platform with fully autonomous process control and maintenance via operational Digital Twin",
                    "Energy trading system autonomously managing gas contract portfolio with minimal intervention",
                    "Smart pipeline sensor network that detects, diagnoses, and dispatches maintenance without human intervention"
                ],
                questions: [
                    "Does it operate continuously without direct human supervision?",
                    "Can it make decisions in situations not explicitly covered by its rules?",
                    "Does it continuously learn and adjust its behavior with new data?"
                ]
            }
        }
    ],
    governance: [
        {
            es: {
                description: "No existen controles, auditorías ni documentación del sistema. No hay política de uso, registro de decisiones ni responsable designado.",
                examples: [
                    "Script Python desarrollado por un ingeniero sin documentar, sin versionar ni registrar cambios",
                    "Modelo de predicción de demanda corriendo en laptop personal sin trazabilidad de resultados",
                    "Sistema heredado sin documentación técnica ni responsable formal de mantenimiento"
                ],
                questions: [
                    "¿Existe algún registro de cómo toma decisiones el sistema?",
                    "¿Hay alguien formalmente responsable si el sistema falla o actúa incorrectamente?",
                    "¿Existe documentación técnica o de proceso, aunque sea básica?"
                ]
            },
            en: {
                description: "No controls, audits, or documentation exist. No usage policy, decision log, or designated responsible party.",
                examples: [
                    "Python script developed by an engineer without documentation, versioning, or change log",
                    "Demand prediction model running on personal laptop with no results traceability",
                    "Legacy system without technical documentation or formal maintenance owner"
                ],
                questions: [
                    "Is there any record of how the system makes decisions?",
                    "Is there someone formally responsible if the system fails or misbehaves?",
                    "Is there any technical or process documentation, even basic?"
                ]
            }
        },
        {
            es: {
                description: "Existen controles básicos: hay un responsable del sistema, documentación mínima y algún registro de actividad. Sin procesos formales de revisión.",
                examples: [
                    "SCADA con manual de operación básico y un responsable de IT identificado",
                    "Sistema de predicción con README actualizado y control de versiones en repositorio",
                    "Herramienta de optimización con registro de accesos, sin revisión formal de decisiones"
                ],
                questions: [
                    "¿Hay alguien que responde si el sistema falla o genera resultados incorrectos?",
                    "¿Existe alguna documentación, aunque sea mínima?",
                    "¿Se registra quién accede o modifica el sistema?"
                ]
            },
            en: {
                description: "Basic controls exist: there is a system owner, minimal documentation, and some activity log. No formal review processes.",
                examples: [
                    "SCADA with basic operations manual and identified IT responsible",
                    "Prediction system with updated README and version control in repository",
                    "Optimization tool with access log but no formal decision review"
                ],
                questions: [
                    "Is there someone who answers if the system fails or produces incorrect results?",
                    "Is there any documentation, even minimal?",
                    "Is there a record of who accesses or modifies the system?"
                ]
            }
        },
        {
            es: {
                description: "Hay supervisión humana activa: revisiones periódicas, aprobación formal de cambios y mecanismos documentados para intervenir o anular el sistema.",
                examples: [
                    "APC con comité de revisión mensual y proceso formal documentado para cambio de setpoints",
                    "Sistema de inspección con IA que requiere sign-off del ingeniero senior en cada recomendación crítica",
                    "Herramienta de planificación de pozos con revisión gerencial obligatoria antes de ejecutar perforación"
                ],
                questions: [
                    "¿Los cambios al sistema requieren aprobación formal por parte de un responsable?",
                    "¿Existe un proceso documentado para que operadores anulen o rechacen decisiones del sistema?",
                    "¿Se revisan periódicamente los resultados y decisiones que produce el sistema?"
                ]
            },
            en: {
                description: "Active human supervision: periodic reviews, formal change approval, and documented mechanisms to intervene or override.",
                examples: [
                    "APC with monthly review committee and formal documented process for setpoint changes",
                    "AI inspection system requiring senior engineer sign-off on each critical recommendation",
                    "Well planning tool with mandatory management review before executing drilling"
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
                description: "Gobernanza estructurada: política de IA/automatización aprobada, comité de revisión activo, auditorías programadas, gestión de riesgos formal y roles y responsabilidades claros.",
                examples: [
                    "Sistema de optimización de yacimiento con política aprobada por directorio, revisiones trimestrales y risk register actualizado",
                    "Plataforma de mantenimiento predictivo con owner designado, SLA documentado y proceso de escalada definido",
                    "Sistema de trading energético con comité de modelos, backtesting obligatorio y límites de actuación establecidos"
                ],
                questions: [
                    "¿Existe una política formal de uso de IA/automatización aprobada a nivel directivo?",
                    "¿Hay un comité o función responsable que revisa el sistema con una cadencia definida?",
                    "¿El riesgo asociado a este sistema está formalmente registrado y gestionado?"
                ]
            },
            en: {
                description: "Structured governance: approved AI/automation policy, active review committee, scheduled audits, formal risk management, and clear roles and responsibilities.",
                examples: [
                    "Reservoir optimization system with board-approved policy, quarterly reviews, and updated risk register",
                    "Predictive maintenance platform with designated owner, documented SLA, and defined escalation process",
                    "Energy trading system with model committee, mandatory backtesting, and defined actuation limits"
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
                description: "Gobernanza adaptativa: framework de IA dinámico que se actualiza según performance del sistema y contexto regulatorio, reporting automatizado y cultura de IA responsable consolidada.",
                examples: [
                    "Operadora global con AI Governance Office, políticas alineadas al EU AI Act y reporting continuo al directorio",
                    "Empresa con monitoreo de drift y bias en modelos productivos con alertas automáticas y reentrenamiento",
                    "Organización con programa de certificación de sistemas de IA críticos revisado y actualizado anualmente"
                ],
                questions: [
                    "¿La gobernanza del sistema se actualiza dinámicamente según su performance real?",
                    "¿Existe un framework de IA responsable maduro a nivel organizacional, no solo por sistema?",
                    "¿El sistema reporta automáticamente métricas de confiabilidad y comportamiento a la dirección?"
                ]
            },
            en: {
                description: "Adaptive governance: dynamic AI framework updated based on system performance and regulatory context, automated reporting, and a consolidated responsible AI culture.",
                examples: [
                    "Global operator with AI Governance Office, EU AI Act-aligned policies, and continuous board reporting",
                    "Company with production model drift/bias monitoring with automatic alerts and retraining",
                    "Organization with critical AI systems certification program reviewed and updated annually"
                ],
                questions: [
                    "Is the system's governance dynamically updated based on its actual performance?",
                    "Is there a mature responsible AI framework at the organizational level, not just per system?",
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
                    "Dashboard de visualización de producción sin capacidad de generar órdenes ni acciones",
                    "Sistema de reporting de consumo energético de solo lectura para análisis interno",
                    "Monitor de temperatura en tanques que registra datos históricos sin capacidad de actuación"
                ],
                questions: [
                    "¿Puede el sistema generar órdenes de compra, contratos o compromisos de pago?",
                    "¿Una decisión incorrecta podría causar pérdidas financieras directas?",
                    "¿Su función es exclusivamente visualizar o analizar datos sin impacto productivo?"
                ]
            },
            en: {
                description: "The system cannot generate transactions, contractual commitments, or decisions with direct financial consequences. Its role is purely informational or analytical.",
                examples: [
                    "Production visualization dashboard with no ability to generate orders or actions",
                    "Read-only energy consumption reporting system for internal analysis",
                    "Tank temperature monitor that records historical data with no actuation capability"
                ],
                questions: [
                    "Can the system generate purchase orders, contracts, or payment commitments?",
                    "Could an incorrect decision cause direct financial losses?",
                    "Is its function exclusively to visualize or analyze data without productive impact?"
                ]
            }
        },
        {
            es: {
                description: "Exposición financiera baja: el sistema puede generar costos pero de alcance limitado (hasta USD 50K por incidente). El impacto es contenible sin consecuencias sistémicas.",
                examples: [
                    "Sistema de scheduling de mantenimiento que puede asignar horas extras a cuadrilla de campo",
                    "Herramienta de compras de repuestos con límite de aprobación automática bajo por ítem",
                    "Optimizador de rutas de camiones cisterna con impacto acotado en costo de flete"
                ],
                questions: [
                    "¿El costo máximo estimado de un error del sistema es inferior a USD 50K?",
                    "¿Se puede revertir o contener un error financiero antes de que escale a valores mayores?",
                    "¿Los compromisos generados son de corto plazo y montos bajos?"
                ]
            },
            en: {
                description: "Low financial exposure: the system can generate costs but of limited scope (up to USD 50K per incident). The impact is containable without systemic consequences.",
                examples: [
                    "Maintenance scheduling system that can assign overtime to a field crew",
                    "Spare parts procurement tool with low per-item automatic approval limit",
                    "Tank truck route optimizer with limited impact on freight costs"
                ],
                questions: [
                    "Is the estimated maximum cost of a system error below USD 50K?",
                    "Can a financial error be reversed or contained before escalating to higher values?",
                    "Are the generated commitments short-term and low-amount?"
                ]
            }
        },
        {
            es: {
                description: "Exposición moderada: el sistema genera compromisos con impacto financiero significativo (USD 50K–500K), pero generalmente reversible dentro de la operación normal.",
                examples: [
                    "Sistema de optimización de blend de crudo que afecta el precio de venta de cargamentos",
                    "Plataforma de gestión de contratos spot de gas natural con autonomía parcial de negociación",
                    "Herramienta de planificación de inversiones en pozos que prioriza backlog de perforación"
                ],
                questions: [
                    "¿Puede el sistema comprometer fondos o contratos por más de USD 50K en una decisión?",
                    "¿Un error podría afectar márgenes de producción o precios de venta en forma significativa?",
                    "¿Las decisiones están dentro de límites delegados o requieren aprobación financiera?"
                ]
            },
            en: {
                description: "Moderate exposure: the system generates commitments with significant financial impact (USD 50K–500K), but generally reversible within normal operations.",
                examples: [
                    "Crude oil blending optimization system affecting cargo sale prices",
                    "Natural gas spot contract management platform with partial negotiation autonomy",
                    "Well investment planning tool that prioritizes drilling backlog by expected value"
                ],
                questions: [
                    "Can the system commit funds or contracts over USD 50K in a single decision?",
                    "Could an error significantly affect production margins or sale prices?",
                    "Are decisions within delegated limits or do they require financial approval?"
                ]
            }
        },
        {
            es: {
                description: "Exposición alta: decisiones con impacto financiero de millones de dólares, con riesgo de pérdidas operativas mayores o daño a contratos y relaciones de largo plazo.",
                examples: [
                    "Sistema de trading de GNL que ejecuta contratos de compra/venta spot de corto plazo",
                    "Plataforma de optimización de producción offshore que ajusta mix de ventas entre mercados",
                    "Herramienta de gestión de hedge de commodities que toma posiciones en derivados energéticos"
                ],
                questions: [
                    "¿Puede el sistema comprometer más de USD 500K en una sola decisión operativa?",
                    "¿Un error podría dañar contratos de suministro de largo plazo o relaciones comerciales clave?",
                    "¿Las pérdidas potenciales podrían aparecer en los estados financieros del trimestre?"
                ]
            },
            en: {
                description: "High exposure: decisions with financial impact in the millions, with risk of major operational losses or damage to long-term contracts and relationships.",
                examples: [
                    "LNG trading system executing short-term spot buy/sell contracts",
                    "Offshore production optimization platform adjusting sales mix between markets",
                    "Energy commodity hedge management tool taking positions in energy derivatives"
                ],
                questions: [
                    "Can the system commit more than USD 500K in a single operational decision?",
                    "Could an error damage long-term supply contracts or key commercial relationships?",
                    "Could potential losses appear in quarterly financial statements?"
                ]
            }
        },
        {
            es: {
                description: "Exposición crítica: el sistema puede generar decisiones con impacto en decenas o centenas de millones de dólares, con riesgo para contratos estratégicos o valor de activos.",
                examples: [
                    "Sistema autónomo de gestión de portafolio de contratos de gas de mediano plazo (valor > USD 100M)",
                    "IA de optimización de inversiones en capex de upstream con decisiones de perforación multianual",
                    "Sistema de pricing dinámico en mercado mayorista de electricidad con posiciones de alta magnitud"
                ],
                questions: [
                    "¿Una decisión incorrecta del sistema podría generar pérdidas superiores a USD 10M?",
                    "¿El sistema puede comprometer activos estratégicos o contratos plurianuales?",
                    "¿El impacto financiero podría ser material a nivel corporativo o generar obligaciones regulatorias?"
                ]
            },
            en: {
                description: "Critical exposure: the system can make decisions with financial impact in the tens or hundreds of millions, including risk to strategic contracts or asset values.",
                examples: [
                    "Autonomous medium-term gas contract portfolio management system (value > USD 100M)",
                    "Upstream capex investment optimization AI with multi-year drilling decisions",
                    "Dynamic pricing system in wholesale electricity market with high-magnitude positions"
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
                description: "Si el sistema falla, el impacto es despreciable: ninguna interrupción operativa, sin riesgo de seguridad, sin consecuencias contractuales ni ambientales.",
                examples: [
                    "Dashboard de KPIs sin conexión a sistemas de control o procesos productivos",
                    "Herramienta de generación de reportes de producción para uso interno de gerencia",
                    "Sistema de visualización de datos sísmicos offline para análisis de geólogos"
                ],
                questions: [
                    "¿El sistema está completamente desconectado de procesos productivos o sistemas de seguridad?",
                    "¿Podría el sistema fallar durante días sin que afecte la operación?",
                    "¿Su función es solo informativa o analítica, sin consecuencias operativas directas?"
                ]
            },
            en: {
                description: "If the system fails, the impact is negligible: no operational disruption, no safety risk, no contractual or environmental consequences.",
                examples: [
                    "KPI dashboard with no connection to control systems or productive processes",
                    "Production report generation tool for internal management use",
                    "Offline seismic data visualization system for geologist analysis"
                ],
                questions: [
                    "Is the system completely disconnected from productive processes or safety systems?",
                    "Could the system fail for days without affecting operations?",
                    "Is its function purely informational or analytical with no direct operational consequences?"
                ]
            }
        },
        {
            es: {
                description: "Impacto local: una falla afecta a un proceso o equipo específico sin propagarse. La recuperación es rápida y sin impacto en la producción global.",
                examples: [
                    "Sistema de monitoreo de una sola bomba de transferencia en batería de producción",
                    "Controlador de temperatura de un horno de proceso secundario en refinería",
                    "Optimizador de consumo energético de edificio administrativo de la operación"
                ],
                questions: [
                    "¿Una falla se limita a un equipo o área pequeña sin propagarse?",
                    "¿La recuperación toma pocas horas sin afectar la producción global?",
                    "¿Hay sistemas de respaldo que asumen el control automáticamente ante una falla?"
                ]
            },
            en: {
                description: "Local impact: a failure affects a specific process or equipment without spreading. Recovery is quick and has no impact on overall production.",
                examples: [
                    "Single transfer pump monitoring system in a production battery",
                    "Temperature controller for a secondary process furnace in a refinery",
                    "Energy consumption optimizer for the operations administrative building"
                ],
                questions: [
                    "Does a failure stay limited to a specific piece of equipment or small area without spreading?",
                    "Does recovery take just a few hours without affecting overall production?",
                    "Are there backup systems that take over automatically in case of failure?"
                ]
            }
        },
        {
            es: {
                description: "Impacto departamental: una falla afecta un área o proceso completo (una unidad de proceso, un yacimiento), con interrupción parcial de la operación por horas o días.",
                examples: [
                    "Sistema de control de una planta completa de tratamiento de gas natural",
                    "Optimizador de producción de un yacimiento maduro con múltiples pozos",
                    "Sistema de gestión de una terminal de almacenamiento y despacho de combustibles"
                ],
                questions: [
                    "¿Una falla puede interrumpir la producción de una unidad o área completa?",
                    "¿El tiempo de recuperación se mide en horas o en días completos?",
                    "¿Hay impacto contractual si el proceso se detiene durante 24 a 48 horas?"
                ]
            },
            en: {
                description: "Departmental impact: a failure affects a complete area or process (a process unit, a field), with partial operational disruption for hours or days.",
                examples: [
                    "Control system for a complete natural gas processing plant",
                    "Production optimizer for a mature field with multiple wells",
                    "Management system for a fuel storage and dispatch terminal"
                ],
                questions: [
                    "Can a failure disrupt the production of a complete unit or area?",
                    "Is recovery time measured in hours or full days?",
                    "Is there contractual impact if the process stops for 24 to 48 hours?"
                ]
            }
        },
        {
            es: {
                description: "Impacto organizacional: una falla puede afectar múltiples instalaciones, la cadena de suministro o la continuidad operativa, con pérdidas cuantificables.",
                examples: [
                    "Sistema de control de la red de oleoductos o gasoductos de la compañía",
                    "Plataforma de despacho y balance de producción de múltiples campos simultáneamente",
                    "Sistema de gestión de activos (EAM) crítico para el mantenimiento de toda la operación"
                ],
                questions: [
                    "¿Una falla puede detener operaciones en más de una instalación o campo?",
                    "¿El impacto incluye riesgo de incumplimiento de compromisos contractuales de entrega?",
                    "¿La alta dirección sería notificada en pocas horas si el sistema falla?"
                ]
            },
            en: {
                description: "Organizational impact: a failure can affect multiple facilities, the supply chain, or operational continuity, with quantifiable losses.",
                examples: [
                    "Company pipeline or gas network control system",
                    "Multi-field production dispatch and balancing platform",
                    "Enterprise Asset Management (EAM) system critical for all maintenance operations"
                ],
                questions: [
                    "Can a failure stop operations at more than one facility or field?",
                    "Does the impact include risk of failing to meet contractual delivery commitments?",
                    "Would senior management be notified within hours if the system fails?"
                ]
            }
        },
        {
            es: {
                description: "Impacto estratégico: una falla puede comprometer la continuidad del negocio, generar incidentes graves de seguridad o ambientales, o crear riesgo regulatorio mayor.",
                examples: [
                    "Sistema de control integrado de plataforma offshore con manejo de hidrocarburos (riesgo de blowout o derrame)",
                    "SCADA de red de distribución de gas natural urbana (riesgo de interrupción masiva o explosión)",
                    "Sistema de detección y respuesta a derrames en oleoducto de transporte troncal interjurisdiccional"
                ],
                questions: [
                    "¿Una falla podría causar lesiones graves, fatalidades o daño ambiental significativo?",
                    "¿Un incidente podría aparecer en medios de comunicación o generar multas regulatorias mayores?",
                    "¿La continuidad del negocio estaría comprometida si el sistema falla más de 24 horas?"
                ]
            },
            en: {
                description: "Strategic impact: a failure can compromise business continuity, cause serious safety or environmental incidents, or create major regulatory risk.",
                examples: [
                    "Offshore platform integrated control system handling hydrocarbons (blowout or spill risk)",
                    "Urban natural gas distribution network SCADA (risk of mass supply disruption or explosion)",
                    "Spill detection and response system for inter-jurisdictional trunk pipeline"
                ],
                questions: [
                    "Could a failure cause serious injuries, fatalities, or significant environmental damage?",
                    "Could an incident appear in the media or generate major regulatory fines?",
                    "Would business continuity be at risk if the system fails for more than 24 hours?"
                ]
            }
        }
    ]
};
