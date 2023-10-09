const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#project-name').value.trim();
  const body = document.querySelector('#project-desc').value.trim();

  if (title && body) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.matches('#delete-btn')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

const updateBtnHandler = (evt) => {
  if (evt.target.matches('#update-btn')) {
    const id = evt.target.getAttribute('data-id');
  document.location.replace(`/update/${id}`)
  }
}

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.project-list')
  .addEventListener('click', updateBtnHandler);
