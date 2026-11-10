(function(){
  'use strict';
  var begin = document.getElementById('begin');
  var mic = document.getElementById('mic');
  var theme = document.getElementById('theme');
  var hint = document.getElementById('orb-center-label');
  var body = document.body;
  if (begin && mic) begin.addEventListener('click', function(){ mic.click(); });
  function updateTheme(){
    body.dataset.theme = theme.getAttribute('aria-checked') === 'true' ? 'dark' : 'light';
    var meta = document.querySelector('meta[name="theme-color"]');
    if(meta)meta.content = body.dataset.theme === 'dark' ? '#02090e' : '#EFE2C8';
  }
  updateTheme();
  new MutationObserver(updateTheme).observe(theme,{attributes:true,attributeFilter:['aria-checked']});
  window.addEventListener('orb:language',function(e){
    var names={en:'ENGLISH',de:'DEUTSCH',fr:'FRANÇAIS'};
    if(hint)hint.innerHTML = (names[e.detail.language]||'YOUR LANGUAGE')+' SELECTED <span>✦</span>';
  });
  var state=document.getElementById('state');
  if(state && hint){
    new MutationObserver(function(){
      var listening = /Listening/i.test(state.textContent);
      if(listening)hint.innerHTML='LISTENING TO YOU <span>◉</span>';
      else if(/Idle/i.test(state.textContent) && !window.orb?.getLanguage())hint.innerHTML='TAP TO BEGIN <span>↗</span>';
    }).observe(state,{childList:true,characterData:true,subtree:true});
  }
})();
