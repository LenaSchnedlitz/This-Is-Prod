const environments = {
  PROD: [''],
};

const parent = document.getElementById('parent');

Object.entries(environments).forEach(env => appendEnvironment(...env));

function appendEnvironment(initialName) {
  let name = initialName;

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
    function input(value, idx) {
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

    const ul = document.createElement('ul');
    environments[name].forEach((url, idx) => {
      ul.appendChild(input(url, idx))
    });
    ul.className = 'url-list';
    return ul;
  }

  function addButton() {
    const button = document.createElement('button');
    button.className = 'plus-url';

    const symbol = document.createElement('span');
    symbol.className = 'plus-url-symbol';
    symbol.innerText = '+';

    const label = document.createElement('span');
    label.innerText = ' Add url';

    button.appendChild(symbol);
    button.appendChild(label);
    return button;
  }

  parent.appendChild(input());
  parent.appendChild(urlList());
  parent.appendChild(addButton());
}
