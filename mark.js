// TODO
const environments = {
  prod: [],
};


const prefix = 'THIS IS ';

function markEnvironment(envLabel, envUrls) {
  if (envUrls.includes(window.location.origin)) {
    const labelTag = `[${envLabel.toUpperCase()}]`;

    const emphasis = document.createElement('span');
    emphasis.classList.add('this-is-prod--emphasis');
    emphasis.innerText = labelTag;

    const message = document.createElement('div');
    message.classList.add('this-is-prod--message');
    message.innerHTML = prefix;
    message.setAttribute('data-text', `${prefix}${labelTag}`);
    message.appendChild(emphasis);

    const wrapper = document.createElement('div');
    wrapper.classList.add('this-is-prod--wrapper');
    wrapper.appendChild(message);

    const styleSheet = document.createElement('style');
    styleSheet.innerText = ''
        + '.this-is-prod--wrapper{position:sticky;top:0;z-index:9000;display:flex;padding:8px;background-color:blue;box-shadow:40px 4px 0 0 magenta;}'
        + '.this-is-prod--message{position:relative;margin:0 auto;width:auto;font-family:"Consolas","Menlo","Inconsolata",monospace;font-size:18px;color:#ff0c;text-shadow:0 0 1px #ff06,0 0 2px #fffc;}'
        + '.this-is-prod--message:before,.this-is-prod--message:after{position:absolute;top:0;overflow:hidden;clip:rect(0,900px,0,0);content:attr(data-text);background:blue;color:yellow;white-space:nowrap}'
        + '.this-is-prod--message:before{left:-2px;text-shadow:1px 0 cyan;animation:noise1 3s infinite linear alternate-reverse;}'
        + '.this-is-prod--message:after{left:2px;text-shadow:-1px 0 magenta;animation:noise2 2s infinite linear alternate-reverse;}'
        + '.this-is-prod--emphasis{color:white;}'
        + '@keyframes noise1 {0%{clip:rect(64px,9999px,23px,0);}5%{clip:rect(71px,9999px,11px,0);}10%{clip:rect(81px,9999px,3px,0);}15%{clip:rect(74px,9999px,25px,0);}20%{clip:rect(77px,9999px,68px,0);}25%{clip:rect( 2px,9999px,99px,0);}30%{clip:rect(87px,9999px,77px,0);}35%{clip:rect(38px,9999px,72px,0);}40%{clip:rect(59px,9999px,13px,0);}45%{clip:rect(12px,9999px,48px,0);}50%{clip:rect(52px,9999px,97px,0);}55%{clip:rect(61px,9999px,94px,0);}60%{clip:rect(98px,9999px,51px,0);}65%{clip:rect(19px,9999px,92px,0);}70%{clip:rect(82px,9999px,81px,0);}75%{clip:rect(12px,9999px,34px,0);}80%{clip:rect(97px,9999px,33px,0);}85%{clip:rect(67px,9999px,58px,0);}90%{clip:rect(12px,9999px,88px,0);}95%{clip:rect(83px,9999px,7px,0);}100%{clip:rect(99px,9999px,71px,0);}}'
        + '@keyframes noise2 {0%{clip:rect(10px,9999px,64px,0);}5%{clip:rect(68px,9999px,76px,0);}10%{clip:rect(28px,9999px,88px,0);}15%{clip:rect(82px,9999px,42px,0);}20%{clip:rect(66px,9999px,49px,0);}25%{clip:rect(68px,9999px,25px,0);}30%{clip:rect(98px,9999px,49px,0);}35%{clip:rect(95px,9999px,10px,0);}40%{clip:rect(19px,9999px,67px,0);}45%{clip:rect(98px,9999px,97px,0);}50%{clip:rect(10px,9999px,95px,0);}55%{clip:rect(48px,9999px,5px,0);}60%{clip:rect(99px,9999px,37px,0);}65%{clip:rect(28px,9999px,37px,0);}70%{clip:rect(90px,9999px,86px,0);}75%{clip:rect(22px,9999px,55px,0);}80%{clip:rect(79px,9999px,87px,0);}85%{clip:rect(36px,9999px,2px,0);}90%{clip:rect(14px,9999px,30px,0);}95%{clip:rect(86px,9999px,37px,0);}100%{clip:rect(23px,9999px,64px,0);}}'
        + '';

    /* noise based on SCSS taken from https://codepen.io/lbebber/pen/ypgql
    @keyframes noise-anim{
      $steps:20;
      @for $i from 0 through $steps{
        #{percentage($i*(1/$steps))}{
          clip:rect(random(100)+px,9999px,random(100)+px,0);
        }
      }
    }
     */

    document.body.insertBefore(wrapper, document.body.children[0]);
    document.body.insertBefore(styleSheet, document.body.children[0]);
  }
}

Object.entries(environments).forEach(env => markEnvironment(...env));
