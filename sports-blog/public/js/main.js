$(document).ready(function(){
  $('.delete-category').on('click', function(e){
    $.ajax({
      type: 'DELETE',
      url:'/'
    })

  });
});
