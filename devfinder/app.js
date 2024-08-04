const baseUrl = "https://api.github.com/users/";
const defaultUser = "aqibowais";

const toggleButton = document.querySelector(".toggle");

document.addEventListener("DOMContentLoaded", () => {
  getUserDetail(defaultUser);

  const savedMode = localStorage.getItem('mode')
  if(savedMode){
    document.body.classList.add(savedMode)
  }
});

function getUserDetail(username) {
  const url = `${baseUrl}${username}`;
  const userDetails = document.querySelector(".user-details");

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then((data) => {
      userDetails.innerHTML = `
                <div class="user-img">
                    <img src="${data.avatar_url}" alt="User Avatar">
                </div>
                <div class="data">
                    <div class="uname">
                        <div class="name">
                            ${data.login}
                            <br>
                            <a href="${data.html_url}">${
        data.name || "No name provided"
      }</a>
                        </div>
                        <div class="date">
                            <h3>Joined ${new Date(
                              data.created_at
                            ).toLocaleDateString()}</h3>
                        </div>
                    </div>
                    <div class="repos">
                        <ul>Repos <br> ${data.public_repos}</ul>
                        <ul>Followers <br> ${data.followers}</ul>
                        <ul>Following <br> ${data.following}</ul>
                    </div>
                    <div class="links">
                        <ul><i class="fa-solid fa-location-dot"></i> ${
                          data.location || "No location"
                        } <br><br> <i class="fa-brands fa-twitter"></i> ${
        data.twitter_username || "No Twitter"
      }</ul>
                        <ul><i class="fa-solid fa-link"></i> <a href="${
                          data.html_url
                        }">${
        data.html_url
      }</a> <br><br><i class="fa-solid fa-building"></i> <a href="${
        data.html_url
      }">Github</a></ul>
                    </div>
                </div>
            `;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      document.querySelector(".user-details").innerHTML = `
                <p>No user found. Please try another username.</p>
            `;
    });
}
function toggleMode() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  const newMode = isDarkMode ? "dark-mode" : "light-mode";
  localStorage.setItem('mode',newMode);
  toggleButton.innerHTML = isDarkMode
    ? 'Light <span><i class="fas fa-sun"></i></span>'
    : 'Dark <span><i class="fas fa-moon"></i></span>';
}
