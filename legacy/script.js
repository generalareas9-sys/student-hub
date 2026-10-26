/* ============================================================
   StudentHub Dashboard — script.js
   All interactive behaviors in plain JavaScript.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Initialize Lucide icons ---- */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ---- Handle broken images (avatar + premium) ---- */
  const avatarImg = document.getElementById('avatarImg');
  if (avatarImg) {
    avatarImg.addEventListener('error', () => {
      avatarImg.style.display = 'none';
    });
    // If the image is already broken (cached), trigger fallback
    if (avatarImg.complete && avatarImg.naturalWidth === 0) {
      avatarImg.style.display = 'none';
    }
  }

  const premiumImg = document.querySelector('.premium-img');
  if (premiumImg) {
    premiumImg.addEventListener('error', () => {
      premiumImg.style.display = 'none';
    });
    if (premiumImg.complete && premiumImg.naturalWidth === 0) {
      premiumImg.style.display = 'none';
    }
  }

  /* ============================================================
     1. Sidebar navigation — switch active item
     ============================================================ */
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Close mobile sidebar
      closeMobileSidebar();
    });
  });

  /* ============================================================
     2. Search box — filter assignment rows live
     ============================================================ */
  const searchInput = document.getElementById('searchInput');
  const assignmentRows = document.querySelectorAll('.assignment-row');
  const noResults = document.getElementById('noResults');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      assignmentRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = !query || text.includes(query);
        row.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });

      if (noResults) {
        noResults.hidden = visibleCount > 0;
      }
    });
  }

  /* ============================================================
     3. Weekly / Monthly dropdown — update bar heights & stats
     ============================================================ */
  const hoursDropdown = document.getElementById('hoursDropdown');
  const barFills = document.querySelectorAll('.bar-fill');
  const hoursStatValues = document.querySelectorAll('.hours-stat-value');

  const weeklyData = {
    bars: [30, 55, 80, 65, 90, 45, 35],
    stats: [
      { value: '28', pct: '85%' },
      { value: '60', pct: '79%' },
      { value: '10', pct: '100%' }
    ]
  };

  const monthlyData = {
    bars: [50, 70, 60, 85, 75, 65, 55],
    stats: [
      { value: '112', pct: '82%' },
      { value: '240', pct: '74%' },
      { value: '38', pct: '95%' }
    ]
  };

  function updateHoursChart(data) {
    barFills.forEach((fill, i) => {
      if (data.bars[i] !== undefined) {
        fill.style.setProperty('--bar-h', data.bars[i] + '%');
      }
    });

    hoursStatValues.forEach((el, i) => {
      if (data.stats[i]) {
        const pill = el.querySelector('.pill');
        // Update value text (keep the pill)
        el.childNodes[0].textContent = data.stats[i].value + ' ';
        if (pill) {
          pill.textContent = data.stats[i].pct;
        }
      }
    });
  }

  if (hoursDropdown) {
    hoursDropdown.addEventListener('change', () => {
      const data = hoursDropdown.value === 'monthly' ? monthlyData : weeklyData;
      updateHoursChart(data);
    });
  }

  /* ============================================================
     4. Calendar — 6-day sliding window, today as 4th chip
     ============================================================ */
  const calMonth = document.getElementById('calMonth');
  const calDays = document.getElementById('calDays');
  const calPrev = document.getElementById('calPrev');
  const calNext = document.getElementById('calNext');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // stripStart is the first date shown (3 days before today initially)
  let stripStart = new Date(today);
  stripStart.setDate(stripStart.getDate() - 3);

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  function renderCalendar() {
    if (!calMonth || !calDays) return;

    // Month title follows the middle of the strip (stripStart + 3)
    const midDate = new Date(stripStart);
    midDate.setDate(midDate.getDate() + 3);
    calMonth.textContent = monthNames[midDate.getMonth()] + ' ' + midDate.getFullYear();

    calDays.innerHTML = '';

    for (let i = 0; i < 6; i++) {
      const d = new Date(stripStart);
      d.setDate(d.getDate() + i);

      const isToday = sameDay(d, today);

      const chip = document.createElement('div');
      chip.className = 'day-chip' + (isToday ? ' day-chip--today' : '');

      const label = document.createElement('span');
      label.className = 'day-chip-label';
      label.textContent = dayLabels[d.getDay()];

      const dateNum = document.createElement('span');
      dateNum.className = 'day-chip-date';
      dateNum.textContent = d.getDate();

      chip.appendChild(label);
      chip.appendChild(dateNum);
      calDays.appendChild(chip);
    }
  }

  if (calPrev) {
    calPrev.addEventListener('click', () => {
      stripStart.setDate(stripStart.getDate() - 6);
      renderCalendar();
    });
  }

  if (calNext) {
    calNext.addEventListener('click', () => {
      stripStart.setDate(stripStart.getDate() + 6);
      renderCalendar();
    });
  }

  // Initial render
  renderCalendar();

  /* ============================================================
     5. Bell & Subscribe — open <dialog> modals
     ============================================================ */
  const btnBell = document.getElementById('btnBell');
  const dialogNotifications = document.getElementById('dialogNotifications');
  const btnSubscribe = document.getElementById('btnSubscribe');
  const dialogSubscribe = document.getElementById('dialogSubscribe');

  function openDialog(dialog) {
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  // Close buttons inside dialogs
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog');
      if (dialog) dialog.close();
    });
  });

  // Click outside to close
  document.querySelectorAll('.modal').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  });

  if (btnBell) {
    btnBell.addEventListener('click', () => openDialog(dialogNotifications));
  }

  if (btnSubscribe) {
    btnSubscribe.addEventListener('click', () => openDialog(dialogSubscribe));
  }

  /* ============================================================
     6. Pencil button — edit profile name
     ============================================================ */
  const btnEditProfile = document.getElementById('btnEditProfile');
  const profileName = document.getElementById('profileName');

  if (btnEditProfile && profileName) {
    btnEditProfile.addEventListener('click', () => {
      const currentName = profileName.textContent;
      const newName = prompt('Enter your name:', currentName);
      if (newName !== null && newName.trim() !== '') {
        profileName.textContent = newName.trim();
        // Update the avatar fallback initial
        const fallback = document.querySelector('.avatar-fallback');
        if (fallback) {
          fallback.textContent = newName.trim().charAt(0).toUpperCase();
        }
      }
    });
  }

  /* ============================================================
     7. Mobile sidebar toggle
     ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  let overlay = document.querySelector('.sidebar-overlay');

  // Create overlay if it doesn't exist
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  function openMobileSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (sidebar && sidebar.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileSidebar);
  }

  /* ============================================================
     8. Help button — simple alert
     ============================================================ */
  const btnHelp = document.getElementById('btnHelp');
  if (btnHelp) {
    btnHelp.addEventListener('click', () => {
      alert('Need help? Visit our help center for tips and support!');
    });
  }
});
