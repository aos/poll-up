$(document).ready(function() {

    let wrapper = $('.user-options');
    let add_button = $('.add-option');

    $(add_button).click(function(event) {
      let y = $('input').length - 2;
      $(`<div class="input-group"><input class="form-control" type="text" name="options-${y++}" placeholder="Enter poll option"><span class="input-group-btn"><button class="btn btn-danger" type="button">—</button></span></div>`).insertBefore(add_button);
      event.stopPropagation();

      $('.input-group-btn').on('click', function(e) {
        $(this).parent().remove();
        e.stopPropagation();
      })
    })
    
})