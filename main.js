/**
  絞り込みで対象となったliにtargetを付与する。（初期状態では全てにtargetが付与されている）
  targetがついたものの中でページネーションを機能させる
*/
class MyPagenation {
  constructor (targetList,el,text,perPage) {
    this.targetList = targetList;
    this.el = el;
    this.perPage = perPage;
    this.text = text;
    this.pageNum = 1;
  }

  //pagenationを初期化
  initPagenation() {
    let itemCount = this.countTarget();
    let buttonMax = Math.ceil(itemCount / this.perPage);

    this.pageNum = 1;

    //ページネーションのボタンを作成
    this.el.innerHTML = '';
    for (let i = 0; i < buttonMax; i++) {
      const button = document.createElement('button');
      if (i === 0) button.classList.add('_current');
      button.textContent = i + 1;
      this.el.appendChild(button);
    }

    //ページネーションのボタンにイベントを追加
    for (let i = 0; i < this.el.children.length; i++) {
      const item = this.el.children[i];
      item.addEventListener('click', (e) => {
        //._currentを付け替え
        for (let j = 0; j < this.el.children.length; j++) {
          const item = this.el.children[j];
          item.classList.remove('_current');
        }
        e.target.classList.add('_current');

        //pageNumを更新
        this.pageNum = i + 1;

        //リストを更新
        this.refleshList();
      })
    }
  }

  //リストからtargetクラスを持つアイテムの数を返す関数
  countTarget() {
    let result = 0;
    for (let i = 0; i < this.targetList.children.length; i++) {
      if (this.targetList.children[i].classList.contains('target')) result++;
    }
    return result;
  }

  //targetのうち、表示すべきアイテムから_hiddenを除く関数
  refleshList() {
    let count = 0; //targetのループカウンタ
    let start = this.perPage * (this.pageNum - 1);
    let end = Math.min(this.perPage * this.pageNum - 1, this.countTarget() - 1);
    for (let i = 0; i < this.targetList.children.length; i++) {
      const item = this.targetList.children[i];
      item.classList.add("_hidden")
      if (!item.classList.contains("target")) continue;

      if (start <= count && count <= end) {
        item.classList.remove("_hidden")
      }
      count++;
    }
    this.text.innerText = `${this.countTarget()}件中、${start + 1} 〜 ${end + 1}件目を表示`
  }
}

const typeSelect = document.getElementById('typeSelect');
const list = document.getElementById('list');
const pagenation = document.getElementById('pagenation');
const pagenationText = document.getElementById('pagenation-text')

const shodaiList = document.getElementById('shodaiList');
const shodaiPagenation = document.getElementById('shodaiPagenation');
const shodaiPagenationText = document.getElementById('shodaiPagenation-text');
let pageNum = 1;

window.addEventListener('DOMContentLoaded', () => {
  pokePagenation = new MyPagenation(list, pagenation, pagenationText, 10)
  pokePagenation.initPagenation();
  pokePagenation.refleshList();

  shodaiPokePagenation = new MyPagenation(shodaiList, shodaiPagenation, shodaiPagenationText,7)
  shodaiPokePagenation.initPagenation();
  shodaiPokePagenation.refleshList();
})

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

  pokePagenation.initPagenation();
  pokePagenation.refleshList();
}


typeSelect.addEventListener('change', filterByType);

