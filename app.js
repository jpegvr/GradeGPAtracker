document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const dashboard = document.getElementById('dashboard');
  const login = document.getElementById('login');
  const signup = document.getElementById('signup');
  const userInfo = document.getElementById('user-info');
  const logout = document.getElementById('logout');
  const gradeForm = document.getElementById('grade-form');
  const gradesList = document.getElementById('grades');
  const gpaDisplay = document.getElementById('gpa');

  // Simulated user data
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    showDashboard(currentUser);
  } else {
    showLoginForm();
  }

  // Show login form
  function showLoginForm() {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    dashboard.classList.add('hidden');
  }

  // Show signup form
  function showSignupForm() {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    dashboard.classList.add('hidden');
  }

  // Show dashboard
  function showDashboard(user) {
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    dashboard.classList.remove('hidden');
    userInfo.textContent = `Welcome, ${user.email}`;
    loadGrades(user.email);
  }

  // Handle login form submission
  login.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      showDashboard(user);
    } else {
      alert('Invalid email or password');
    }
  });

  // Handle signup form submission
  signup.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (users.find(u => u.email === email)) {
      alert('Email already exists');
      return;
    }

    const newUser = { email, password, grades: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showDashboard(newUser);
  });

  // Handle logout
  logout.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    showLoginForm();
  });

  // Handle grade form submission
  gradeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const courseName = document.getElementById('course-name').value;
    const courseGrade = parseFloat(document.getElementById('course-grade').value);

    if (isNaN(courseGrade) || courseGrade < 0 || courseGrade > 100) {
      alert('Please enter a valid grade between 0 and 100');
      return;
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.grades.push({ courseName, courseGrade });
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('users', JSON.stringify(users));
    loadGrades(user.email);
  });

  // Load grades and calculate GPA
  function
