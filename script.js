// Add a hover effect to the "Edit Profile" button
const editProfileButton = document.querySelector('.edit-profile');

editProfileButton.addEventListener('mouseover', () => {
    editProfileButton.style.backgroundColor = '#e8e8e8'; // Slightly darker on hover
    editProfileButton.style.cursor = 'pointer'; // Change cursor to a hand
});

editProfileButton.addEventListener('mouseout', () => {
    editProfileButton.style.backgroundColor = '#fafbfc'; // Original color on mouse out
    editProfileButton.style.cursor = 'default'; // Change cursor back to default
});
// Add smooth scrolling to internal links (links that start with #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump

        const targetId = this.getAttribute('href'); // Get the ID to scroll to
        const targetElement = document.querySelector(targetId); // Select the element

        // Smooth scrolling using behavior property
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Fetch and display GitHub repositories dynamically
fetch('https://api.github.com/users/shayanfarshid/repos')
    .then(response => response.json())
    .then(data => {
        const repoGrid = document.querySelector('.repo-grid');

        data.forEach(repo => {
            // Only display public, non-forked repositories
            if (!repo.fork && repo.html_url.includes('shayanfarshid')) {
              const repoCard = document.createElement('div');
              repoCard.classList.add('repo-card');
              repoCard.innerHTML = `
                  <h4 class="repo-title"><a href="${repo.html_url}">${repo.name}</a> <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span></h4>
                  <p class="repo-description">${repo.description || ''}</p>
                  <p class="repo-info">
                      ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
                      ${repo.stargazers_count > 0 ? `<span class="repo-stars">${repo.stargazers_count}</span>` : ''}
                  </p>
              `;
              repoGrid.appendChild(repoCard);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
