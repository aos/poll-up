$(document).ready(function() {

  let $add_button = $('.add-option');

  $add_button.click(function(event) {
      $(`<div class="input-group"><input class="form-control poll-form-input" type="text" name="options" placeholder="Enter poll option"><span class="input-group-btn"><button class="btn btn-danger" type="button">—</button></span></div>`).insertBefore($add_button);

      // Limit options to 5
      if ($('input').length > 7) {
        $add_button.prop('disabled', true);
        $('<span class="max-warning" style="color: red; font-size: 12px; margin-left: 20px;">You\'ve reached the max number of options!</span>').insertAfter($add_button);
      }

    $('.input-group-btn').on('click', function(event) {
      $add_button.prop('disabled', false);
      $('.max-warning').remove();
      $(this).parent().remove();
    })
  })

  $('.clickable-row').on('click', function(e) {
    window.location = $(this).data('href');
  })

})