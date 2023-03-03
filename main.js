const baseList = document.getElementById('list');
const pagenation = document.getElementById('pagenation')
let pageNum = 1;
const perPage = 10;


//pagenationを作成
function initPagenation () {
  let itemCount = baseList.children.length;
  let navMax = Math.ceil(itemCount / perPage);

  pagenation.innerHTML = '';
  for (let i = 0; i < navMax; i++) {
    const button = document.createElement('button');
    if (i === 0) button.classList.add('_current');
    button.textContent = i + 1;
    pagenation.appendChild(button);
  }
  
}
initPagenation();

function refleshList () {
  for (let i = 0;i<baseList.children.length;i++) {
    const item = baseList.children[i];
    item.classList.remove("_hidden")
    if( perPage * (pageNum - 1) > i || i > perPage * pageNum-1) {
      item.classList.add("_hidden")
    }
  }
}
refleshList();

for (let i = 0;i<pagenation.children.length;i++) {
  const item = pagenation.children[i];
  item.addEventListener('click',(e) => {
    //._currentを付け替え
    for (let j = 0;j < pagenation.children.length; j++) {
      const item = pagenation.children[j];
      item.classList.remove('_current');
    }
    e.target.classList.add('_current');

    //pageNumを更新
    pageNum = i + 1;

    //リストを更新
    refleshList();
  })
}


