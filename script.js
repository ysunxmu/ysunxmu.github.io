const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav-links]");
const languageStorageKey = "sunGroupLanguage";

const translations = {
  home: { en: "Home", zh: "首页" },
  research: { en: "Research", zh: "研究方向" },
  team: { en: "Team", zh: "团队成员" },
  publications: { en: "Publications", zh: "发表论文" },
  talks: { en: "Talks", zh: "学术报告" },
  join: { en: "Join Us", zh: "加入我们" },
  cv: { en: "CV", zh: "个人简历" },
  aboutUs: { en: "About us", zh: "关于我们" },
  homeLead: {
    en: "We develop theoretical methods and algorithms for atomistic simulations of the structure and phase transitions of matter under extreme conditions. These techniques allow us to study problems ranging from the electronic structure and materials properties at the microscopic scale to the formation and evolution of planetary interiors.",
    zh: "我们发展原子尺度理论方法与算法，模拟各类极端条件下的物质结构与相变，研究从微观电子结构和材料物性到行星深部形成与演化的一系列问题。"
  },
  homeJoin: {
    en: "We welcome motivated students and postdocs with backgrounds in physics, chemistry, and materials science to join us at the Department of Physics, <a href=\"https://en.wikipedia.org/wiki/Xiamen_University\" target=\"_blank\" rel=\"noreferrer\">Xiamen University</a>, located on Xiamen Island on the southeastern coast of China.",
    zh: "欢迎有物理、化学和材料科学等背景的优秀学生和博士后加入我们。课题组位于厦门大学物理科学与技术学院。"
  },
  contact: { en: "Contact", zh: "联系方式" },
  visitTotal: { en: "Total visits", zh: "总访问量" },
  visitUnit: { en: "", zh: "次" },
  researchIntro: { en: "Our research interests include:", zh: "我们的研究兴趣包括：" },
  researchInterest1: { en: "structure and dynamics of planetary interior", zh: "行星深部的结构与演化" },
  researchInterest2: { en: "kinetics and thermodynamics simulation algorithms", zh: "动力学与热力学模拟算法" },
  researchInterest3: { en: "computational material discovery and design", zh: "材料发现与设计" },
  researchTopic1: {
    en: "<strong>Planetary interior:</strong> Understanding matters under extreme conditions and their impact on the formation and evolution of planetary interior.",
    zh: "<strong>行星深部：</strong>理解极端条件下物质的性质及其对行星深部形成与演化的影响。"
  },
  researchTopic2: {
    en: "<strong>Dynamics simulation:</strong> Developing algorithms for accelerated rare-event sampling and thermodynamic calculations of exotic states.",
    zh: "<strong>模拟算法：</strong>发展用于加速稀有事件采样和新奇物态热力学计算的算法。"
  },
  researchTopic3: {
    en: "<strong>Material discovery:</strong> Computationally searching for stable materials with desired functionality.",
    zh: "<strong>新材料预测：</strong>通过计算模拟寻找具有特定物性的新材料。"
  },
  education: { en: "Education", zh: "教育经历" },
  employment: { en: "Employment", zh: "工作经历" },
  activities: { en: "Professional Activities", zh: "学术服务" },
  cvName: { en: "Yang Sun", zh: "孙阳" },
  cvEducation1: { en: "2007 ~ 2011, B.Sc. Physics, University of Science and Technology of China", zh: "2007 ~ 2011，中国科学技术大学，物理学学士" },
  cvEducation2: { en: "2011 ~ 2016, Ph.D. Physics, University of Science and Technology of China", zh: "2011 ~ 2016，中国科学技术大学，物理学博士" },
  cvEmployment1: { en: "2016 ~ 2019, Postdoc Associate, Ames Laboratory", zh: "2016 ~ 2019，博士后，Ames Laboratory" },
  cvEmployment2: { en: "2019 ~ 2020, Postdoc Scientist, Columbia University", zh: "2019 ~ 2020，博士后，纽约哥伦比亚大学" },
  cvEmployment3: { en: "2021 ~ 2022, Research Scientist, Iowa State University", zh: "2021 ~ 2022，研究员，爱荷华州立大学" },
  cvEmployment4: { en: "2020 ~ 2022, Associate Research Scientist, Columbia University", zh: "2020 ~ 2022，副研究员，纽约哥伦比亚大学" },
  cvEmployment5: { en: "2023 ~ 2024, Associate Professor, Xiamen University", zh: "2023 ~ 2024，副教授，厦门大学" },
  cvEmployment6: { en: "2024 ~ now, Professor of Physics, Xiamen University", zh: "2024 ~ 至今，教授，厦门大学" },
  cvActivity1: { en: "Associate Editor for JGR: Machine Learning and Computation", zh: "JGR: Machine Learning and Computation 副编辑" },
  cvActivity2: { en: "Reviewed articles for Physical Review Letters/Applied/B/E/Materials; Advanced Materials/Functional Materials/Science; ACS journals; Science journals; Nature journals; etc.", zh: "Physical Review Letters/Applied/B/E/Materials、Advanced Materials/Functional Materials/Science、ACS 期刊、Nature 系列和Science 系列等期刊审稿人" }
};

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function getLanguage() {
  try {
    return localStorage.getItem(languageStorageKey) === "zh" ? "zh" : "en";
  } catch {
    return "en";
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    // Switching still works for the current page when storage is unavailable.
  }
}

function getText(key, language = getLanguage()) {
  return translations[key]?.[language] || translations[key]?.en || "";
}

function applyStaticLanguage(language = getLanguage()) {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getText(element.dataset.i18n, language);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = getText(element.dataset.i18nHtml, language);
  });

  const navLabels = {
    "index.html": "home",
    "research.html": "research",
    "team.html": "team",
    "publications.html": "publications",
    "talks.html": "talks",
    "joinus.html": "join",
    "cv.html": "cv"
  };

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const target = link.getAttribute("href");
    if (navLabels[target]) link.textContent = getText(navLabels[target], language);
  });

  document.querySelectorAll("[data-lang-block]").forEach((block) => {
    block.hidden = block.dataset.langBlock !== language;
  });

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.textContent = language === "zh" ? "English" : "中文";
    button.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");
  });
}

function installLanguageToggle() {
  document.querySelectorAll(".brand").forEach((brand) => {
    const existingArea = brand.closest(".brand-area");
    if (existingArea?.querySelector("[data-language-toggle]")) return;

    const button = document.createElement("button");
    button.className = "language-toggle";
    button.type = "button";
    button.dataset.languageToggle = "";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextLanguage = getLanguage() === "zh" ? "en" : "zh";
      saveLanguage(nextLanguage);
      applyStaticLanguage(nextLanguage);
      renderTeamPage();
      renderPublicationsPage();
      renderTalksPage();
    });

    const area = document.createElement("div");
    area.className = "brand-area";
    brand.parentNode.insertBefore(area, brand);
    area.appendChild(brand);
    area.appendChild(button);
  });
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function formatTeamName(name, language = getLanguage()) {
  const match = name.match(/^(.+?)\s*\((.+?)\)$/);
  if (!match) return name;
  return language === "zh" ? match[2] : match[1].trim();
}

const talkMonthPattern = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December)/;

function expandTalkMonth(text) {
  const monthNames = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December"
  };

  return text.replace(new RegExp(`\\s*\\((${talkMonthPattern.source.slice(1, -1)})\\.?\\)`, "g"), (_, month) => `, ${monthNames[month] || month}`);
}

function formatTalkMeta(metaText) {
  const dateEnd = metaText.indexOf(")");
  if (dateEnd !== -1 && new RegExp(`\\(${talkMonthPattern.source.slice(1, -1)}\\.?\\)`).test(metaText)) {
    const locationDate = metaText.slice(0, dateEnd + 1).replace(/,\s*$/, "").trim();
    const conference = metaText.slice(dateEnd + 1).replace(/^,\s*/, "").trim();
    if (conference) return `${conference} | ${expandTalkMonth(locationDate)}`;
  }

  const separatorIndex = metaText.lastIndexOf(", ");
  if (separatorIndex !== -1) {
    const location = metaText.slice(0, separatorIndex).trim();
    const conference = metaText.slice(separatorIndex + 2).trim();
    if (location && conference) return `${conference} | ${expandTalkMonth(location)}`;
  }

  const noComma = metaText.match(/^(.+?)\s+([A-Z\u4e00-\u9fff].+)$/);
  if (noComma) return `${noComma[2]} | ${expandTalkMonth(noComma[1])}`;

  return expandTalkMonth(metaText);
}

function renderTeamPage() {
  const page = document.querySelector("[data-team-page]");
  const data = window.siteData?.team;
  if (!page || !data) return;

  const title = page.querySelector("[data-team-title]");
  const intro = page.querySelector("[data-team-intro]");
  const container = page.querySelector("[data-team-sections]");

  if (title) title.textContent = data.introTitle;
  if (intro) intro.textContent = data.introText;
  if (!container) return;

  container.innerHTML = "";
  const language = getLanguage();

  data.sections.forEach((section) => {
    const article = createElement("article", "team-section");
    article.appendChild(createElement("span", "meta", language === "zh" ? section.metaZh || section.meta : section.meta));
    if (section.title) article.appendChild(createElement("h2", "", section.title));

    const list = createElement("div", "team-list");
    section.entries.forEach((entry) => {
      const item = createElement("div", "team-entry");
      const row = createElement("div", "team-entry-row");

      if (entry.photo) {
        const photoWrap = createElement("div", "team-photo-wrap");
        const photo = document.createElement("img");
        photo.className = "team-photo";
        photo.src = entry.photo;
        photo.alt = `${entry.name} photo`;
        photoWrap.appendChild(photo);
        row.appendChild(photoWrap);
      }

      const body = createElement("div", "team-body");
      body.appendChild(createElement("h3", "team-name", formatTeamName(entry.name, language)));
      body.appendChild(createElement("p", "team-role", language === "zh" ? entry.roleZh || entry.role : entry.role));
      const note = language === "zh" ? entry.noteZh || entry.note : entry.note;
      if (note) body.appendChild(createElement("p", "team-note", note));

      row.appendChild(body);
      item.appendChild(row);
      list.appendChild(item);
    });

    article.appendChild(list);
    container.appendChild(article);
  });
}

function renderPublicationsPage() {
  const page = document.querySelector("[data-publications-page]");
  const data = window.siteData?.publications;
  const entries = window.sitePublications || [];
  if (!page || !data) return;

  const title = page.querySelector("[data-publications-title]");
  const intro = page.querySelector("[data-publications-intro]");
  const container = page.querySelector("[data-publications-list]");

  if (title) title.textContent = data.introTitle;
  if (intro) intro.textContent = data.introText;
  if (!container) return;

  container.innerHTML = "";
  const groups = new Map();
  const archiveCutoffYear = 2016;
  const language = getLanguage();

  entries.forEach((entry) => {
    const entryYear = Number.parseInt(entry.year, 10);
    const groupLabel = Number.isFinite(entryYear) && entryYear <= archiveCutoffYear
      ? (language === "zh" ? `${archiveCutoffYear}年及以前` : `Before ${archiveCutoffYear}`)
      : entry.year;

    if (!groups.has(groupLabel)) groups.set(groupLabel, []);
    groups.get(groupLabel).push(entry);
  });

  groups.forEach((entries, year) => {
    const section = createElement("section", "publication-year-section");
    section.appendChild(createElement("div", "publication-year", year));

    const list = createElement("div", "publication-list");
    entries.forEach((entry) => {
      const item = createElement("article", "publication-item");
      const heading = createElement("h3", "publication-title");
      const preferredLink = entry.links?.find((link) => link.label.toLowerCase() === "link") ||
        entry.links?.find((link) => link.label.toLowerCase() === "arxiv");

      if (preferredLink) {
        const titleLink = document.createElement("a");
        titleLink.href = preferredLink.url;
        titleLink.textContent = entry.title;
        titleLink.target = "_blank";
        titleLink.rel = "noreferrer";
        titleLink.className = "publication-title-link";
        heading.appendChild(titleLink);
      } else {
        heading.textContent = entry.title;
      }
      item.appendChild(heading);

      const metaLine = createElement("p", "publication-meta-line");
      const authors = createElement("span", "publication-authors", entry.authors);
      metaLine.appendChild(authors);
      metaLine.appendChild(document.createTextNode(", "));

      const venue = createElement("span", "publication-venue");
      const em = document.createElement("em");
      em.textContent = entry.venue;
      venue.appendChild(em);
      metaLine.appendChild(venue);
      item.appendChild(metaLine);

      if (entry.note) item.appendChild(createElement("p", "publication-note", entry.note));
      list.appendChild(item);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
}

function renderTalksPage() {
  const page = document.querySelector("[data-talks-page]");
  const entries = window.siteTalks || [];
  if (!page) return;

  const container = page.querySelector("[data-talks-list]");
  if (!container) return;

  container.innerHTML = "";
  const groups = new Map();
  const language = getLanguage();

  entries.forEach((entry) => {
    if (!groups.has(entry.year)) groups.set(entry.year, []);
    groups.get(entry.year).push(entry);
  });

  groups.forEach((yearEntries, year) => {
    const section = createElement("section", "publication-year-section");
    section.appendChild(createElement("div", "publication-year", year));

    const eventGroups = new Map();
    yearEntries.forEach((entry) => {
      const invitedToken = ", invited, ";
      const metaHasInvited = entry.meta.includes(invitedToken);
      const isInvited = Object.prototype.hasOwnProperty.call(entry, "invited")
        ? entry.invited
        : metaHasInvited;
      const metaText = metaHasInvited ? entry.meta.replace(invitedToken, ", ") : entry.meta;
      const titleText = isInvited ? `${entry.title} (${language === "zh" ? "邀请报告" : "invited"})` : entry.title;

      if (!eventGroups.has(metaText)) eventGroups.set(metaText, []);
      eventGroups.get(metaText).push({
        title: titleText,
        link: entry.links?.find((link) => link.label.toLowerCase() === "link") || null
      });
    });

    const list = createElement("div", "talk-event-list");
    eventGroups.forEach((talks, metaText) => {
      const item = createElement("article", "talk-event");
      item.appendChild(createElement("p", "talk-event-meta", formatTalkMeta(metaText)));

      const titles = createElement("div", "talk-event-titles");
      talks.forEach((talk) => {
        const line = createElement("p", "talk-event-title");
        if (talk.link) {
          const anchor = document.createElement("a");
          anchor.href = talk.link.url;
          anchor.textContent = talk.title;
          anchor.target = "_blank";
          anchor.rel = "noreferrer";
          anchor.className = "talk-title-link";
          line.appendChild(anchor);
        } else {
          line.textContent = talk.title;
        }
        titles.appendChild(line);
      });

      item.appendChild(titles);
      list.appendChild(item);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
}

function applyVisitCounterOffset() {
  const counter = document.querySelector("[data-visit-offset]");
  if (!counter) return;

  const offset = Number.parseInt(counter.dataset.visitOffset, 10);
  if (!Number.isFinite(offset)) return;

  const update = () => {
    if (counter.dataset.offsetApplied === "true") return;
    const rawValue = Number.parseInt(counter.textContent.replace(/,/g, ""), 10);
    if (!Number.isFinite(rawValue)) return;
    if (rawValue === offset) return;

    counter.textContent = String(rawValue + offset);
    counter.dataset.offsetApplied = "true";
  };

  update();
  new MutationObserver(update).observe(counter, { childList: true, characterData: true, subtree: true });
}

installLanguageToggle();
applyStaticLanguage();
renderTeamPage();
renderPublicationsPage();
renderTalksPage();
applyVisitCounterOffset();
