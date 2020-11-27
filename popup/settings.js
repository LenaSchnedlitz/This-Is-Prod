browser.storage.sync.get('environments').then((stored) => {
  const environments = stored ||{
    PROD: ['']
  };

  const container = document.getElementById('parent');
  Object.entries(environments).forEach(([name, urls]) => {
    if (urls.length > 1) {
      environments[name] = urls.filter(url => !!url);
    }
    displayEnvironment(name)
  });

  function displayEnvironment(initialName) {
    let name = initialName;
    let listParent;

    function input() {
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

    container.appendChild(input());
    container.appendChild(urlList());
    container.appendChild(addButton());
  }

  document.getElementById('addButton')
  .addEventListener('click', () => {
    const defaultName = `ENV-0${Object.keys(environments).length + 1}`;
    environments[defaultName] = [''];
    browser.storage.sync.set({environments});
    displayEnvironment(defaultName);
  });

});
