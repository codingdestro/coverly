// Toggle user details form
function toggleEditForm() {
  const form = document.getElementById("updateForm");
  form.classList.toggle("hidden");
}

// Tab switching functionality
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".section-content").forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all tabs
  document.querySelectorAll(".section-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected section
  document.getElementById(`${sectionName}-section`).classList.add("active");

  // Add active class to clicked tab
  event.target.classList.add("active");
}

// Modal functionality
function showModal(type) {
  document.getElementById(`${type}-modal`).classList.add("active");
}

function hideModal(type) {
  document.getElementById(`${type}-modal`).classList.remove("active");
  document.getElementById(`${type}-form`).reset();
}

// Load data functions
async function loadEducation() {
  try {
    await fetch("/api/userDetails/education");
  } catch (error) {
    console.error("Error loading education:", error);
  }
}

async function loadExperience() {
  try {
    await fetch("/api/userDetails/experience");
  } catch (error) {
    console.error("Error loading experience:", error);
  }
}

async function loadSocial() {
  try {
    await fetch("/api/userDetails/social");
  } catch (error) {
    console.error("Error loading social media:", error);
  }
}

// Form submission handlers
async function handleUserDetailsSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      window.location.href = `/dashboard?message=${encodeURIComponent(result.message)}`;
    } else {
      const error = await response.json();
      window.location.href = `/dashboard?error=${encodeURIComponent(error.message)}`;
    }
  } catch (error) {
    console.error("Error submitting user details:", error);
    window.location.href = `/dashboard?error=${encodeURIComponent("Failed to save details")}`;
  }
}

async function handleEducationSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  try {
    const response = await fetch("/api/userDetails/education", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      hideModal("education");
    //   window.location.reload();
    }
  } catch (error) {
    console.error("Error submitting education:", error);
  }
}

async function handleExperienceSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/userDetails/experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      hideModal("experience");
      window.location.reload();
    }
  } catch (error) {
    console.error("Error submitting experience:", error);
  }
}

async function handleSocialSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/userDetails/social", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      hideModal("social");
      window.location.reload();
    }
  } catch (error) {
    console.error("Error submitting social media:", error);
  }
}

// Delete functions
async function deleteEducation(id) {
  if (confirm("Are you sure you want to delete this education entry?")) {
    try {
      const response = await fetch(`/api/userDetails/education/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  }
}

async function deleteExperience(id) {
  if (confirm("Are you sure you want to delete this experience entry?")) {
    try {
      const response = await fetch(`/api/userDetails/experience/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  }
}

async function deleteSocial(id) {
  if (confirm("Are you sure you want to delete this social media entry?")) {
    try {
      const response = await fetch(`/api/userDetails/social/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting social media:", error);
    }
  }
}

// Load data when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadEducation();
  loadExperience();
  loadSocial();
});
