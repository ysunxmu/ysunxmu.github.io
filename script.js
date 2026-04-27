const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav-links]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
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

  data.sections.forEach((section) => {
    const article = createElement("article", "team-section");
    article.appendChild(createElement("span", "meta", section.meta));
    article.appendChild(createElement("h2", "", section.title));

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
      body.appendChild(createElement("h3", "team-name", entry.name));
      body.appendChild(createElement("p", "team-role", entry.role));
      if (entry.note) body.appendChild(createElement("p", "team-note", entry.note));

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

  entries.forEach((entry) => {
    const entryYear = Number.parseInt(entry.year, 10);
    const groupLabel = Number.isFinite(entryYear) && entryYear <= archiveCutoffYear
      ? `Before ${archiveCutoffYear}`
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
      const titleText = isInvited ? `${entry.title} (invited)` : entry.title;

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

renderTeamPage();
renderPublicationsPage();
renderTalksPage();
