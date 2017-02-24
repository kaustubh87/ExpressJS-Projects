$(document).ready(() => {
  $('.delete-todo').on('click', (e) =>{
     $link_id = $(e.target);
     const id = $link_id.attr('data-id');
     $.ajax({
       type:'DELETE',
       url:'/todo/delete/' +id,
       success: (response) => {
         window.location.href= '/';
       },
       error: (error) => {
         console.log(error);
       }
     });
  });
});
