/* 
  絞り込みで対象となったliにtargetを付与する。（初期状態では全てにtargetが付与されている）
  targetがついたものの中でページネーションを機能させる
*/

const PER_PAGE = 10;

const list = document.getElementById('list');
const pagenation = document.getElementById('pagenation');
const pagenationText = document.getElementById('pagenation-text')
const typeSelect = document.getElementById('typeSelect');
let pageNum = 1;


//pagenationを初期化
function initPagenation() {
  let itemCount = countTarget();
  let buttonMax = Math.ceil(itemCount / PER_PAGE);

  pageNum = 1;

  //ページネーションのボタンを作成
  pagenation.innerHTML = '';
  for (let i = 0; i < buttonMax; i++) {
    const button = document.createElement('button');
    if (i === 0) button.classList.add('_current');
    button.textContent = i + 1;
    pagenation.appendChild(button);
  }


  //ページネーションのボタンにイベントを追加
  for (let i = 0; i < pagenation.children.length; i++) {
    const item = pagenation.children[i];
    item.addEventListener('click', (e) => {
      //._currentを付け替え
      for (let j = 0; j < pagenation.children.length; j++) {
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

//リストからtargetクラスを持つアイテムの数を返す関数
function countTarget() {
  let result = 0;
  for (let i = 0; i < list.children.length; i++) {
    if (list.children[i].classList.contains('target')) result++;
  }
  return result;
}

//targetのうち、表示すべきアイテムから_hiddenを除く関数
function refleshList() {
  let count = 0; //targetのループカウンタ
  let start = PER_PAGE * (pageNum - 1);
  let end = Math.min(PER_PAGE * pageNum - 1, countTarget() - 1);
  for (let i = 0; i < list.children.length; i++) {
    const item = list.children[i];
    item.classList.add("_hidden")
    if (!item.classList.contains("target")) continue;

    if (start <= count && count <= end) {
      item.classList.remove("_hidden")
    }
    count++;
  }
  pagenationText.innerText = `${countTarget()}件中、${start + 1} 〜 ${end + 1}件目を表示`
}

//セレクトボックスの値のタイプを持つポケモンにのみtargetクラスを付与
function filterByType() {
  const type = typeSelect.value;
  //typeを含むポケモンのliにtargetクラスを付与
  for (let i = 0; i < list.children.length; i++) {
    const item = list.children[i];

    item.classList.remove('target');
    if (item.dataset.type.includes(type) || type === 'すべて') {
      item.classList.add('target')
    }
  }

  initPagenation();
  refleshList();
}


typeSelect.addEventListener('change', filterByType);

window.addEventListener('DOMContentLoaded', () => {
  initPagenation();
  refleshList();
})