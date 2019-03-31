/* Loading Page ------------------------------------------------------------- */

// Load sidebar 
$.get("sidebar.html", function(sidebarcode){
  $("#sidebar-placeholder").replaceWith(sidebarcode);
});

// Enable Tooltips
$(document).ready(function() {
    $('body').tooltip({
        selector: "[data-tooltip=tooltip]",
        container: "body"
    });
});

/* Switch tab event --------------------------------------------------------- */
$('.nav-tabs span').click(function(){
  // Show tab
  $(this).tab('show');
});

/* Switch shaft radio button group event ------------------------------------ */
$("#sel-straight, #sel-stepped").on('click', function() {

  // Clear previously selected
  $("#sel-straight, #sel-stepped").removeClass('btn-info');
  $("#sel-straight, #sel-stepped").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');
});

/* Switch housing radio button group event ---------------------------------- */
$("#sel-seperated, #sel-merged").on('click', function() {

  // Clear previously selected
  $("#sel-seperated, #sel-merged").removeClass('btn-info');
  $("#sel-seperated, #sel-merged").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');
});
