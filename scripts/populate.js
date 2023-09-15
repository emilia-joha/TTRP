const hero = JSON.parse(localStorage.getItem('selection'));

(() => {
  console.log(hero);

  function get(elementId) {
    return document.getElementById(elementId);
  }

  const event = new Event('change');

  for (const id in hero) {
    const val = hero[id];
    const el = get(id);

    if (val?.length > 0) {
      if (id == 'multiclass') {
        $('#multiclass_button').click();
      } else if (id.match(/weapon_name_[1234]/)) {
        $('#add_weapon').click();
      }
    }

    if (val == 'Create New') continue;
    if (!el || !val) continue;

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
