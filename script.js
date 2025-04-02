document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateJobListings(data);
            populateFilterOptions(data);
        });
});

function populateJobListings(jobs, category = "all") {
    const jobListings = document.getElementById("job-listings");
    jobListings.innerHTML = "";

    const filteredJobs = category === "all" ? jobs : jobs.filter(job => job.category === category);

    filteredJobs.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.classList.add("job-card");
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Category:</strong> ${job.category}</p>
        `;
        jobListings.appendChild(jobCard);
    });
}

function populateFilterOptions(jobs) {
    const categories = [...new Set(jobs.map(job => job.category))];
    const filterDropdown = document.getElementById("job-category");

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        filterDropdown.appendChild(option);
    });

    filterDropdown.addEventListener("change", () => {
        populateJobListings(jobs, filterDropdown.value);
    });
}
