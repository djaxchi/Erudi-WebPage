export const translations: Record<string, Record<string, string>> = {
  en: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    'nav.home': 'Home',
    'nav.desktop': 'Erudi Desktop',
    'nav.team': 'About the Team',
    'nav.contact': 'Contact Us',

    // ── Footer ───────────────────────────────────────────────────────────────
    'footer.rights': '© 2026 Erudi. All rights reserved.',
    'footer.made': 'Made with ❤️ by the Erudi Team',

    // ── HomePage — Hero ──────────────────────────────────────────────────────
    'home.hero.badge': 'Specialized AI consulting · SME & mid-market',
    'home.hero.headline1': 'AI on',
    'home.hero.headline2': 'your terms.',
    'home.hero.subtitle':
      'Erudi designs, builds and operates bespoke AI solutions for SMEs and mid-market companies. We handle the infrastructure, the maintenance and the R&D — you get a live solution in 2 to 6 weeks.',
    'home.hero.cta.expert': 'Book a free scoping call',
    'home.hero.cta.note': '30 min · No commitment · We map your AI project',
    'home.hero.cta.secondary': 'or see how we work',
    'home.hero.cta.desktop': 'Get Desktop free',

    // ── HomePage — Logo bar ──────────────────────────────────────────────────
    'home.logobar.label': 'Trusted by teams at industry leaders',

    // ── HomePage — Two products ──────────────────────────────────────────────
    'home.split.eyebrow': 'Two products, one mission',
    'home.split.heading': 'Which one is for you?',

    'home.split.b2b.badge': 'Enterprise',
    'home.split.b2b.title': 'Business Solutions',
    'home.split.b2b.desc':
      'We design, industrialize and deploy AI tailored to your data, your processes and your domain expertise. Sovereign infrastructure, full integration into your existing stack, and expert support from audit to production.',
    'home.split.b2b.feat.0': 'Custom-trained models on your data',
    'home.split.b2b.feat.1': 'On-premise or private cloud deployment',
    'home.split.b2b.feat.2': 'GDPR-compliant by design',
    'home.split.b2b.feat.3': 'Full integration into your stack (SAP, Salesforce…)',
    'home.split.b2b.cta': 'Talk to an expert',

    'home.split.desktop.badge': 'Free · Open Source',
    'home.split.desktop.title': 'Erudi Desktop',
    'home.split.desktop.desc':
      'Run powerful LLMs entirely on your own machine. No subscription, no data sent to the cloud, no coding required. Drag & drop your documents, fine-tune a model, and own your AI completely.',
    'home.split.desktop.feat.0': '100% local, your data never leaves your machine',
    'home.split.desktop.feat.1': 'No-code fine-tuning in one click',
    'home.split.desktop.feat.2': 'Free forever, fully open source',
    'home.split.desktop.feat.3': 'Works on Mac, Windows & Linux',
    'home.split.desktop.cta': 'Discover Erudi Desktop',

    // ── HomePage — Problem ───────────────────────────────────────────────────
    'home.problem.eyebrow': 'The problem',
    'home.problem.heading': 'Generic AI is no longer enough.',
    'home.problem.p1':
      'Your teams spend hours reformulating prompts, correcting hallucinations, adapting generic answers to your business context. ChatGPT, Copilot and the like are built for everyone — not for your expertise.',
    'home.problem.p2':
      'The result: marginal productivity gains, stalling adoption, and a widening gap between the promise of AI and the reality on the ground.',

    'home.pain.0.title': 'Endless prompting',
    'home.pain.0.desc': 'Hours wasted reformulating to get a usable answer',
    'home.pain.1.title': 'Non-sovereign data',
    'home.pain.1.desc': 'Your business data flows through third-party servers with no guarantees',
    'home.pain.2.title': 'Recurring hallucinations',
    'home.pain.2.desc': 'Plausible but wrong answers, impossible to detect without expertise',

    // ── HomePage — Solution ──────────────────────────────────────────────────
    'home.solution.eyebrow': 'The solution',
    'home.solution.heading': 'AI that embraces your know-how.',
    'home.solution.sub':
      'Erudi builds AI solutions rooted in your business reality — not off-the-shelf generalist gadgets.',

    'home.sol.0.title': 'Bespoke',
    'home.sol.0.desc':
      'Every solution is built around your data, your processes and your domain vocabulary. No templates, no compromises.',
    'home.sol.1.title': 'Sovereign & secure',
    'home.sol.1.desc':
      'On-premise or private cloud deployment. Your data stays with you, under your full control. GDPR-compliant by design.',
    'home.sol.2.title': 'Performant',
    'home.sol.2.desc':
      'Models optimized for your use case, not generalist behemoths. Precise answers, minimal latency, controlled costs.',
    'home.sol.3.title': 'Industrialized',
    'home.sol.3.desc':
      'From proof of concept to production deployment. Monitoring, maintenance and continuous evolution included.',

    // ── HomePage — Final CTA ─────────────────────────────────────────────────
    'home.cta.heading': 'Get your bespoke AI live in 2–6 weeks.',
    'home.cta.sub':
      'Designed around your data and processes. Hosted, maintained and continuously updated by Erudi. All-inclusive monthly fee — no surprises, no internal complexity to absorb.',
    'home.cta.expert': 'Book your free scoping call',
    'home.cta.note': '30 min · No commitment · We map your AI project',
    'home.cta.desktop': 'Get Desktop free',

    // ── HomePage — Chat scenarios ────────────────────────────────────────────
    'home.chat.0.user': 'We lose 3h/day reformulating prompts for our audit reports.',
    'home.chat.0.ai':
      "We'll build a specialized model trained on your audit methodology. It generates reports in your format, with your terminology — zero prompt engineering needed.",
    'home.chat.1.user': "Our client data can't leave our infrastructure.",
    'home.chat.1.ai':
      'All Erudi solutions deploy on-premise or on your private cloud. Your data never leaves your environment. GDPR-compliant by design.',
    'home.chat.2.user': 'How do we integrate AI into our existing SAP workflow?',
    'home.chat.2.ai':
      'We plug directly into your existing stack — SAP, Salesforce, custom ERPs. Our solutions are built to fit your processes, not the other way around.',
    'home.chat.3.user': 'We need AI that speaks our industry terminology.',
    'home.chat.3.ai':
      'Every model we deliver is trained on your domain vocabulary and validated by your experts. No generic answers — only responses that match your standards.',
    'home.chat.footer': 'Ask anything about your business...',

    // ── HomePage — current page strings ─────────────────────────────────────
    'home.hero.h1.main': 'AI works better when it knows your business.',
    'home.hero.h1.em': 'We build it that way.',
    'home.hero.sub': 'Custom AI operated end to end. Live in 2 to 6 weeks.',
    'home.hero.cta': 'Book a call',
    'home.hero.see': 'or see how we work',

    'home.logobar.trusted': 'Trusted by',

    'home.chat.h2.main': 'AI that knows',
    'home.chat.h2.em': 'your business',
    'home.chat.desc': 'Not a generic chatbot. An assistant trained on your processes, your data and your rules.',
    'home.chat.footertext': 'Your AI assistant, built for your team',

    'home.scenario.0.user': 'What does our refund policy say for orders over 30 days old?',
    'home.scenario.0.ai': 'Requests after 30 days are reviewed case by case. You can offer a credit note or pass it to the account manager. No automatic refund applies beyond that window. Source: commercial policy, section 3.',
    'home.scenario.1.user': 'I just dropped 8 client contracts in the shared folder.',
    'home.scenario.1.ai': 'Read all 8. Extracted client name, start date, notice period and renewal clause for each. One contract has no termination clause, flagged. Summary table ready in your drive.',
    'home.scenario.2.user': 'A new lead just filled our contact form. Handle it.',
    'home.scenario.2.ai': 'Contact created in your CRM. Intro email sent. Follow-up task assigned to you in 3 days. Lead tagged as inbound and added to your active pipeline.',
    'home.scenario.3.user': 'I have a call with Sophie from Bertrand Group in 5 minutes.',
    'home.scenario.3.ai': 'Last touchpoint was 2 weeks ago, a question about their onboarding timeline. Still waiting on their signed addendum. She mentioned budget review in Q3, worth bringing up.',

    'home.pillars.heading.main': 'Three commitments.',
    'home.pillars.heading.em': 'Indivisible',
    'home.pillars.0.title.main': 'Built for',
    'home.pillars.0.title.em': 'your business',
    'home.pillars.0.body': 'Every project starts from your real processes, your data and your existing tools. The AI adapts to your trade, not the other way around.',
    'home.pillars.1.title.main': 'Operated',
    'home.pillars.1.title.em': 'end to end',
    'home.pillars.1.body': 'We host it, maintain it and support it. You pay for a working solution, not a codebase to take over.',
    'home.pillars.2.title.main': 'Always',
    'home.pillars.2.title.em': 'at the state of the art',
    'home.pillars.2.body': 'A dedicated R&D team updates your system as the field evolves. Your solution gets better over time.',

    'home.situations.heading': 'Do you recognise yourself?',
    'home.situations.sub': 'Click a situation to see what we build for it.',
    'home.situations.0.problem': 'Your team spends hours digging through emails, files and tools to answer questions that should take seconds.',
    'home.situations.0.solution': 'A conversational assistant trained on your data and processes. It answers like a colleague who has read everything.',
    'home.situations.0.tag': 'Assistant',
    'home.situations.1.problem': 'You receive hundreds of contracts, reports or forms. Someone has to read them all. That someone is a person.',
    'home.situations.1.solution': 'An AI that reads, extracts and structures your documents automatically. No more manual processing.',
    'home.situations.1.tag': 'Doc analysis',
    'home.situations.2.problem': 'Years of internal knowledge, but nobody can find anything. Every search returns ten results and zero answers.',
    'home.situations.2.solution': 'A search engine built on your internal base. It answers in plain language and cites exactly where it found the information.',
    'home.situations.2.tag': 'Search / RAG',
    'home.situations.3.problem': 'Your team uses five different tools that never talk to each other. Copying data between them is a full-time job.',
    'home.situations.3.solution': 'An agent that connects your CRM, ERP, emails and databases — and acts across them on instruction.',
    'home.situations.3.tag': 'Connected agent',
    'home.situations.4.problem': 'Every week, the same task. Same steps. Three hours minimum. No one questions it because it has always been done that way.',
    'home.situations.4.solution': 'We automate the process end to end, with a human review step where judgement actually matters.',
    'home.situations.4.tag': 'Workflow',
    'home.situations.5.problem': 'Drafting proposals, qualifying leads, summarizing meetings. Your team does it, but it takes most of their day.',
    'home.situations.5.solution': 'An interface that handles the heavy lifting. Your team reviews and validates. Time to value cuts in half.',
    'home.situations.5.tag': 'Acceleration',
    'home.situations.cta.open': 'Sound familiar? Book a call',
    'home.situations.cta.closed': 'See the solution',

    'home.cta.h2': 'Ready to talk?',
    'home.cta.body': 'Tell us what you need. We will tell you what is possible.',
    'home.cta.btn': 'Book a call',

    // ── LandingPage (Desktop) ────────────────────────────────────────────────
    'desktop.hero.badge': 'Revolutionary AI Training Platform',
    'desktop.hero.h1': 'Turn Your Data into a',
    'desktop.hero.h1.accent': 'Custom LLM',
    'desktop.hero.h2': 'Local. No-Code. Fast.',
    'desktop.hero.subtitle':
      'Drag & drop your documents, choose your model, and watch Erudi handle the rest.',
    'desktop.hero.subtitle.bold': 'No coding required.',
    'desktop.hero.download': 'Download Free',
    'desktop.hero.note': 'Mac & Windows · No credit card required · Free forever',

    'desktop.feat.0.label': 'Local Processing',
    'desktop.feat.0.title': 'Complete Privacy',
    'desktop.feat.0.desc': 'Your data never leaves your machine, train models with absolute confidence',
    'desktop.feat.1.label': 'Model Comparison',
    'desktop.feat.1.title': 'Built-in Arena',
    'desktop.feat.1.desc': 'Compare base vs. fine-tuned models side-by-side with interactive evaluation',
    'desktop.feat.2.label': 'Auto Processing',
    'desktop.feat.2.title': 'Smart Data Pipeline',
    'desktop.feat.2.desc': 'Automated cleaning, normalization and enrichment, from raw data to training-ready',
    'desktop.feat.3.label': 'Zero-Code Training',
    'desktop.feat.3.title': 'Accelerated Training',
    'desktop.feat.3.desc': 'One-click fine-tuning optimized for your hardware, no CLI or coding required',

    'desktop.cta.heading': 'Ready to Transform Your Data?',
    'desktop.cta.sub':
      'Join thousands of developers who are already training custom models locally with Erudi. No cloud dependencies, no data privacy concerns, no coding required.',
    'desktop.cta.download': 'Download →',
    'desktop.cta.community': 'Join an',
    'desktop.cta.community.accent': 'early access community',
    'desktop.cta.community.suffix': 'of AI enthusiasts',
    'desktop.cta.whatyouget': 'What you get:',
    'desktop.cta.get.0': 'Free to get started',
    'desktop.cta.get.1': 'No credit card required',
    'desktop.cta.get.2': 'Works on Mac, Windows & Linux',
    'desktop.cta.get.3': 'Complete privacy & security',

    'desktop.democratize.heading': 'Democratizing AI Training',
    'desktop.democratize.p0':
      'Traditional AI fine-tuning requires extensive technical knowledge, expensive cloud resources, and often compromises your data privacy.',
    'desktop.democratize.p1': 'Erudi changes everything.',
    'desktop.democratize.p2':
      'Our platform brings enterprise-grade AI training capabilities directly to your desktop, with an intuitive drag-and-drop interface that anyone can use.',
    'desktop.democratize.p3':
      'Train models locally, keep your data secure, and achieve professional results without the complexity or cost of traditional solutions.',
    'desktop.democratize.download': 'Download',

    'desktop.why.heading': 'Why Choose Erudi?',
    'desktop.why.sub': 'Built for the modern AI practitioner who values privacy, simplicity, and performance',
    'desktop.why.0.title': 'Local Processing',
    'desktop.why.0.desc': 'Train models directly on your hardware with GPU acceleration',
    'desktop.why.1.title': 'Data Privacy',
    'desktop.why.1.desc': 'Your data never leaves your machine - complete privacy guaranteed',
    'desktop.why.2.title': 'No-Code Interface',
    'desktop.why.2.desc': 'Drag, drop, and train - no command line or coding required',
    'desktop.why.3.title': 'Model Comparison',
    'desktop.why.3.desc': 'Built-in arena to compare and evaluate different model versions',

    'desktop.models.heading': 'Supported',
    'desktop.models.heading.accent': 'Models',
    'desktop.models.sub': 'Fine-tune the latest models and seamlessly integrate with Hugging Face',
    'desktop.models.hf.title': 'Hugging Face Integration',
    'desktop.models.hf.p1.label': 'One-Click Publishing:',
    'desktop.models.hf.p1.text': 'Deploy models directly to Hugging Face',
    'desktop.models.hf.p2.label': 'Community Access:',
    'desktop.models.hf.p2.text': 'Use any community model as starting point',
    'desktop.models.hf.p3.label': 'Model Sharing:',
    'desktop.models.hf.p3.text': 'Share your fine-tuned models globally',

    'desktop.models.0.name': 'Mistral-7B',
    'desktop.models.0.badge': 'Foundation',
    'desktop.models.0.desc': 'Base Mistral 7B model for general fine-tuning tasks with excellent performance',
    'desktop.models.0.params': '7B parameters',
    'desktop.models.1.name': 'Mistral-Nemo-12B',
    'desktop.models.1.badge': 'Advanced',
    'desktop.models.1.desc': "Mistral and NVIDIA's model with enhanced reasoning and extended context capabilities",
    'desktop.models.1.params': '12B parameters',
    'desktop.models.2.name': 'Mistral-7B Variants',
    'desktop.models.2.badge': 'Community',
    'desktop.models.2.desc': 'Hundreds of community fine-tuned Mistral-7B models from Hugging Face',
    'desktop.models.2.params': 'Various specializations',
    'desktop.models.3.name': 'Gemma 1B',
    'desktop.models.3.badge': 'Ultra-Light',
    'desktop.models.3.desc': "Google's most efficient model, perfect for edge devices and mobile deployment",
    'desktop.models.3.params': '1B parameters',
    'desktop.models.4.name': 'Gemma 2B',
    'desktop.models.4.badge': 'Lightweight',
    'desktop.models.4.desc': "Google's efficient model for resource-constrained environments",
    'desktop.models.4.params': '2B parameters',
    'desktop.models.5.name': 'Gemma 4B',
    'desktop.models.5.badge': 'Balanced',
    'desktop.models.5.desc': "Google's versatile model offering excellent performance-to-resource ratio",
    'desktop.models.5.params': '4B parameters',
    'desktop.models.6.name': 'Gemma 7B',
    'desktop.models.6.badge': 'High Performance',
    'desktop.models.6.desc': "Google's powerful model with advanced reasoning capabilities",
    'desktop.models.6.params': '7B parameters',
    'desktop.models.7.name': 'Gemma 12B',
    'desktop.models.7.badge': 'Enterprise',
    'desktop.models.7.desc': "Google's largest SLM model with superior performance for complex tasks",
    'desktop.models.7.params': '12B parameters',
    'desktop.models.8.name': 'More Coming Soon',
    'desktop.models.8.badge': '',
    'desktop.models.8.desc': "We're actively developing support for more models to give you maximum choice",
    'desktop.models.8.params': 'Stay tuned for updates',

    'desktop.sysreq.heading': 'System Requirements',
    'desktop.sysreq.sub': 'Optimized for modern hardware with GPU acceleration',
    'desktop.sysreq.win.title': 'Windows Requirements',
    'desktop.sysreq.win.0': 'NVIDIA GPU with ≥8 GB VRAM (CUDA 12.x)',
    'desktop.sysreq.win.1': 'Windows 10+',
    'desktop.sysreq.win.2': '8 GB RAM recommended',
    'desktop.sysreq.win.3': 'Disk space: ~15 GB for model weights and cache',
    'desktop.sysreq.mac.title': 'Mac Requirements',
    'desktop.sysreq.mac.0': 'Apple Silicon (M1/M2/M3/M4)',
    'desktop.sysreq.mac.1': '8 GB RAM recommended',
    'desktop.sysreq.mac.2': 'Disk space: ~10 GB for model weights and cache',
    'desktop.sysreq.ready.heading': 'Ready to get started?',
    'desktop.sysreq.ready.sub': 'Download Erudi Desktop and start fine-tuning your first model today.',
    'desktop.sysreq.ready.cta': 'Download',

    // ── ChatSimulation — default scenarios ───────────────────────────────────
    'chat.default.0.user': 'Help me train a model on my customer support emails',
    'chat.default.0.ai':
      "I'll help you create a custom support AI! First, let me analyze your email data and clean it automatically. Then we'll fine-tune a model that understands your company's support style and common issues.",
    'chat.default.1.user': 'Can you analyze my sales call transcripts?',
    'chat.default.1.ai':
      "Absolutely! I'll process your transcripts, extract key insights, and train a model that can identify successful sales patterns, common objections, and closing techniques specific to your business.",
    'chat.default.2.user': 'I want to create a coding assistant for my team',
    'chat.default.2.ai':
      "Perfect! Upload your codebase and documentation. I'll train a specialized AI that understands your coding patterns, architecture, and can help your team write code that follows your specific conventions and best practices.",
    'chat.default.3.user': "Train an AI on my company's knowledge base",
    'chat.default.3.ai':
      "Great idea! I'll ingest your knowledge base, create embeddings, and fine-tune a model that can answer questions about your company's processes, policies, and procedures with accuracy and context.",
    'chat.header': 'Erudi AI Assistant',
    'chat.simulated': 'Simulated Chat',
    'chat.footer.default': 'Try Erudi to experience this AI interaction...',

    // ── ContactPage ──────────────────────────────────────────────────────────
    'contact.badge': "We're Here to Help",
    'contact.heading1': 'Get in',
    'contact.heading2': 'Touch',
    'contact.sub': 'Have questions about Erudi? Need technical advice?',
    'contact.sub.bold': "We'd love to hear from you.",

    'contact.reason.0.title': 'General Info',
    'contact.reason.0.desc': 'Questions about Erudi and how it works',
    'contact.reason.1.title': 'Business Inquiry',
    'contact.reason.1.desc': 'Partnership opportunities and enterprise solutions',
    'contact.reason.2.title': 'Support & Advice',
    'contact.reason.2.desc': 'Technical help and guidance',
    'contact.reason.click': 'Click to select →',

    'contact.form.name': 'Name *',
    'contact.form.name.placeholder': 'Your name',
    'contact.form.email': 'Email *',
    'contact.form.email.placeholder': 'your@email.com',
    'contact.form.company': 'Company',
    'contact.form.company.placeholder': 'Your company (optional)',
    'contact.form.reason': 'What can we help you with? *',
    'contact.form.reason.placeholder': 'Select a reason',
    'contact.form.reason.general': 'General Information',
    'contact.form.reason.business': 'Business Inquiry',
    'contact.form.reason.support': 'Support & Advice',
    'contact.form.message': 'Message *',
    'contact.form.message.placeholder':
      'Tell us more about your needs, questions, or how we can help...',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.error': 'Failed to send message. Please try again or email us directly.',

    'contact.success.heading': 'Message Sent!',
    'contact.success.sub': "Thanks for reaching out. We'll get back to you within 24 hours.",
    'contact.success.again': 'Send another message →',

    'contact.email.label': 'Prefer email? Reach us directly at',

    // ── TeamPage ─────────────────────────────────────────────────────────────
    'team.hero.h1.1': 'About',
    'team.hero.h1.2': 'the Team',
    'team.hero.sub.1': 'A team of engineers united by a shared vision of making',
    'team.hero.sub.accent': 'AI accessible to everyone',
    'team.hero.sub.2': '.',

    'team.leadership.eyebrow': 'LEADERSHIP TEAM',
    'team.leadership.heading': 'Meet the Visionaries',
    'team.leadership.sub': 'A team of engineers building the future of AI accessibility',

    'team.linkedin': 'View LinkedIn',

    'team.member.0.bio': 'Leads the team and drives product vision.',
    'team.member.0.skill.0': 'Product Strategy',
    'team.member.0.skill.1': 'AI Research',
    'team.member.1.bio': 'Develops and optimizes machine learning tasks.',
    'team.member.1.skill.0': 'Deep Learning',
    'team.member.1.skill.1': 'Model Optimization',
    'team.member.2.bio': 'Drives business strategy and commercial operations.',
    'team.member.2.skill.0': 'Business Strategy',
    'team.member.2.skill.1': 'Sales',
    'team.member.3.bio': 'Implements user interfaces and integrates APIs.',
    'team.member.3.skill.0': 'React',
    'team.member.3.skill.1': 'Node.js',
    'team.member.3.skill.2': 'System Design',
    'team.member.4.bio': 'Designs and maintains dataset cleaning pipelines.',
    'team.member.4.skill.0': 'Data Processing',
    'team.member.4.skill.1': 'Pipeline Architecture',
    'team.member.5.bio': 'Works on computational resources and optimization.',
    'team.member.5.skill.0': 'Infrastructure',
    'team.member.5.skill.1': 'System Optimization',

    'team.dna.eyebrow': 'COMPANY DNA',
    'team.dna.heading': 'Building the Future of AI, Together',
    'team.dna.sub':
      "We're six engineers passionate about making AI technology more accessible. United by our shared vision of democratizing powerful AI training for everyone.",
    'team.dna.quote':
      '"We believe that the future of AI should be accessible, secure, and empowering for everyone. Our mission is to break down the barriers between cutting-edge AI technology and the people who need it most."',
    'team.dna.attribution': '— The Erudi Team',

    // ── DownloadPage ─────────────────────────────────────────────────────────
    'download.badge': 'Early Access Beta',
    'download.heading1': 'Download',
    'download.heading2': 'Erudi',
    'download.sub': 'Start training custom models locally.',
    'download.sub.bold': 'Your feedback shapes the future.',

    'download.beta.title': 'Beta Version Available',
    'download.beta.desc':
      "This beta version gives you early access to Erudi's core features while we continue to refine and improve the experience. Your feedback is invaluable to us.",

    'download.mac.title': 'Download for Mac',
    'download.mac.desc': 'Compatible with M chips, older versions coming soon.',
    'download.mac.file': 'erudi-Installer.dmg',

    'download.windows.title': 'Join Waitlist for Windows',
    'download.windows.desc': 'Get notified when Windows version is available',
    'download.windows.badge': 'Join Waitlist',

    'download.help.heading': 'Need Help Getting Started?',
    'download.help.sub':
      'Check out our documentation or get in touch with our team if you need assistance with installation or have any questions about the beta version.',
    'download.help.learn': 'Learn More',
    'download.help.contact': 'Contact Support',

    // ── WaitlistPage ─────────────────────────────────────────────────────────
    'waitlist.heading': 'Join the Waitlist',
    'waitlist.sub':
      'Be the first to know when Erudi launches and get early access to transform your data into custom LLMs.',

    'waitlist.form.name': 'Full Name *',
    'waitlist.form.name.placeholder': 'Your full name',
    'waitlist.form.email': 'Email Address *',
    'waitlist.form.email.placeholder': 'your@email.com',
    'waitlist.form.company': 'Company/Organization',
    'waitlist.form.company.placeholder': 'Your company (optional)',
    'waitlist.form.useCase': 'What would you use Erudi for?',
    'waitlist.form.useCase.placeholder': 'Tell us about your use case (optional)',
    'waitlist.form.submit': 'Join Waitlist',
    'waitlist.form.submitting': 'Joining...',
    'waitlist.form.error': 'Something went wrong. Please try again.',
    'waitlist.back': 'Back to Home',

    'waitlist.success.heading': "You're on the list!",
    'waitlist.success.sub':
      "We'll notify you as soon as Erudi is ready. Get ready to transform your data into powerful AI models!",
    'waitlist.success.back': 'Back to Home',
  },

  fr: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    'nav.home': 'Accueil',
    'nav.desktop': 'Erudi Desktop',
    'nav.team': "L'équipe",
    'nav.contact': 'Nous contacter',

    // ── Footer ───────────────────────────────────────────────────────────────
    'footer.rights': '© 2026 Erudi. Tous droits réservés.',
    'footer.made': "Fait avec ❤️ par l'équipe Erudi",

    // ── HomePage — Hero ──────────────────────────────────────────────────────
    'home.hero.badge': "Cabinet de conseil IA spécialisé · TPE, PME, ETI",
    'home.hero.headline1': "L'IA selon",
    'home.hero.headline2': 'vos règles.',
    'home.hero.subtitle':
      "Erudi conçoit, développe et opère des solutions IA sur mesure pour les TPE, PME et ETI. Nous gérons l'infrastructure, la maintenance et la R&D — vous obtenez une solution en production en 2 à 6 semaines.",
    'home.hero.cta.expert': 'Réserver un appel de cadrage gratuit',
    'home.hero.cta.note': '30 min · Sans engagement · On cadre votre projet IA',
    'home.hero.cta.secondary': 'ou voir comment on travaille',
    'home.hero.cta.desktop': 'Obtenir Desktop gratuitement',

    // ── HomePage — Logo bar ──────────────────────────────────────────────────
    'home.logobar.label': "Reconnus par des équipes de leaders industriels",

    // ── HomePage — Two products ──────────────────────────────────────────────
    'home.split.eyebrow': 'Deux produits, une mission',
    'home.split.heading': 'Lequel est fait pour vous ?',

    'home.split.b2b.badge': 'Entreprise',
    'home.split.b2b.title': 'Solutions Entreprise',
    'home.split.b2b.desc':
      "Nous concevons, industrialisons et déployons des IA adaptées à vos données, vos processus et votre expertise métier. Infrastructure souveraine, intégration complète dans votre stack existant et accompagnement expert de l'audit à la production.",
    'home.split.b2b.feat.0': 'Modèles entraînés sur vos données',
    'home.split.b2b.feat.1': 'Déploiement on-premise ou cloud privé',
    'home.split.b2b.feat.2': 'Conforme RGPD par conception',
    'home.split.b2b.feat.3': 'Intégration complète dans votre stack (SAP, Salesforce…)',
    'home.split.b2b.cta': 'Parler à un expert',

    'home.split.desktop.badge': 'Gratuit · Open Source',
    'home.split.desktop.title': 'Erudi Desktop',
    'home.split.desktop.desc':
      'Faites tourner des LLM puissants entièrement sur votre propre machine. Sans abonnement, sans données envoyées dans le cloud, sans code requis. Glissez-déposez vos documents, affinez un modèle et possédez votre IA complètement.',
    'home.split.desktop.feat.0': '100 % local, vos données ne quittent jamais votre machine',
    'home.split.desktop.feat.1': 'Fine-tuning sans code en un clic',
    'home.split.desktop.feat.2': 'Gratuit pour toujours, entièrement open source',
    'home.split.desktop.feat.3': 'Compatible Mac, Windows et Linux',
    'home.split.desktop.cta': 'Découvrir Erudi Desktop',

    // ── HomePage — Problem ───────────────────────────────────────────────────
    'home.problem.eyebrow': 'Le problème',
    'home.problem.heading': "L'IA générique ne suffit plus.",
    'home.problem.p1':
      "Vos équipes passent des heures à reformuler des prompts, corriger des hallucinations, adapter des réponses génériques à votre contexte métier. ChatGPT, Copilot et leurs semblables sont conçus pour tout le monde — pas pour votre expertise.",
    'home.problem.p2':
      "Résultat : des gains de productivité marginaux, une adoption qui stagne et un fossé grandissant entre la promesse de l'IA et la réalité sur le terrain.",

    'home.pain.0.title': 'Prompting sans fin',
    'home.pain.0.desc': 'Des heures perdues à reformuler pour obtenir une réponse utilisable',
    'home.pain.1.title': 'Données non souveraines',
    'home.pain.1.desc': 'Vos données métier transitent par des serveurs tiers sans garanties',
    'home.pain.2.title': 'Hallucinations récurrentes',
    'home.pain.2.desc': 'Des réponses plausibles mais fausses, impossibles à détecter sans expertise',

    // ── HomePage — Solution ──────────────────────────────────────────────────
    'home.solution.eyebrow': 'La solution',
    'home.solution.heading': 'Une IA qui épouse votre savoir-faire.',
    'home.solution.sub':
      "Erudi conçoit des solutions IA ancrées dans votre réalité métier — pas des gadgets généralistes prêts à l'emploi.",

    'home.sol.0.title': 'Sur mesure',
    'home.sol.0.desc':
      'Chaque solution est construite autour de vos données, vos processus et votre vocabulaire métier. Pas de modèles préfabriqués, pas de compromis.',
    'home.sol.1.title': 'Souveraine & sécurisée',
    'home.sol.1.desc':
      'Déploiement on-premise ou cloud privé. Vos données restent chez vous, sous votre contrôle total. Conforme RGPD par conception.',
    'home.sol.2.title': 'Performante',
    'home.sol.2.desc':
      "Des modèles optimisés pour votre cas d'usage, pas des mastodontes généralistes. Des réponses précises, une latence minimale, des coûts maîtrisés.",
    'home.sol.3.title': 'Industrialisée',
    'home.sol.3.desc':
      "Du proof of concept au déploiement en production. Monitoring, maintenance et évolution continue inclus.",

    // ── HomePage — Final CTA ─────────────────────────────────────────────────
    'home.cta.heading': 'Votre IA sur mesure en 2 à 6 semaines.',
    'home.cta.sub':
      "Construite autour de vos données et processus. Hébergée, maintenue et mise à jour en continu par Erudi. Forfait mensuel tout inclus — sans surprise, sans complexité à internaliser.",
    'home.cta.expert': 'Réserver un appel de cadrage gratuit',
    'home.cta.note': '30 min · Sans engagement · On cadre votre projet IA',
    'home.cta.desktop': 'Obtenir Desktop gratuitement',

    // ── HomePage — Chat scenarios ────────────────────────────────────────────
    'home.chat.0.user': 'Nous perdons 3h/jour à reformuler des prompts pour nos rapports d\'audit.',
    'home.chat.0.ai':
      "Nous allons construire un modèle spécialisé entraîné sur votre méthodologie d'audit. Il génère des rapports dans votre format, avec votre terminologie — zéro prompt engineering nécessaire.",
    'home.chat.1.user': "Les données de nos clients ne peuvent pas quitter notre infrastructure.",
    'home.chat.1.ai':
      'Toutes les solutions Erudi se déploient on-premise ou sur votre cloud privé. Vos données ne quittent jamais votre environnement. Conforme RGPD par conception.',
    'home.chat.2.user': 'Comment intégrer l\'IA dans notre workflow SAP existant ?',
    'home.chat.2.ai':
      'Nous nous branchons directement sur votre stack existant — SAP, Salesforce, ERP personnalisés. Nos solutions sont conçues pour s\'adapter à vos processus, pas l\'inverse.',
    'home.chat.3.user': 'Nous avons besoin d\'une IA qui parle notre terminologie métier.',
    'home.chat.3.ai':
      'Chaque modèle que nous livrons est entraîné sur votre vocabulaire de domaine et validé par vos experts. Pas de réponses génériques — uniquement des réponses conformes à vos standards.',
    'home.chat.footer': 'Posez n\'importe quelle question sur votre activité...',

    // ── HomePage — strings page courante ────────────────────────────────────
    'home.hero.h1.main': "L'IA est plus efficace quand elle connaît votre métier.",
    'home.hero.h1.em': 'On la construit pour vous.',
    'home.hero.sub': 'IA sur mesure, opérée de bout en bout. En production en 2 à 6 semaines.',
    'home.hero.cta': 'Réserver un appel',
    'home.hero.see': 'ou voir comment on travaille',

    'home.logobar.trusted': 'Ils nous font confiance',

    'home.chat.h2.main': 'Une IA qui connaît',
    'home.chat.h2.em': 'votre métier',
    'home.chat.desc': 'Pas un chatbot généraliste. Un assistant formé sur vos processus, vos données et vos règles.',
    'home.chat.footertext': 'Votre assistant IA, fait pour votre équipe',

    'home.scenario.0.user': 'Que dit notre politique de remboursement pour les commandes de plus de 30 jours ?',
    'home.scenario.0.ai': "Les demandes au-delà de 30 jours sont traitées au cas par cas. Vous pouvez proposer un avoir ou transmettre au responsable de compte. Aucun remboursement automatique ne s'applique au-delà de ce délai. Source : politique commerciale, section 3.",
    'home.scenario.1.user': 'Je viens de déposer 8 contrats clients dans le dossier partagé.',
    'home.scenario.1.ai': "Tous lus. Extraction effectuée : nom client, date de début, préavis et clause de renouvellement pour chacun. Un contrat n'a pas de clause de résiliation — signalé. Tableau récapitulatif disponible dans votre drive.",
    'home.scenario.2.user': 'Un nouveau prospect vient de remplir notre formulaire. Prends en charge.',
    'home.scenario.2.ai': "Contact créé dans votre CRM. Email d'introduction envoyé. Tâche de relance assignée dans 3 jours. Lead tagué entrant et ajouté à votre pipeline actif.",
    'home.scenario.3.user': "J'ai un appel avec Sophie du Groupe Bertrand dans 5 minutes.",
    'home.scenario.3.ai': "Dernier contact il y a 2 semaines, une question sur leur calendrier d'onboarding. On attend toujours leur avenant signé. Elle a mentionné une revue budgétaire en T3 — bon moment pour en parler.",

    'home.pillars.heading.main': 'Trois engagements.',
    'home.pillars.heading.em': 'Indissociables',
    'home.pillars.0.title.main': 'Conçu pour',
    'home.pillars.0.title.em': 'votre métier',
    'home.pillars.0.body': "Chaque projet part de vos vrais processus, vos données et vos outils existants. L'IA s'adapte à votre métier, jamais l'inverse.",
    'home.pillars.1.title.main': 'Opéré',
    'home.pillars.1.title.em': 'de bout en bout',
    'home.pillars.1.body': "On l'héberge, on le maintient, on le supporte. Vous payez pour une solution qui fonctionne, pas pour du code à reprendre en main.",
    'home.pillars.2.title.main': 'Toujours',
    'home.pillars.2.title.em': 'à la pointe',
    'home.pillars.2.body': "Une équipe R&D dédiée fait évoluer votre système au rythme du secteur. Votre solution s'améliore dans le temps.",

    'home.situations.heading': 'Vous vous reconnaissez ?',
    'home.situations.sub': "Cliquez sur une situation pour voir ce qu'on construit.",
    'home.situations.0.problem': "Votre équipe passe des heures à fouiller emails, fichiers et outils pour répondre à des questions qui devraient prendre quelques secondes.",
    'home.situations.0.solution': "Un assistant conversationnel formé sur vos données et vos processus. Il répond comme un collègue qui a tout lu.",
    'home.situations.0.tag': 'Assistant',
    'home.situations.1.problem': "Vous recevez des centaines de contrats, rapports ou formulaires. Quelqu'un doit tout lire. Ce quelqu'un, c'est une personne.",
    'home.situations.1.solution': "Une IA qui lit, extrait et structure vos documents automatiquement. Fini le traitement manuel.",
    'home.situations.1.tag': 'Analyse docs',
    'home.situations.2.problem': "Des années de savoir interne, mais personne ne trouve rien. Chaque recherche renvoie dix résultats et zéro réponse.",
    'home.situations.2.solution': "Un moteur de recherche construit sur votre base interne. Il répond en langage clair et cite exactement où il a trouvé l'information.",
    'home.situations.2.tag': 'Recherche / RAG',
    'home.situations.3.problem': "Votre équipe utilise cinq outils différents qui ne se parlent jamais. Copier des données entre eux, c'est un travail à plein temps.",
    'home.situations.3.solution': "Un agent qui connecte votre CRM, ERP, emails et bases de données — et agit sur instruction entre eux.",
    'home.situations.3.tag': 'Agent connecté',
    'home.situations.4.problem': "Chaque semaine, la même tâche. Mêmes étapes. Trois heures minimum. Personne ne la remet en question parce qu'on a toujours fait comme ça.",
    'home.situations.4.solution': "On automatise le processus de bout en bout, avec une étape de validation humaine là où le jugement compte vraiment.",
    'home.situations.4.tag': 'Workflow',
    'home.situations.5.problem': "Rédiger des propositions, qualifier des leads, résumer des réunions. Votre équipe le fait, mais ça prend la majeure partie de leur journée.",
    'home.situations.5.solution': "Une interface qui fait le gros du travail. Votre équipe relit et valide. Le temps de traitement est divisé par deux.",
    'home.situations.5.tag': 'Accélération',
    'home.situations.cta.open': 'Ça vous parle ? Réservez un appel',
    'home.situations.cta.closed': 'Voir la solution',

    'home.cta.h2': 'Prêts à en parler ?',
    'home.cta.body': 'Dites-nous ce dont vous avez besoin. On vous dit ce qui est possible.',
    'home.cta.btn': 'Réserver un appel',

    // ── LandingPage (Desktop) ────────────────────────────────────────────────
    'desktop.hero.badge': "Plateforme d'entraînement IA révolutionnaire",
    'desktop.hero.h1': 'Transformez vos données en',
    'desktop.hero.h1.accent': 'LLM personnalisé',
    'desktop.hero.h2': 'Local. Sans code. Rapide.',
    'desktop.hero.subtitle':
      'Glissez-déposez vos documents, choisissez votre modèle, et laissez Erudi faire le reste.',
    'desktop.hero.subtitle.bold': 'Aucun code requis.',
    'desktop.hero.download': 'Télécharger gratuitement',
    'desktop.hero.note': 'Mac & Windows · Sans carte bancaire · Gratuit à vie',

    'desktop.feat.0.label': 'Traitement local',
    'desktop.feat.0.title': 'Confidentialité totale',
    'desktop.feat.0.desc': 'Vos données ne quittent jamais votre machine, entraînez des modèles en toute confiance',
    'desktop.feat.1.label': 'Comparaison de modèles',
    'desktop.feat.1.title': 'Arène intégrée',
    'desktop.feat.1.desc': 'Comparez les modèles de base et affinés côte à côte avec une évaluation interactive',
    'desktop.feat.2.label': 'Traitement automatique',
    'desktop.feat.2.title': 'Pipeline intelligent',
    'desktop.feat.2.desc': 'Nettoyage, normalisation et enrichissement automatisés, des données brutes au prêt-à-entraîner',
    'desktop.feat.3.label': 'Entraînement sans code',
    'desktop.feat.3.title': 'Entraînement accéléré',
    'desktop.feat.3.desc': 'Fine-tuning en un clic optimisé pour votre matériel, sans CLI ni code',

    'desktop.cta.heading': 'Prêt à transformer vos données ?',
    'desktop.cta.sub':
      "Rejoignez des milliers de développeurs qui entraînent déjà des modèles personnalisés localement avec Erudi. Pas de dépendance cloud, pas de problème de confidentialité, aucun code requis.",
    'desktop.cta.download': 'Télécharger →',
    'desktop.cta.community': 'Rejoignez une',
    'desktop.cta.community.accent': 'communauté early access',
    'desktop.cta.community.suffix': "d'enthousiastes de l'IA",
    'desktop.cta.whatyouget': 'Ce que vous obtenez :',
    'desktop.cta.get.0': 'Gratuit pour démarrer',
    'desktop.cta.get.1': 'Sans carte bancaire',
    'desktop.cta.get.2': 'Compatible Mac, Windows et Linux',
    'desktop.cta.get.3': 'Confidentialité et sécurité complètes',

    'desktop.democratize.heading': "Démocratiser l'entraînement IA",
    'desktop.democratize.p0':
      "L'affinage traditionnel de l'IA nécessite des connaissances techniques poussées, des ressources cloud coûteuses et compromet souvent la confidentialité de vos données.",
    'desktop.democratize.p1': 'Erudi change tout.',
    'desktop.democratize.p2':
      "Notre plateforme apporte des capacités d'entraînement IA de niveau enterprise directement sur votre bureau, avec une interface glisser-déposer intuitive que tout le monde peut utiliser.",
    'desktop.democratize.p3':
      "Entraînez des modèles localement, sécurisez vos données et obtenez des résultats professionnels sans la complexité ou le coût des solutions traditionnelles.",
    'desktop.democratize.download': 'Télécharger',

    'desktop.why.heading': 'Pourquoi choisir Erudi ?',
    'desktop.why.sub': "Conçu pour le praticien IA moderne qui valorise la confidentialité, la simplicité et la performance",
    'desktop.why.0.title': 'Traitement local',
    'desktop.why.0.desc': "Entraînez des modèles directement sur votre matériel avec l'accélération GPU",
    'desktop.why.1.title': 'Confidentialité des données',
    'desktop.why.1.desc': 'Vos données ne quittent jamais votre machine - confidentialité totale garantie',
    'desktop.why.2.title': 'Interface sans code',
    'desktop.why.2.desc': 'Glissez, déposez et entraînez - sans ligne de commande ni code',
    'desktop.why.3.title': 'Comparaison de modèles',
    'desktop.why.3.desc': 'Arène intégrée pour comparer et évaluer différentes versions de modèles',

    'desktop.models.heading': 'Modèles',
    'desktop.models.heading.accent': 'supportés',
    'desktop.models.sub': "Affinez les derniers modèles et intégrez-les avec Hugging Face",
    'desktop.models.hf.title': 'Intégration Hugging Face',
    'desktop.models.hf.p1.label': 'Publication en un clic :',
    'desktop.models.hf.p1.text': 'Déployez des modèles directement sur Hugging Face',
    'desktop.models.hf.p2.label': 'Accès communauté :',
    'desktop.models.hf.p2.text': "Utilisez n'importe quel modèle communautaire comme point de départ",
    'desktop.models.hf.p3.label': 'Partage de modèles :',
    'desktop.models.hf.p3.text': 'Partagez vos modèles affinés à l\'échelle mondiale',

    'desktop.models.0.name': 'Mistral-7B',
    'desktop.models.0.badge': 'Fondation',
    'desktop.models.0.desc': 'Modèle Mistral 7B de base pour les tâches de fine-tuning général avec d\'excellentes performances',
    'desktop.models.0.params': '7 milliards de paramètres',
    'desktop.models.1.name': 'Mistral-Nemo-12B',
    'desktop.models.1.badge': 'Avancé',
    'desktop.models.1.desc': "Modèle de Mistral et NVIDIA avec un raisonnement amélioré et des capacités de contexte étendu",
    'desktop.models.1.params': '12 milliards de paramètres',
    'desktop.models.2.name': 'Variantes Mistral-7B',
    'desktop.models.2.badge': 'Communauté',
    'desktop.models.2.desc': 'Des centaines de modèles Mistral-7B affinés par la communauté sur Hugging Face',
    'desktop.models.2.params': 'Spécialisations variées',
    'desktop.models.3.name': 'Gemma 1B',
    'desktop.models.3.badge': 'Ultra-léger',
    'desktop.models.3.desc': "Le modèle le plus efficace de Google, parfait pour les appareils embarqués et le déploiement mobile",
    'desktop.models.3.params': '1 milliard de paramètres',
    'desktop.models.4.name': 'Gemma 2B',
    'desktop.models.4.badge': 'Léger',
    'desktop.models.4.desc': "Modèle efficace de Google pour les environnements à ressources limitées",
    'desktop.models.4.params': '2 milliards de paramètres',
    'desktop.models.5.name': 'Gemma 4B',
    'desktop.models.5.badge': 'Équilibré',
    'desktop.models.5.desc': "Modèle polyvalent de Google offrant un excellent rapport performance/ressources",
    'desktop.models.5.params': '4 milliards de paramètres',
    'desktop.models.6.name': 'Gemma 7B',
    'desktop.models.6.badge': 'Haute performance',
    'desktop.models.6.desc': "Modèle puissant de Google avec des capacités de raisonnement avancées",
    'desktop.models.6.params': '7 milliards de paramètres',
    'desktop.models.7.name': 'Gemma 12B',
    'desktop.models.7.badge': 'Enterprise',
    'desktop.models.7.desc': "Le plus grand SLM de Google avec des performances supérieures pour les tâches complexes",
    'desktop.models.7.params': '12 milliards de paramètres',
    'desktop.models.8.name': 'Bientôt disponible',
    'desktop.models.8.badge': '',
    'desktop.models.8.desc': "Nous développons activement le support pour davantage de modèles afin de vous offrir un maximum de choix",
    'desktop.models.8.params': 'Restez à l\'écoute',

    'desktop.sysreq.heading': 'Configuration requise',
    'desktop.sysreq.sub': "Optimisé pour le matériel moderne avec accélération GPU",
    'desktop.sysreq.win.title': 'Configuration Windows',
    'desktop.sysreq.win.0': 'GPU NVIDIA avec ≥8 Go VRAM (CUDA 12.x)',
    'desktop.sysreq.win.1': 'Windows 10+',
    'desktop.sysreq.win.2': '8 Go de RAM recommandés',
    'desktop.sysreq.win.3': 'Espace disque : ~15 Go pour les poids de modèle et le cache',
    'desktop.sysreq.mac.title': 'Configuration Mac',
    'desktop.sysreq.mac.0': 'Apple Silicon (M1/M2/M3/M4)',
    'desktop.sysreq.mac.1': '8 Go de RAM recommandés',
    'desktop.sysreq.mac.2': 'Espace disque : ~10 Go pour les poids de modèle et le cache',
    'desktop.sysreq.ready.heading': 'Prêt à démarrer ?',
    'desktop.sysreq.ready.sub': 'Téléchargez Erudi Desktop et commencez à affiner votre premier modèle dès aujourd\'hui.',
    'desktop.sysreq.ready.cta': 'Télécharger',

    // ── ChatSimulation — default scenarios ───────────────────────────────────
    'chat.default.0.user': 'Aidez-moi à entraîner un modèle sur mes emails de support client',
    'chat.default.0.ai':
      "Je vais vous aider à créer une IA de support personnalisée ! D'abord, laissez-moi analyser vos données d'email et les nettoyer automatiquement. Ensuite nous allons affiner un modèle qui comprend le style de support de votre entreprise et les problèmes courants.",
    'chat.default.1.user': 'Pouvez-vous analyser mes transcriptions d\'appels commerciaux ?',
    'chat.default.1.ai':
      "Absolument ! Je vais traiter vos transcriptions, extraire les insights clés et entraîner un modèle capable d'identifier les patterns de vente réussis, les objections courantes et les techniques de clôture spécifiques à votre activité.",
    'chat.default.2.user': 'Je veux créer un assistant de code pour mon équipe',
    'chat.default.2.ai':
      "Parfait ! Déposez votre codebase et votre documentation. Je vais entraîner une IA spécialisée qui comprend vos patterns de code, votre architecture et peut aider votre équipe à écrire du code qui respecte vos conventions et bonnes pratiques spécifiques.",
    'chat.default.3.user': "Entraîner une IA sur la base de connaissances de mon entreprise",
    'chat.default.3.ai':
      "Excellente idée ! Je vais ingérer votre base de connaissances, créer des embeddings et affiner un modèle capable de répondre aux questions sur les processus, politiques et procédures de votre entreprise avec précision et contexte.",
    'chat.header': 'Assistant IA Erudi',
    'chat.simulated': 'Chat simulé',
    'chat.footer.default': 'Essayez Erudi pour vivre cette interaction IA...',

    // ── ContactPage ──────────────────────────────────────────────────────────
    'contact.badge': 'Nous sommes là pour vous aider',
    'contact.heading1': 'Contactez',
    'contact.heading2': '-nous',
    'contact.sub': 'Des questions sur Erudi ? Besoin de conseils techniques ?',
    'contact.sub.bold': 'Nous serions ravis d\'avoir de vos nouvelles.',

    'contact.reason.0.title': 'Information générale',
    'contact.reason.0.desc': 'Questions sur Erudi et son fonctionnement',
    'contact.reason.1.title': 'Demande commerciale',
    'contact.reason.1.desc': 'Opportunités de partenariat et solutions entreprise',
    'contact.reason.2.title': 'Support & Conseils',
    'contact.reason.2.desc': 'Aide technique et orientation',
    'contact.reason.click': 'Cliquer pour sélectionner →',

    'contact.form.name': 'Nom *',
    'contact.form.name.placeholder': 'Votre nom',
    'contact.form.email': 'Email *',
    'contact.form.email.placeholder': 'votre@email.com',
    'contact.form.company': 'Entreprise',
    'contact.form.company.placeholder': 'Votre entreprise (optionnel)',
    'contact.form.reason': 'Comment pouvons-nous vous aider ? *',
    'contact.form.reason.placeholder': 'Sélectionner une raison',
    'contact.form.reason.general': 'Information générale',
    'contact.form.reason.business': 'Demande commerciale',
    'contact.form.reason.support': 'Support & Conseils',
    'contact.form.message': 'Message *',
    'contact.form.message.placeholder':
      'Dites-nous en plus sur vos besoins, questions ou comment nous pouvons vous aider...',
    'contact.form.send': 'Envoyer le message',
    'contact.form.sending': 'Envoi en cours...',
    'contact.form.error':
      "Échec de l'envoi du message. Veuillez réessayer ou nous envoyer un email directement.",

    'contact.success.heading': 'Message envoyé !',
    'contact.success.sub': 'Merci de nous avoir contactés. Nous vous répondrons sous 24 heures.',
    'contact.success.again': 'Envoyer un autre message →',

    'contact.email.label': 'Vous préférez l\'email ? Contactez-nous directement à',

    // ── TeamPage ─────────────────────────────────────────────────────────────
    'team.hero.h1.1': "À propos de",
    'team.hero.h1.2': "l'équipe",
    'team.hero.sub.1': "Une équipe d'ingénieurs unie par une vision commune : rendre",
    'team.hero.sub.accent': "l'IA accessible à tous",
    'team.hero.sub.2': '.',

    'team.leadership.eyebrow': "ÉQUIPE DIRIGEANTE",
    'team.leadership.heading': 'Rencontrez les visionnaires',
    'team.leadership.sub': "Une équipe d'ingénieurs qui construisent l'avenir de l'accessibilité IA",

    'team.linkedin': 'Voir LinkedIn',

    'team.member.0.bio': "Dirige l'équipe et porte la vision produit.",
    'team.member.0.skill.0': 'Stratégie produit',
    'team.member.0.skill.1': 'Recherche IA',
    'team.member.1.bio': "Développe et optimise les tâches d'apprentissage automatique.",
    'team.member.1.skill.0': 'Apprentissage profond',
    'team.member.1.skill.1': 'Optimisation de modèles',
    'team.member.2.bio': "Pilote la stratégie commerciale et les opérations.",
    'team.member.2.skill.0': 'Stratégie commerciale',
    'team.member.2.skill.1': 'Ventes',
    'team.member.3.bio': "Implémente les interfaces utilisateur et intègre les API.",
    'team.member.3.skill.0': 'React',
    'team.member.3.skill.1': 'Node.js',
    'team.member.3.skill.2': 'Architecture système',
    'team.member.4.bio': "Conçoit et maintient les pipelines de nettoyage de données.",
    'team.member.4.skill.0': 'Traitement de données',
    'team.member.4.skill.1': 'Architecture pipeline',
    'team.member.5.bio': "Travaille sur les ressources de calcul et l'optimisation.",
    'team.member.5.skill.0': 'Infrastructure',
    'team.member.5.skill.1': 'Optimisation système',

    'team.dna.eyebrow': 'ADN DE L\'ENTREPRISE',
    'team.dna.heading': "Construire l'avenir de l'IA, ensemble",
    'team.dna.sub':
      "Nous sommes six ingénieurs passionnés par l'accessibilité de la technologie IA. Unis par notre vision commune de démocratiser l'entraînement IA puissant pour tous.",
    'team.dna.quote':
      '"Nous croyons que l\'avenir de l\'IA doit être accessible, sécurisé et valorisant pour tous. Notre mission est de lever les barrières entre la technologie IA de pointe et les personnes qui en ont le plus besoin."',
    'team.dna.attribution': "— L'équipe Erudi",

    // ── DownloadPage ─────────────────────────────────────────────────────────
    'download.badge': 'Accès anticipé bêta',
    'download.heading1': 'Télécharger',
    'download.heading2': 'Erudi',
    'download.sub': 'Commencez à entraîner des modèles personnalisés localement.',
    'download.sub.bold': 'Vos retours façonnent le futur.',

    'download.beta.title': 'Version bêta disponible',
    'download.beta.desc':
      "Cette version bêta vous donne un accès anticipé aux fonctionnalités principales d'Erudi pendant que nous continuons à affiner et améliorer l'expérience. Vos retours nous sont précieux.",

    'download.mac.title': 'Télécharger pour Mac',
    'download.mac.desc': 'Compatible avec les puces M, versions antérieures bientôt disponibles.',
    'download.mac.file': 'erudi-Installer.dmg',

    'download.windows.title': 'Rejoindre la liste d\'attente Windows',
    'download.windows.desc': 'Soyez notifié quand la version Windows est disponible',
    'download.windows.badge': "Rejoindre la liste d'attente",

    'download.help.heading': 'Besoin d\'aide pour démarrer ?',
    'download.help.sub':
      "Consultez notre documentation ou contactez notre équipe si vous avez besoin d'aide pour l'installation ou avez des questions sur la version bêta.",
    'download.help.learn': 'En savoir plus',
    'download.help.contact': 'Contacter le support',

    // ── WaitlistPage ─────────────────────────────────────────────────────────
    'waitlist.heading': "Rejoindre la liste d'attente",
    'waitlist.sub':
      'Soyez parmi les premiers à savoir quand Erudi est lancé et obtenez un accès anticipé pour transformer vos données en LLM personnalisés.',

    'waitlist.form.name': 'Nom complet *',
    'waitlist.form.name.placeholder': 'Votre nom complet',
    'waitlist.form.email': 'Adresse email *',
    'waitlist.form.email.placeholder': 'votre@email.com',
    'waitlist.form.company': 'Entreprise / Organisation',
    'waitlist.form.company.placeholder': 'Votre entreprise (optionnel)',
    'waitlist.form.useCase': 'Comment utiliseriez-vous Erudi ?',
    'waitlist.form.useCase.placeholder': 'Décrivez votre cas d\'utilisation (optionnel)',
    'waitlist.form.submit': "Rejoindre la liste d'attente",
    'waitlist.form.submitting': 'Inscription...',
    'waitlist.form.error': "Une erreur s'est produite. Veuillez réessayer.",
    'waitlist.back': 'Retour à l\'accueil',

    'waitlist.success.heading': 'Vous êtes sur la liste !',
    'waitlist.success.sub':
      "Nous vous notifierons dès qu'Erudi sera prêt. Préparez-vous à transformer vos données en modèles IA puissants !",
    'waitlist.success.back': 'Retour à l\'accueil',
  },
};
