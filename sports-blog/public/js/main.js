$(document).ready(() => {
  $('.delete-category').on('click', (e) => {
    $target = $(e.target);
    $.ajax({
      type: 'DELETE',
      url:'/categories/delete/' +$target.attr('data-cat-id'),
      success: (response) => {
        alert('Category removed');
        //window.location.href='/';
      },
      error: (error) => {
        console.log(error);
      }
      });
    });
  });
