// Configure axios defaults
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common["Content-Type"] = "application/json";
const userLogin = document.getElementById("user-login");
const userSignup = document.getElementById("user-signup");

const signupButton = document.getElementById("signup");
const signupToggle = document.getElementById("signup-toggle");
const loginToggle = document.getElementById("login-toggle");

userLogin.style.display = "none";
userSignup.style.display = "none";

//authen the user on first load
(async () => {
  try {
    const { token } = await chrome.storage.local.get("token");
    const response = await axios.post(
      "/api/authenticate",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.user) {
      chrome.storage.local.set({
        user: response.data.user,
      });
      userLogin.style.display = "none";
    } else {
      chrome.storage.local.remove("user");
      userLogin.style.display = "flex";
    }
  } catch (error) {
    console.log("Failed to authenticate user:", error);
    chrome.storage.local.remove("user");
    userLogin.style.display = "flex";
  }
})();

//login button
const loginButton = document.getElementById("login");

loginButton.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await axios.post("/api/login", { email, password });

    if (response.data) {
      chrome.storage.local.set({
        token: response.data.token,
      });
      chrome.storage.local.set({
        token: response.data.token,
        user: response.data.user,
      });
      userLogin.style.display = "none";
    } else {
      console.log("Login failed:", response.data.message);
    }
  } catch (error) {
    console.log("Login error:", error);
  }
});

//login toggle

loginToggle.addEventListener("click", () => {
  userLogin.style.display = "none";
  userSignup.style.display = "flex";
});

//signup toggle

signupToggle.addEventListener("click", () => {
  userLogin.style.display = "flex";
  userSignup.style.display = "none";
});

//signup button

signupButton.addEventListener("click", async () => {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) {
    alert("Please fill all the fields");
    return;
  }

  try {
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
    });

    if (response.data.user) {
      console.log("Registration successful:", response.data.user);
      chrome.storage.local.set({
        user: response.data.user,
        token: response.data.token,
      });
      // Switch back to login view
      userSignup.style.display = "none";
      userLogin.style.display = "none";
      // You can add success message display here
    } else {
      console.log("Registration failed:", response.data.message);
      // You can add error message display here
    }
  } catch (error) {
    console.log("Registration error:", error);
  }
});

// Resume form handling
const resumeForm = document.getElementById("resume-form");

let educationCount = 1;

function toggleEndDate(checkbox) {
  const endDateInput = checkbox.closest('.date-field').querySelector('input[type="month"]');
  endDateInput.disabled = checkbox.checked;
  if (checkbox.checked) {
    endDateInput.value = '';
  }
}

function removeEducation(button) {
  const entry = button.closest('.education-entry');
  entry.style.opacity = '0';
  setTimeout(() => {
    entry.remove();
    updateEducationNumbers();
  }, 300);
}

function updateEducationNumbers() {
  const entries = document.querySelectorAll('.education-entry');
  entries.forEach((entry, index) => {
    entry.querySelector('h4').textContent = `Education #${index + 1}`;
    entry.dataset.entryId = index;
  });
  educationCount = entries.length;
}

function createEducationEntry() {
  educationCount++;
  const template = document.querySelector('.education-entry').cloneNode(true);
  template.dataset.entryId = educationCount - 1;
  template.querySelector('h4').textContent = `Education #${educationCount}`;
  
  // Clear all input values
  template.querySelectorAll('input, textarea').forEach(input => {
    input.value = '';
    if (input.type === 'checkbox') {
      input.checked = false;
    }
    if (input.type === 'month') {
      input.disabled = false;
    }
  });
  
  return template;
}

document.getElementById('add-education-btn').addEventListener('click', () => {
  const container = document.getElementById('education-container');
  const newEntry = createEducationEntry();
  
  // Add with animation
  newEntry.style.opacity = '0';
  container.appendChild(newEntry);
  requestAnimationFrame(() => {
    newEntry.style.opacity = '1';
  });
});

// Update form submission to handle dynamic education entries
resumeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const educationEntries = Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
    institution: entry.querySelector('input[name="institution"]').value,
    degree: entry.querySelector('input[name="degree"]').value,
    major: entry.querySelector('input[name="major"]').value,
    gpa: entry.querySelector('input[name="gpa"]').value,
    startDate: entry.querySelector('input[name="start_date"]').value,
    endDate: entry.querySelector('input[name="current"]').checked ? 'Present' : 
             entry.querySelector('input[name="end_date"]').value,
    achievements: entry.querySelector('textarea[name="achievements"]').value,
    isCurrently: entry.querySelector('input[name="current"]').checked
  }));

  const formData = {
    fullName: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    location: document.getElementById("location").value,
    summary: document.getElementById("summary").value,
    experience: document.getElementById("experience").value,
    education: educationEntries
  };

  try {
    const { token } = await chrome.storage.local.get("token");
    const response = await axios.post(
      "/api/resume",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      // Save to chrome storage
      await chrome.storage.local.set({
        resumeData: formData
      });
      
      // Show success message
      alert("Resume details saved successfully!");
    } else {
      alert("Failed to save resume details. Please try again.");
    }
  } catch (error) {
    console.error("Error saving resume details:", error);
    alert("An error occurred while saving your resume details. Please try again.");
  }
});

// Load saved resume data when popup opens
(async () => {
  try {
    const { resumeData } = await chrome.storage.local.get("resumeData");
    if (resumeData) {
      // Populate form fields with saved data
      document.getElementById("full-name").value = resumeData.fullName || "";
      document.getElementById("email").value = resumeData.email || "";
      document.getElementById("phone").value = resumeData.phone || "";
      document.getElementById("location").value = resumeData.location || "";
      document.getElementById("summary").value = resumeData.summary || "";
      document.getElementById("experience").value = resumeData.experience || "";
      await loadSavedEducationData(resumeData.education);
    }
  } catch (error) {
    console.error("Error loading resume data:", error);
  }
})();

async function loadSavedEducationData(educationData) {
  const container = document.getElementById('education-container');
  container.innerHTML = ''; // Clear existing entries
  
  if (Array.isArray(educationData)) {
    educationData.forEach((edu, index) => {
      const entry = index === 0 ? 
        container.querySelector('.education-entry') || createEducationEntry() : 
        createEducationEntry();
      
      entry.querySelector('input[name="institution"]').value = edu.institution || '';
      entry.querySelector('input[name="degree"]').value = edu.degree || '';
      entry.querySelector('input[name="major"]').value = edu.major || '';
      entry.querySelector('input[name="gpa"]').value = edu.gpa || '';
      entry.querySelector('input[name="start_date"]').value = edu.startDate || '';
      
      const currentCheckbox = entry.querySelector('input[name="current"]');
      const endDateInput = entry.querySelector('input[name="end_date"]');
      
      if (edu.isCurrently) {
        currentCheckbox.checked = true;
        endDateInput.disabled = true;
      } else {
        endDateInput.value = edu.endDate || '';
      }
      
      entry.querySelector('textarea[name="achievements"]').value = edu.achievements || '';
      
      if (index === 0) {
        container.appendChild(entry);
      } else {
        entry.style.opacity = '0';
        container.appendChild(entry);
        requestAnimationFrame(() => {
          entry.style.opacity = '1';
        });
      }
    });
    
    updateEducationNumbers();
  }
}
