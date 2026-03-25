'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowUp,
  ArrowRight,
  X,
  Check,
  Star,
  Settings,
  Headphones,
  Shield,
  Users,
  Zap,
  Palette,
  RefreshCw,
  Code,
  Megaphone,
  Layers,
  Globe,
  Cpu,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  User,
  Rocket,
  Layout,
  Layers as LayersIcon,
  ShieldCheck,
  Activity,
  Box,
} from 'lucide-react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { getThemeVars } from '@/lib/theme';

function setCookie(name: string, value: string, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

const COLOR_PRESETS = [
  { name: 'Indigo', hue: 250, color: 'hsl(250, 90%, 58%)' },
  { name: 'Blue', hue: 215, color: 'hsl(215, 90%, 55%)' },
  { name: 'Cyan', hue: 195, color: 'hsl(195, 85%, 48%)' },
  { name: 'Teal', hue: 175, color: 'hsl(175, 80%, 42%)' },
  { name: 'Emerald', hue: 160, color: 'hsl(160, 75%, 44%)' },
  { name: 'Green', hue: 145, color: 'hsl(145, 75%, 42%)' },
  { name: 'Lime', hue: 85, color: 'hsl(85, 70%, 45%)' },
  { name: 'Amber', hue: 40, color: 'hsl(40, 95%, 50%)' },
  { name: 'Orange', hue: 25, color: 'hsl(25, 95%, 55%)' },
  { name: 'Red', hue: 0, color: 'hsl(0, 80%, 55%)' },
  { name: 'Rose', hue: 340, color: 'hsl(340, 82%, 58%)' },
  { name: 'Pink', hue: 320, color: 'hsl(320, 80%, 55%)' },
  { name: 'Purple', hue: 280, color: 'hsl(280, 85%, 58%)' },
  { name: 'Slate', hue: 220, color: 'hsl(220, 15%, 50%)' },
];

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
  heroSide: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  aboutMain: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  aboutFloat: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=80',
  team1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  team2: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  team3: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  project1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  project2: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80',
  project3: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
  project4: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  testimonial: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  blog1: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
};

function hslToRgbString(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return `${Math.round(f(0) * 255)}, ${Math.round(f(8) * 255)}, ${Math.round(f(4) * 255)}`;
}

function applyThemeColors(pHue: number, sHue: number) {
  const s = 90, l = 58;
  // Primary (Cyan/Indigo base)
  document.documentElement.style.setProperty('--color-primary', `hsl(${pHue}, ${s}%, ${l}%)`);
  document.documentElement.style.setProperty('--color-primary-light', `hsl(${pHue}, ${s}%, 73%)`);
  document.documentElement.style.setProperty('--color-primary-dark', `hsl(${pHue}, ${s}%, 46%)`);
  document.documentElement.style.setProperty('--color-primary-rgb', hslToRgbString(pHue, s, l));

  // Secondary (Magenta/Pink base)
  document.documentElement.style.setProperty('--color-secondary', `hsl(${sHue}, 80%, 55%)`);
  document.documentElement.style.setProperty('--color-secondary-light', `hsl(${sHue}, 80%, 75%)`);
  document.documentElement.style.setProperty('--color-secondary-dark', `hsl(${sHue}, 80%, 45%)`);
  document.documentElement.style.setProperty('--color-secondary-rgb', hslToRgbString(sHue, 80, 55));
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState('Todos');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [colorStyle, setColorStyle] = useState<'gradient' | 'flat'>('gradient');
  const [activeColor, setActiveColor] = useState(185);

  useEffect(() => {
    const savedTheme = (getCookie('vibe_theme') as 'dark' | 'light') || 'dark';
    const savedStyle = (getCookie('vibe_style') as 'gradient' | 'flat') || 'gradient';
    const savedColor = parseInt(getCookie('vibe_color') || '185', 10);
    const savedSecondary = parseInt(getCookie('vibe_color_secondary') || '320', 10);

    setTheme(savedTheme);
    setColorStyle(savedStyle);
    setActiveColor(savedColor);

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-style', savedStyle);
    applyThemeColors(savedColor, savedSecondary);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    setCookie('vibe_theme', next);
  }, [theme]);

  const toggleStyle = useCallback(() => {
    const next = colorStyle === 'gradient' ? 'flat' : 'gradient';
    setColorStyle(next);
    document.documentElement.setAttribute('data-style', next);
    setCookie('vibe_style', next);
  }, [colorStyle]);

  const changeColor = useCallback((hue: number) => {
    setActiveColor(hue);
    // Use a color shift for secondary if we only have one hue from the picker
    const sHue = (hue + 135) % 360;
    applyThemeColors(hue, sHue);
    setCookie('vibe_color', String(hue));
    setCookie('vibe_color_secondary', String(sHue));
  }, []);

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <a href="#" className="header__logo">
            <img src="/logo.png" alt="Avocado Logo" width={80} height={80} />
            <span>Avocado</span>
          </a>

          <nav className="header__nav">
            <a href="#features">Funcionalidades</a>
            <a href="#services">Serviços</a>
            <a href="#sobre-mim">Sobre Mim</a>
            <a href="#projects">Projetos</a>
            <a href="#contact">Contato</a>
          </nav>

          <div className="header__actions">
            <a href="#contact" className="btn btn--primary header__cta" style={{ padding: '10px 24px', fontSize: '14px' }}>
              Solicitar Orçamento
            </a>
            <button className="header__hamburger" onClick={() => setMobileNav(true)} aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${mobileNav ? 'open' : ''}`}>
        <button
          onClick={() => setMobileNav(false)}
          className="mobile-nav__close"
          aria-label="Close menu"
        >
          <X size={32} />
        </button>
        <div className="mobile-nav__links">
          {['Funcionalidades', 'Serviços', 'Sobre Mim', 'Projetos', 'Contato'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileNav(false)}>
              {item}
            </a>
          ))}
        </div>
      </div>

      <main>
        <section className="hero" id="hero">
          <div className="hero__bg">
            <img src={IMAGES.hero} alt="Hero Background" />
          </div>
          <div className="hero__glow hero__glow--primary" />
          <div className="hero__glow hero__glow--secondary" />

          <div className="container">
            <div className="hero__inner">
              <div className="hero__content animate-in">
                <div className="hero__badge">
                  <Rocket size={14} /> Especialista em Engenharia de Software
                </div>
                <h1 className="hero__title">
                  Criando <span>Sistemas Robustos</span> para Negócios Digitais
                </h1>
                <p className="hero__text">
                  Transformamos suas ideias em soluções escaláveis com arquitetura de ponta
                  e foco total em performance. Excelência técnica em cada linha de código.
                </p>
                <div className="hero__actions">
                  <a href="#contact" className="btn btn--primary">
                    Solicitar Orçamento <ArrowRight size={18} />
                  </a>
                  <a href="#about" className="btn btn--outline">
                    Conheça a Avocado
                  </a>
                </div>


              </div>

              <div className="hero__image animate-in" style={{ animationDelay: '0.2s' }}>
                <img src={IMAGES.heroSide} alt="Trabalho digital" />
              </div>
            </div>
          </div>
        </section>



        <section className="section section--gradient" id="features">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Por que nos escolher</div>
              <h2 className="section-header__title">
                Recursos poderosos para <span className="gradient-text">escalar</span> seu negócio
              </h2>
              <p className="section-header__text">
                Tudo o que você precisa para lançar e evoluir seu software com confiança.
              </p>
            </div>

            <div className="features__grid">
              {[
                {
                  icon: <Headphones size={28} />,
                  title: 'Suporte Devops',
                  text: 'Assistência especializada contínua para manter sua infraestrutura rodando sem falhas.',
                },
                {
                  icon: <Shield size={28} />,
                  title: 'Segurança de Elite',
                  text: 'Padrões bancários de criptografia e medidas de segurança para proteger seus dados de ponta a ponta.',
                },
                {
                  icon: <Users size={28} />,
                  title: 'Metodologia Ágil',
                  text: 'Entregas recorrentes e transparência absoluta durante todo o processo de desenvolvimento.',
                },
                {
                  icon: <Zap size={28} />,
                  title: 'Performance Extrema',
                  text: 'Sistemas otimizados para velocidade, utilizando as tecnologias mais modernas do mercado.',
                },
                {
                  icon: <Activity size={28} />,
                  title: 'Observabilidade',
                  text: 'Monitoramento contínuo para garantir que seu sistema esteja sempre estável e performático.',
                },
                {
                  icon: <RefreshCw size={28} />,
                  title: 'Arquitetura Moderna',
                  text: 'Código limpo, sustentável e fácil de manter para que sua aplicação cresça sem gargalos.',
                },
              ].map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-card__icon">{f.icon}</div>
                  <h4 className="feature-card__title">{f.title}</h4>
                  <p className="feature-card__text">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <div className="about__inner">
              <div className="about__images">
                <div className="about__img-glow" />
                <div className="about__img-main">
                  <img src={IMAGES.aboutMain} alt="Equipe trabalhando" />
                </div>
                <div className="about__img-float animate-float">
                  <img src={IMAGES.aboutFloat} alt="Colaboração" />
                </div>
              </div>

              <div>
                <div className="about__badge">A Avocado</div>
                <h2 className="about__title">
                  Foco absoluto em <span className="gradient-text">Qualidade e Performance</span>
                </h2>
                <p className="about__text">
                  Com anos de mercado, construímos produtos digitais que são belos,
                  funcionais e geram resultados reais para o seu negócio. Nossa paixão é
                  transformar desafios complexos em soluções elegantes.
                </p>
                <div className="about__list">
                  {[
                    'Especialista em diversas stacks modernas',
                    'Foco em arquitetura limpa e escalável',
                    'Entrega contínua e DevOps integrados',
                    'Consultoria focada em viabilidade técnica',
                  ].map((item, i) => (
                    <div className="about__list-item" key={i}>
                      <div className="about__list-icon">
                        <Check size={14} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="btn btn--primary">
                  Fale com um Especialista <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--gradient" id="sobre-mim">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Perfil Profissional</div>
              <h2 className="section-header__title">
                Sobre <span className="gradient-text">Mim</span>
              </h2>
            </div>

            <div className="about-me__main about-me--full">
              <div className="about-me__profile">
                <div className="about-me__image">
                  <img src={IMAGES.team2} alt="Alberto Silva Lopes" />
                </div>
                <div className="about-me__info">
                  <h3 className="about-me__name">Alberto Silva Lopes</h3>
                  <p className="about-me__role">Engenheiro de Software & Especialista Backend</p>
                  <div className="about-me__socials">
                    <a href="https://linkedin.com/in/alberto-lopes-159189126" target="_blank" rel="noopener noreferrer" className="about-me__social">
                      <Linkedin size={20} />
                    </a>
                    <a href="https://github.com/albertolopes" target="_blank" rel="noopener noreferrer" className="about-me__social">
                      <Github size={20} />
                    </a>
                    <a href="mailto:albertolopes@mail.com" className="about-me__social">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="about-me__text-content">
                <h4 className="about-me__subtitle">Resumo Profissional</h4>
                <p className="about-me__text">
                  Desenvolvedor de software com vasta experiência em arquiteturas modernas, especialmente em
                  microserviços, e forte habilidade para solucionar problemas complexos com eficiência e criatividade.
                  Comprometido com a entrega de código limpo e escalável, sempre alinhado às melhores práticas do
                  mercado.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Nossos Serviços</div>
              <h2 className="section-header__title">
                Soluções Digitais de <span className="gradient-text">Alta Qualidade</span>
              </h2>
              <p className="section-header__text">
                Desenvolvimento completo e personalizado para o seu negócio moderno.
              </p>
            </div>

            <div className="services__grid">
              {[
                {
                  icon: <Code size={28} />,
                  title: 'Desenvolvimento Web',
                  text: 'Aplicações full-stack robustas construídas com as melhores práticas.',
                },
                {
                  icon: <Box size={28} />,
                  title: 'Automação de Processos',
                  text: 'Sistemas inteligentes para otimizar fluxos de trabalho e reduzir custos operacionais.',
                },
                {
                  icon: <Rocket size={28} />,
                  title: 'Produtos MVP',
                  text: 'Lançamos sua ideia rapidamente no mercado com o essencial para validar o negócio.',
                },
                {
                  icon: <LayersIcon size={28} />,
                  title: 'Arquitetura Backend',
                  text: 'Sistemas escaláveis e seguros para suportar o crescimento da sua empresa.',
                },
                {
                  icon: <Layout size={28} />,
                  title: 'Websites Institucionais',
                  text: 'Páginas de alta conversão para destacar sua marca no ambiente digital.',
                },
                {
                  icon: <Cpu size={28} />,
                  title: 'Consultoria Tech',
                  text: 'Orientação especializada para escolha de tecnologias e otimização de processos.',
                },
              ].map((s, i) => (
                <div className="service-card" key={i}>
                  <div className="service-card__icon">{s.icon}</div>
                  <h4 className="service-card__title">{s.title}</h4>
                  <p className="service-card__text">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        <section className="section" id="projects">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Portfólio</div>
              <h2 className="section-header__title">
                Últimos <span className="gradient-text">Projetos em que Atuamos</span>
              </h2>
            </div>

            <div className="projects__tabs">
              {['Todos', 'Backend', 'Sistemas', 'Apps'].map((tab) => (
                <button
                  key={tab}
                  className={`projects__tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="projects__grid">
              {[
                {
                  title: 'Aplicativo Sebrae',
                  cat: 'Finanças & Negócios',
                  img: '/sebrae.png',
                  tags: ['Apps', 'Backend'],
                  link: 'https://sebrae.com.br/sites/PortalSebrae/aplicativosebrae',
                },
                {
                  title: 'Qualicorp',
                  cat: 'Saúde & Seguros',
                  img: '/qualicorp.png',
                  tags: ['Sistemas', 'Backend'],
                  link: 'https://www.qualicorp.com.br/',
                },
                {
                  title: 'Institucional Apemigos',
                  cat: 'Impacto Social / ONG',
                  img: '/apemigos.png',
                  tags: ['Sistemas', 'Apps'],
                  link: 'https://apemigosbrasil.org.br/',
                },
              ].filter((p) => activeTab === 'Todos' || p.tags.includes(activeTab))
                .map((p, i) => (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-card" key={i}>
                    <img src={p.img} alt={p.title} />
                    <div className="project-card__overlay">
                      <h4 className="project-card__title">{p.title}</h4>
                      <span className="project-card__cat">{p.cat}</span>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>





        <section className="section section--gradient" id="contact">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Contato</div>
              <h2 className="section-header__title">
                Vamos <span className="gradient-text">Conversar?</span>
              </h2>
              <p className="section-header__text">Tem um projeto em mente? Adoraríamos ajudar a tirar do papel.</p>
            </div>

            <div className="contact__inner">
              <div className="contact__info">
                {[
                  {
                    icon: <Mail size={20} />,
                    label: 'Email para Contato',
                    value: 'contato@avocadotech.site',
                    href: 'mailto:contato@avocadotech.site',
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: 'Onde Estamos',
                    value: 'Grande Colorado, Sobradinho, DF, Brasil',
                  },
                  {
                    icon: <Phone size={20} />,
                    label: 'Whatsapp/Telefone',
                    value: '+55 (61) 9 8118-1419',
                    href: 'tel:+5561981181419',
                  }
                ].map((item, i) => (
                  <div className="contact__info-item" key={i}>
                    <div className="contact__info-label">{item.label}</div>
                    <div className="contact__info-value">
                      {'href' in item && item.href ? (
                        <a href={item.href}>{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact__form">
                {/* 
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="contact__form-row">
                    <input className="contact__input" type="text" placeholder="Nome Completo" />
                    <input className="contact__input" type="email" placeholder="Seu E-mail" />
                  </div>
                  <div className="contact__form-row">
                    <input className="contact__input" type="text" placeholder="WhatsApp" />
                    <input className="contact__input" type="text" placeholder="Assunto" />
                  </div>
                  <textarea className="contact__input" placeholder="Conte-nos sobre o seu projeto" rows={5} />
                  <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
                    Enviar Mensagem <ArrowRight size={18} />
                  </button>
                </form>
                */}
                <div className="contact__cta-card">
                  <h3 className="contact__cta-title">Impulsione seu Projeto</h3>
                  <p className="contact__cta-text">
                    Estou disponível para novas parcerias e consultorias técnicas especializadas.
                    Se você busca transformar sua ideia em um software robusto e escalável,
                    o canal está aberto.
                  </p>
                  <div className="contact__cta-methods">
                    <a href="https://wa.me/5561981181419" target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ width: '100%' }}>
                      Chamar no WhatsApp <MessageSquare size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2 className="cta__title">Pronto para acelerar seu negócio digital?</h2>
            <p className="cta__text">
              Vamos construir algo incrível juntos. Nossa equipe está pronta para dar o próximo passo com você.
            </p>
            <a href="#contact" className="btn btn--white">
              Começar Agora <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div>
              <a href="#" className="header__logo">
                <img src="/logo.png" alt="Avocado Logo" width={40} height={40} />
                <span>Avocado</span>
              </a>
              <p className="footer__brand-text">
                Desenvolvimento de software premium para empresas inovadoras e startups modernas.
              </p>
              <div className="footer__socials">
                {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                  <a href="#" className="footer__social" key={i}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="footer__heading">Links Rápidos</h4>
              <div className="footer__links">
                <a href="#">Início</a>
                <a href="#features">Funcionalidades</a>
                <a href="#sobre-mim">Sobre Mim</a>
              </div>
            </div>

            <div>
              <h4 className="footer__heading">Serviços</h4>
              <div className="footer__links">
                <a href="#">Engenharia de Backend</a>
                <a href="#">Desenvolvimento de APIs</a>
                <a href="#">Cloud & DevOps</a>
                <a href="#">Consultoria em Arquitetura</a>
              </div>
            </div>

            <div>
              <h4 className="footer__heading">Suporte</h4>
              <div className="footer__links">
                <a href="#">Documentação</a>
                <a href="#">Perguntas Frequentes</a>
                <a href="#">Fale Conosco</a>
                <a href="#">Política de Privacidade</a>
              </div>
            </div>


          </div>

          <div className="footer__bottom">
            <span className="footer__bottom-text">&copy; 2026 Avocado. Todos os direitos reservados.</span>
            <div className="footer__bottom-links">
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={22} />
      </button>
    </>
  );
}
