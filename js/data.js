/* ============================================================
   data.js — Portfolio Data Layer (localStorage-based)
   ============================================================ */

const DEFAULT_DATA = {
  profile: {
    name: "Abir Akanda",
    title: "CIS Student & Web Developer",
    bio: "A passionate Computer and Information Systems (CIS) student at Daffodil International University, combining academic excellence with entrepreneurial spirit. As a skilled web developer and export-import business owner with a valid trade license, I bring a unique blend of technical knowledge and real-world business experience to every project I undertake.",
    email: "251-16-004@diu.edu.bd",
    phone: "+880 1403313770",
    location: "Dhaka, Bangladesh",
    avatar: "",
    cvUrl: ""
  },
  education: [
    {
      id: "edu1",
      degree: "B.Sc. in Computer Science & Information Systems (CIS)",
      institution: "Daffodil International University",
      location: "Birulia, Savar, Dhaka",
      duration: "2021 – Present",
      grade: "Running",
      description: "Studying core subjects including programming, data structures, algorithms, databases, networking, web development, and software engineering."
    },
    {
      id: "edu2",
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Daffodil International University",
      location: "Dhaka, Bangladesh",
      duration: "2025 – 2028",
      grade: "GPA: X.XX",
      description: "Science group with focus on mathematics, physics, and chemistry."
    }
  ],
  skills: [
    { id: "sk1", name: "HTML & CSS",   level: 92, category: "Frontend"    },
    { id: "sk2", name: "JavaScript",   level: 82, category: "Frontend"    },
    { id: "sk3", name: "React.js",     level: 72, category: "Frontend"    },
    { id: "sk4", name: "PHP",          level: 65, category: "Backend"     },
    { id: "sk5", name: "MySQL",        level: 70, category: "Database"    },
    { id: "sk6", name: "Python",       level: 60, category: "Programming" },
    { id: "sk7", name: "Node.js",      level: 58, category: "Backend"     },
    { id: "sk8", name: "Git & GitHub", level: 78, category: "Tools"       }
  ],
  technologies: [
    "HTML5","CSS3","JavaScript","React","PHP","MySQL","Python",
    "Node.js","Git","GitHub","VS Code","Figma","Bootstrap","jQuery","WordPress"
  ],
  projects: [
    {
      id: "proj1",
      title: "Personal Portfolio Website",
      category: "Web Development",
      description: "A fully responsive portfolio website with an integrated admin panel, built with pure HTML, CSS, and JavaScript. Features dynamic content management powered by localStorage.",
      image: "",
      tags: ["HTML","CSS","JavaScript"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: "proj2",
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A full-stack e-commerce solution with product management, a shopping cart system, user authentication, and payment gateway integration.",
      image: "",
      tags: ["PHP","MySQL","JavaScript"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: "proj3",
      title: "Business Management System",
      category: "Business",
      description: "An inventory and trade management system designed for export-import operations. Tracks shipments, invoices, and client relationships.",
      image: "",
      tags: ["PHP","MySQL","Bootstrap"],
      demoUrl: "#",
      codeUrl: "#"
    }
  ],
  business: {
    name: "Akanda Global Trade",
    type: "Export & Import",
    license: "Trade License No: XXXXXXXX",
    description: "We specialize in the export and import of premium-quality goods, building strong international trade relationships. Our business combines modern technology with traditional commerce to deliver exceptional value to clients worldwide.",
    services: [
      "Product Export to International Markets",
      "Import of Premium Quality Goods",
      "Trade Consultation & Advisory",
      "Market Research & Analysis",
      "Supply Chain Management",
      "International Business Development"
    ],
    established: "2023",
    countries: "5+"
  },
  experience: [
    {
      id: "exp1",
      title: "Freelance Web Developer",
      company: "Self-Employed",
      duration: "2022 – Present",
      description: "Designing and developing responsive websites and web applications for clients across various industries. Specializing in modern UI/UX and full-stack development."
    },
    {
      id: "exp2",
      title: "Export-Import Business Owner",
      company: "Akanda Global Trade",
      duration: "2026 – Present",
      description: "Managing export-import operations with a valid trade license. Building international business relationships, managing supply chains, and overseeing all trade activities."
    }
  ],
  achievements: [
    { id: "ach1", title: "Trade License Certificate", year: "2023", description: "Successfully obtained an official trade license to operate an export-import business in Bangladesh." },
    { id: "ach2", title: "Web Development Certification", year: "2022", description: "Completed a comprehensive full-stack web development program covering modern technologies and frameworks." },
    { id: "ach3", title: "University Merit Recognition", year: "2023", description: "Received recognition for academic performance in the Computer Science & Information Systems program at DIU." }
  ],
  gallery: [],
  social: {
    facebook:  "",
    linkedin:  "",
    github:    "",
    twitter:   "",
    instagram: "",
    youtube:   ""
  },
  messages: [],
  adminPassword: btoa("Abir00@kotha")
};

/* ---- Core DB Object ---- */
const DB = {
  _key: "portfolio_v1_data",

  get() {
    try {
      const raw = localStorage.getItem(this._key);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
      const stored = JSON.parse(raw);
      return this._merge(stored);
    } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
  },

  _merge(stored) {
    const d = JSON.parse(JSON.stringify(DEFAULT_DATA));
    Object.assign(d, stored);
    d.profile   = Object.assign({}, d.profile,   stored.profile   || {});
    d.business  = Object.assign({}, d.business,  stored.business  || {});
    d.social    = Object.assign({}, d.social,     stored.social    || {});
    return d;
  },

  update(section, value) {
    const d = this.get();
    d[section] = value;
    this.save(d);
  },

  addMessage(msg) {
    const d = this.get();
    msg.id   = "msg_" + Date.now();
    msg.date = new Date().toISOString();
    msg.read = false;
    if (!Array.isArray(d.messages)) d.messages = [];
    d.messages.unshift(msg);
    this.save(d);
  },

  /* ---- Auth ---- */
  isLoggedIn() { return sessionStorage.getItem("adm_token") === "ok"; },

  login(user, pass) {
    const d          = this.get();
    const codePass   = atob(DEFAULT_DATA.adminPassword);
    const storedPass = d.adminPassword ? atob(d.adminPassword) : codePass;
    const passOk     = (pass === codePass || pass === storedPass);
    if (user === "Abirkotha" && passOk) {
      // sync localStorage so code-level password always wins
      if (pass === codePass) { d.adminPassword = DEFAULT_DATA.adminPassword; this.save(d); }
      sessionStorage.setItem("adm_token", "ok");
      return true;
    }
    return false;
  },

  logout() { sessionStorage.removeItem("adm_token"); },

  changePassword(newPass) {
    const d = this.get();
    d.adminPassword = btoa(newPass);
    this.save(d);
  },

  getImgBBKey() { return localStorage.getItem('portfolio_imgbb_key') || ''; },
  setImgBBKey(key) { localStorage.setItem('portfolio_imgbb_key', key.trim()); },

  /* ---- Firebase Realtime Database sync ---- */
  _fbUrl: 'https://abirakanda-6a044-default-rtdb.firebaseio.com/portfolio.json',

  async fetchRemote() {
    try {
      const res = await fetch(this._fbUrl);
      if (!res.ok) return null;
      const remote = await res.json();
      if (!remote) return null;
      const localRaw = localStorage.getItem(this._key);
      const localTs  = localRaw ? (JSON.parse(localRaw)._lastModified || 0) : 0;
      const remoteTs = remote._lastModified || 0;
      if (remoteTs > localTs) {
        localStorage.setItem(this._key, JSON.stringify(remote));
        return remote;
      }
      return null;
    } catch {}
    return null;
  },

  async pushRemote(data) {
    try {
      await fetch(this._fbUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch {}
  },

  save(data) {
    data._lastModified = Date.now();
    localStorage.setItem(this._key, JSON.stringify(data));
    this.pushRemote(data);
  }
};
