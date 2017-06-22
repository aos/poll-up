$(document).ready(function() {

    let wrapper = $('.user-options');
    let add_button = $('.add-option');

    $(add_button).click(function(event) {
      $(`<div class="input-group"><input class="form-control" type="text" name="options" placeholder="Enter poll option"><span class="input-group-btn"><button class="btn btn-danger" type="button">—</button></span></div>`).insertBefore(add_button);

      $('.input-group-btn').on('click', function(event) {
        $(this).parent().remove();
      })
    })

    $('.clickable-row').on('click', function(e) {
      window.location = $(this).data('href');
    })
    
})