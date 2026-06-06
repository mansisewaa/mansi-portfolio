// Initialize Lucide Icons
lucide.createIcons();


/* ==========================================================================
   TYPEWRITER EFFECT
   ========================================================================== */
const typewriterElement = document.getElementById('typewriter-text');
const words = ['Laravel Specialist', 'SLM & RAG Engineer', 'Backend Optimizer', 'Clean Code Advocate'];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typeDelay = 100;

function typeAnimation() {
  const currentWord = words[wordIdx];
  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIdx - 1);
    charIdx--;
    typeDelay = 50;
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIdx + 1);
    charIdx++;
    typeDelay = 150;
  }

  if (!isDeleting && charIdx === currentWord.length) {
    isDeleting = true;
    typeDelay = 1500; // Pause at end of word
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    wordIdx = (wordIdx + 1) % words.length;
    typeDelay = 500; // Pause before typing new word
  }

  setTimeout(typeAnimation, typeDelay);
}

document.addEventListener('DOMContentLoaded', () => {
  typeAnimation();
});

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
const mobileToggleBtn = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggleBtn && navMenu) {
  mobileToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = mobileToggleBtn.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  // Close menu on nav-link clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggleBtn.querySelector('i').setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });
}

/* ==========================================================================
   SCROLL ACTIVE LINK HIGHLIGHTING
   ========================================================================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let currentActive = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Calculate if we're inside section bounds
    if (window.scrollY >= (sectionTop - 200)) {
      currentActive = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentActive}`) {
      link.classList.add('active');
    }
  });
});

/* ==========================================================================
   PROJECT FILTERS
   ========================================================================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Set active button style
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      if (filterVal === 'all' || categories.includes(filterVal)) {
        card.style.display = 'flex';
        // Minor fade/zoom transitions
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      }
    });
  });
});

/* ==========================================================================
   PROJECT DETAILS DATA & MODAL
   ========================================================================== */
const projectsData = {
  p1: {
    title: 'Guwahati Jal Board Billing System',
    subtitle: 'Fintech / System Modernisation',
    description: 'Spearheaded modernization of the legacy water utility administration. Built robust relational schema, custom billing scripts, and automated monthly payment reconciliation workflows.',
    features: [
      'Modernized legacy LAMP architectures, reducing query runtime latency during high loads.',
      'Integrated Razorpay API to process over 10L+ monthly online citizen bills securely.',
      'Constructed analytical dashboards tracking bill collection stats and revenue projections.',
      'Refactored legacy stored procedures to clean Laravel model patterns.'
    ],
    tech: ['PHP', 'Laravel', 'MySQL 8.0', 'Razorpay', 'Bootstrap', 'LAMP Stack']
  },
  p2: {
    title: 'Assam Police Seva Setu',
    subtitle: 'Unified Public Service Gateway',
    description: 'Designed and deployed the backend API suite for Assam Police public portal. Managed citizens requests lifecycle seamlessly from submitting to result verification.',
    features: [
      'Engineered flexible backend structures for service registrations, lost & found, and tenant reports.',
      'Implemented Command Query Responsibility Segregation (CQRS) patterns to separate read-heavy user dashboards from transactional write-ins.',
      'Integrated national eGRaSS payment systems to execute safe government service collections.',
      'Developed and documented REST APIs used by external government interoperability nodes.'
    ],
    tech: ['Laravel', 'MySQL 8.0', 'CQRS Architecture', 'REST APIs', 'eGRaSS', 'Bootstrap']
  },
  p3: {
    title: 'HRMIS – Assam Petrochemicals',
    subtitle: 'Enterprise Payroll Management Engine',
    description: 'Created custom human resource payroll modules, automatic ledger deductions computation, salary structure generation, and dynamic filtering workflows.',
    features: [
      'Engineered PostgreSQL schema to handle dynamic salaries, allowance policies, and provident funds.',
      'Designed custom reporting logic to output monthly payroll PDFs and CSV sheets based on user filter parameters.',
      'Implemented strict role-based access control (RBAC) to protect sensitive employee records.'
    ],
    tech: ['Laravel', 'PostgreSQL', 'JavaScript', 'REST API', 'Reporting Engine']
  },
  p4: {
    title: 'Health Lab System',
    subtitle: 'Healthcare Booking & Wallet System',
    description: 'Developed an end-to-end digital lab platform for medical labs. Features custom wallets allowing branches to buy supplies from corporate main offices.',
    features: [
      'Created custom lab wallet module with support for manual recharges, purchase auditing, and balance check logic.',
      'Integrated Razorpay gateway supporting direct patient payment, online receipts, and reports.',
      'Designed multi-tenant structures separating lab branch reports from centralized office dashboards.'
    ],
    tech: ['Laravel', 'MySQL', 'Razorpay Gateway', 'Multi-tenant API']
  },
  p5: {
    title: 'Pragya Survey App',
    subtitle: 'Mobile API Sync & Analytics Engine',
    description: 'Developed the backend syncing engine and dashboard backend managing real-time data syncs and offline survey submissions.',
    features: [
      'Designed sync APIs capable of managing offline device synchronization with resolve-conflicts logic.',
      'Optimized PostgreSQL index paths to accelerate analytical graphs rendering across millions of records.'
    ],
    tech: ['PostgreSQL', 'Laravel API', 'Offline Sync Scheduling']
  },
  p6: {
    title: 'Fertilizer Distribution Tracker',
    subtitle: 'GIS Stock Management App',
    description: 'Designed a geospatial monitoring platform tracking fertilizer stock movements and reporting visual geo-tagged distributions.',
    features: [
      'Constructed geo-location coordinate validators ensuring precise location coordinates mappings.',
      'Created administrative panel showing maps of inventory alerts, shortages, and delivery stats.'
    ],
    tech: ['Laravel', 'MySQL', 'GeoJSON Integrations', 'GIS APIs']
  },
  p7: {
    title: 'Motor & Travel ERP',
    subtitle: 'Enterprise Dealership & Inventory ERP',
    description: 'Created complete dealer resource planning modules covering vehicle sales, stock catalogs, and automated parts invoicing.',
    features: [
      'Developed transaction ledger formulas ensuring accurate balance calculations during partial invoice payments.',
      'Automated service department schedule updates linked directly to customer logs.'
    ],
    tech: ['Laravel', 'MySQL', 'JavaScript UI', 'Invoicing Module']
  }
};

const modalOverlay = document.getElementById('project-modal');
const modalContentArea = document.getElementById('modal-content-area');

function openProjectModal(id) {
  const data = projectsData[id];
  if (!data) return;

  const featuresHTML = data.features.map(f => `<li>${f}</li>`).join('');
  const techHTML = data.tech.map(t => `<span class="badge">${t}</span>`).join('');

  modalContentArea.innerHTML = `
    <div class="modal-content">
      <h3>${data.title}</h3>
      <span class="modal-content-subtitle">${data.subtitle}</span>
      <p class="modal-desc">${data.description}</p>
      
      <h4 class="modal-section-title">Key Work Done</h4>
      <ul class="modal-bullets">
        ${featuresHTML}
      </ul>

      <h4 class="modal-section-title">Technologies Used</h4>
      <div class="modal-tech-stack">
        ${techHTML}
      </div>
    </div>
  `;

  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeProjectModal();
  }
});

/* ==========================================================================
   INTERACTIVE COMMAND LINE SANDBOX TERMINAL
   ========================================================================== */
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');
const terminalInputLine = document.getElementById('terminal-input-line');
const clearTerminalBtn = document.getElementById('clear-terminal-btn');

const commandHistory = [];

if (terminalInput) {
  // Focus terminal input when clicking inside the terminal body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      terminalInput.value = '';
      if (command) {
        handleTerminalCommand(command);
      }
    }
  });
}

if (clearTerminalBtn) {
  clearTerminalBtn.addEventListener('click', () => {
    clearTerminal();
  });
}

function clearTerminal() {
  // Remove everything except the input line
  const rows = terminalBody.querySelectorAll('.terminal-output-row');
  rows.forEach(r => r.remove());
  writeTerminalOutput('Console cleared. Type "help" to start again.');
}

function writeTerminalOutput(text, type = '') {
  const newRow = document.createElement('div');
  newRow.className = 'terminal-output-row';

  if (type === 'error') {
    newRow.innerHTML = `<p class="terminal-response terminal-response-error">${text}</p>`;
  } else if (type === 'success') {
    newRow.innerHTML = `<p class="terminal-response terminal-response-success">${text}</p>`;
  } else {
    newRow.innerHTML = `<div class="terminal-response">${text}</div>`;
  }

  terminalBody.insertBefore(newRow, terminalInputLine);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function handleTerminalCommand(cmdString) {
  // Output the user's typed prompt
  const cmdRow = document.createElement('div');
  cmdRow.className = 'terminal-output-row';
  cmdRow.innerHTML = `<span class="terminal-prompt-label">guest@sewa-portfolio:~$</span> <span>${cmdString}</span>`;
  terminalBody.insertBefore(cmdRow, terminalInputLine);

  const cleanCmd = cmdString.toLowerCase().trim();

  // Route commands
  if (cleanCmd === 'help') {
    const helpText = `
Available CLI Sandbox commands:
  <span class="term-highlight">help</span>          Show list of available commands
  <span class="term-highlight">skills</span>        List primary technical languages/frameworks
  <span class="term-highlight">projects</span>      View summary of key backend engineering works
  <span class="term-highlight">sql select</span>    Execute a mock SQL query targeting database metrics
  <span class="term-highlight">experience</span>    View brief timeline summaries
  <span class="term-highlight">contact</span>       Print contact email and phone details
  <span class="term-highlight">clear</span>         Clear terminal logs
    `;
    writeTerminalOutput(helpText);
  }
  else if (cleanCmd === 'skills') {
    const skillsText = `
<b>Mansi Sewa Technical Stack:</b>
--------------------------------------------
Languages  :: PHP (Laravel), Python (Django, Flask), React, JavaScript, HTML/CSS
Databases  :: MySQL 8.0, PostgreSQL, Vector Databases, Redis
AI & SLM   :: Ollama, RAG architectures, text embeddings
Architects :: Clean Architecture, CQRS, Domain-Driven Design (DDD)
DevOps/Ops :: AWS (EC2, RDS, S3, SQS), Docker, CI/CD, Apache, Linux
--------------------------------------------
    `;
    writeTerminalOutput(skillsText);
  }
  else if (cleanCmd === 'projects') {
    const projectsText = `
<b>Key Ported Projects List:</b>
- p1: Guwahati Jal Board Billing System (Laravel, MySQL, Razorpay)
- p2: Assam Police Seva Setu (Laravel, CQRS, eGRaSS API)
- p3: HRMIS - Assam Petrochemicals (Laravel, PostgreSQL, Reports API)
- p4: Health Lab System (Laravel, Razorpay, Custom Wallets)
- p5: Pragya Survey App (PostgreSQL sync tools)
- p6: Fertilizer Distribution Tracker (GIS maps tracking)
- p7: Motor & Travel ERP (Dealership system mechanics)
    `;
    writeTerminalOutput(projectsText);
  }
  else if (cleanCmd === 'sql select' || cleanCmd.includes('select *') || cleanCmd === 'sql') {
    const sqlText = `
Executing: SELECT project_name, database_engine, transaction_vol FROM portfolio_projects;
+-----------------------------+-------------------+-----------------+
| Project Name                | Database Engine   | Transaction Vol |
+-----------------------------+-------------------+-----------------+
| Guwahati Jal Board Billing  | MySQL 8.0         | 10L+ / Month    |
| Assam Police Seva Setu      | MySQL 8.0         | Gov-eGRaSS Gate |
| HRMIS Payroll system        | PostgreSQL        | Enterprise      |
| Health Lab System           | MySQL             | Lab Wallets     |
+-----------------------------+-------------------+-----------------+
4 rows in set (0.04 sec)
    `;
    writeTerminalOutput(sqlText, 'success');
  }
  else if (cleanCmd === 'experience') {
    const expText = `
<b>Work Experience Chronology:</b>
--------------------------------------------------------------
* [2024 - Present] Software Engineer - NIC Assam (Vendor ABM)
  - Developing SLMs via Ollama, RAG, and Vector DBs.
  - Certified Deed module & NGDRS chat assistant development.
* [2024]          Full-Stack Developer - Indigi Consulting
  - Integrated Razorpay gateway, designed Clean APIs.
* [2021 - 2024]   Programmer - Web.com (India) Pvt. Ltd.
  - Implemented CQRS/DDD, reduced production bug rates by 35%.
* [2021]          Full-Stack Intern - RUSA
  - Geofenced HR attendance tracker app.
--------------------------------------------------------------
    `;
    writeTerminalOutput(expText);
  }
  else if (cleanCmd === 'contact') {
    const contactText = `
Email   :: mansisewaa@gmail.com
Phone   :: +91 91013 82810
LinkedIn:: linkedin.com/in/mansi-sewa-3677ba1b3
Location:: Tinsukia, Assam, India
    `;
    writeTerminalOutput(contactText);
  }
  else if (cleanCmd === 'clear') {
    clearTerminal();
  }
  else {
    writeTerminalOutput(`Command not found: "${cmdString}". Type <span class="term-highlight">help</span> for a list of valid commands.`, 'error');
  }

  terminalBody.scrollTop = terminalBody.scrollHeight;
}

/* ==========================================================================
   CONTACT FORM HANDLER (SIMULATION)
   ========================================================================== */
const contactForm = document.getElementById('contact-form');
const formSuccessCard = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect values (simulating submit)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    console.log('Sending message:', { name, email, subject, message });

    // Transition elements
    contactForm.classList.add('hidden');
    formSuccessCard.classList.remove('hidden');

    // Simulate sending log to sandbox console
    setTimeout(() => {
      if (terminalBody) {
        writeTerminalOutput(`[Form System] Incoming message from ${name} (${email}) - Subj: "${subject}" successfully logged!`, 'success');
      }
    }, 1200);
  });
}
