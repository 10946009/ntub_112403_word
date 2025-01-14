
// 教學視窗
function openTutorial() {
  document.getElementById("tutorialoverlayBg").style.display = "block";
  document.getElementById("tutorialWindow").style.display = "block";
  document.documentElement.style.overflow = 'hidden';
}

function closeTutorial() {
  document.getElementById("tutorialoverlayBg").style.display = "none";
  document.getElementById("tutorialWindow").style.display = "none";
  document.documentElement.style.overflow = 'auto';
}



document.addEventListener('DOMContentLoaded', function () {

  const selectedTab = localStorage.getItem('selectedTab');
  if (selectedTab === 'contact') {
    // 先移除之前的 active 状态
    document.getElementById('home-tab').classList.remove('active');
    document.getElementById('home').classList.remove('show', 'active');

    // 添加 active 状态到 contact 选项卡
    document.getElementById('contact-tab').classList.add('active');
    document.getElementById('contact').classList.add('show', 'active');
  }
});

//點了不會有空白 
function saveTabState(tabId, day) {
  var tabs = document.getElementsByClassName('tab-pane');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'none';
  }

  var tab = document.getElementById(tabId);
  tab.style.display = 'block';

  globalDay = day;
  inputBottom();
  checkHasLocationData();
  console.log(globalDay);
  console.log(now_click_attractions);
  //使下面暫存的景點跟著換
}


// 高度一致
// $(function () {
//   var h = 0;
//   $('.item .spottxtdiv').each(function () {

//     if ($(this).height() > h) {
//       h = $(this).height();
//     }

//   });
//   $('.item .spottxtdiv').css('height', h + 'px');
// });



// 翻轉景點排序&推薦

var total_day = document.getElementsByClassName('tab-pane')
var isdoneJourneyVisible = {};
for (var i = 0; i < total_day.length; i++) {
  isdoneJourneyVisible[i + 1] = false;
}
console.log(isdoneJourneyVisible);
function flipped(day = null) {
  if (day === null) {
    day = globalDay;
    
  } else {
    var nextButton = document.getElementById('submitNext-' + day);
    nextButton.style.display = 'none';
    
  }
  const done = document.getElementById('done-' + day);
  const initialLayout = document.getElementById('initialLayout-' + day);
  const flippedBtn = document.getElementById('flippedBtn-' + day);
  const flippedRecBtn = document.getElementById('flippedRecBtn-' + day);
  var saveButton = document.getElementById('saveDays-' + day);
  var nextButton = document.getElementById('submitNext-' + day);

  if (isdoneJourneyVisible[day]) {
    initialLayout.style.height = 'auto';
    initialLayout.classList.remove('hedden');
    done.classList.remove('changeActive');
    setTimeout(() => {
      nextButton.style.display = 'block';
      saveButton.style.display = 'none';
      done.classList.add('hidden');
      initialLayout.classList.add('changeActive');
    }, 50); // 延遲切換，不然會直接跳轉沒有翻轉效果
    flippedBtn.style.display = "block";
    flippedRecBtn.style.display = "none";
  } else {
    nextButton.style.display = 'none';
    saveButton.style.display = 'block';
    initialLayout.style.height = '0';
    initialLayout.classList.remove('changeActive');
    done.classList.remove('hidden');
    setTimeout(() => {
      done.classList.add('changeActive');
    }, 50);
    flippedBtn.style.display = "none";
    flippedRecBtn.style.display = "block";
  }
  isdoneJourneyVisible[day] = !isdoneJourneyVisible[day];
}


// 送出功能整合到clickChangeDone函数中
// 點擊送出會切換到景點排序頁面
function submitNext(day) {
  showRightDiv();
}
function submitAction2(day = null) {
  if (day === null) {
    day = globalDay;
  }
  console.log(day);
  if (!isdoneJourneyVisible[day]) {
    flipped(day);
  }
  showRightDiv();
  submitRecommend();
  var submitNextBtn = document.getElementById('submitNext-' + day);
  submitNextBtn.style.display = 'none';
  console.log(3);
  // 顯示儲存按鈕
  var saveButton = document.getElementById('saveDays-' + day);
  if (saveButton) {
    saveButton.style.display = 'block';
  }

  // 隱藏 submitNext 按鈕
  if (submitNextBtn) {
    submitNextBtn.style.display = 'none';
  }
}


// 收合搜尋景點
var isopenSearchDivVisible = true;
function openSearchDiv() {
  var searchResult = $('.searchResult');
  isopenSearchDivVisible = !isopenSearchDivVisible

  if (isopenSearchDivVisible) {
    searchResult.animate({
      height: "show"
    }, 500);
  } else {
    searchResult.animate({
      height: "hide"
    }, 300);
  }
}

// 收合推薦
var isopenRecDivVisible = true;
function openRecDiv() {

  var openRec = $('.openRec');
  isopenRecDivVisible = !isopenRecDivVisible

  if (isopenRecDivVisible) {
    openRec.animate({
      height: "show"
    }, 500);
  } else {
    openRec.animate({
      height: "hide"
    }, 300);
  }
}

// 收合收藏
var isopenFavDivVisible = true;
function openFavDiv() {

  var openFav = $('.openFav');
  isopenFavDivVisible = !isopenFavDivVisible

  if (isopenFavDivVisible) {
    openFav.animate({
      height: "show"
    }, 500);
  } else {
    openFav.animate({
      height: "hide"
    }, 300);
  }
}



//open篩選
function openfiliter() {
  var showfiliter = document.querySelector(".show_filiter")
  if (showfiliter.style.display === "none" || showfiliter.style.display === "") {
    showfiliter.style.display = "block";
  } else {
    showfiliter.style.display = "none";
  }
}

// pick spot css 點擊景點時
function pickspot(checkbox, aid) {
  console.log(checkbox);

  if (checkbox.classList.contains("pickimg")) {
    checkbox.classList.remove("pickimg");
    now_click_attractions[globalDay].delete(aid);
    console.log(now_click_attractions[globalDay] + '刪除' + aid);
    inputBottom();
  } else {
    checkbox.classList.add("pickimg");
    now_click_attractions[globalDay].add(aid);

    console.log(now_click_attractions[globalDay] + '新增' + aid);
    inputBottom();
  }
}
function order_delete(aid) {
  const done_div = document.getElementById('done-' + globalDay);
  const order_element = done_div.querySelector('.spot[data-id="' + aid + '"]');
  if (order_element.id.includes('blockDone')) {
    const order_id =parseInt(order_element.id.match(/\d+/)[0]);
    let index = blocksOrder[globalDay].indexOf(order_id);
    
    if (index !== -1) {
      blocksOrder[globalDay].splice(index, 1);
    }
  }
  order_element.remove();
  pickspotBottom(aid)
}

// pick spot 刪除下面戰存的景點時
function pickspotBottom(aid) {
  console.log("pickspotBottom");
  now_click_attractions[globalDay].delete(aid);
  try {
    const container = document.getElementById('ch-' + globalDay);
    const elements = container.querySelector('.imgcheck[value="' + aid + '"]');
    const checkimgDIV = elements.closest('.checkimg_div');
    checkimgDIV.classList.remove('pickimg');
  } catch (e) {
    console.log("找不到被pickimg的景點");
  }
  try {
    const rightDiv = document.getElementById('rightDiv');
    const rightElements = rightDiv.querySelector('.imgcheck[value="' + aid + '"]');
    const S_checkimgDIV = rightElements.closest('.S_checkimg_div');
    S_checkimgDIV.classList.remove('pickimg');
  } catch (e) {
    console.log(e);
  }

  inputBottom();
}
var heart = document.getElementsByClassName('heart_icon');
for (var i = 0; i < heart.length; i++) {
  // var count;
  (function (i) {
    var flag = true;//點擊收藏
    heart[i].onclick = function () {
      if (flag) {
        flag = false;//無收藏被點擊
        this.className = "fa-solid fa-heart heart_icon heart_active";
        // ++span[i].innerHTML;
      } else {
        flag = true//點擊取消收藏
        this.className = "fa-solid fa-heart heart_icon";
        // --span[i].innerHTML;
      }
    }
  })(i);
}

// 加入收藏
function addFavorite(itemId) {
  var ss_heart_icon = $("#" + itemId).find(".ss_heart_icon");

  if (!ss_heart_icon.hasClass("heart_active")) {
    ss_heart_icon.addClass("heart_active");
  } else {
    ss_heart_icon.removeClass("heart_active");
  }
}

// 建立行程裡面的收藏
function addCtFavorite(itemId) {
  var ct_heart_icon = $("#" + itemId).find(".ct_heart_icon");

  if (!ct_heart_icon.hasClass("heart_active")) {
    ct_heart_icon.addClass("heart_active");
  } else {
    ct_heart_icon.removeClass("heart_active");
  }
}

function clickeInfo(event, itemId) {
  event.stopPropagation();
  // 這裡這裡的itemId要用你們的編號
  var S_info_icon = $("#" + itemId).find(".info_icon"); // 取得Info_icon按鈕

  if (!S_info_icon.hasClass("info_active")) {
    S_info_icon.addClass("info_active");
  } else {
    S_info_icon.removeClass("info_active");
  }
}

//add選單
function toggleDropdownMenu(addIcon) {
  var group = addIcon.closest('.group'); // 找到包含 addIcon 的最近的 .group 容器
  var dropdownMenu = group.find('.dropdown_menu'); // 使用 jQuery 的 find() 方法尋找 .dropdown_menu 元素
  var flagAdd = true;

  addIcon.onclick = function () {
    if (flagAdd) {
      flagAdd = false;
      dropdownMenu.fadeIn(200);
    } else {
      flagAdd = true;
      dropdownMenu.fadeOut(200);
    }
  };
}
//add dropdown
$(function () {
  $(".dropdown_menu").hide();

  $(".add_icon").click(function () {
    var addIcon = $(this);
    var dropdownMenu = addIcon.siblings(".dropdown_menu");

    // 如果 .dropdown_menu 是可見的，則點擊 .add_icon 會隱藏它，否則顯示它
    dropdownMenu.fadeToggle(200);
    addIcon.toggleClass("active");
  });

  // 點選任意地方時，檢查點擊的目標元素是否位於 .group 內部，若不是則隱藏 .dropdown_menu
  $(document).click(function (event) {
    if (!$(event.target).closest(".group").length) {
      $(".dropdown_menu").fadeOut(200);
      $(".add_icon").removeClass("active");
    }
  });
});


function clickShow(button) {
  const targetBtn = button.getAttribute('data-target');
  const showDiv = document.getElementById(targetBtn);

  if (showDiv.style.display === 'block') {
    showDiv.style.display = 'none';
    button.textContent = '詳細行程';
  } else {
    showDiv.style.display = 'block';
    button.textContent = '關閉預覽';

    const leftButtonRect = button.getBoundingClientRect(); // 获取左侧按钮位置信息
    const rightDiv = showDiv; // 获取右侧区块的引用

    // 设置右侧区块的位置
    rightDiv.style.position = 'absolute';
    rightDiv.style.top = `${leftButtonRect.top}px`; // 根据左侧按钮的位置设置右侧区块的位置

    // 隐藏其他展开区块（可选）
    document.querySelectorAll("[id^='show']").forEach(div => {
      if (div !== showDiv) {
        div.style.display = 'none';
      }
    });

    // 获取所有左侧按钮并更改非当前点击按钮的文本为 "詳細行程"
    const allButtons = document.querySelectorAll("[id^='clickme']");
    allButtons.forEach(btn => {
      if (btn !== button) {
        btn.textContent = '詳細行程';
      }
    });
  }
}


// move blcok(replace 托拽)

//調整順序的初始化
var blocksOrder = [];
function blocksOrderInit() {
  for (var i = 0; i < total_day.length; i++) {
    blocksOrder[i+1]  = [];
    let orderAttractions = document.getElementById('orderAttractions-' + (i + 1));
    let blockElements = orderAttractions.querySelectorAll('.spot');
    let blockCount = blockElements.length;
    // 初始化 blocksOrder 陣列
      for(let j = 1; j <= blockCount; j++){
        blocksOrder[i+1].push(j);
      }
    }
}

function moveBlock(blockDoneId, direction) {
  console.log(blocksOrder[globalDay]);
  console.log(globalDay);
  console.log(blockDoneId);
  let currentIndex = blocksOrder[globalDay].indexOf(parseInt(blockDoneId)); // 取得目前區塊的索引位置
  if (direction === 'up' && currentIndex > 0) {
    let temp = blocksOrder[globalDay][currentIndex];
    console.log('temp'+temp);
    blocksOrder[globalDay][currentIndex] = blocksOrder[globalDay][currentIndex - 1];
    blocksOrder[globalDay][currentIndex - 1] = temp;
    updateBlockPositions("blockDone"+temp,"blockDone"+blocksOrder[globalDay][currentIndex]);
  } else if (direction === 'down' && currentIndex < blocksOrder[globalDay].length - 1) {
    let temp = blocksOrder[globalDay][currentIndex];
    blocksOrder[globalDay][currentIndex] = blocksOrder[globalDay][currentIndex + 1];
    blocksOrder[globalDay][currentIndex + 1] = temp;
    console.log("上blockDone"+blocksOrder[globalDay][currentIndex]+"下blockDone"+blockDoneId);
    
    updateBlockPositions("blockDone"+blocksOrder[globalDay][currentIndex],"blockDone"+blockDoneId);
  }
  
  
}

function updateBlockPositions(updivID,downdivID) { //移動動畫往上
  // Get all block elements
  console.log(downdivID);
  //哪一個區塊進行的移動
  let parent = document.getElementById('orderAttractions-' + globalDay);
  
  let block1 = parent.querySelector("#"+updivID);
  let block2 = parent.querySelector("#"+downdivID);

  // Get the positions of the blocks
  let block1Rect = block1.getBoundingClientRect();
  let block2Rect = block2.getBoundingClientRect();

  // Calculate the difference in positions
  let dx = block2Rect.left - block1Rect.left;
  let dy = block2Rect.top - block1Rect.top;

  // Apply the transition to move the blocks
  block1.style.transform = `translate(${dx}px, ${dy}px)`;
  block2.style.transform = `translate(${-dx}px, ${-dy}px)`;

  // Reset the transformation after the transition ends
  setTimeout(() => {
    block1.style.transform = '';
    block2.style.transform = '';
    rearrangeBlocks();
  }, 300);
  
}

function InputRemainderOrder(num){
  const remainder_attractions_detail_div = document.getElementById('RemainderAttractions-' + globalDay)
  const remainder_attractions = remainder_attractions_detail_div.querySelector('#remainder-' + num);
  const order_attractions_detail_div = document.getElementById('orderAttractions-'+ globalDay);
  console.log(remainder_attractions);
  blocksOrder[globalDay].push(blocksOrder[globalDay].length+1);
  remainder_attractions.id = 'blockDone'+blocksOrder[globalDay].length;
  const originalButtonLayout = remainder_attractions.querySelector('.blockBtnLayout');
  originalButtonLayout.innerHTML = `
  <button class="controlBtn btn_up" onclick="moveBlock('${blocksOrder[globalDay].length}', 'up')"><i class="fa-solid fa-angle-up"></i></button>
  <button class="controlBtn btn_down" onclick="moveBlock('${blocksOrder[globalDay].length}', 'down')"><i class="fa-solid fa-angle-up fa-rotate-180"></i></button>`
  order_attractions_detail_div.appendChild(remainder_attractions);
  rearrangeBlocks();
};



function rearrangeBlocks() {
  let parent = document.getElementById('orderAttractions-' + globalDay);
  let blocks = parent.querySelectorAll('.spot');
  console.log(blocks);
  let orderedBlocks = Array.from(blocks).sort((a, b) => {
    let indexA = parseInt(a.id.match(/\d+/)[0]);
    let indexB = parseInt(b.id.match(/\d+/)[0]);
    console.log(indexA,indexB);
    return blocksOrder[globalDay].indexOf(indexA) - blocksOrder[globalDay].indexOf(indexB);
  });

  // 清空父容器
  parent.innerHTML = '';

  // 重新添加排序后的区块
  orderedBlocks.forEach((block) => {
    parent.appendChild(block);
  });
}



// 定义一个函数来检查全局变量并更新CSS类
function checkAndAddClass() {
  var checkboxes = document.querySelectorAll('label[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    var id = parseInt(checkbox.getAttribute('value'));
    // console.log(globalDay);
    // 如果全局变量中包含 id，添加CSS类
    if (now_click_attractions[globalDay].has(id)) {
      var checkimg_div = checkbox.closest('.checkimg_div');
      // 添加额外的检查，确保 closestColMd6 存在
      if (checkimg_div) {
        checkimg_div.classList.add('pickimg');
      }

    }
  });
}


function inputBottom(day = null) {
  if (day === null) {
    day = globalDay;
  }
  const bottomAttraction = document.getElementById('bottomAttraction')
  console.log("inputBottom" + day + Array.from(now_click_attractions[day]).join(','));
  if (now_click_attractions[day].size == 0) {
    bottomAttraction.innerHTML = "";
  } else {
    $.ajax({
      url: "/attractions",
      type: "GET",
      data: {
        aidlist: Array.from(now_click_attractions[day]).join(','),
      },
      success: function (response) {
        bottomAttraction.innerHTML = response;
      },

      error: function () {
        console.log('推薦回傳有錯誤!!!');
      },
    });
  }
}
// 用來進去翻轉景點排序或推薦景點的部分
function checkHasData() {
  const leftDev = document.querySelectorAll(".changeDone");
  // console.log(leftDev);
  leftDev.forEach(function (container, index) {
    const hasAttractions = container.querySelector('.innerlist');
    if (hasAttractions != null) {
      const containerID = container.id;
      console.log(containerID);
      flipped(containerID.charAt(containerID.length - 1))
    }else{
      openTutorial();
    }
  });
}

function checkHasLocationData() {
  const location = document.querySelectorAll(".hiddenUserLocation");
  console.log(location);
  location.forEach(function (container, index) {
    // console.log(hasAttractions);
    if (container.value != ',') {
      startRecommend(container.value, index)
    }
  });
}

//用來把有的資料放入暫存區
function checkHasDataBottom() {

}

checkHasDataBottom()

