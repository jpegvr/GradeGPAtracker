document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const dashboard = document.getElementById('dashboard');
  const login = document.getElementById('login');
  const userInfo = document.getElementById('user-info');
  const logout = document.getElementById('logout');

  // Simulated user data
  const users = [
    { email: 'user@example.com', password: 'password123' }
  ];

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
    dashboard.classList.add('hidden');
  }

  // Show dashboard
  function showDashboard(user) {
    loginForm.classList.add('hidden');
    dashboard.classList.remove('hidden');
    userInfo.textContent = `Welcome, ${user.email}`;
  }

  // Handle login form submission
  login.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      showDashboard(user);
    } else {
      alert('Invalid email or password');
    }
  });

  // Handle logout
  logout.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    showLoginForm();
  });
});
