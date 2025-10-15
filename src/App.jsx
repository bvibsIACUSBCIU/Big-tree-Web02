import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, MapPin, Link as LinkIcon, Briefcase, Radio, Users, Zap, MessageSquare, BarChart, X, Globe } from 'lucide-react';

// --- 多语言内容 (保持不变) ---
const translations = {
  en: {
    navHome: "Home",
    navService: "Service",
    navAMA: "AMA",
    navEvent: "Event",
    contactUs: "Contact Us",
    heroTitle: "We are not just a media",
    heroSubtitle: "but also a node connector for you to move towards the future.",
    exposure: "Exposure",
    kols: "KOLs",
    cases: "Cases",
    serviceOverview: "Service Overview",
    services: [
        "Bilingual Twitter Space Interviews", "Customized Web3 Business Trips", "Compliance Consulting and Support",
        "Web3 Industry Summit", "Full-process Project Incubation Services", "Platform Token Issuance and Listing Support"
    ],
    detailedServices: [
        { title: "Bilingual Twitter Space Interviews", description: "TreeFinance leverages the advantages of X Space voice live streaming and, through collaboration with KOLs, media, and communities to create an efficient closed loop from ‘exposure → traffic → conversion,’ helping brands quickly build awareness, amplify their presence, and engage more closely with communities and potential users." },
        { title: "Customized business trips", description: "TreeFinance excels at integrating industry conferences with offlineresources, organizing domestic and international Web3-themed businesstrips that combine inspections, networking, and content creation to fostelstronger industry connections and collaboration opportunities. Currentroutes include the Mamba Route (Africa), Bali (Indonesia), and Nha Trang(Vietnam)." },
        { title: "Compliance licensing consulting and support", description: "TreeFinance precisely matches license types to business scenarios basedon relevant regulations. Our expert team provides end-to-end support,ensuring compliance with personnel and technical requirements. We tailorcompliance strategies, including risk assessment, and systemdevelopment.Our process encompasses initial consultation, customizedsolutions, document preparation, filing coordination, and ongoing supportThese efficient services help businesses navigate compliance challengesand advance Web3 adoption." },
        { title: "Web3 Industry Summit", description: "TreeFinance customizes high-end blockchain summits domestically andinternationally, connecting partners with project teams, investmentinstitutions, and global ecosystem resources to create an efficient, private,and results-driven industry exchange platform." },
        { title: "Full-process project incubation services", description: "TreeFinance's incubation services span the entire project lifecycle, offeringthree key advantages: a comprehensive media, compliance, and resourceframework; customized solutions, and long-term support. These servicesenable startups and established projects to transform innovative ideasinto high-quality projects, driving growth and value in the Web3ecosystem." },
        { title: "Platform token issuance and inclusion support", description: "Our listing services include matching with trading platforms, pre.qualification, coaching, coordination, communication, and post-listing support.Indexing services cover multiple authoritative platforms. optimizing materials, filing, and maintaining information. This service offers three key advantages: extensive resource networks, professional compliance oversight, and integrated listing and dissemination support. These streamline processes, reduce costs, and enhance efficiency, helping startups and established projects integrate into the Web3 ecosystem, boosting asset liquidity and brand visibility" }
    ],
    resources: [
        { title: "Project Collaboration", description: "Serving and managing over 80 Web3 projects, providing targeted operational guidance, GameFi & DeFi Alpha strategies, and more." },
        { title: "Media Resources", description: "Committee with over 200 Chinese and English media outlets, covering all blockchain-focused media channels." },
        { title: "KOL Resources", description: "Partnered with over 200 top Web3 KOLs and community influencers, providing in-depth overseas project promotion." },
        { title: "Event Resources", description: "We have established extensive connections in Hong Kong, Japan, Korea, and more, capable of hosting various online and offline events, including closed-door meetings and summits." },
        { title: "Community Users", description: "More than 30 owned and partnered communities, reaching over 100,000 users." },
    ],
    amaTitle: "AMA",
        amaEvents: [
                {
                    title: "Trust Game of On-Chain Oracles: How to Make Blockchain Perceive the Real World?",
                    date: "September 7 8:00pm UTC+8",
                    location: "123 Main Street, Apt 48, Anytown, CA 90210, USA",
                    language: 'Chinese',
                    listeningVolume: '19W',
                    listeningLink: 'https://x.com/i/spaces/1yNGabzBWevJj',
                    image: 'ama-event/ama-event-1.jpg'
                },
                {
                    title: "Memecoin Momentum: Harnessing AI to Boost Trading Volume and Community Engagement",
                    date: "September 17 8:00pm UTC+8",
                    location: "123 Main Street, Apt 48, Anytown, CA 90210, USA",
                    language: 'English',
                    listeningVolume: '13.3W',
                    listeningLink: 'https://x.com/i/spaces/1BdxYZmLwDYKX',
                    image: 'ama-event/ama-event-2.jpg'
                }
        ],
    amaPhotoWall: "AMA Photo Wall",
    labelLanguage: 'Language:',
    labelListeningVolume: 'Listening volume:',
    labelListeningLink: 'Listening link:',
    videoReview: "Video review of China tour",
    footerTitle: "We're creating new possibilities\nfor Web3.",
    footerButtonX: "@TreefinanceCN",
    footerButtonTG: "@TreefinanceCN",
  },
  cn: {
    navHome: "首页",
    navService: "服务",
    navAMA: "AMA",
    navEvent: "活动",
    contactUs: "联系我们",
    heroTitle: "我们不仅仅是媒体",
    heroSubtitle: "更是您迈向未来的节点连接器。",
    exposure: "曝光量",
    kols: "KOLs",
    cases: "合作案例",
    serviceOverview: "服务总览",
    services: [
        "双语 Twitter Space 访谈", "定制化 Web3 商务差旅", "合规咨询与支持",
        "Web3 行业峰会", "全流程项目孵化服务", "平台代币发行与上市支持"
    ],
    detailedServices: [
    {
      title: "双语 Twitter Space 访谈",
      description: "TreeFinance 利用 X Space 语音直播优势，通过与 KOL、媒体和社区的合作，打造“曝光 → 流量 → 转化”的高效闭环，帮助品牌快速建立知名度，扩大影响力，并与社区和潜在用户建立更紧密的联系。"
    },
    {
      title: "定制化商务考察",
      description: "TreeFinance 擅长将行业会议与线下资源相结合，组织国内外 Web3 主题商务考察，将考察、交流和内容创作融为一体，以促进更强的行业联系和合作机会。当前路线包括 Mamba 路线（非洲）、巴厘岛（印度尼西亚）和芽庄（越南）。"
    },
    {
      title: "合规牌照咨询与支持",
      description: "TreeFinance 根据相关法规，精准匹配牌照类型与业务场景。我们的专家团队提供端到端的支持，确保符合人员和技术要求。我们量身定制合规策略，包括风险评估和系统开发。我们的流程涵盖初步咨询、定制解决方案、文件准备、备案协调和持续支持。这些高效服务帮助企业应对合规挑战，推动 Web3 的普及。"
    },
    {
      title: "Web3 行业峰会",
      description: "TreeFinance 在国内外定制高端区块链峰会，将合作伙伴与项目团队、投资机构和全球生态系统资源连接起来，打造一个高效、私密、以结果为导向的行业交流平台。"
    },
    {
      title: "全流程项目孵化服务",
      description: "TreeFinance 的孵化服务涵盖整个项目生命周期，提供三大核心优势：全面的媒体、合规和资源框架；定制化解决方案；以及长期支持。这些服务使初创公司和成熟项目能够将创新理念转化为高质量项目，推动 Web3 生态系统的增长和价值。"
    },
    {
      title: "平台代币发行与收录支持",
      description: "我们的上市服务包括与交易平台的匹配、预审、辅导、协调、沟通和上市后支持。收录服务涵盖多个权威平台，优化材料、备案和信息维护。该服务提供三大核心优势：广泛的资源网络、专业的合规监督以及集成的上市和传播支持。这些服务简化了流程，降低了成本，提高了效率，帮助初创公司和成熟项目融入 Web3 生态系统，提升资产流动性和品牌知名度。"
    }   ],
    resources: [
        { title: "项目合作", description: "服务和管理超过80个Web3项目，提供有针对性的运营指导、GameFi & DeFi Alpha策略等。" },
        { title: "媒体资源", description: "与超过200家中英文媒体建立合作，覆盖所有专注于区块链的媒体渠道。" },
        { title: "KOL 资源", description: "与超过200位顶尖Web3 KOL和社区影响者合作，提供深度的海外项目推广。" },
        { title: "活动资源", description: "我们在香港、日本、韩国等地建立了广泛的联系，能够举办各种线上线下活动，包括闭门会议和峰会。" },
        { title: "社区用户", description: "拥有并合作超过30个社区，覆盖用户超过10万。" },
    ],
    amaTitle: "AMA",
        amaEvents: [
                {
                    title: "链上预言机的信任博弈：区块链如何感知现实世界？",
                    date: "9月7日晚8:00（UTC+8）",
                    location: "美国加州洛杉矶市ANYTOWN主街123号48室",
                    language: '中文',
                    listeningVolume: '19W',
                    listeningLink: 'https://x.com/i/spaces/1yNGabzBWevJj',
                    image: 'ama-event/ama-event-1.jpg'
                },
                {
                    title: "Memecoin 势头：利用人工智能提升交易量和社区参与度",
                    date: "9月17日晚8:00（UTC+8）",
                    location: "美国加州洛杉矶市ANYTOWN主街123号48室",
                    language: '英文',
                    listeningVolume: '13.3W',
                    listeningLink: 'https://x.com/i/spaces/1BdxYZmLwDYKX',
                    image: 'ama-event/ama-event-2.jpg'
                }
        ],
    amaPhotoWall: "AMA 照片墙",
    labelLanguage: '语言：',
    labelListeningVolume: '收听量：',
    labelListeningLink: '收听链接：',
    videoReview: "中国行视频回顾",
    footerTitle: "我们正在为 Web3\n创造新的可能性。",
    footerButtonX: "@TreefinanceCN",
    footerButtonTG: "@TreefinanceCN",
  }
};

// --- 动画变体定义 ---
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };
const cardVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } } };

// --- 可复用组件 ---
const AnimatedSection = ({ children, className = '', id = '' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => { if (inView) { controls.start('visible'); } }, [controls, inView]);
  return (
    <motion.section id={id} ref={ref} className={`py-16 md:py-24 relative overflow-hidden ${className}`} variants={containerVariants} initial="hidden" animate={controls}>
      {children}
    </motion.section>
  );
};

// 可复用的区块背景（来自 home 的光斑样式）
const SectionBg = ({ styleOverrides = {} }) => (
    <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        ...styleOverrides.container,
    }}>
        <div style={{
            position: 'absolute',
            left: '5%',
            top: '10%',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #22c55e 60%, #e6ed93 100%)',
            opacity: 0.35,
            filter: 'blur(80px)',
            zIndex: 0,
            ...styleOverrides.blob1,
        }} />
        <div style={{
            position: 'absolute',
            right: '0%',
            top: '0%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #4ade80 60%, #bbf7d0 100%)',
            opacity: 0.25,
            filter: 'blur(60px)',
            zIndex: 0,
            ...styleOverrides.blob2,
        }} />
    </div>
);



// --- 页面主要组件 ---

const Header = ({ language, setLanguage, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{ key: 'navHome', href: '#home'}, { key: 'navService', href: '#service' }, { key: 'navAMA', href: '#ama' }, { key: 'navEvent', href: '#event' }];
  
  const toggleLanguage = () => {
    setLanguage(lang => (lang === 'en' ? 'cn' : 'en'));
  };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-8 lg:px-12 bg-white/30 backdrop-blur-lg border-b border-white/20">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/logo.png" alt="Tree Finance Logo" className="h-10 w-auto" />
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.key} href={link.href} className="text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium relative group text-base">
                            {t[link.key]}
                            <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <button onClick={toggleLanguage} aria-label="切换语言" className="flex items-center text-gray-700 hover:text-green-600 transition-colors bg-transparent px-3 py-2 rounded-full border border-gray-300/50 hover:border-green-400/50">
                        <Globe size={20} />
                        <span className="ml-2 font-medium text-sm">{language === 'en' ? 'EN' : 'CN'}</span>
                    </button>
                    <motion.a href="https://t.me/TreeFinanceCN" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-green-500/20" whileHover={{ scale: 1.05, y: -2 }}>
                        {t.contactUs}
                    </motion.a>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                        {isMenuOpen ? <X size={28}/> : <BarChart size={28} className='-rotate-90'/>}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <motion.div className="md:hidden absolute top-full left-0 w-full bg-white/80 backdrop-blur-md shadow-lg py-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <nav className="flex flex-col items-center space-y-4">
                        {navLinks.map((link) => <a key={link.key} href={link.href} className="text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>{t[link.key]}</a>)}
                        <button onClick={toggleLanguage} className="text-gray-700 font-medium">{language === 'en' ? '切换到中文' : 'Switch to English'}</button>
                        <motion.a href="https://t.me/TreeFinanceCN" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full" whileHover={{ scale: 1.05 }}>{t.contactUs}</motion.a>
                    </nav>
                </motion.div>
            )}
        </header>
    );
};

const HeroSection = ({ t }) => (
        <AnimatedSection id="home" className="pt-36 pb-16 md:pt-48 md:pb-24">
            <div className="container mx-auto px-4 relative z-10">
              <SectionBg />
              <div className="relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <motion.h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400 leading-tight" variants={itemVariants}>{t.heroTitle}</motion.h1>
                            <motion.p className="mt-4 text-xl md:text-2xl text-gray-600 font-medium" variants={itemVariants}>{t.heroSubtitle}</motion.p>
                            <motion.div className="mt-12 flex justify-center md:justify-start space-x-8 md:space-x-12" variants={containerVariants}>
                                <motion.div variants={itemVariants} className="text-center"><p className="text-4xl font-bold text-green-500">10M</p><p className="text-gray-500 mt-1">{t.exposure}</p></motion.div>
                                <motion.div variants={itemVariants} className="text-center"><p className="text-4xl font-bold text-green-500">300+</p><p className="text-gray-500 mt-1">{t.kols}</p></motion.div>
                                <motion.div variants={itemVariants} className="text-center"><p className="text-4xl font-bold text-green-500">80+</p><p className="text-gray-500 mt-1">{t.cases}</p></motion.div>
                            </motion.div>
                        </div>
                        <motion.div className="relative flex justify-center items-center h-full" variants={itemVariants}>
                            <img src="/hero-graphic.png" alt="Tree Finance 3D Graphic" className="w-full max-w-sm md:max-w-md transform transition-transform duration-500 hover:scale-105 drop-shadow-2xl" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
);

const ServiceOverview = ({ t }) => (
        <AnimatedSection id="service">
            <div className="container mx-auto px-4 text-center relative z-10">
              <SectionBg />
              <div className="relative z-10">
                    <motion.h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-400 mb-8" variants={itemVariants}>{t.serviceOverview}</motion.h2>
                    <motion.div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center" variants={containerVariants}>
                        {t.services.map((service, index) => (
                            <motion.div 
                                key={index} 
                                className="service-card relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center"
                                variants={cardVariants}
                            >
                                <div className="inner-bg absolute inset-0 rounded-2xl"></div>
                                <div className="z-10 p-6 text-center">
                                    <p className="text-base md:text-sm lg:text-base font-semibold text-green-800">{service}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </AnimatedSection>
);

const ResourcesSection = ({ t }) => {
    const icons = [<Briefcase size={32}/>, <Radio size={32}/>, <Users size={32}/>, <Zap size={32}/>, <MessageSquare size={32}/>];
        return (
            <AnimatedSection>
                <div className="container mx-auto px-4 relative z-10">
                  <SectionBg />
                  <div className="relative z-10">
                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8" variants={containerVariants}>
                            {t.resources.map((item, index) => (
                                <motion.div key={index} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" variants={cardVariants}>
                                    <div className="text-green-600 mb-4 bg-white/70 p-4 rounded-full shadow-inner">{icons[index]}</div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>
    );
};

const DetailedServiceSection = ({ t }) => (
    <AnimatedSection>
        <div className="container mx-auto px-4 relative z-10">
            <SectionBg />
            <div className="relative z-10">
                <div className="absolute top-0 right-0 h-full w-1/3 pointer-events-none" aria-hidden="true">
                    <svg className="absolute top-0 right-0 h-full text-gray-200/50" width="350" viewBox="0 0 350 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M349.5 0V538.5C349.5 593.729 304.729 638.5 250 638.5H100C44.7715 638.5 0 683.271 0 738.5V1500" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                </div>
                {t.detailedServices.map((service, index) => (
                    <motion.div
                        key={index}
                        className="grid md:grid-cols-2 items-center gap-12 my-20 md:my-28 relative"
                        variants={itemVariants}
                    >
                        <span className="absolute -left-12 -top-12 text-9xl font-extrabold text-gray-200/40 select-none -z-10">
                            0{index + 1}
                        </span>
                        <div className={`flex justify-center items-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                            <motion.img 
                                src={`/service-icons/icon-${index + 1}.png`}
                                alt={service.title}
                                className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-2xl"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        </div>
                        <div className={`relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                             <div className="relative">
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

const AmaSection = ({ t, language }) => {
    // 使用多语言中同步的 t.amaEvents
    const amaData = t.amaEvents;

    // 保留照片墙原有逻辑（分三组图片）
    const photosSet1 = Array.from({ length: 13 }, (_, i) => `ama-photos/ama-photos${i + 1}.jpg`);
    const photosSet2 = Array.from({ length: 13 }, (_, i) => `ama-photos/ama-photos${i + 14}.jpg`);
    const photosSet3 = Array.from({ length: 13 }, (_, i) => `ama-photos/ama-photos${i + 27}.jpg`);

    // 预加载图片函数
    const preloadImages = (imageUrls) => {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    };

    useEffect(() => {
        const allPhotos = [
            ...photosSet1,
            ...photosSet2,
            ...photosSet3,
            ...amaData.map(d => d.image)
        ];
        preloadImages(allPhotos);
    }, []);

    return (
        <AnimatedSection id="ama">
            <div className="container mx-auto px-4 space-y-20 relative">
                {/* Ama 专用底部向上渐变背景 */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '80%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to top, rgba(6, 222, 85, 0.28), rgba(16, 217, 90, 0.12) 25%, rgba(255,255,255,0) 70%)',
                    filter: 'blur(30px)'
                }} />
                <SectionBg styleOverrides={{ blob1: { opacity: 0.18, filter: 'blur(60px)' }, blob2: { opacity: 0.12, filter: 'blur(40px)' } }} />
                <motion.div className="space-y-12" variants={containerVariants}>
                    <motion.h2 className="text-4xl font-bold text-center text-gray-800" variants={itemVariants}>{t.amaTitle}</motion.h2>

                    {amaData.map((item, idx) => (
                        <motion.div key={idx} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center" variants={itemVariants}>
                            <motion.img src={item.image} alt={item.title || item.theme} className="rounded-2xl shadow-xl w-full h-auto object-cover transition-transform duration-300 hover:scale-105" whileHover={{boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"}}/>
                            <div className="space-y-3">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{item.title || item.theme}</h3>
                                <p className="flex items-center text-gray-600"><Clock size={18} className="mr-3 text-green-500"/> {item.date || item.time}</p>
                                <p className="flex items-center text-gray-600"><Globe size={16} className="mr-3 text-green-500"/> <span className="mr-2">{t.labelLanguage}</span> {item.language}</p>
                                <p className="flex items-center text-gray-600"><Users size={16} className="mr-3 text-green-500"/> <span className="mr-2">{t.labelListeningVolume}</span> {item.listeningVolume}</p>
                                <a href={item.listeningLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-green-600 hover:underline"><LinkIcon size={18} className="mr-3"/> <span className="mr-2">{t.labelListeningLink}</span> {item.listeningLink}</a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 照片墙保持不变 */}
                <div className="w-full space-y-8">
                     <motion.h2 className="text-4xl font-bold text-center text-gray-800" variants={itemVariants}>{t.amaPhotoWall}</motion.h2>
                     <div className="relative w-full overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                        {/* 第一列 - 使用第一组图片 */}
                        <div className="flex animate-scroll-normal group-hover:[animation-play-state:paused]">
                            {photosSet1.map((src, i) => <img key={`a-${i}`} src={src} alt={`AMA Photo ${i}`} className="w-64 h-40 object-cover rounded-lg shadow-md mx-4 my-4 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:z-10" loading="eager" />)}
                        </div>
                        {/* 第二列 - 使用第二组图片 */}
                        <div className="flex animate-scroll-reverse group-hover:[animation-play-state:paused]">
                             {photosSet2.map((src, i) => <img key={`b-${i}`} src={src} alt={`AMA Photo ${i}`} className="w-64 h-40 object-cover rounded-lg shadow-md mx-4 my-4 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:z-10" loading="eager" />)}
                        </div>
                        {/* 第三列 - 使用第三组图片 */}
                         <div className="flex animate-scroll-normal group-hover:[animation-play-state:paused]">
                             {photosSet3.map((src, i) => <img key={`c-${i}`} src={src} alt={`AMA Photo ${i}`} className="w-64 h-40 object-cover rounded-lg shadow-md mx-4 my-4 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:z-10" loading="eager" />)}
                        </div>
                     </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const VideoReview = ({ t }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    
    // 本地视频文件数组
    const videos = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        src: `videos/video${i + 1}.mp4`,
        poster: `videos/video${i + 1}-poster.jpg` // 可选的封面图片
    }));

    const duplicatedVideos = [...videos, ...videos];

    const openVideoModal = (video) => {
        setCurrentVideo(video);
        setIsModalOpen(true);
    };

    const closeVideoModal = () => {
        setIsModalOpen(false);
        setCurrentVideo(null);
    };

    return (
        <AnimatedSection id="event">
            <div className="container mx-auto px-4 text-center relative z-10">
                <SectionBg />
                <motion.h2 className="text-4xl font-bold text-green-700" variants={itemVariants}>{t.videoReview}</motion.h2>
                <div className="mt-12 w-full relative group overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
                    <div className="flex animate-scroll-normal group-hover:[animation-play-state:paused]">
                        {duplicatedVideos.map((video, i) => (
                            <div 
                                key={`a-${i}`} 
                                className="w-80 h-48 mx-4 my-4 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
                                onClick={() => openVideoModal(video)}
                            >
                                {video.poster ? (
                                    <img 
                                        src={video.poster} 
                                        alt={`Video ${video.id} Thumbnail`} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                                    <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 视频播放模态框 */}
            {isModalOpen && currentVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={closeVideoModal}>
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
                            onClick={closeVideoModal}
                        >
                            ×
                        </button>
                        <video 
                            className="w-full rounded-lg"
                            controls
                            autoPlay
                        >
                            <source src={currentVideo.src} type="video/mp4" />
                            您的浏览器不支持视频标签。
                        </video>
                    </div>
                </div>
            )}
        </AnimatedSection>
    );
};


const Footer = ({ t }) => (
    <AnimatedSection className="text-center pb-24">
        <div className="container mx-auto px-4 relative z-10">
            <SectionBg />
            <motion.h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500 whitespace-pre-line" variants={itemVariants}>
                {t.footerTitle}
            </motion.h2>
            <motion.div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6" variants={containerVariants}>
                <motion.a href="https://x.com/TreeFinanceCN" target="_blank" rel="noopener noreferrer" className="footer-button" variants={itemVariants} whileHover={{ scale: 1.05, y: -3 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 p-1 bg-black text-white rounded-full">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>{t.footerButtonX}</span>
                </motion.a>
                <motion.a href="https://t.me/TreeFinanceCN" target="_blank" rel="noopener noreferrer" className="footer-button" variants={itemVariants} whileHover={{ scale: 1.05, y: -3 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-500">
                         <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                    </svg>
                    <span>{t.footerButtonTG}</span>
                </motion.a>
            </motion.div>
        </div>
    </AnimatedSection>
);

function App() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  return (
    <div>
      <style>{`
        :root {
            --green-50:  #f0fdf4;
            --green-100: #dcfce7;
            --green-200: #bbf7d0;
            --green-300: #86efac;
            --green-400: #4ade80;
            --green-500: #22c55e;
            --green-600: #16a34a;
            --lime-200:  #e6ed93;
            font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        html, body, #root {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        body {
            background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
        }

        /* 玻璃质感卡片 */
        .glass-card {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(20px) saturate(150%);
            -webkit-backdrop-filter: blur(20px) saturate(150%);
            border: 1px solid rgba(255, 255, 255, 0.6);
        }

        /* 页脚按钮 */
        .footer-button {
            display: inline-flex;
            align-items: center;
            font-weight: 600;
            color: #374151;
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            background: rgba(230, 247, 238, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
            transition: all 0.3s ease-in-out;
        }
        .footer-button:hover {
            background: rgba(209, 250, 229, 0.8);
            box-shadow: 0 10px 15px -3px rgba(16,185,129,0.1), 0 4px 6px -4px rgba(16,185,129,0.1);
        }
        .footer-button span {
            margin-left: 0.75rem;
        }

        /* 无限滚动动画 */
        @keyframes scroll-normal {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
        @keyframes scroll-reverse {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
        }
        .animate-scroll-normal {
            display: flex;
            width: max-content;
            animation: scroll-normal 60s linear infinite;
        }
        .animate-scroll-reverse {
            display: flex;
            width: max-content;
            animation: scroll-reverse 60s linear infinite;
        }
      `}</style>
      {/* 背景粒子光团，随内容滚动 */}
      <div style={{ position: 'relative', minHeight: '100vh' }}>

        <div className="relative z-10 font-sans">
          <Header language={language} setLanguage={setLanguage} t={t} />
          <main>
            <HeroSection t={t} />
            <ServiceOverview t={t} />
            <ResourcesSection t={t} />
            <DetailedServiceSection t={t} />
            <AmaSection t={t} language={language} />
            <VideoReview t={t} />
            <Footer t={t} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

