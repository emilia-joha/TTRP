const pages = ['character_info', 'background', 'abilities', 'equipments', 'fight'];

(async function () {
  const requests = [];
  for (const page of pages) {
    requests.push($(`#${page}`).load(`./html/${page}.html`));
  }
  await Promise.all(requests);
})();
