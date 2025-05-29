/* DEGUB */
let debug = false;
if (debug == true) {
  console.log("debug mode");
  const containers = document.querySelectorAll(".container");

  containers.forEach((container) => {
    container.style.border = "1px solid red";
  });
}

/* GET DOM COMPONENTS */
const footerYear = document.querySelector("span#auto-year");
const repoList = document.getElementById("repos");
const btnToggleNavbar = document.querySelector("button#toggle-navbar");
const btnGoTop = document.querySelector("a#goTopBtn");
const profilePhoto = document.querySelector("img#myPfp");
const myAge = document.querySelector("span#myAge");
const todayDay = new Date().getUTCDate();

/* GITHUB VARIABLES */
const username = "SorenKazam";
const githubAPI = `https://api.github.com/users/${username}/repos`;
const dayKey = "githubDayVisited";
const dataKey = "githubData";

/* AUDIOS */
const popSoundFX = new Audio("./assets/sound/pop.wav");
const barrelRollSound = new Audio(
  "./assets/sound/RickAstley-NeverGonnaGiveYouUp.mp3"
);

/* EASTER EGG */
var clickCounter = 0;
var musicStarted = false;

/* CALCULATE MY AGE DYNAMIC */
function calculateMyAge() {
  const birthDate = new Date("1999-08-31");
  const today = new Date();
  const age = today.getUTCFullYear() - birthDate.getUTCFullYear();

  myAge.textContent = age;
}

calculateMyAge();

/* DYNAMIC FOOTER YEAR */
footerYear.textContent = new Date().getUTCFullYear();

/* PROFILE PHOTO EVENTS */
profilePhoto.addEventListener("click", () => {
  /* POP SOUND FX */
  popSoundFX.currentTime = 0;
  popSoundFX.play();

  clickCounter = clickCounter + 1;

  if (clickCounter >= 100) {
    profilePhoto.src = "./assets/images/rick.gif";
    profilePhoto.classList.add("doBarrelRoll");
    profilePhoto.style.position = "absolute";

    /* WHEN MUSIC IS OVER */
    barrelRollSound.addEventListener("ended", () => {
      clickCounter = 0;
      musicStarted = false;
      window.alert("Why did you stayed so long?");
      profilePhoto.src = "./assets/images/portrait.png";
      profilePhoto.classList.remove("doBarrelRoll");
      profilePhoto.style.position = "static";
    });
    if (!musicStarted) {
      barrelRollSound.play();
    }
  } else {
    if (profilePhoto.src.includes("portrait.png")) {
      profilePhoto.src = "./assets/images/46906203.png"; // Caminho para a outra imagem
    } else {
      profilePhoto.src = "./assets/images/portrait.png"; // Volta para a imagem original
    }
  }
});

btnToggleNavbar.addEventListener("click", () => {
  const navbarItems = document.querySelector("div#nav-items");
  navbarItems.classList.toggle("hidden");
});

/* GITHUB HEAVY STUFF */
function fetchGitHubData() {
  console.error("🛑 A GITHUB REQUEST WAS MADE!");
  fetch(githubAPI)
    .then((res) => res.json())
    .then((data) => {
      // Guarda no localStorage
      localStorage.setItem("lastDayVisited", todayDay);
      localStorage.setItem("githubData", JSON.stringify(data));
      displayRepos(data); // Função que mostra os repositórios
    })
    .catch((err) =>
      console.error(
        "❗An error occurred when trying to fetch data from githubErro ao buscar dados do GitHub:",
        err
      )
    );
}

// Função para exibir os repositórios
function displayRepos(repos) {
  /* Creating repo display render */
  const githubRepoList = document.querySelector("div#githubRepoList");

  /* Reseting list */
  githubRepoList.innerHTML = "";

  repos.forEach((repo) => {
    /* REPO needs to have a name, description, language and pages link to be rendered! */
    if (!repo.name || !repo.description || !repo.language || !repo.html_url) {
      return;
    }

    /* REPO BOX */
    const repoBox = document.createElement("div");
    repoBox.className = "repoBox";
    repoBox.id = "repoBox";

    /* REPO BOX BASIC INFO SECTION */
    const repoBoxBasicInfo = document.createElement("section");
    repoBoxBasicInfo.className = "basicInfo";
    repoBoxBasicInfo.id = "basicInfo";
    repoBox.appendChild(repoBoxBasicInfo);

    /* REPO BOX TITLE */
    const repoBoxTitle = document.createElement("h3");
    repoBoxTitle.className = "repoInfoName";
    repoBoxTitle.id = "repoInfoName";
    repoBoxBasicInfo.appendChild(repoBoxTitle);

    /* REPO BOX TITLE LINK */
    const repoBoxTitleLink = document.createElement("a");
    repoBoxTitleLink.href = repo.html_url;
    repoBoxTitleLink.target = "_blank";
    repoBoxTitleLink.rel = "noopener noreferrer";
    repoBoxTitleLink.className = "repoInfoURL";
    repoBoxTitleLink.id = "repoInfoURL";
    repoBoxTitleLink.textContent = "🔗 " + repo.name;
    repoBoxTitle.appendChild(repoBoxTitleLink);

    /* REPO BOX DESCRIPTION */
    const repoBoxDescription = document.createElement("p");
    repoBoxDescription.className = "repoInfoDescription";
    repoBoxDescription.id = "repoInfoDescription";
    repoBoxDescription.textContent = repo.description;
    repoBoxBasicInfo.appendChild(repoBoxDescription);

    /* REPO BOX MORE INFO SECTION */
    const repoBoxMoreInfo = document.createElement("section");
    repoBoxMoreInfo.className = "moreInfo";
    repoBoxMoreInfo.id = "moreInfo";
    repoBox.appendChild(repoBoxMoreInfo);

    /* REPO BOX MORE INFO LANGUAGE */
    const repoBoxMoreInfoLanguage = document.createElement("span");
    repoBoxMoreInfoLanguage.className = "repoInfoLanguage";
    repoBoxMoreInfoLanguage.id = "repoInfoLanguage";
    repoBoxMoreInfoLanguage.textContent = "🛠️ " + repo.language;
    repoBoxMoreInfo.appendChild(repoBoxMoreInfoLanguage);

    /* REPO BOX MORE INFO STARS */
    const repoBoxMoreInfoStars = document.createElement("span");
    repoBoxMoreInfoStars.className = "repoInfoStars";
    repoBoxMoreInfoStars.id = "repoInfoStars";
    repoBoxMoreInfoStars.textContent = "⭐ " + repo.stargazers_count;
    repoBoxMoreInfo.appendChild(repoBoxMoreInfoStars);

    /* REPO BOX MORE INFO LINK TO PAGES */
    const repoBoxMoreInfoLinkPages = document.createElement("a");
    repoBoxMoreInfoLinkPages.href = repo.homepage;
    repoBoxMoreInfoLinkPages.target = "_blank";
    repoBoxMoreInfoLinkPages.rel = "noopener noreferrer";
    repoBoxMoreInfoLinkPages.className = "repoInfoPagesURL";
    repoBoxMoreInfoLinkPages.id = "repoInfoPagesURL";
    repoBoxMoreInfoLinkPages.textContent = "👁️ Preview";
    repoBoxMoreInfo.appendChild(repoBoxMoreInfoLinkPages);

    /* Insert it in the list */
    githubRepoList.appendChild(repoBox);
  });
}

// Verifica se é necessário buscar ou usar cache
if (
  localStorage.getItem("lastDayVisited") == todayDay &&
  localStorage.getItem("githubData")
) {
  console.log("✅ Using localStorage data..");
  const cachedData = JSON.parse(localStorage.getItem(dataKey));
  displayRepos(cachedData);
} else {
  console.log("Buscando novos dados do GitHub...");
  fetchGitHubData();
}

/* DETECTING IF USER SCROLLS THE PAGE */
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY || window.pageYOffset;

  /* DETECTING IF USER SCROLLS A CERTAIN NUMBER OF PIXELS DOWN */
  if (scrollPosition > 200) {
    btnGoTop.style.display = "block";
  } else {
    btnGoTop.style.display = "none";
  }
});

/* FLOATING ICONS */
const baseIcons = document.querySelectorAll(".floating-icons .icon");
const floatingContainer = document.querySelector(".floating-icons");

function spawnBubble() {
  // Escolher aleatoriamente uma das imagens base
  const randomIcon =
    baseIcons[Math.floor(Math.random() * baseIcons.length)].cloneNode(true);

  // Gerar posições aleatórias (em porcentagem da tela)
  const startX = Math.random() * 100 + "vw";
  const startY = Math.random() * 100 + "vh";
  const endX = Math.random() * 100 + "vw";
  const endY = Math.random() * 100 + "vh";
  const scale = Math.random() * 0.5 + 0.75; // Escala entre 0.75 e 1.25
  const duration = Math.random() * 15 + 10 + "s"; // Entre 10s e 25s

  // Definir propriedades CSS personalizadas
  randomIcon.style.setProperty("--start-x", startX);
  randomIcon.style.setProperty("--start-y", startY);
  randomIcon.style.setProperty("--end-x", endX);
  randomIcon.style.setProperty("--end-y", endY);
  randomIcon.style.setProperty("--scale", scale);
  randomIcon.style.animationDuration = duration;

  // Adicionar o ícone à tela
  floatingContainer.appendChild(randomIcon);

  // Remover o ícone após a animação terminar
  setTimeout(() => {
    floatingContainer.removeChild(randomIcon);
  }, parseFloat(duration) * 1000);
}

// Spawna novas bolhas periodicamente
setInterval(spawnBubble, 500); // Spawna uma bolha nova a cada 0.5s

// Opcional: Spawna algumas bolhas iniciais já distribuídas
for (let i = 0; i < 10; i++) {
  spawnBubble();
}
