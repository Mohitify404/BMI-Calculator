const form = document.querySelector("form"); //! calling the form

// const height = document.querySelector("#height"); //! calling the input field of hei
// const weight = document.querySelector("#weight"); //! calling the input field of weight
// const submit = document.querySelector("#submit"); //! calling the submit button
// const background = document.querySelector("#changeBackground"); //! calling the background color change button
// console.log(form);

function buildVideoEmbed(videoId, label) {
  return `
    <section class="video-card">
      <h4>${label}</h4>
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        title="${label}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </section>
  `;
}

function buildPlan(title, summary, items, videoList) {
  const planItems = items.map((item) => `<li>${item}</li>`).join("");
  const videos = videoList
    .map(({ videoId, label }) => buildVideoEmbed(videoId, label))
    .join("");

  return `
    <div class="recommendation-panel">
      <h3>${title}</h3>
      <p>${summary}</p>
      <ul>${planItems}</ul>
      <div class="video-grid">${videos}</div>
    </div>
  `;
}

// added an even listener to the form that gets active when form gets submitted
//it makes an event "e" => prevent default (prevents the default thing ) ===which is to send the values and reload the page
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const height = parseInt(document.querySelector("#height").value);
  const weight = parseInt(document.querySelector("#weight").value);
  const result = document.querySelector("#results");
  const shame = document.querySelector("#shame");

  //!checking if the input is number or not
  if (height === String || height < 0 || height === "" || isNaN(height)) {
    result.innerHTML = "<h4>Please give a valid height</h4>";
    result.style.color = "red";
    shame.innerHTML = "";
    return; // stop execution here
  } else if (
    weight === String ||
    weight < 0 ||
    weight === "" ||
    isNaN(weight)
  ) {
    result.innerHTML = "<h4>Please give a valid weight</h4>";
    result.style.color = "red";
    shame.innerHTML = "";

    return;
  }
  //!making sure the inputs are valid
  if (height <= 65.24) {
    result.innerHTML = "<h4>(please give a valid height)</h4>";
    result.style.color = "red";
    shame.innerHTML = "";

    return;
  } else if (height >= 251) {
    result.innerHTML = "<h4>(please give a valid height)</h4>";
    result.style.color = "red";
    shame.innerHTML = "";
    return;
  }
  if (weight <= 10) {
    result.innerHTML = "<h4> (please give a valid weight)</h4>";
    result.style.color = "red";
    shame.innerHTML = "";

    return;
  } else if (weight >= 635) {
    result.innerHTML = "<h4>(please give a valid weight)</h4>";
    result.style.color = "red";
    shame.innerHTML = "";

    return;
  }

  //! calculation
  const output = weight / ((height * height) / 10000);

  result.innerHTML = `<div class="lol"><h3>Your BMI is <b>${output.toFixed(1)}</b></h3></div>`; // deleted the whole div
  result.style.color = "white";

  //? personal quotes
  if (output < 18.6) {
    shame.innerHTML = buildPlan(
      "Weight Gain Plan",
      "Focus on calorie-dense meals, enough protein, and consistent strength training.",
      [
        "Eat 5 to 6 meals a day instead of only 2 or 3 big ones.",
        "Add calorie-rich foods like peanut butter, nuts, milk, paneer, rice, and bananas.",
        "Do strength training 3 to 4 times a week to build healthy muscle.",
        "Sleep at least 7 to 9 hours so your body can recover and grow.",
      ],
      [
        {
          videoId: "nAgZBJ9C3AI", // Example ID, you can replace with your preferred video ID
          label: "Weight gain workout videos",
        },
        {
          videoId: "KOcyirXd0Zc",
          label: "High calorie meal ideas",
        },
      ],
    );
    return;
  } else if (output >= 18.6 && output <= 24.9) {
    shame.innerHTML = `
      <div class="recommendation-panel healthy-panel">
        <h3>You are healthy</h3>
        <p>Your BMI is in the normal range. Keep doing what you are doing and stay consistent with your food, sleep, and exercise habits.</p>
      </div>
    `;
    return;
  } else if (output > 24.9) {
    shame.innerHTML = buildPlan(
      "Fat Loss Plan",
      "Focus on a calorie deficit, regular movement, and meals that keep you full without overeating.",
      [
        "Walk 30 to 45 minutes most days of the week.",
        "Build meals around protein, vegetables, and high-fiber foods.",
        "Reduce sugary drinks, fried snacks, and late-night overeating.",
        "Add strength training 3 times a week to protect muscle while losing fat.",
      ],
      [
        {
          videoId: "yWnacRo2VbA", // Example ID, you can replace with your preferred video ID
          label: "Fat loss workout videos",
        },
        {
          videoId: "six49dFYVYg", // Example ID, you can replace with your preferred video ID
          label: "Healthy meal prep ideas",
        },
      ],
    );
    return;
  }

  // Personal quotes
});
//! changing the wallpaper
const changeButton = document.querySelector("#changeBackground");
changeButton.addEventListener("click", (e) => {
  //   alert(e);
  const wallppr = document.querySelector(".background-container");
  const wallpaper = ["first.jpg", "second.jpg", "third.jpg", "fourth.jpg"];
  const randomIndex = Math.floor(Math.random() * wallpaper.length);

  wallppr.setAttribute(
    "style",
    `background-image: url(wallpapers/${wallpaper[randomIndex]});`,
  );
});

// wallppr.style.backgroundImage = "url('wallpaper/second.jpg')";
// const shame = document.querySelector("#shame");
// shame.innerHTML = "nishank";
