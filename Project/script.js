// JavaScript for the About Page (about.html)
if (window.location.pathname === '/about.html') {
    
}


// JavaScript for the Home Page (index.html)
if (window.location.pathname === '/index.html') {
    
}

if (window.location.pathname === '/projects.html') {
    

    /*
    // Replace 'your_username' with your GitHub username
    const githubUsername = 'your_username';

    // Fetch your public GitHub repositories
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=created&direction=desc`)
        .then((response) => response.json())
        .then((repos) => {
            // Create a list of GitHub repositories sorted by creation date
            const githubProjectList = repos.map((repo) => {
                return `
                    <div class="project">
                        <h3>${repo.name}</h3>
                        <p>Category: GitHub Repository</p>
                        <p>Description: ${repo.description}</p>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    </div>
                `;
            });

            // Append GitHub projects to the container
            const githubProjectsContainer = document.getElementById('github-projects');
            githubProjectsContainer.innerHTML = githubProjectList.join('');
        })
        .catch((error) => {
            console.error('Error fetching GitHub data:', error);
            // Handle errors gracefully
            const githubProjectsContainer = document.getElementById('github-projects');
            githubProjectsContainer.innerHTML = 'Cannot fetch GitHub Repositories';
        });
        */
}



