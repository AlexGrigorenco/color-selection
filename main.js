(function(){"use strict"; 

      //const chroma = require("./chroma");

const colmns = document.querySelectorAll('.colmn');

setRandomColors(true);

document.addEventListener('keydown', function(event){
  event.preventDefault();
  if(event.code.toLowerCase() === 'space' || event.code.toLowerCase() === 'enter'){
    setRandomColors()
  }
});

document.addEventListener('click', function(event){
  const action = event.target.dataset.action;

  if(action === 'locker'){
    const node = event.target.tagName.toLowerCase() ==='i' ? event.target : event.target.children[0];
    
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  }else if(action === 'copy'){
    copyColorCode(event.target.textContent);

    event.target.classList.add('show__copy');
    setTimeout(function(){
      event.target.classList.remove('show__copy');
    }, 300)
  }else if(action === 'change-color'){
    setRandomColors();
  }
})

function setRandomColors(isInitial){
  const colors = isInitial ? getColorFromHash() : [];
  colmns.forEach((col, index) => {
    
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const colLock = col.querySelector('i').classList.contains('fa-lock');

    if(colLock){
      colors.push(text.textContent)
      return
    }

    const color = isInitial ? colors[index] ? colors[index] : chroma.random().toString().toUpperCase() : chroma.random().toString().toUpperCase();

    if(!isInitial){
      colors.push(color)
    }

    col.style.background = color;
    text.innerText = color;

    setTextColor(text, color);
    setTextColor(button, color)
  })
  setColorHash(colors);
};

function setColorHash(colors = []){
  document.location.hash = colors.map(function(clr){
    return clr.substring(1)
  }).join('-');
}

function copyColorCode(text){
  navigator.clipboard.writeText(text);
};

function setTextColor(text, color){
  const lum = chroma(color).luminance();
  text.style.color = lum > 0.5 ? 'black' : 'white'
}

function getColorFromHash() {
  if(document.location.hash.length > 1){
    console.log(document.location.hash.substring(1).split('-').map(arrayObj => '#' + arrayObj));
    return document.location.hash.substring(1).split('-').map(col => '#' + col);
  };
  return []
}


//**========================================== 

function generateRandomColor(){
  //RGB
  //#FF0000
  //#00FF00
  //#0000FF

  const hexCodes = '0123456789ABCDEF';
  let color = '';

  for(let i = 0; i < 6; i++){
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }

  return '#' + color
}

})();
