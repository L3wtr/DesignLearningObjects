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

/* Document Ready ----------------------------------------------------------- */
$(document).ready(function() {

  // Set default navbar tab
  location.hash = '#introduction';
  $(".nav li").removeClass('active');
  $("#introduction-tab").addClass('active');

  // Beta modal
  $('#betaModal').modal('show');

  // Disable run simulation on Edge browsers
  if (navigator.userAgent.indexOf('Edge') >= 0){
    $('#edge-hide').prop('hidden', true);
    $('#edge-warning').prop('hidden', false);
  }
});

/* Dynamic onhashchange event ----------------------------------------------- */
window.addEventListener("hashchange", function() {

  // Set active navbar tab
  var tabID = window.location.hash.concat('-tab');

  $(".nav li").removeClass('active');
  $(tabID).addClass('active');

  // Display/hide content based on hash
  var hashID = window.location.hash.concat('-content');

  $("#navbar-content").children().fadeOut(250).promise().done( function() {
    $(hashID).fadeIn(250);
  });
});

/* Switch tab event --------------------------------------------------------- */
$('.nav-tabs span').click(function(){
  // Show tab
  $(this).tab('show');
});

/* Well designed shaft datum radio button group event ----------------------- */
$("#datum-wa, #datum-wb").on('click', function() {

  // Clear previously selected
  $("#datum-wa, #datum-wb").removeClass('btn-info');
  $("#datum-wa, #datum-wb").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');

  // Change drawing source
  var datumVal = $('input[name=Datum-W]:checked').val();

  $('#well-shaft-figure').find("img").each(function() {
    // File path
    var filePath = this.src;

    // Path index up to x.png
    var fileIndex = filePath.length - 5;

    this.src = filePath.substr(0, fileIndex) + datumVal + filePath.substr(fileIndex + 1);
  });

  // Update well datum buttons to match drawing (only affects A)
  if (datumVal === "b") {
    $("#datum-wa").css("top", "31%");
    $("#well-datum-text").text("Datum B")
  }
  else {
    $("#datum-wa").css("top", "40.5%");
    $("#well-datum-text").text("Datum A")
  }
});

/* Poorly designed shaft datum radio button group event --------------------- */
$("#datum-pa, #datum-pb").on('click', function() {

  // Clear previously selected
  $("#datum-pa, #datum-pb").removeClass('btn-info');
  $("#datum-pa, #datum-pb").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');

  // Change drawing source
  var datumVal = $('input[name=Datum-P]:checked').val();

  $('#poor-shaft-figure').find("img").each(function() {
    // File path
    var filePath = this.src;

    // Path index up to x.png
    var fileIndex = filePath.length - 5;

    this.src = filePath.substr(0, fileIndex) + datumVal + filePath.substr(fileIndex + 1);
  });

  // Update poor datum buttons to match drawing
  var display = $('input[name=ToggleDisplay]:checked').val();

  if (datumVal === "b") {
    $("#datum-pa").css("top", "27.5%");
    $("#poor-datum-text").text("Datum B")
    if (display === "axi") {
      $("#datum-pb").css("top", "33%");
    }
  }
  else {
    $("#poor-datum-text").text("Datum A")
    if (display === "axi") {
      $("#datum-pa").css("top", "32%");
      $("#datum-pb").css("top", "32%");
    }
    else {
      $("#datum-pa").css("top", "41%");
    }
  }
});

/* Poorly designed housing fastener radio button group event ---------------- */
$("#datum-ha, #datum-hb").on('click', function() {

  // Clear previously selected
  $("#datum-ha, #datum-hb").removeClass('btn-info');
  $("#datum-ha, #datum-hb").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');

  // Change drawing source
  var datumVal = $('input[name=Datum-H]:checked').val();

  $('#poor-housing-figure').find("img").each(function() {
    // File path
    var filePath = this.src;

    // Path index up to x.png
    var fileIndex = filePath.length - 5;

    this.src = filePath.substr(0, fileIndex) + datumVal + filePath.substr(fileIndex + 1);
  });

  if (datumVal === "b") {
    $("#housing-datum-text").text("Hex Bolt Fasteners");
  }
  else {
    $("#housing-datum-text").text("Pin Fasteners");
  }

  // Update assembly drawing
  $('#simulation-figure').find("img").each(function() {
    // File path
    var filePath = this.src;

    // Path index up to x.png
    var fileIndex = filePath.length - 5;

    this.src = filePath.substr(0, fileIndex) + datumVal + filePath.substr(fileIndex + 1);
  });
});

/* Misalignment drawing radio button group event ---------------------------- */
$("#all-drawing, #axial-drawing, #radial-drawing").on('click', function() {

  // Clear previously selected
  $("#all-drawing, #axial-drawing, #radial-drawing").removeClass('btn-info');
  $("#all-drawing, #axial-drawing, #radial-drawing").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');

  // Change drawing source
  var display = $('input[name=ToggleDisplay]:checked').val();

  $('#well-shaft-figure, #poor-shaft-figure, #spacer-figure, #well-housing-figure, #poor-housing-figure').find("img").each(function() {
    // File path
    var filePath = this.src;

    // Path index up to filename
    var fileIndex = filePath.lastIndexOf("/") + 1;

    this.src = filePath.substr(0, fileIndex) + display + filePath.substr(fileIndex + 3);
  });

  var datumValP = $('input[name=Datum-P]:checked').val();

  switch (display) {
    case "all":
      // Show all well and poor datums if all display
      $("#datum-wa, #datum-wb").show();
      $("#datum-pa, #datum-pb").show();
      $("#datum-ha, #datum-hb").show();

      // Reset poor datum position
      if (datumValP === "a") {
        $("#datum-pa").css("top", "41%");
      }
      $("#datum-pb").css("top", "41%");
      break

    case "axi":
      // Show poor and hide well datums if axial display
      $("#datum-wa, #datum-wb").hide();
      $("#datum-pa, #datum-pb").show();
      $("#datum-ha, #datum-hb").hide();

      // Change poor datum position
      if (datumValP === "a") {
        $("#datum-pa, #datum-pb").css("top", "32%");
      }
      else {
        $("#datum-pb").css("top", "33%");
      }
      break

    case "rad":
      // Hide all well and poor datums if radial display
      $("#datum-wa, #datum-wb").hide();
      $("#datum-pa, #datum-pb").hide();
      $("#datum-ha, #datum-hb").show();
      break
  }
});

/* Misalignment simulation radio button group event ------------------------- */
$("#axial-sim, #radial-sim").on('click', function() {

  // Clear previously selected
  $("#axial-sim, #radial-sim").removeClass('btn-info');
  $("#axial-sim, #radial-sim").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');
});

/* Simulation radio button group event -------------------------------------- */
$("#100units, #1000units, #10000units").on('click', function() {

  // Clear previously selected
  $("#100units, #1000units, #10000units").removeClass('btn-info');
  $("#100units, #1000units, #10000units").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');
});

/* Custom simulation radio button group event ------------------------------- */
$("#100units-custom, #1000units-custom, #10000units-custom").on('click', function() {

  // Clear previously selected
  $("#100units-custom, #1000units-custom, #10000units-custom").removeClass('btn-info');
  $("#100units-custom, #1000units-custom, #10000units-custom").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');
});

/* Simulation run onclick event --------------------------------------------- */
$("#sim-button").on('click', function() {

  var units = $('input[name=Units]:checked').val();

  // Simulate stackup model
  stackup(units, false);
  $("#simulation-plot").hide();

  $("#simulation-settings").fadeOut(250).promise().done( function() {
      $("#simulation-plot").fadeTo(250,100);
      $("#simulation-again").fadeIn(250);
  });
});

/* Custom simulation run onclick event -------------------------------------- */
$("#sim-button-custom").on('click', function() {

  var units = $('input[name=Units-custom]:checked').val();

  // Simulate stackup model
  stackup(units, true);
  $("#simulation-plot-custom").hide();

  $("#simulation-settings-custom").fadeOut(250).promise().done( function() {
      $("#simulation-plot-custom").fadeTo(250,100);
      $("#simulation-again-custom").fadeIn(250);
  });
});

/* Simulation run again onclick event --------------------------------------- */
$("#sim-button-again").on('click', function() {

  var units = $('input[name=Units]:checked').val();

  // Simulate stackup model
  stackup(units, false);
});

/* Custom simulation run again onclick event -------------------------------- */
$("#sim-button-again-custom").on('click', function() {

  var units = $('input[name=Units-custom]:checked').val();

  // Simulate stackup model
  stackup(units, true);
});

/* Simulation reset onclick event ------------------------------------------- */
$("#sim-button-reset").on('click', function() {

  $("#simulation-plot").fadeTo(250,0).promise().done( function() {
    $("#simulation-plot").empty();
  });

  $("#simulation-again").fadeOut(250).promise().done( function() {
    $("#simulation-settings").fadeIn(250);
  });
});

/* Custom simulation reset onclick event ------------------------------------ */
$("#sim-button-reset-custom").on('click', function() {

  $("#simulation-plot-custom").fadeTo(250,0).promise().done( function() {
    $("#simulation-plot-custom").empty();
  });

  $("#simulation-again-custom").fadeOut(250).promise().done( function() {
    $("#simulation-settings-custom").fadeIn(250);
  });

  // Clear table data
  $("#data-table-custom td").empty();

});

/* Custom simulation reset values onclick event ----------------------------- */
$("#bounds-reset").on('click', function() {

  $('#bounds-container input').each(function() {
    // Set bounds values to zero
    $(this).val(0);
  });

});
