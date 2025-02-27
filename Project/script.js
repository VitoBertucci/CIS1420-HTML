// JavaScript for the About Page (about.html)
if (window.location.pathname === '/about.html') {
    
}


// JavaScript for the Home Page (index.html)
if (window.location.pathname === '/index.html') {
    
}

// Remove old page checks and consolidate the code
const projectsContainer = document.getElementById('github-projects');
if (projectsContainer) {
    const githubUsername = 'VitoBertucci';
    const CACHE_DURATION = 3600000; // 1 hour in milliseconds
    
    // Check for cached data
    const cachedData = localStorage.getItem('github_projects');
    const cachedTimestamp = localStorage.getItem('github_projects_timestamp');
    
    if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION)) {
        projectsContainer.innerHTML = cachedData;
    } else {
        projectsContainer.innerHTML = `<div class="loading">Loading projects...</div>`;
        
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'VitoBertucci-Portfolio'
        };

        fetch(`https://api.github.com/users/${githubUsername}/repos`, { headers })
            .then(response => {
                if (response.status === 403) {
                    throw new Error('GitHub API rate limit exceeded. Please try again later.');
                }
                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }
                return response.json();
            })
            .then(async repos => {
                const reposWithLanguages = await Promise.all(
                    repos.map(async repo => {
                        const langResponse = await fetch(repo.languages_url, { headers });
                        const languages = await langResponse.json();
                        return { ...repo, languages };
                    })
                );

                const projectsHTML = reposWithLanguages.map(repo => {
                    // Calculate language percentages
                    const totalBytes = Object.values(repo.languages).reduce((a, b) => a + b, 0);
                    const languagePercentages = Object.entries(repo.languages)
                        .map(([lang, bytes]) => ({
                            name: lang,
                            percentage: ((bytes / totalBytes) * 100).toFixed(1)
                        }))
                        .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

                    // Create language badges HTML
                    const languagesHTML = languagePercentages
                        .map(lang => `
                            <div class="language-badge">
                                <span class="language-name">${lang.name}</span>
                                <span class="language-percentage">${lang.percentage}%</span>
                            </div>
                        `).join('');

                    return `
                        <div class="project-card">
                            <h3>${repo.name}</h3>
                            <div class="languages-used">
                                ${languagesHTML}
                            </div>
                            <p class="project-description">
                                ${repo.description || 'No description available'}
                            </p>
                            <div class="project-links">
                                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    `;
                }).join('');

                projectsContainer.innerHTML = `
                    <div class="project-cards">
                        ${projectsHTML}
                    </div>
                `;

                // Cache the results
                localStorage.setItem('github_projects', projectsContainer.innerHTML);
                localStorage.setItem('github_projects_timestamp', Date.now().toString());
            })
            .catch(error => {
                projectsContainer.innerHTML = `<div class="error">Error loading projects: ${error.message}</div>`;
            });
    }
}

// Update active link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const scrollPosition = window.pageYOffset + window.innerHeight / 3; // Adjust trigger point
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active-link');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Update scroll button functionality with SVG icons
document.querySelectorAll('.scroll-indicator').forEach(button => {
    button.addEventListener('click', () => {
        const container = document.querySelector('.project-cards');
        const cardWidth = 320; // card width + gap
        const scrollAmount = cardWidth * 2; // Scroll two cards at a time
        
        if (button.classList.contains('scroll-left')) {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });
});

// Optional: Hide scroll buttons when not needed
function updateScrollButtons() {
    const container = document.querySelector('.project-cards');
    const leftButton = document.querySelector('.scroll-left');
    const rightButton = document.querySelector('.scroll-right');
    
    if (container) {
        const showLeftButton = container.scrollLeft > 0;
        const showRightButton = container.scrollLeft < (container.scrollWidth - container.clientWidth);
        
        leftButton.style.opacity = showLeftButton ? '1' : '0';
        rightButton.style.opacity = showRightButton ? '1' : '0';
    }
}

// Add scroll event listener to update button visibility
document.querySelector('.project-cards')?.addEventListener('scroll', updateScrollButtons);
// Initial check
updateScrollButtons();

// Cursor effects
document.addEventListener('DOMContentLoaded', () => {

    // Update link hover effects (remove cursor-related classes)
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Keep other hover effects but remove cursor-related ones
        });
        
        link.addEventListener('mouseleave', () => {
            // Keep other hover effects but remove cursor-related ones
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});



