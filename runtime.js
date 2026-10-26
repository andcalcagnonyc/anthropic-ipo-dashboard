/*
 * Minimal standalone runtime for the Anthropic IPO dashboard.
 * Implements the small `dash` API the page uses (data, onData, calc, setLink, colors)
 * by loading the open datasets from ./data/json/<id>.json.
 */
(function () {
  const datasets = {};   // id -> {status, data}
  const calcs = [];      // [{id, inputs, fn}]
  const subs = [];
  const results = {};

  function get(id) {
    if (results[id]) return results[id];
    if (datasets[id]) return datasets[id];
    return { status: 'loading', data: [] };
  }

  function runCalcs() {
    calcs.forEach(c => {
      const ins = c.inputs.map(get);
      if (ins.some(d => d.status === 'error')) { results[c.id] = { status: 'error', data: [] }; return; }
      if (ins.some(d => d.status !== 'ok')) { results[c.id] = { status: 'loading', data: [] }; return; }
      try { results[c.id] = { status: 'ok', data: c.fn(...ins.map(d => d.data)) }; }
      catch (e) { console.error('calc', c.id, e); results[c.id] = { status: 'error', data: [], message: String(e) }; }
    });
  }

  function notify() {
    runCalcs();
    subs.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
  }

  function load(id) {
    if (datasets[id]) return;
    datasets[id] = { status: 'loading', data: [] };
    fetch('data/json/' + id + '.json')
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(rows => { datasets[id] = { status: 'ok', data: rows }; schedule(); })
      .catch(e => { datasets[id] = { status: 'error', data: [], message: String(e) }; schedule(); });
  }

  let pending = false;
  function schedule() { if (pending) return; pending = true; requestAnimationFrame(() => { pending = false; notify(); }); }

  const css = getComputedStyle(document.documentElement);
  const colors = ['--c1', '--c2', '--c3', '--c4', '--c5', '--c6', '--c7', '--c8'].map(v => css.getPropertyValue(v).trim() || '#888');

  window.dash = {
    colors,
    data(id) {
      if (!calcs.find(c => c.id === id)) load(id);
      else calcs.find(c => c.id === id).inputs.forEach(i => { if (!calcs.find(c => c.id === i)) load(i); });
      return get(id);
    },
    calc(id, spec) { calcs.push({ id, inputs: spec.inputs, fn: spec.fn }); spec.inputs.forEach(i => { if (!calcs.find(c => c.id === i)) load(i); }); },
    onData(fn) { subs.push(fn); try { fn(); } catch (e) { console.error(e); } },
    setLink(name) { try { history.replaceState(null, '', '#' + name); } catch (e) {} },
    params() { return {}; }, setParams() {}, resetParams() {}, refresh() {}
  };

  // Load every dataset the page marks
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-source]').forEach(el => el.dataset.source.split(/\s+/).forEach(id => dash.data(id)));
  });
  let w = window.innerWidth;
  window.addEventListener('resize', () => { if (Math.abs(window.innerWidth - w) > 4) { w = window.innerWidth; schedule(); } });
})();
