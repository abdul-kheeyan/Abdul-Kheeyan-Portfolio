/* ---------- Suggested skills ---------- */
const SUGGESTED_SKILLS = ["HTML","CSS","JavaScript","Node.js","Express","MongoDB","React","Vue","Git","Tailwind","Sass","TypeScript","SQL","REST API","Design"];

/* ---------- DOM ---------- */
// Controls
const nameInput = el('nameInput'), titleInput = el('titleInput');
const photoInput = el('photoInput'), photoPreview = el('photoPreview');
const emailInput = el('emailInput'), phoneInput = el('phoneInput'), locationInput = el('locationInput');
const aboutInput = el('aboutInput');

// Work
const workTitle = el('workTitle'), workCompany = el('workCompany'), workPeriod = el('workPeriod'), workLocation = el('workLocation'), workDesc = el('workDesc'), addWork = el('addWork'), worksControl = el('worksControl');

// Education
const eduDegree = el('eduDegree'), eduInst = el('eduInst'), eduPeriod = el('eduPeriod'), eduLocation = el('eduLocation'), eduDesc = el('eduDesc'), addEdu = el('addEdu'), eduControl = el('eduControl');

// Projects
const projTitle = el('projTitle'), projLink = el('projLink'), projScreenshot = el('projScreenshot'), addProject = el('addProject'), projectsControl = el('projectsControl');

// Skills
const skillsInput = el('skillsInput'), skillSuggestions = el('skillSuggestions'), skillsList = el('skillsList');

// Certs / Lang / Hobby
const certTitle = el('certTitle'), certOrg = el('certOrg'), addCert = el('addCert'), certControl = el('certControl');
const langInput = el('langInput'), addLang = el('addLang'), langControl = el('langControl');
const hobbyInput = el('hobbyInput'), addHobby = el('addHobby'), hobbyControl = el('hobbyControl');

// Top controls & preview
const templateSelect = el('templateSelect'), accentColor = el('accentColor'), fontSelect = el('fontSelect'), themeToggle = el('themeToggle');
const exportPDF = el('exportPDF'), downloadHTML = el('downloadHTML'), importJSON = el('importJSON'), exportJSON = el('exportJSON'), importFile = el('importFile');
const resumeEl = el('resume');
const previewName = el('previewName'), previewTitle = el('previewTitle'), previewPhoto = el('previewPhoto');
const previewEmail = el('previewEmail'), previewPhone = el('previewPhone'), previewLocation = el('previewLocation');
const previewAbout = el('previewAbout'), previewSkills = el('previewSkills'), previewProjects = el('previewProjects'), previewWorks = el('previewWorks'), previewEdu = el('previewEdu'), previewCerts = el('previewCerts'), previewLangs = el('previewLangs'), previewHobbies = el('previewHobbies');

const sectionToggles = document.querySelectorAll('.sectionToggle');

/* ---------- utils ---------- */
function el(id){ return document.getElementById(id); }
function fileToDataURL(file){ return new Promise(res=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(file); }); }
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

/* ---------- state ---------- */
let state = {
  name: 'Your Name',
  title: 'Your Role',
  photoData: '',
  email: '',
  phone: '',
  location: '',
  about: '',
  works: [],
  education: [],
  projects: [],
  skills: [],
  certs: [],
  langs: [],
  hobbies: [],
  template: 'template-modern',
  accent: '#0b84ff',
  font: 'Poppins, sans-serif',
  dark: false,
  visibleSections: { about:true, experience:true, education:true, projects:true, skills:true, certs:true, langs:true }
};

/* ---------- load/save ---------- */
function saveState(){ localStorage.setItem('rb_full_state', JSON.stringify(state)); }
function loadState(){ const raw = localStorage.getItem('rb_full_state'); if(!raw) return; try{ Object.assign(state, JSON.parse(raw)); }catch(e){} }
loadState();

/* ---------- render ---------- */
function applyTheme(){
  resumeEl.className = 'resume ' + state.template;
  resumeEl.style.setProperty('--accent', state.accent);
  resumeEl.style.fontFamily = state.font;
  accentColor.value = state.accent;
  fontSelect.value = state.font;
  templateSelect.value = state.template;
  if(state.dark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
}

function renderProfile(){
  previewName.textContent = state.name || 'Your Name';
  previewTitle.textContent = state.title || '';
  previewEmail.textContent = state.email || '';
  previewPhone.textContent = state.phone || '';
  previewLocation.textContent = state.location || '';
  previewAbout.textContent = state.about || '';
  if(state.photoData){ previewPhoto.src = state.photoData; photoPreview.src = state.photoData; } else { previewPhoto.src=''; photoPreview.src=''; }
}

function renderWorks(){
  worksControl.innerHTML = ''; previewWorks.innerHTML = '';
  state.works.forEach((w, i)=>{
    // controls
    const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.marginBottom='8px';
    row.innerHTML = `<div><strong>${escapeHtml(w.title)}</strong><div style="color:var(--muted);font-size:0.9rem">${escapeHtml(w.company)} • ${escapeHtml(w.period)}</div></div>`;
    const rm = document.createElement('button'); rm.textContent='Remove'; rm.className='small-btn'; rm.onclick=()=>{ state.works.splice(i,1); saveState(); renderAll(); };
    row.appendChild(rm); worksControl.appendChild(row);

    // preview
    const ent = document.createElement('div'); ent.className='entry';
    ent.innerHTML = `<div><strong>${escapeHtml(w.title)}</strong> <div class="meta">${escapeHtml(w.company)} • ${escapeHtml(w.period)} • ${escapeHtml(w.location)}</div></div><div style="margin-top:6px">${escapeHtml(w.desc)}</div>`;
    previewWorks.appendChild(ent);
  });
}

function renderEducation(){
  eduControl.innerHTML=''; previewEdu.innerHTML='';
  state.education.forEach((e,i)=>{
    const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.marginBottom='8px';
    row.innerHTML = `<div><strong>${escapeHtml(e.degree)}</strong><div style="color:var(--muted)">${escapeHtml(e.inst)} • ${escapeHtml(e.period)}</div></div>`;
    const rm = document.createElement('button'); rm.textContent='Remove'; rm.className='small-btn'; rm.onclick=()=>{ state.education.splice(i,1); saveState(); renderAll(); };
    row.appendChild(rm); eduControl.appendChild(row);

    const ent = document.createElement('div'); ent.className='entry';
    ent.innerHTML = `<div><strong>${escapeHtml(e.degree)}</strong><div class="meta">${escapeHtml(e.inst)} • ${escapeHtml(e.period)} • ${escapeHtml(e.location)}</div></div><div style="margin-top:6px">${escapeHtml(e.desc)}</div>`;
    previewEdu.appendChild(ent);
  });
}

function renderProjects(){
  projectsControl.innerHTML=''; previewProjects.innerHTML='';
  state.projects.forEach((p,i)=>{
    const row = document.createElement('div'); row.style.display='flex'; row.style.gap='8px'; row.style.alignItems='center'; row.style.marginBottom='8px';
    const t = document.createElement('div'); t.innerHTML = `<strong>${escapeHtml(p.title)}</strong><div style="color:var(--muted)">${escapeHtml(p.link||'')}</div>`;
    const rm = document.createElement('button'); rm.textContent='Remove'; rm.className='small-btn'; rm.onclick=()=>{ state.projects.splice(i,1); saveState(); renderAll(); };
    row.appendChild(t); row.appendChild(rm);
    projectsControl.appendChild(row);

    const card = document.createElement('div'); card.className='project-card';
    const img = document.createElement('img'); img.src = p.screenshot || '';
    const meta = document.createElement('div'); meta.innerHTML = `<div style="font-weight:700">${escapeHtml(p.title)}</div>${p.link?`<a href="${escapeHtml(p.link)}" target="_blank">${escapeHtml(p.link)}</a>`:''}`;
    card.appendChild(img); card.appendChild(meta); previewProjects.appendChild(card);
  });
}

function renderSkills(){
  skillsList.innerHTML=''; previewSkills.innerHTML='';
  state.skills.forEach((s,i)=>{
    const chip = document.createElement('span'); chip.className='skill-chip'; chip.textContent = s;
    const rem = document.createElement('button'); rem.textContent='×'; rem.style.marginLeft='8px'; rem.onclick=()=>{ state.skills.splice(i,1); saveState(); renderAll(); };
    chip.appendChild(rem); skillsList.appendChild(chip);

    const pchip = document.createElement('div'); pchip.className='skill-chip'; pchip.textContent=s; previewSkills.appendChild(pchip);
  });
}

function renderCerts(){
  certControl.innerHTML=''; previewCerts.innerHTML='';
  state.certs.forEach((c,i)=>{
    const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.marginBottom='8px';
    row.innerHTML = `<div><strong>${escapeHtml(c.title)}</strong><div style="color:var(--muted)">${escapeHtml(c.org)}</div></div>`;
    const rm = document.createElement('button'); rm.textContent='Remove'; rm.className='small-btn'; rm.onclick=()=>{ state.certs.splice(i,1); saveState(); renderAll(); };
    row.appendChild(rm); certControl.appendChild(row);

    const ent = document.createElement('div'); ent.className='entry'; ent.innerHTML = `<div><strong>${escapeHtml(c.title)}</strong><div class="meta">${escapeHtml(c.org)}</div></div>`;
    previewCerts.appendChild(ent);
  });
}

function renderLangsAndHobbies(){
  langControl.innerHTML=''; hobbyControl.innerHTML=''; previewLangs.innerHTML=''; previewHobbies.innerHTML='';
  state.langs.forEach((l,i)=>{
    const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.marginBottom='6px';
    row.innerHTML = `<div>${escapeHtml(l)}</div>`;
    const rm = document.createElement('button'); rm.textContent='Remove'; rm.className='small-btn'; rm.onclick=()=>{ state.langs.splice(i,1); saveState(); renderAll(); };
    row.appendChild(rm); langControl.appendChild(row);
    previewLangs.appendChild(row.cloneNode(true));
  });
  state.hobbies.forEach((h,i)=>{
    const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.marginBottom='6px';
    row.innerHTML = `<div>${escapeHtml(h)}</div>`;
    const rm = document.createElement('button'); rm.textContent='Remove'; rm.className='small-btn'; rm.onclick=()=>{ state.hobbies.splice(i,1); saveState(); renderAll(); };
    row.appendChild(rm); hobbyControl.appendChild(row);
    previewHobbies.appendChild(row.cloneNode(true));
  });
}

/* ---------- visibility & sortables ---------- */
function applyVisibility(){
  Object.keys(state.visibleSections).forEach(sec=>{
    document.querySelectorAll(`[data-section="${sec}"]`).forEach(el=> el.style.display = state.visibleSections[sec] ? '' : 'none');
  });
}

/* ---------- wire events ---------- */
// Basic profile inputs
[nameInput,titleInput,emailInput,phoneInput,locationInput,aboutInput].forEach(inp=>{
  inp.addEventListener('input', ()=> {
    state.name = nameInput.value; state.title = titleInput.value; state.email = emailInput.value;
    state.phone = phoneInput.value; state.location = locationInput.value; state.about = aboutInput.value;
    saveState(); renderProfile();
  });
});

// photo upload
photoInput.addEventListener('change', async e=>{
  const f = e.target.files[0]; if(!f) return;
  state.photoData = await fileToDataURL(f); saveState(); renderProfile();
});

// add work
addWork.addEventListener('click', ()=>{
  const w = { title: workTitle.value.trim(), company: workCompany.value.trim(), period: workPeriod.value.trim(), location: workLocation.value.trim(), desc: workDesc.value.trim() };
  if(!w.title) return alert('Enter job title');
  state.works.unshift(w);
  [workTitle,workCompany,workPeriod,workLocation,workDesc].forEach(i=>i.value='');
  saveState(); renderAll();
});

// add education
addEdu.addEventListener('click', ()=>{
  const e = { degree: eduDegree.value.trim(), inst: eduInst.value.trim(), period: eduPeriod.value.trim(), location: eduLocation.value.trim(), desc: eduDesc.value.trim() };
  if(!e.degree) return alert('Enter degree');
  state.education.unshift(e);
  [eduDegree,eduInst,eduPeriod,eduLocation,eduDesc].forEach(i=>i.value='');
  saveState(); renderAll();
});

// add project
addProject.addEventListener('click', async ()=>{
  const title = projTitle.value.trim(); if(!title) return alert('Enter project title');
  let screenshot = '';
  if(projScreenshot.files && projScreenshot.files[0]) screenshot = await fileToDataURL(projScreenshot.files[0]);
  state.projects.unshift({ title, link: projLink.value.trim(), screenshot });
  [projTitle,projLink,projScreenshot].forEach(i=>i.value='');
  saveState(); renderAll();
});

// skills: enter to add
skillsInput.addEventListener('keydown', e=>{
  if(e.key === 'Enter'){ e.preventDefault(); const s = skillsInput.value.trim(); if(s && !state.skills.includes(s)){ state.skills.push(s); skillsInput.value=''; saveState(); renderAll(); } }
});
skillsInput.addEventListener('input', ()=>{
  const q = skillsInput.value.trim().toLowerCase(); skillSuggestions.innerHTML='';
  if(!q) return;
  const matched = SUGGESTED_SKILLS.filter(x=> x.toLowerCase().includes(q) && !state.skills.includes(x)).slice(0,6);
  if(matched.length){
    const box = document.createElement('div'); box.className='list';
    matched.forEach(m=>{ const it = document.createElement('div'); it.className='item'; it.textContent = m; it.onclick = ()=>{ state.skills.push(m); saveState(); renderAll(); skillsInput.value=''; skillSuggestions.innerHTML=''; }; box.appendChild(it); });
    skillSuggestions.appendChild(box);
  }
});

// add cert
addCert.addEventListener('click', ()=>{
  const c = { title: certTitle.value.trim(), org: certOrg.value.trim() };
  if(!c.title) return alert('Enter cert title');
  state.certs.unshift(c); certTitle.value=''; certOrg.value=''; saveState(); renderAll();
});

// add language
addLang.addEventListener('click', ()=>{ const v = langInput.value.trim(); if(!v) return; state.langs.push(v); langInput.value=''; saveState(); renderAll(); });

// add hobby
addHobby.addEventListener('click', ()=>{ const v = hobbyInput.value.trim(); if(!v) return; state.hobbies.push(v); hobbyInput.value=''; saveState(); renderAll(); });

// template, accent, font, theme
templateSelect.addEventListener('change', ()=>{ state.template = templateSelect.value; saveState(); applyTheme(); });
accentColor.addEventListener('input', ()=>{ state.accent = accentColor.value; saveState(); applyTheme(); });
fontSelect.addEventListener('change', ()=>{ state.font = fontSelect.value; saveState(); applyTheme(); });
themeToggle.addEventListener('click', ()=>{ state.dark = !state.dark; saveState(); applyTheme(); themeToggle.innerHTML = state.dark?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>'; });

// section toggles
sectionToggles.forEach(ch=>{
  ch.checked = state.visibleSections[ch.dataset.section];
  ch.addEventListener('change', ()=>{ state.visibleSections[ch.dataset.section] = ch.checked; saveState(); applyVisibility(); });
});

/* ---------- Sortable for reordering ---------- */
function initSortables(){
  const left = document.querySelector('.sortable-left'), right = document.querySelector('.sortable-right');
  if(left) Sortable.create(left, { animation:150, handle:'.section', onEnd: ()=> saveState() });
  if(right) Sortable.create(right, { animation:150, handle:'.section', onEnd: ()=> saveState() });
}
initSortables();

/* ---------- export PDF & HTML & JSON ---------- */
exportPDF.addEventListener('click', ()=>{
  document.querySelector('.topbar').style.visibility='hidden';
  const opt = { margin:10, filename:(state.name||'resume')+'.pdf', image:{type:'jpeg',quality:0.98}, html2canvas:{scale:2,useCORS:true}, jsPDF:{unit:'mm',format:'a4',orientation:'portrait'} };
  setTimeout(()=>{ html2pdf().set(opt).from(document.querySelector('.panel.preview-panel')).save().finally(()=>{ document.querySelector('.topbar').style.visibility='visible'; }); },120);
});

// download standalone HTML (simple)
downloadHTML.addEventListener('click', ()=>{
  const clone = document.querySelector('.panel.preview-panel').cloneNode(true);
  const styleText = 'body{font-family:'+state.font+';padding:20px;color:#111} .section h4{color:'+state.accent+'} img{max-width:100%}';
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(state.name||'Resume')}</title><style>${styleText}</style></head><body>${clone.outerHTML}</body></html>`;
  const blob = new Blob([html], {type:'text/html'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download=(state.name||'resume')+'.html'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

// JSON export / import
exportJSON.addEventListener('click', ()=>{
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], {type:'application/json'}); const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = (state.name || 'resume') + '_backup.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

importJSON.addEventListener('click', ()=> importFile.click());
importFile.addEventListener('change', e=>{
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader(); r.onload = ()=>{ try{ const obj = JSON.parse(r.result); Object.assign(state, obj); saveState(); renderAll(); alert('Imported'); }catch(e){ alert('Invalid JSON'); } }; r.readAsText(f);
});

/* ---------- initial render & helpers ---------- */
function renderAll(){
  applyTheme();
  renderProfile();
  renderWorks();
  renderEducation();
  renderProjects();
  renderSkills();
  renderCerts();
  renderLangsAndHobbies();
  applyVisibility();
  saveState();
}
renderAll();

/* ---------- restore form inputs from state ---------- */
function restoreForm(){
  nameInput.value = state.name; titleInput.value = state.title; emailInput.value = state.email;
  phoneInput.value = state.phone; locationInput.value = state.location; aboutInput.value = state.about;
  accentColor.value = state.accent; fontSelect.value = state.font; templateSelect.value = state.template;
  // preview photo
  if(state.photoData){ previewPhoto.src = state.photoData; photoPreview.src = state.photoData; }
}
restoreForm();

/* ---------- small utilities UX ---------- */
// allow clicking preview photo to upload too
previewPhoto.style.cursor='pointer';
previewPhoto.addEventListener('click', ()=>{ const i=document.createElement('input'); i.type='file'; i.accept='image/*'; i.onchange = async ()=>{ const f=i.files[0]; if(!f) return; state.photoData = await fileToDataURL(f); saveState(); renderAll(); }; i.click(); });

// autosave interval
setInterval(saveState, 2000);


let isEditMode = false;

function toggleEditMode() {
    isEditMode = !isEditMode;
    const resumeContainer = document.querySelector('#resume'); // Apne resume ka main div ka id ya class

    if (isEditMode) {
        resumeContainer.classList.add('edit-mode');
    } else {
        resumeContainer.classList.remove('edit-mode');
    }
}

// --- Utility to update preview sections ---
function updatePreview(container, previewId) {
  const preview = document.getElementById(previewId);
  preview.innerHTML = "";
  [...container.children].forEach(child => {
    const clone = child.cloneNode(true);
    const removeBtn = clone.querySelector(".remove-btn");
    if (removeBtn) removeBtn.remove(); // remove preview ka remove button
    preview.appendChild(clone);
  });
}
