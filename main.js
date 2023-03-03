let list = document.getElementById('list');
const pagenation = document.getElementById('pagenation');
const typeSelect = document.getElementById('typeSelect');
const search = document.getElementById('search');
const searchText = document.getElementById('searchText');
// const searchButton = document.getElementById('searchButton');
let pageNum = 1;
const perPage = 5;


//pagenationを作成
function initPagenation () {
  let itemCount = countTarget();
  let navMax = Math.ceil(itemCount / perPage);
  pageNum = 1;
  pagenation.innerHTML = '';
  for (let i = 0; i < navMax; i++) {
    const button = document.createElement('button');
    if (i === 0) button.classList.add('_current');
    button.textContent = i + 1;
    pagenation.appendChild(button);
  }


  //ページネーションのボタンにイベントを追加
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
}
initPagenation();

function countTarget() {
  let result = 0;
  for (let i = 0;i < list.children.length;i++) {
    if(list.children[i].classList.contains('target')) result++;
  }
  return result;
}

function refleshList () {
  let count = 0;
  for (let i = 0;i<list.children.length;i++) {
    const item = list.children[i];
    item.classList.add("_hidden")
    if (!item.classList.contains("target")) continue;

    if( perPage * (pageNum - 1) <= count && count <= perPage * pageNum-1) {
      item.classList.remove("_hidden")
    }
    count++;
  }
}
refleshList();


function filterByType () {
  const type = typeSelect.value;
  //typeを含むポケモンのliにtargetクラスを付与
  for(let i = 0;i<list.children.length;i++) {
    const item = list.children[i];

    item.classList.remove('target');
    if (item.dataset.type.includes(type) || type === 'すべて') {
      item.classList.add('target')
    }
  }

  initPagenation();
  refleshList();
}

function filterByName() {
  const text = searchText.value;
  //textを含むポケモンのliにtargetクラスを付与
  for(let i = 0;i<list.children.length;i++) {
    const item = list.children[i];

    item.classList.remove('target');
    if (item.childNodes[0].textContent.includes(text)) {
      item.classList.add('target')
    }
  }

  initPagenation();
  refleshList();
}

typeSelect.addEventListener('change',filterByType)
searchButton.addEventListener('click',(e)=> {
  e.preventDefault();

  filterByName();
})