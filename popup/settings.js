(async () => {
  const container = document.getElementById('parent');
  const stored = await browser.storage.sync.get();
  const environments = sanitize(stored.environments);

  function sanitize(envDict) {
    const sanitized = {};

    Object.entries(envDict || {}).forEach(([name, urls]) => {
      if (name) {
        sanitized[name] = urls.length <= 1 ? urls : urls.filter(url => !!url);
      }
    });

    if (Object.keys(sanitized).length < 1) {
      sanitized.PROD = [''];  // dict is empty -> add default value
    }

    return sanitized;
  }

  function displayEnvironment(initialName) {
    let name = initialName;
    let listParent;

    function title() {
      const inputElement = document.createElement('input');
      Object.assign(inputElement, {
        className: 'environment-input',
        placeholder: 'PROD',
        type: 'text',
        value: name,
        onchange: (e) => {
          const newName = e.target.value;
          environments[newName] = environments[name];
          delete environments[name];
          name = newName;
          browser.storage.sync.set({environments});
        }
      });

      const wrapper = document.createElement('label');
      wrapper.appendChild(inputElement);
      return wrapper;
    }

    function urlList() {
      const ul = document.createElement('ul');
      environments[name].forEach((url, idx) => {
        ul.appendChild(urlInput(url, idx))
      });
      ul.className = 'url-list';
      listParent = ul;
      return ul;
    }

    function urlInput(value, idx) {
      const input = document.createElement('input');
      Object.assign(input, {
        className: 'url-input',
        placeholder: 'https://your-url-here...',
        type: 'text',
        value,
        onchange: (e) => {
          environments[name][idx] = e.target.value;
          browser.storage.sync.set({environments});
        }
      });

      const label = document.createElement('label');
      label.appendChild(input);

      const wrapper = document.createElement('li');
      wrapper.className = 'url';
      wrapper.appendChild(label);
      return wrapper;
    }

    function addButton() {
      const button = document.createElement('button');
      button.className = 'url-add';
      button.onclick = () => {
        environments[name].push('');
        browser.storage.sync.set({environments});
        listParent.appendChild(urlInput('', environments[name].length - 1));
      };

      const symbol = document.createElement('span');
      symbol.className = 'url-add-symbol';
      symbol.innerText = '+';

      const label = document.createElement('span');
      label.innerText = ' Add url';

      button.appendChild(symbol);
      button.appendChild(label);
      return button;
    }

    container.appendChild(title());
    container.appendChild(urlList());
    container.appendChild(addButton());
  }

  Object.keys(environments).forEach(displayEnvironment);

  document.getElementById('addButton').addEventListener('click', () => {
    const defaultName = `ENV-0${Object.keys(environments).length + 1}`;
    environments[defaultName] = [''];
    browser.storage.sync.set({environments});
    displayEnvironment(defaultName);
  });

})();
