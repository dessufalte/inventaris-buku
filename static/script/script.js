var $sidebar = $("#sidebar");
var $mains = $("#main");

$(".sidebarToggle").click(function () {
  toggleSidebar();
});

toggleSidebar = () =>{
  $($sidebar).toggleClass("-translate-x-56");
  // $($mains).toggleClass("ml-56");
}