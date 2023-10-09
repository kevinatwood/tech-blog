const newFormHandler = async (event) => {
  event.preventDefault();


  const body = document.querySelector('#project-desc').value.trim();
  const id = document.querySelector('#submit-btn').dataset.id;
 
  if ( body) {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify({ body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};


const delButtonHandler = async (event) => {
  if (event.target.matches('#delete-btn')) {
    const id = event.target.getAttribute('data-id');
    const postId = document.querySelector('#submit-btn').dataset.id;
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Handle successful delete
      document.location.replace(`/post/${postId}`);
    } else {
      console.log(response)
      // Handle failed delete
      alert("You are only able to delete your own comments");
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.comments')
  .addEventListener('click', delButtonHandler);
