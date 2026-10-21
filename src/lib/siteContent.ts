export type HeroSlide = { title: string; text: string; image: string; visible: boolean };
export type CmsService = { id: string; title: string; shortTitle: string; subtitle: string; intro: string; paragraphs: string[]; promise: string; visible: boolean; images?: string[]; captions?: string[]; galleryImages?: string[]; galleryCaptions?: string[] };
export type CmsClient = { name: string; logo: string; url: string; visible: boolean };
export type CmsProject = { id: string; title: string; category: string; location: string; year: string; description: string; image: string; gallery: string[]; published: boolean };
export type HomeCopy = { introTitle: string; introText: string; clientsTitle: string; clientsText: string; footerPromise: string };
export type ContactInfo = { address: string; email: string; phone: string; whatsapp: string; whatsappMessage: string; mapQuery: string; heading: string; eyebrow: string; ctaTitle: string; ctaText: string; ctaButton: string; hours: string; instagram: string; facebook: string; linkedin: string };
export type SiteSettings = { carouselSeconds: number; showServices: boolean; showClients: boolean; showProjects: boolean; showMap: boolean; showTimeline: boolean; showWhatsApp: boolean };
export type SiteSeo = { title: string; description: string; keywords: string; shareImage: string };
export type SiteNavigation = { home: string; services: string; clients: string; projects: string; contact: string };

export type SiteContent = {
  homeCopy: HomeCopy; hero: HeroSlide[]; contact: ContactInfo; settings: SiteSettings;
  seo: SiteSeo; navigation: SiteNavigation; services: CmsService[]; clients: CmsClient[]; projects: CmsProject[];
};

export const defaultServices: CmsService[] = [
  { id: "mantenimiento", title: "Mantenimiento de cubiertas y fachadas", shortTitle: "Mantenimientos", subtitle: "Propiedad horizontal", intro: "Mantenimientos enfocados en mejorar el bienestar y seguridad para tu propiedad horizontal.", paragraphs: ["Para garantizar el bienestar, construyendo e impermeabilizando la seguridad para resguardar tu hogar, zonas comunes, zonas de trabajo y oficinas, que harán de tu unidad un gran lugar para vivir.", "Protección para fachadas, cubiertas y estructuras expuestas a la intemperie, de ladrillo, bloques de cemento, piedras naturales o artificiales, terrazas, parqueaderos, plazoletas y demás, para reducir y eliminar las eflorescencias y el deterioro de su acabado tanto interior como exterior."], promise: "Protege y garantiza tu patrimonio.", visible: true },
  { id: "construccion", title: "Construcción de obras civiles y arquitectónicas", shortTitle: "Construcción", subtitle: "Vivienda campestre, hoteles, bodegas industriales, remodelación de locales comerciales y oficina abierta.", intro: "Construcción de proyectos de infraestructura civil y arquitectónica. Construyendo identidad.", paragraphs: ["Garantizamos la estabilidad de tu legado, construyendo espacios equilibrados, gracias a la unión de la arquitectura y la ingeniería civil, que harán de tu proyecto un gran lugar para vivir.", "Para mejorar la producción y el almacenamiento de las compañías, para garantizar un bienestar humano con una óptima integración entre la espacialidad, el colaborador y las máquinas, mejorando la tranquilidad y nuestra libertad, para una vida sin igual, que marca un precedente en tu hogar."], promise: "Construyendo tu bienestar y experiencias para contar.", visible: true },
  { id: "servicios-profesionales", title: "Servicios profesionales", shortTitle: "Servicios profesionales", subtitle: "Consultoría, interventoría y dirección de proyectos de infraestructura civil y arquitectónica.", intro: "Conformada por un equipo de trabajo profesional de la construcción, arquitectura e ingeniería civil.", paragraphs: ["El diseño debe satisfacer las necesidades de espacios habitables para tu proyecto, tanto en lo estético como en lo tecnológico, para tu hogar, industria y ambientes corporativos.", "Consolidar proyectos de infraestructura que serán desarrollados de acuerdo con la planificación y acorde con su presupuesto, de la mano de la arquitectura y de ingeniería civil y ambiental.", "Para coordinar y controlar que el proceso constructivo se edifique en concordancia con los diseños y especificaciones técnicas determinadas."], promise: "Arquitectura e ingeniería civil.", visible: true },
];

export const defaultClients: CmsClient[] = [
  ["Cusezar","01_cusezar.png",""],["Hotel City Bog 106","02_hotel_city_bog_106.png",""],["Embajada de Finlandia","03_embajada_finlandia.png",""],["Edificio Tierra Firme","04_edificio_tierra_firme.png",""],["Plaza de Paloquemao","05_paloquemao.png",""],["Pintuco","06_pintuco.png","https://www.pintuco.com.co/"],["Prosperidad Social","07_prosperidad_social.png","https://prosperidadsocial.gov.co/"],["Embajada de Polonia","08_embajada_polonia.png",""],["BYD","09_byd.png","https://www.byd.com/"],["Industrias Argos","10_industrias_argos.png","https://argos.co/"],["Bulevar 42","11_bulevar_42.png",""],["Artecma","12_artecma.png",""],["Cafam","13_cafam.png","https://www.cafam.com.co/"],["Argos","14_argos.png","https://colombia.argos.co/"],["Sika","15_sika.png","https://col.sika.com/"],["Cosechas","16_cosechas.png","https://www.cosechasexpress.com/"],["Abril Constructora","17_abril_constructora.png",""],["Sodimac Homecenter","18_sodimac_homecenter.png","https://www.homecenter.com.co/"],
].map(([name, file, url]) => ({ name, logo: `/img-transparent/${file}`, url, visible: true }));

export const defaultSiteContent: SiteContent = {
  homeCopy: { introTitle: "Servicios", introText: "Conformada por un equipo de trabajo profesional de la construcción, arquitectura e ingeniería civil.", clientsTitle: "Clientes que confían en nuestro trabajo", clientsText: "Construyendo identidad, porque creemos en tus propósitos y te ayudamos a construirlos. Buscamos ser tu aliado, porque tú formas parte de nuestro legado.", footerPromise: "Protege y garantiza tu patrimonio." },
  hero: [
    { title: "Bienvenidos", text: "Nuestra compañía está enfocada en mejorar tu calidad de vida.", image: "/quienes_somos/cierre.webp", visible: true },
    { title: "Servicios profesionales", text: "Consultoría, interventoría y dirección de proyectos.", image: "/assets/servicios/cliente/profesional-equipo.webp", visible: true },
    { title: "Conservamos tu patrimonio", text: "Protegemos el bienestar y la seguridad de tu propiedad horizontal.", image: "/assets/servicios/cliente/mantenimiento-impermeabilizacion-fachada.webp", visible: true },
    { title: "Construyendo tu bienestar", text: "Y experiencias para contar.", image: "/quienes_somos/hero.webp", visible: true },
    { title: "Construcción", text: "Planificar, ejecutar y entregar.", image: "/assets/servicios/cliente/construccion-casa-campestre.webp", visible: true },
  ],
  contact: { address: "Carrera 18 # 78-74, Bogotá", email: "mercadeo.arquitectonico@gmail.com", phone: "+57 318 799 3331", whatsapp: "573187993331", whatsappMessage: "Hola, Marco Arquitectónico. Quiero conversar con un asesor sobre mi proyecto.", mapQuery: "Carrera 18 # 78-74, Bogota, Colombia", heading: "Buscamos ser tu aliado, porque tú formas parte de nuestro legado.", eyebrow: "Estamos para ayudarte", ctaTitle: "Cuéntanos qué necesitas. Juntos damos el primer paso.", ctaText: "Ya sea construir, renovar o cuidar tu inmueble, queremos escuchar tu idea y ayudarte a encontrar la mejor solución.", ctaButton: "Conversemos por WhatsApp con un asesor", hours: "Lunes a viernes, 8:00 a. m. a 5:00 p. m.", instagram: "", facebook: "", linkedin: "" },
  settings: { carouselSeconds: 2, showServices: true, showClients: true, showProjects: true, showMap: true, showTimeline: true, showWhatsApp: true },
  seo: { title: "Marco Arquitectónico | Construcción, mantenimiento y servicios profesionales", description: "Nuestra compañía está enfocada en mejorar tu calidad de vida. Construcción, mantenimiento y servicios profesionales.", keywords: "arquitectura, construcción, mantenimiento, diseño arquitectónico, Marco Arquitectónico", shareImage: "/brand/marco-arquitectonico-completo.jpeg" },
  navigation: { home: "Inicio", services: "Servicios", clients: "Clientes", projects: "Proyectos", contact: "Contacto" },
  services: defaultServices, clients: defaultClients, projects: [],
};

export const contentKeyMap = {
  "home.copy": "homeCopy", "home.hero": "hero", "contact.info": "contact", "site.settings": "settings",
  "site.seo": "seo", "site.navigation": "navigation", "services.items": "services", "clients.items": "clients", "projects.items": "projects",
} as const;

export type SiteContentRow = { content_key: keyof typeof contentKeyMap; section: string; label: string; content_type: string; value: unknown; default_value: unknown; constraints: Record<string, unknown>; updated_at: string };
