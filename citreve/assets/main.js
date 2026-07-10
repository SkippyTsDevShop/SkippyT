// Hero "flash freeze" readout — cosmetic countdown from room temp to -40F.
// Purely decorative: the headline reveal is CSS-only and never depends on this finishing.
function runFreezeIntro(el){
  if(!el) return;
  const target = -40;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){ el.textContent = target + '\u00B0F'; return; }
  let val = 72;
  const timer = setInterval(() => {
    val -= 8;
    if(val <= target){ el.textContent = target + '\u00B0F'; clearInterval(timer); return; }
    el.textContent = val + '\u00B0F';
  }, 30);
}

// Simple tab switcher: [data-tabs] wraps [data-tab-btn] buttons and [data-tab-panel] panels
function initTabs(){
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const btns = group.querySelectorAll('[data-tab-btn]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.style.display = 'none');
        btn.classList.add('active');
        const target = group.querySelector('[data-tab-panel="' + btn.dataset.tabBtn + '"]');
        if(target) target.style.display = '';
      });
    });
  });
}

// Sortable tables: <table data-sortable> with <th data-key="...">
function initSortableTables(){
  document.querySelectorAll('table[data-sortable]').forEach(table => {
    const tbody = table.querySelector('tbody');
    const headers = table.querySelectorAll('th[data-key]');
    let currentKey = null, asc = true;
    headers.forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.key;
        asc = (currentKey === key) ? !asc : true;
        currentKey = key;
        headers.forEach(h => h.classList.remove('sorted'));
        th.classList.add('sorted');
        th.querySelector('.arrow') && (th.querySelector('.arrow').textContent = asc ? '\u2191' : '\u2193');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a,b) => {
          const av = a.dataset[key] || '';
          const bv = b.dataset[key] || '';
          const an = parseFloat(av), bn = parseFloat(bv);
          if(!isNaN(an) && !isNaN(bn)) return asc ? an-bn : bn-an;
          return asc ? av.localeCompare(bv) : bv.localeCompare(av);
        });
        rows.forEach(r => tbody.appendChild(r));
      });
    });
  });
}

// Filter chips: [data-filter-group] buttons toggle rows matching data-cat on target table
function initFilters(){
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const targetSel = group.dataset.filterGroup;
    const target = document.querySelector(targetSel);
    if(!target) return;
    const chips = group.querySelectorAll('[data-filter]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const val = chip.dataset.filter;
        target.querySelectorAll('tbody tr').forEach(row => {
          row.style.display = (val === 'all' || row.dataset.priority === val) ? '' : 'none';
        });
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initSortableTables();
  initFilters();
  const freezeEl = document.querySelector('[data-freeze-readout]');
  if(freezeEl) runFreezeIntro(freezeEl);
});
