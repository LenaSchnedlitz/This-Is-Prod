const environments = {
  PROD: [''],
};

const container = document.getElementById('parent');
Object.entries(environments).forEach(env => displayEnvironment(...env));

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
        console.debug(environments)
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
        console.debug(environments)
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
      listParent.appendChild(urlInput('', environments[name].length - 1));
      console.debug(environments);
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
    displayEnvironment(defaultName);
  });
