
$(function(){
  $('#contents section[id != "tab_c"]').hide();
  $("a").click(function(){
      $('#contents section').hide();

      $($(this).attr("href")).show();

      // $(this).addClass("current");
      $(this).addClass("tab_a_active");
      
      return false;
  });
});

$(function(){
  $("button").click(function(){
      var target = $(this).attr("value");


      $(".filter div").each(function(){
          $(this).animate({"opacity":0},300,function(){
              $(this).hide();

              if($(this).hasClass(target) || target == "all"){
                  $(this).show();
                  $(this).animate({"opacity":1},300);
              }
          });
      });

  });

})


var heart = document.getElementsByClassName('heart_icon');
    // var span = document.getElementsByClassName('count');
    for(var i = 0;i < heart.length; i++){
        // var count;
        (function(i){
            var flag = true;//點擊收藏
            heart[i].onclick = function(){
                if(flag){
                    flag = false;//無收藏被點擊
                    this.className = "fa-solid fa-heart heart_icon active";
                    // ++span[i].innerHTML;
                }else{
                    flag = true//點擊取消收藏
                    this.className = "fa-solid fa-heart heart_icon";
                    // --span[i].innerHTML;
                }
            }  
        })(i);
    } 

// function add() {
//     document.getElementById("myDropdown").classList.toggle("show");
//     }
    
//     window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//               openDropdown.classList.remove('show');
//             }
//           }
//         }
//       } 


function toggleDropdownMenu(addIcon) {
  var group = addIcon.closest('.group'); // 找到包含 addIcon 的最近的 .group 容器
  var dropdownMenu = group.find('.dropdown_menu'); // 使用 jQuery 的 find() 方法尋找 .dropdown_menu 元素
  var flagAdd = true;

  addIcon.onclick = function() {
    if (flagAdd) {
      flagAdd = false;
      dropdownMenu.fadeIn(200); // 使用 jQuery 的 fadeIn() 方法顯示 .dropdown_menu
      } else {
      flagAdd = true;
      dropdownMenu.fadeOut(200); // 使用 jQuery 的 fadeOut() 方法隱藏 .dropdown_menu
    }
    // 可根據需求在這裡添加其他共用功能
  };
}

$(function() {
  var currentMenu = null; // 儲存當前打開的 .dropdown_menu
  var currentIcon = null; // 儲存當前打開的 .add_icon

  $(".dropdown_menu").hide(); // 隱藏所有 .dropdown_menu 元素

  $(".add_icon").click(function() {
    var addIcon = $(this);
    var dropdownMenu = $(this).siblings(".dropdown_menu");
    
    // 如果當前打開的 .dropdown_menu 不是這個被點擊的 .dropdown_menu，就關閉它
    if (currentMenu && currentMenu[0] !== dropdownMenu[0]) {
      currentMenu.fadeOut(200);
      currentIcon.removeClass("active");
    }
    dropdownMenu.fadeToggle(200); // 使用 fadeToggle() 方法切換顯示和隱藏 .dropdown_menu
    currentMenu = dropdownMenu.is(":visible") ? dropdownMenu : null; // 更新當前打開的 .dropdown_menu
    currentIcon = dropdownMenu.is(":visible") ? addIcon : null; // 更新當前打開的 .dropdown_menu
  
    addIcon.toggleClass("active"); // 切換當前 .add_icon 的 active 樣式，來改變顏色
    
  });
});   

var dialog,x;
window.onload=function(){
  dialog=document.getElementById("dialog");
  x=document.getElementById("x");
}
function showDialog(){
  dialog.style.display="block";
}
function hideDialog(){
  dialog.style.display="none";
}