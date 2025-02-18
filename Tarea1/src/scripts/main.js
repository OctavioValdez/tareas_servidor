document.addEventListener('DOMContentLoaded', () => {
    fetch('data/data.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('a-bio').innerHTML = data.buttons.bio
        document.getElementById('a-projects').innerHTML = data.buttons.projects
        document.getElementById('a-skills').innerHTML = data.buttons.skilss
        document.getElementById('a-pro').innerHTML = data.buttons.professional
        document.getElementById('a-lang').innerHTML = data.buttons.languages
        document.getElementById('a-cert').innerHTML = data.buttons.certifications
        document.getElementById('name').innerHTML = data.name
        document.getElementById('title').innerHTML = data.title
        document.getElementById('bio-text').innerHTML = data.bio
      })
      .catch(error => console.error('Error fetching data:', error));
  });