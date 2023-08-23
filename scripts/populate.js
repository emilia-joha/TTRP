const hero = JSON.parse(localStorage.getItem('selection'));

(() => {
  function get(elementId) {
    return document.getElementById(elementId);
  }

  const event = new Event('change');

  for (const id in hero) {
    const val = hero[id];
    const el = get(id);

    if (!el || !val) continue;

    console.log(el.type, el);

    if (el.type == 'checkbox') {
      el.checked = val;
    } else if (el.type == undefined) {
      el.innerText = val;
    } else {
      el.value = val;
    }

    el.dispatchEvent(event);
  }
})();
