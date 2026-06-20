import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  Bookmark,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  Gauge,
  Grid2X2,
  ImagePlus,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  Menu,
  MessageSquareText,
  MousePointer2,
  Network,
  PanelLeftClose,
  Play,
  Search,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
  SquarePen,
  Users,
  WandSparkles,
  X,
  Zap,
} from 'lucide-react';
import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';

type ProductId =
  | 'chat'
  | 'agents'
  | 'insights'
  | 'creation'
  | 'canvas'
  | 'competitor'
  | 'automation';

type Product = {
  id: ProductId;
  name: string;
  eyebrow: string;
  stat: string;
  headline: string;
  description: string;
  bullets: string[];
};

type ProtocolType = 'agreement' | 'privacy' | 'payment-agreement';
type WorkspaceView = 'chat' | 'agents' | 'creation' | 'board';

type AppRoute = {
  protocol: ProtocolType | null;
  workspace: WorkspaceView | null;
  login: boolean;
};

const defaultAccount = {
  username: 'admin',
  password: '123456',
};

const authStorageKey = 'sheldonai_demo_auth';

const brand = {
  name: 'SheldonAI',
  tagline: 'AI 赋能经营决策 数据驱动全域增长',
  description:
    '把经营数据、市场洞察、创意生产和自动化执行放进一个统一工作台，让团队更快发现机会、生成方案、推进增长动作。',
  footerDescription:
    'SheldonAI 是面向增长团队的 AI 经营工作台。当前版本先完成官网框架和 UI，后续将逐步接入 AI 对话、智能体、数据洞察、内容创作和自动化任务能力。',
};

const products: Product[] = [
  {
    id: 'chat',
    name: 'AI 对话',
    eyebrow: '15年方法论沉淀',
    stat: '2min',
    headline: '不是闲聊助手，是懂业务的经营顾问',
    description:
      '上传表格、截图或业务问题，SheldonAI 会把散乱信息整理成可执行建议，帮助老板、运营、产品和市场快速对齐判断。',
    bullets: [
      '经营问题直接追问，自动拆解关键指标',
      '表格和截图辅助分析，输出行动建议',
      '沉淀上下文，后续功能逐步接入真实 AI 能力',
    ],
  },
  {
    id: 'agents',
    name: 'AI 智能体',
    eyebrow: '多场景任务编排',
    stat: '20+',
    headline: '把高频 SOP 封装成可复用的数字员工',
    description:
      '从选题、分析、创意到复盘，把复杂流程拆成可调度步骤。第一阶段先展示任务流 UI，后续接入真实执行链路。',
    bullets: [
      '市场调研、视觉营销、投放诊断等场景预留',
      '任务进度、依赖关系和产出物清晰可见',
      '支持团队复用、收藏和二次编辑的产品框架',
    ],
  },
  {
    id: 'insights',
    name: '数据洞察',
    eyebrow: '经营看板中枢',
    stat: '90%',
    headline: '从看报表升级为用数据做决策',
    description:
      '把流量、转化、成本、利润和预测放在同一个仪表盘。现在先搭建视觉骨架，未来接入真实数据源和问数能力。',
    bullets: [
      '关键指标总览、异常预警和趋势解读',
      '多渠道 ROI 与利润结构对比',
      '预留 AI 问数和自动报告生成接口',
    ],
  },
  {
    id: 'creation',
    name: 'AI 创作',
    eyebrow: '内容生产工作台',
    stat: '10x',
    headline: '一句话生成电商级视觉与文案方案',
    description:
      '商品图、脚本、短视频、详情页和广告素材都放进统一创作流。当前以原创 mockup 展示，后续接入生成模型。',
    bullets: [
      '商品图、海报、视频脚本和文案卡片统一管理',
      '创作任务状态、版本和素材来源可追溯',
      '支持把产出同步到无限画板和资产库',
    ],
  },
  {
    id: 'canvas',
    name: '无限画板',
    eyebrow: '协作与沉淀',
    stat: '3x',
    headline: '把分析、创作和执行过程放在同一张画布',
    description:
      '用节点、连线、便签和资产卡片组织复杂项目，让团队看到每一步从问题到结论的路径。',
    bullets: [
      '节点式任务流程，清楚展示上下游关系',
      '文档、图片、视频和数据卡片统一沉淀',
      '多人协同和版本追踪作为后续能力预留',
    ],
  },
  {
    id: 'competitor',
    name: '竞品分析',
    eyebrow: '差距诊断',
    stat: '30s',
    headline: '看穿对手优势，用数据找到切入点',
    description:
      '把销售、搜索词、流量来源和素材表现放在同一屏对比，帮助团队判断哪里要追、哪里要避。',
    bullets: [
      '销售额、转化率、客单价和渠道结构对比',
      '核心词、机会词、低效词分层展示',
      '自动生成 P1/P2/P3 优先行动清单',
    ],
  },
  {
    id: 'automation',
    name: '自动化助手',
    eyebrow: '重复劳动接管',
    stat: '80%',
    headline: '一句话触发跨工具的连续动作',
    description:
      '把重复分析、资料整理、素材生成和复盘提醒做成自动化流程，让人专注判断，系统负责推进。',
    bullets: [
      '任务模板、触发条件和执行状态可视化',
      '异常提醒、数据回填和产出归档预留接口',
      '后续可逐步接入真实工具链和自动化服务',
    ],
  },
];

const navGroups = [
  {
    label: '产品',
    items: products.map((product) => ({
      label: product.name,
      description: product.headline,
      href: `#product-${product.id}`,
    })),
  },
  {
    label: '支持',
    items: [
      {
        label: '使用帮助',
        description: '查看上手指南、功能说明和常见问题',
        href: '#support',
      },
      {
        label: '联系团队',
        description: '预约演示或提交业务需求',
        href: '#contact',
      },
    ],
  },
  {
    label: '资源',
    items: [
      {
        label: '精选',
        description: '行业案例、模板和增长方法论',
        href: '#resources',
      },
      {
        label: '社区',
        description: '与团队和用户一起交流实践经验',
        href: '#resources',
      },
      {
        label: '博客',
        description: '产品更新、技术笔记和业务洞察',
        href: '#resources',
      },
    ],
  },
];

const faqs = [
  {
    question: '谁适合使用 SheldonAI？',
    answer:
      '适合需要从业务数据、市场变化和团队执行中快速获得判断的人，包括创业者、运营、市场、产品、内容创作和管理团队。',
  },
  {
    question: '现在能使用真实 AI 功能吗？',
    answer:
      '当前第一阶段先搭建官网框架和前端 UI。AI 对话、智能体、数据洞察、创作和自动化能力会在后续版本逐步接入。',
  },
  {
    question: '生成的内容未来能导出吗？',
    answer:
      '框架会预留导出入口。后续可以支持文档、表格、图片、视频和任务报告等格式，具体取决于实际功能模块。',
  },
  {
    question: '可以给团队多人协作使用吗？',
    answer:
      '可以作为后续方向。当前 UI 已为团队空间、画板协作、任务流和资产沉淀保留了结构，方便继续扩展。',
  },
];

const protocols: Record<ProtocolType, { title: string; sections: string[] }> = {
  agreement: {
    title: 'SheldonAI 用户协议',
    sections: [
      '本页面为协议占位骨架，用于展示正式协议的排版结构。正式上线前，请替换为经法务确认的完整条款。',
      '用户在使用 SheldonAI 服务前，应充分理解服务范围、账户规则、内容规范、知识产权、免责声明和争议解决方式。',
      'SheldonAI 当前官网仅提供产品介绍和交互演示，不代表已经开放真实 AI 服务、付费服务或账号系统。',
    ],
  },
  privacy: {
    title: 'SheldonAI 隐私政策',
    sections: [
      '本页面为隐私政策占位骨架，用于后续补充个人信息收集、使用、存储、共享、删除和安全保护规则。',
      '当前前端演示表单仅在浏览器内展示校验和提交成功状态，不会发送真实网络请求。',
      '正式接入登录、AI 服务或数据分析能力前，应补充完整隐私政策并明确用户授权边界。',
    ],
  },
  'payment-agreement': {
    title: 'SheldonAI 付费服务协议',
    sections: [
      '本页面为付费服务协议占位骨架。当前阶段不接入真实支付、订阅、积分或充值功能。',
      '后续如上线付费能力，应明确资费标准、有效期、退款规则、权益范围、发票规则和服务限制。',
      '页面路由已预留，便于未来接入完整协议文本和购买流程。',
    ],
  },
};

const roleChips = ['老板', '运营', '产品', '市场', '视觉', '客服', '研发'];

function App() {
  const [route, setRoute] = useState(getRouteFromHash());
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(authStorageKey) === 'true',
  );
  const [activeProduct, setActiveProduct] = useState<ProductId>('chat');
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === activeProduct) ?? products[0],
    [activeProduct],
  );

  const protocol = route.protocol ? protocols[route.protocol] : null;

  return (
    <>
      {route.workspace ? (
        isAuthenticated ? (
          <WorkspaceApp
            view={route.workspace}
            onLogout={() => {
              localStorage.removeItem(authStorageKey);
              setIsAuthenticated(false);
              window.location.href = '/login/#/';
            }}
          />
        ) : (
          <LoginPage
            onLogin={() => {
              localStorage.setItem(authStorageKey, 'true');
              setIsAuthenticated(true);
              window.location.href = '/app/layout/#/board';
            }}
          />
        )
      ) : route.login ? (
        <LoginPage
          onLogin={() => {
            localStorage.setItem(authStorageKey, 'true');
            setIsAuthenticated(true);
            window.location.href = '/app/layout/#/board';
          }}
        />
      ) : (
        <div className="app-shell">
          <SiteHeader
            openNav={openNav}
            setOpenNav={setOpenNav}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            setActiveProduct={setActiveProduct}
            openContact={() => setIsContactOpen(true)}
          />

          {protocol ? (
            <ProtocolPage protocol={protocol} />
          ) : (
            <main>
              <Hero openContact={() => setIsContactOpen(true)} />
              <ProductMatrix
                activeProduct={activeProduct}
                selectedProduct={selectedProduct}
                setActiveProduct={setActiveProduct}
                openContact={() => setIsContactOpen(true)}
              />
              <ResourceStrip />
              <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
              <FinalCta openContact={() => setIsContactOpen(true)} />
            </main>
          )}

          <SiteFooter />
        </div>
      )}

      {isContactOpen ? <ContactModal onClose={() => setIsContactOpen(false)} /> : null}
    </>
  );
}

function goToWorkspace() {
  window.location.href = '/login/#/';
}

function getRouteFromHash(): AppRoute {
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (pathname === '/login' || hash === 'login') {
    return { protocol: null, workspace: null, login: true };
  }
  const workspaceViews: WorkspaceView[] = ['chat', 'agents', 'creation', 'board'];
  if (pathname === '/app/layout' && (workspaceViews.includes(hash as WorkspaceView) || hash === '')) {
    return {
      protocol: null,
      workspace: hash === '' ? 'board' : (hash as WorkspaceView),
      login: false,
    };
  }
  if (hash === 'chat') return { protocol: null, workspace: 'chat', login: false };
  if (hash === 'agents') return { protocol: null, workspace: 'agents', login: false };
  if (hash === 'creation') return { protocol: null, workspace: 'creation', login: false };
  if (hash === 'board') return { protocol: null, workspace: 'board', login: false };
  if (hash === 'protocol/agreement') {
    return { protocol: 'agreement', workspace: null, login: false };
  }
  if (hash === 'protocol/privacy') {
    return { protocol: 'privacy', workspace: null, login: false };
  }
  if (hash === 'protocol/payment-agreement') {
    return { protocol: 'payment-agreement', workspace: null, login: false };
  }
  return { protocol: null, workspace: null, login: false };
}

function SiteHeader({
  openNav,
  setOpenNav,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setActiveProduct,
  openContact,
}: {
  openNav: string | null;
  setOpenNav: (value: string | null) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  setActiveProduct: (product: ProductId) => void;
  openContact: () => void;
}) {
  const handleNavItemClick = (href: string) => {
    if (href.startsWith('#product-')) {
      const id = href.replace('#product-', '') as ProductId;
      setActiveProduct(id);
      window.location.hash = '/';
      requestAnimationFrame(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header" onMouseLeave={() => setOpenNav(null)}>
      <a className="brand" href="#/" aria-label="SheldonAI 首页">
        <span className="brand-mark">
          <Sparkles size={20} />
        </span>
        <span>{brand.name}</span>
      </a>

      <nav className="desktop-nav" aria-label="主导航">
        {navGroups.map((group) => (
          <div
            className="nav-group"
            key={group.label}
            onMouseEnter={() => setOpenNav(group.label)}
          >
            <button className="nav-trigger" type="button">
              {group.label}
              <ChevronDown size={15} />
            </button>
            {openNav === group.label ? (
              <div className="nav-menu">
                {group.items.map((item) => (
                  <button
                    className="nav-menu-item"
                    key={item.label}
                    type="button"
                    onClick={() => handleNavItemClick(item.href)}
                  >
                    <span>{item.label}</span>
                    <small>{item.description}</small>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </nav>

      <div className="header-actions">
        <button className="ghost-button" type="button" onClick={openContact}>
          注册
        </button>
        <button className="outline-button" type="button" onClick={goToWorkspace}>
          登录
        </button>
      </div>

      <button
        className="icon-button mobile-menu-button"
        type="button"
        aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isMobileMenuOpen ? (
        <div className="mobile-nav">
          {navGroups.map((group) => (
            <details key={group.label} open={group.label === '产品'}>
              <summary>{group.label}</summary>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    handleNavItemClick(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </details>
          ))}
          <button className="primary-button full-width" type="button" onClick={goToWorkspace}>
            开始体验
            <ArrowRight size={18} />
          </button>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ openContact }: { openContact: () => void }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <div className="role-row" aria-label="适用角色">
          {roleChips.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </div>

        <h1>
          AI 赋能经营决策
          <span>数据驱动全域增长</span>
        </h1>

        <p>{brand.description}</p>

        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={goToWorkspace}>
            立即开始
            <ArrowRight size={19} />
          </button>
          <button className="video-button" type="button" onClick={openContact}>
            <Play size={17} />
            查看演示
          </button>
        </div>

        <div className="hero-metrics" aria-label="产品指标">
          <Metric value="200%" label="效率提升" />
          <Metric value="50k+" label="可生成报告" />
          <Metric value="7" label="产品模块" />
        </div>
      </div>

      <div className="hero-visual" aria-label="SheldonAI 产品演示">
        <div className="demo-window hero-demo">
          <div className="demo-topbar">
            <span />
            <span />
            <span />
            <strong>SheldonAI Command Center</strong>
          </div>
          <div className="hero-grid">
            <div className="chat-card">
              <small>AI 经营问答</small>
              <p>这周主图点击率为什么下降？</p>
              <div className="answer-block">
                检测到 CTR 下降 1.6pp，主要来自搜索流量承接不足和竞品场景图更新。
              </div>
            </div>
            <div className="score-card">
              <Gauge size={22} />
              <strong>ROI 2.8</strong>
              <span>预计提升 +31%</span>
            </div>
            <div className="chart-card">
              <div className="chart-bars">
                <i style={{ height: '44%' }} />
                <i style={{ height: '76%' }} />
                <i style={{ height: '58%' }} />
                <i style={{ height: '86%' }} />
                <i style={{ height: '66%' }} />
              </div>
              <span>渠道表现</span>
            </div>
            <div className="task-card">
              <Check size={18} />
              生成 3 套优化方案
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ProductMatrix({
  activeProduct,
  selectedProduct,
  setActiveProduct,
  openContact,
}: {
  activeProduct: ProductId;
  selectedProduct: Product;
  setActiveProduct: (value: ProductId) => void;
  openContact: () => void;
}) {
  return (
    <section className="product-section" id="products">
      <div className="section-heading">
        <span className="section-kicker">产品矩阵</span>
        <h2>从经营判断到执行落地，先把完整框架搭好</h2>
        <p>当前版本聚焦官网框架和 UI，所有 AI 功能模块都以可扩展的前端结构预留。</p>
      </div>

      <div className="product-tabs" role="tablist" aria-label="SheldonAI 产品模块">
        {products.map((product) => (
          <button
            className={product.id === activeProduct ? 'active' : ''}
            key={product.id}
            type="button"
            role="tab"
            aria-selected={product.id === activeProduct}
            onClick={() => setActiveProduct(product.id)}
          >
            {getProductIcon(product.id)}
            <span>{product.name}</span>
          </button>
        ))}
      </div>

      <div className="product-showcase">
        <div className="product-copy">
          <span className="product-eyebrow">{selectedProduct.eyebrow}</span>
          <div className="product-stat">{selectedProduct.stat}</div>
          <h3>{selectedProduct.headline}</h3>
          <p>{selectedProduct.description}</p>
          <ul>
            {selectedProduct.bullets.map((bullet) => (
              <li key={bullet}>
                <Check size={18} />
                {bullet}
              </li>
            ))}
          </ul>
          <button className="secondary-button" type="button" onClick={openContact}>
            了解详情
            <ArrowRight size={17} />
          </button>
        </div>
        <ProductMockup product={selectedProduct} />
      </div>
    </section>
  );
}

function getProductIcon(id: ProductId): ReactNode {
  const iconProps = { size: 18 };
  const icons: Record<ProductId, ReactNode> = {
    chat: <MessageSquareText {...iconProps} />,
    agents: <Bot {...iconProps} />,
    insights: <BarChart3 {...iconProps} />,
    creation: <ImagePlus {...iconProps} />,
    canvas: <Network {...iconProps} />,
    competitor: <Search {...iconProps} />,
    automation: <Zap {...iconProps} />,
  };
  return icons[id];
}

function ProductMockup({ product }: { product: Product }) {
  const content: Record<ProductId, ReactNode> = {
    chat: <ChatMockup />,
    agents: <AgentMockup />,
    insights: <InsightsMockup />,
    creation: <CreationMockup />,
    canvas: <CanvasMockup />,
    competitor: <CompetitorMockup />,
    automation: <AutomationMockup />,
  };

  return (
    <div className="demo-window product-demo">
      <div className="demo-topbar">
        <span />
        <span />
        <span />
        <strong>{product.name} / Preview</strong>
      </div>
      {content[product.id]}
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="chat-mockup">
      <div className="file-row">
        <FileText size={18} />
        店铺数据_2026Q2.xlsx
        <span>已解析</span>
      </div>
      <div className="message user">这周广告 ROI 变低，应该先查哪里？</div>
      <div className="message ai">
        建议先拆渠道结构：搜索 ROI 稳定，信息流消耗增加 28%，但转化率下降 1.4pp。
      </div>
      <div className="mini-grid">
        <MetricCard label="搜索 ROI" value="3.12" />
        <MetricCard label="信息流 ROI" value="0.86" />
        <MetricCard label="建议节省" value="¥8,400" />
      </div>
    </div>
  );
}

function AgentMockup() {
  return (
    <div className="agent-mockup">
      {['蓝海探测', '关键词洞察', '主图策划', '推广分析'].map((step, index) => (
        <div className="agent-step" key={step}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
          <small>{index < 2 ? '已完成' : index === 2 ? '执行中' : '等待中'}</small>
        </div>
      ))}
    </div>
  );
}

function InsightsMockup() {
  return (
    <div className="insights-mockup">
      <div className="dashboard-top">
        <MetricCard label="销售额" value="¥128.6万" />
        <MetricCard label="转化率" value="3.8%" />
        <MetricCard label="利润率" value="18.4%" />
      </div>
      <div className="line-chart">
        <span style={{ left: '6%', bottom: '24%' }} />
        <span style={{ left: '27%', bottom: '42%' }} />
        <span style={{ left: '48%', bottom: '35%' }} />
        <span style={{ left: '69%', bottom: '63%' }} />
        <span style={{ left: '90%', bottom: '76%' }} />
      </div>
      <div className="alert-row">
        <ShieldCheck size={18} />
        异常预警：直播渠道转化率高于均值 22%
      </div>
    </div>
  );
}

function CreationMockup() {
  return (
    <div className="creation-mockup">
      {['白底图', '商业大片', '虚拟试衣', '短视频脚本'].map((item, index) => (
        <div className="creative-tile" key={item}>
          <WandSparkles size={18} />
          <strong>{item}</strong>
          <span>{index === 3 ? '脚本已生成' : '版本 v1'}</span>
        </div>
      ))}
    </div>
  );
}

function CanvasMockup() {
  return (
    <div className="canvas-mockup">
      <div className="canvas-node node-a">
        <BrainCircuit size={18} />
        业务问题
      </div>
      <div className="canvas-node node-b">
        <LayoutDashboard size={18} />
        数据卡片
      </div>
      <div className="canvas-node node-c">
        <SquarePen size={18} />
        创作产出
      </div>
      <div className="canvas-line line-a" />
      <div className="canvas-line line-b" />
    </div>
  );
}

function CompetitorMockup() {
  return (
    <div className="competitor-mockup">
      {[
        ['销售额', '¥3.2万', '竞品 ¥4.8万'],
        ['转化率', '2.1%', '竞品 3.8%'],
        ['搜索流量', '38%', '竞品 49%'],
      ].map(([label, own, other]) => (
        <div className="compare-row" key={label}>
          <span>{label}</span>
          <strong>{own}</strong>
          <small>{other}</small>
        </div>
      ))}
      <div className="priority-card">P1 承接「敏感肌专用」机会词，预计 CTR +1.2pp</div>
    </div>
  );
}

function AutomationMockup() {
  return (
    <div className="automation-mockup">
      {['收集数据', '生成报告', '发送提醒', '归档资产'].map((step, index) => (
        <div className="automation-row" key={step}>
          <MousePointer2 size={17} />
          <span>{step}</span>
          <small>{index < 2 ? '完成' : '待执行'}</small>
        </div>
      ))}
      <div className="prompt-bar">输入任务，SheldonAI 自动编排执行链路…</div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ResourceStrip() {
  return (
    <section className="resource-strip" id="resources">
      <div>
        <span className="section-kicker">资源中心</span>
        <h2>模板、案例和方法论入口已经预留</h2>
      </div>
      <div className="resource-grid">
        <ResourceCard icon={<FileText size={24} />} title="精选模板" text="沉淀业务分析、创意策划和复盘模板。" />
        <ResourceCard icon={<Users size={24} />} title="社区交流" text="预留团队和用户的经验交流入口。" />
        <ResourceCard icon={<CircleHelp size={24} />} title="使用帮助" text="后续补充产品教程、接入说明和 FAQ。" />
      </div>
    </section>
  );
}

function ResourceCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="resource-card">
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function FaqSection({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number;
  setOpenFaq: (value: number) => void;
}) {
  return (
    <section className="faq-section" id="support">
      <div className="section-heading">
        <span className="section-kicker">常见问题</span>
        <h2>关于第一阶段产品框架</h2>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <button
            className={openFaq === index ? 'faq-item open' : 'faq-item'}
            key={faq.question}
            type="button"
            onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
          >
            <span>{faq.question}</span>
            <ChevronDown size={18} />
            {openFaq === index ? <p>{faq.answer}</p> : null}
          </button>
        ))}
      </div>
    </section>
  );
}

function FinalCta({ openContact }: { openContact: () => void }) {
  return (
    <section className="final-cta" id="contact">
      <span>{brand.name}</span>
      <h2>先把框架搭起来，再逐步接入真正的 AI 能力</h2>
      <p>官网、导航、产品模块、协议路由和交互骨架已经可以作为后续功能开发的第一层地基。</p>
      <button className="primary-button" type="button" onClick={openContact}>
        进入工作台
        <ArrowRight size={18} />
      </button>
    </section>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState(defaultAccount.username);
  const [password, setPassword] = useState(defaultAccount.password);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() !== defaultAccount.username || password !== defaultAccount.password) {
      setError('账号或密码不正确，请使用页面上的默认演示账号。');
      return;
    }

    setError('');
    onLogin();
  };

  return (
    <main className="login-page">
      <section className="login-visual">
        <a className="brand" href="#/">
          <span className="brand-mark">
            <Sparkles size={20} />
          </span>
          <span>{brand.name}</span>
        </a>
        <h1>
          登录后进入
          <span>SheldonAI 工作台</span>
        </h1>
        <p>当前是无后端演示登录。后续接入真实账号系统后，这里可以替换成手机号、验证码、企业空间和权限管理。</p>
        <div className="login-preview-card">
          <div className="demo-topbar">
            <span />
            <span />
            <span />
            <strong>Workspace Preview</strong>
          </div>
          <div className="login-preview-grid">
            <MetricCard label="画板任务" value="12" />
            <MetricCard label="素材资产" value="48" />
            <MetricCard label="自动流程" value="6" />
          </div>
        </div>
      </section>

      <section className="login-panel">
        <span className="section-kicker">Demo Login</span>
        <h2>欢迎回来</h2>
        <p>使用默认账号即可进入应用界面。</p>

        <div className="default-account">
          <span>默认账号</span>
          <strong>{defaultAccount.username}</strong>
          <span>默认密码</span>
          <strong>{defaultAccount.password}</strong>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            账号
            <input value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
          <label>
            密码
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <div className="form-error">{error}</div> : null}
          <button className="primary-button full-width" type="submit">
            登录进入工作台
            <ArrowRight size={18} />
          </button>
          <button
            className="secondary-button full-width"
            type="button"
            onClick={() => {
              setUsername(defaultAccount.username);
              setPassword(defaultAccount.password);
              setError('');
            }}
          >
            一键填入默认账号
          </button>
        </form>
      </section>
    </main>
  );
}

function WorkspaceApp({ view, onLogout }: { view: WorkspaceView; onLogout: () => void }) {
  const sidebarItems = [
    { id: 'chat' as const, label: 'AI对话', icon: <MessageSquareText size={21} />, locked: false },
    { id: 'agents' as const, label: 'AI智能体', icon: <Bot size={21} />, locked: false },
    { id: 'creation' as const, label: 'AI创作', icon: <WandSparkles size={21} />, locked: false },
    { id: 'board' as const, label: '无限画板', icon: <Network size={21} />, locked: true },
    { id: 'competitor' as const, label: '竞品分析', icon: <Search size={21} />, locked: true },
    { id: 'insights' as const, label: '玺承BI', icon: <BarChart3 size={21} />, locked: true },
    { id: 'automation' as const, label: '万能玺虾', icon: <Zap size={21} />, locked: true },
  ];

  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <div className="workspace-brand-row">
          <a className="brand" href="#/">
            <span className="brand-mark">
              <Sparkles size={20} />
            </span>
            <span>{brand.name}</span>
          </a>
          <button className="sidebar-collapse-button" type="button" aria-label="收起侧边栏">
            <PanelLeftClose size={18} />
          </button>
        </div>

        <nav className="workspace-nav" aria-label="工作台导航">
          {sidebarItems.map((item) => (
            <button
              className={item.id === view ? 'active' : ''}
              key={item.label}
              type="button"
              disabled={item.locked}
              onClick={() => {
                if (
                  !item.locked &&
                  (item.id === 'chat' ||
                    item.id === 'agents' ||
                    item.id === 'creation' ||
                    item.id === 'board')
                ) {
                  window.location.hash = `/${item.id}`;
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.locked ? <LockKeyhole size={17} /> : null}
            </button>
          ))}
        </nav>

        <div className="quota-card">
          <div className="quota-card-head">
            <strong>我的额度</strong>
            <span>个人用户</span>
          </div>
          <b>0</b>
          <i />
        </div>

        <div className="workspace-user-row">
          <span className="user-avatar">郑</span>
          <strong>郑一</strong>
          <button type="button" aria-label="通知">
            <Bell size={18} />
          </button>
        </div>

        <button className="workspace-logout" type="button" onClick={onLogout}>
          退出登录
        </button>
      </aside>

      <main className="workspace-main">
        {view === 'chat' ? <AIChatPage /> : null}
        {view === 'agents' ? <AgentsPage /> : null}
        {view === 'creation' ? <CreationPage /> : null}
        {view === 'board' ? <BoardPage /> : null}
      </main>
    </div>
  );
}

function BoardPage() {
  return (
    <>
      <section className="board-hero-panel">
        <div className="board-title">
          <span className="brand-mark board-logo">
            <Sparkles size={34} />
          </span>
          <strong>{brand.name}</strong>
        </div>
        <h1>
          开启你的
          <span>无限画板创作</span>
        </h1>

        <div className="board-composer">
          <div className="upload-card">
            <span>0/9</span>
            <ImagePlus size={30} />
          </div>
          <div className="composer-copy">
            <strong>智能参考，上传参考、输入文字，创意无限可能</strong>
            <p>这里目前是 SheldonAI 的画板 UI 框架，后续会接入真实素材上传、智能体执行和节点式协作。</p>
          </div>
          <div className="composer-actions">
            <button className="agent-mode-button" type="button">
              <Bot size={19} />
              Agent 模式
              <ChevronDown size={16} />
            </button>
            <button className="custom-mode-button" type="button">
              <SquarePen size={18} />
              自定义
            </button>
          </div>
        </div>
      </section>

      <section className="quick-start-section">
        <div className="quick-heading">
          <Sparkles size={24} />
          <h2>快速开始</h2>
        </div>
        <div className="quick-card-grid">
          <QuickStartCard title="主图策划" text="输入商品信息，生成卖点拆解和视觉方向。" />
          <QuickStartCard title="竞品拆解" text="把竞品链接或数据放进画板，整理差距和行动清单。" />
          <QuickStartCard title="脚本生成" text="围绕目标人群生成短视频脚本和分镜草稿。" />
          <QuickStartCard title="数据复盘" text="把报表拖进画板，生成经营复盘结构。" />
        </div>
      </section>

      <section className="board-canvas-preview">
        <div className="canvas-node node-a">
          <BrainCircuit size={18} />
          输入目标
        </div>
        <div className="canvas-node node-b">
          <Bot size={18} />
          Agent 执行
        </div>
        <div className="canvas-node node-c">
          <ImagePlus size={18} />
          生成资产
        </div>
        <div className="canvas-line line-a" />
        <div className="canvas-line line-b" />
      </section>
    </>
  );
}

function AgentsPage() {
  const agents = [
    {
      name: '蓝海探测',
      scene: '市场选款',
      status: '已就绪',
      description: '扫描关键词需求和竞争强度，找到更容易切入的商品机会。',
    },
    {
      name: '主图策划',
      scene: '视觉营销',
      status: '推荐',
      description: '拆解卖点、人群和场景，生成主图方向、文案和拍摄建议。',
    },
    {
      name: '推广诊断',
      scene: '运营投放',
      status: '可执行',
      description: '读取投放数据，定位亏损计划、低效词和预算迁移建议。',
    },
    {
      name: '内容脚本',
      scene: '内容生成',
      status: '可执行',
      description: '根据商品资料生成短视频脚本、分镜和口播节奏。',
    },
    {
      name: '税务自检',
      scene: '数智财税',
      status: '待接入',
      description: '用自测题生成风险提示和合规健康报告。',
    },
    {
      name: '竞品拆解',
      scene: '产品调研',
      status: '可执行',
      description: '对比销售、搜索词、流量来源和评价，输出差距清单。',
    },
  ];

  const [selectedAgent, setSelectedAgent] = useState(agents[1]);
  const [isRunning, setIsRunning] = useState(false);

  const runAgent = () => {
    setIsRunning(true);
    window.setTimeout(() => setIsRunning(false), 1200);
  };

  return (
    <section className="workspace-module-page agents-page">
      <div className="module-header">
        <div>
          <span className="section-kicker">AI Agents</span>
          <h1>AI 智能体</h1>
          <p>把高频经营 SOP 封装成可执行的数字员工。当前是前端演示流程，后续可接入真实任务调度和工具调用。</p>
        </div>
        <button className="primary-button" type="button" onClick={runAgent}>
          {isRunning ? '执行中...' : '运行智能体'}
          <Zap size={18} />
        </button>
      </div>

      <div className="agents-layout">
        <div className="agent-library">
          <div className="module-panel-title">
            <Bot size={20} />
            智能体库
          </div>
          <div className="agent-card-grid">
            {agents.map((agent) => (
              <button
                className={selectedAgent.name === agent.name ? 'agent-card active' : 'agent-card'}
                key={agent.name}
                type="button"
                onClick={() => setSelectedAgent(agent)}
              >
                <span>{agent.scene}</span>
                <strong>{agent.name}</strong>
                <p>{agent.description}</p>
                <small>{agent.status}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="agent-runner">
          <div className="module-panel-title">
            <BrainCircuit size={20} />
            {selectedAgent.name} 执行预览
          </div>
          <div className="agent-runner-hero">
            <div>
              <span>{selectedAgent.scene}</span>
              <h2>{selectedAgent.name}</h2>
              <p>{selectedAgent.description}</p>
            </div>
            <div className={isRunning ? 'agent-status running' : 'agent-status'}>
              <span />
              {isRunning ? '正在编排任务' : selectedAgent.status}
            </div>
          </div>

          <div className="agent-flow">
            {['读取目标', '拆解任务', '调用工具', '生成报告', '同步画板'].map((step, index) => (
              <div className={isRunning && index === 2 ? 'flow-step running' : 'flow-step'} key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
                <small>{index < 2 ? '已完成' : isRunning && index === 2 ? '执行中' : '等待'}</small>
              </div>
            ))}
          </div>

          <div className="agent-output">
            <h3>本次预期产出</h3>
            <ul>
              <li>
                <Check size={16} />
                业务问题拆解和关键判断
              </li>
              <li>
                <Check size={16} />
                P1/P2/P3 行动清单
              </li>
              <li>
                <Check size={16} />
                可同步到无限画板的节点资产
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreationPage() {
  const modes = [
    {
      id: 'poster',
      name: '商业生图',
      title: '白底图生成商品摄影级大片',
      description: '适合主图、海报、信息流素材，支持风格、场景和卖点方向配置。',
    },
    {
      id: 'video',
      name: '短视频脚本',
      title: '从商品卖点生成种草短视频脚本',
      description: '输出分镜、口播、节奏和素材清单，后续可接入视频模型。',
    },
    {
      id: 'tryon',
      name: '虚拟试衣',
      title: '服装类目上新前先看模特效果',
      description: '当前展示 UI 框架，后续接入图片生成或试衣模型。',
    },
    {
      id: 'scene',
      name: '场景裂变',
      title: '一张商品图生成多场景素材',
      description: '适合节日、地域、人群和平台差异化投放素材。',
    },
  ];

  const [activeMode, setActiveMode] = useState(modes[0]);
  const [prompt, setPrompt] = useState('一款适合敏感肌的保湿面霜，想要高级、干净、转化率高的主图方向。');
  const [generated, setGenerated] = useState(false);

  const assets = ['主图 v1', '主图 v2', '详情页首屏', '短视频脚本', '卖点文案', '投放素材'];

  return (
    <section className="workspace-module-page creation-page">
      <div className="module-header">
        <div>
          <span className="section-kicker">AI Creation</span>
          <h1>AI 创作</h1>
          <p>先把素材生产台搭起来：选模式、写需求、生成预览、沉淀资产。后续可逐步接入图片、视频和文案模型。</p>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            setGenerated(true);
          }}
        >
          生成预览
          <WandSparkles size={18} />
        </button>
      </div>

      <div className="creation-layout">
        <div className="creation-controls">
          <div className="module-panel-title">
            <ImagePlus size={20} />
            创作模式
          </div>
          <div className="creation-mode-list">
            {modes.map((mode) => (
              <button
                className={activeMode.id === mode.id ? 'active' : ''}
                key={mode.id}
                type="button"
                onClick={() => {
                  setActiveMode(mode);
                  setGenerated(false);
                }}
              >
                <strong>{mode.name}</strong>
                <span>{mode.title}</span>
              </button>
            ))}
          </div>

          <label className="creation-prompt">
            创作需求
            <textarea value={prompt} rows={8} onChange={(event) => setPrompt(event.target.value)} />
          </label>
        </div>

        <div className="creation-preview">
          <div className="module-panel-title">
            <Sparkles size={20} />
            生成预览
          </div>
          <div className="creative-stage">
            <div className="creative-image-card">
              <span>{activeMode.name}</span>
              <strong>{generated ? '预览已生成' : '等待生成'}</strong>
              <p>{activeMode.title}</p>
            </div>
            <div className="creative-brief">
              <h2>{activeMode.title}</h2>
              <p>{activeMode.description}</p>
              <div className="creative-tags">
                {['高级质感', '转化优先', '平台适配', '可同步画板'].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="asset-grid">
            {assets.map((asset, index) => (
              <div className={generated || index < 3 ? 'asset-card ready' : 'asset-card'} key={asset}>
                <SquarePen size={18} />
                <strong>{asset}</strong>
                <span>{generated || index < 3 ? '已生成' : '待生成'}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="creation-inspector">
          <div className="inspector-card">
            <h3>创作设置</h3>
            <ul>
              <li>
                <Check size={16} />
                输出 3 个版本
              </li>
              <li>
                <Check size={16} />
                自动生成卖点文案
              </li>
              <li>
                <Check size={16} />
                支持同步无限画板
              </li>
            </ul>
          </div>
          <div className="inspector-card">
            <h3>当前需求</h3>
            <p>{prompt || '还没有填写创作需求。'}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

type ChatMessage = {
  id: number;
  role: 'user' | 'ai';
  text: string;
};

function AIChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (text: string) => {
    const value = text.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', text: value },
      {
        id: Date.now() + 1,
        role: 'ai',
        text: `已收到：「${value}」。当前是前端演示回复，后续接入真实 AI 后会生成完整的经营分析方案。`,
      },
    ]);
    setInput('');
  };

  const skillCategories = [
    { label: '全部技能', icon: <Grid2X2 size={18} />, active: true },
    { label: '我的技能', icon: <WandSparkles size={18} /> },
    { label: '订阅技能', icon: <Bookmark size={18} /> },
    { label: '系统技能', icon: <LayoutDashboard size={18} /> },
  ];

  const skillCards = [
    {
      title: '蓝海报告选品解读助手',
      description: '基于连续四周商品排行榜数据与店铺画像，快速提炼机会品类。',
    },
    {
      title: '【提示词助手】卖点主图文案生成',
      description: '根据商品描述与核心卖点，生成面向电商主图的高转化文案。',
    },
    {
      title: '【提示词助手】买家秀生成助手',
      description: '基于用户提供的买家秀图片，生成同场景内容方向和发布建议。',
    },
  ];

  return (
    <section className="ai-chat-page">
      <aside className="chat-sessions">
        <div className="chat-session-header">
          <h1>AI 对话</h1>
          <button type="button" aria-label="展开会话菜单">
            <Menu size={21} />
          </button>
        </div>

        <button className="new-chat-button" type="button">
          <SquarePen size={19} />
          发起新对话
        </button>

        <span className="recent-title">最近对话</span>

        <div className="chat-empty-state">
          <span />
          <strong>暂无聊天记录</strong>
          <p>开始新对话后会显示在这里</p>
        </div>
      </aside>

      <main className="chat-home-main">
        <div className="chat-home-hero">
          <h1>
            为您提供 <span>电商经营全链路AI解决方案</span>
          </h1>
          <p>数据驱动决策，智能赋能增长</p>
        </div>

        <form
          className="chat-home-composer"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(input);
          }}
        >
          <textarea
            value={input}
            placeholder="请输入内容..."
            rows={5}
            onChange={(event) => setInput(event.target.value)}
          />

          <div className="home-composer-footer">
            <div className="home-composer-tools">
              <button className="skill-trigger-button" type="button">
                <Zap size={18} />
                技能
              </button>
              <button className="link-tool-button" type="button" aria-label="添加链接">
                <Link2 size={18} />
              </button>
            </div>

            <div className="model-send-row">
              <span className="model-orb" />
              <span>SheldonAI 2.0</span>
              <button className="send-square-button" type="submit" aria-label="发送">
                <SendHorizontal size={20} />
              </button>
            </div>
          </div>
        </form>

        <section className="skill-browser">
          <div className="skill-search-row">
            <label>
              <input placeholder="请输入想搜索的技能名称或描述" />
              <Search size={20} />
            </label>
            <button type="button">
              <FileText size={20} />
              导入技能
            </button>
          </div>

          <div className="skill-browser-body">
            <nav className="skill-category-list" aria-label="技能分类">
              {skillCategories.map((category) => (
                <button className={category.active ? 'active' : ''} key={category.label} type="button">
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </nav>

            <div className="skill-card-grid">
              {skillCards.map((skill) => (
                <article className="skill-card" key={skill.title}>
                  <div>
                    <h2>{skill.title}</h2>
                    <span>系统技能</span>
                  </div>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {messages.length ? (
          <section className="chat-live-preview">
            {messages.map((message) => (
              <div className={`chat-message-row ${message.role}`} key={message.id}>
                <div className="message-avatar">{message.role === 'ai' ? <Sparkles size={16} /> : '我'}</div>
                <div className="chat-bubble">{message.text}</div>
              </div>
            ))}
          </section>
        ) : null}
      </main>
    </section>
  );
}

function QuickStartCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="quick-start-card">
      <span>
        <ArrowRight size={18} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ProtocolPage({
  protocol,
}: {
  protocol: {
    title: string;
    sections: string[];
  };
}) {
  return (
    <main className="protocol-page">
      <a className="back-link" href="#/">
        返回首页
      </a>
      <article className="protocol-card">
        <h1>{protocol.title}</h1>
        {protocol.sections.map((section) => (
          <p key={section}>{section}</p>
        ))}
        <div className="protocol-placeholder">
          <LockKeyhole size={20} />
          正式协议文本将在接入真实服务前补充。
        </div>
      </article>
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand" href="#/">
          <span className="brand-mark">
            <Sparkles size={20} />
          </span>
          <span>{brand.name}</span>
        </a>
        <p>{brand.footerDescription}</p>
      </div>

      <div className="footer-links">
        <div>
          <h3>法律</h3>
          <a href="#/protocol/agreement">用户协议</a>
          <a href="#/protocol/privacy">隐私政策</a>
          <a href="#/protocol/payment-agreement">付费协议</a>
        </div>
        <div>
          <h3>产品</h3>
          {products.slice(0, 4).map((product) => (
            <a href={`#product-${product.id}`} key={product.id}>
              {product.name}
            </a>
          ))}
        </div>
        <div>
          <h3>联系</h3>
          <span>hello@sheldonai.local</span>
          <span>演示站点占位信息</span>
          <span>© 2026 SheldonAI</span>
        </div>
      </div>
    </footer>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const role = String(data.get('role') ?? '').trim();

    if (!name || !phone || !company || !role) {
      setError('请完整填写姓名、手机号、公司和岗位。');
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入正确的 11 位手机号。');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="contact-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" type="button" aria-label="关闭弹窗" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div className="success-state">
            <Check size={34} />
            <h2>申请已提交</h2>
            <p>这是前端演示状态。后续接入真实后端后，可在这里发送销售线索或创建试用账号。</p>
            <button className="primary-button" type="button" onClick={onClose}>
              完成
            </button>
          </div>
        ) : (
          <>
            <span className="section-kicker">联系 SheldonAI</span>
            <h2>开启您的数智化旅程</h2>
            <p>留下联系方式，后续可以接入真实销售线索 API。</p>
            <form onSubmit={handleSubmit}>
              <label>
                联系人姓名
                <input name="name" placeholder="您的姓名" maxLength={50} />
              </label>
              <label>
                手机号
                <input name="phone" placeholder="方便联系的手机号" inputMode="tel" />
              </label>
              <label>
                公司名称
                <input name="company" placeholder="您所在的公司名称" maxLength={100} />
              </label>
              <label>
                您的岗位
                <input name="role" placeholder="例如：运营负责人" maxLength={60} />
              </label>
              {error ? <div className="form-error">{error}</div> : null}
              <button className="primary-button full-width" type="submit">
                提交申请
                <ArrowRight size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
