const environments = {
  PROD: [''],
};

const parent = document.getElementById('parent');

Object.entries(environments).forEach(env => appendEnvironment(...env));

function appendEnvironment(envName) {
  function input(props) {
    const inputElement = document.createElement('input');
    Object.assign(inputElement, {type: 'text', className: 'environment-input', ...props});

    const wrapper = document.createElement('label');
    wrapper.appendChild(inputElement);
    return wrapper;
  }

  function urlList(urls) {
    function input(value, idx) {
      const input = document.createElement('input');
      Object.assign(input, {
        className: 'url-input',
        placeholder: 'https://your-url-here...',
        type: 'text',
        value,
        onchange: (e) => {
          environments[envName][idx] = e.target.value;
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
    ul.className = 'url-list';
    urls.forEach((url, idx) => {
      ul.appendChild(input(url, idx))
    });
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

  parent.appendChild(input({placeholder: 'PROD', value: envName}));
  parent.appendChild(urlList(environments[envName]));
  parent.appendChild(addButton());
}
