document.addEventListener("DOMContentLoaded", () => {
  let userPoints = 1200; 
  const rewards = [
    { icon: "💸", title: "₹50 Cash Reward", desc: "Direct bank transfer", cost: 100 },
    { icon: "🛍", title: "Organic Store Voucher", desc: "₹100 discount at partner stores", cost: 150 },
    { icon: "📚", title: "Eco Workshop Access", desc: "Free sustainability workshop", cost: 75 },
    { icon: "🎁", title: "Premium Eco Box", desc: "Monthly sustainable products", cost: 500, comingSoon: true }
  ];

  document.querySelector(".points").textContent = `${userPoints} points`;
  const rewardsGrid = document.querySelector(".rewards-grid");

  rewards.forEach(reward => {
    const card = document.createElement("div");
    card.classList.add("reward-card");
    if (reward.comingSoon) card.classList.add("disabled");

    card.innerHTML = `
      <div class="reward-icon">${reward.icon}</div>
      <div class="reward-details">
        <h3>${reward.title}</h3>
        <p>${reward.desc}</p>
        <span class="points">${reward.cost} points</span><br>
        ${
          reward.comingSoon 
            ? '<button class="coming-soon" disabled>Coming Soon</button>' 
            : `<button class="redeem-btn" ${userPoints < reward.cost ? "disabled" : ""}>Redeem</button>`
        }
      </div>
    `;

    rewardsGrid.appendChild(card);

    if (!reward.comingSoon) {
      const button = card.querySelector(".redeem-btn");
      button.addEventListener("click", () => redeemReward(reward.cost, reward.title, button));
    }
  });

  function redeemReward(cost, title, button) {
    if (userPoints >= cost) {
      userPoints -= cost;
      document.querySelector(".points").textContent = `${userPoints} points`;
      alert(`✅ You successfully redeemed: ${title}`);
      if (userPoints < cost) button.disabled = true;
      updateButtons();
    } else {
      alert("❌ Not enough points to redeem this reward!");
    }
  }

  function updateButtons() {
    document.querySelectorAll(".redeem-btn").forEach(btn => {
      const cost = parseInt(btn.previousElementSibling.textContent);
      btn.disabled = userPoints < cost;
    });

    const needMoreBtn = document.querySelector(".need-more button");
    if (needMoreBtn) {
      const allDisabled = [...document.querySelectorAll(".redeem-btn")].every(btn => btn.disabled);
      needMoreBtn.disabled = !allDisabled;
    }
  }
  updateButtons();


  const impactData = [
    { icon: "🌳", number: 12847, text: "Trees Planted", small: "+23% this month" },
    { icon: "🧑‍🤝‍🧑", number: 3542, text: "Eco Warriors", small: "+18% this month" },
    { icon: "🌐", number: 89, text: "Cities Covered", small: "+5 new cities" },
    { icon: "📈", number: 240000, text: "Rewards Distributed (₹)", small: "+32% this month" }
  ];

  const cardsContainer = document.querySelector(".impact-cards");
  impactData.forEach(data => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-icon">${data.icon}</div>
      <h3 class="counter" data-target="${data.number}">0</h3>
      <p>${data.text}</p>
      <small>${data.small}</small>
    `;
    cardsContainer.appendChild(card);
  });

  function animateCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let current = 0;
      const increment = Math.ceil(target / 100);
      function update() {
        current += increment;
        if (current < target) {
          counter.textContent = current.toLocaleString();
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
      update();
    });
  }
  animateCounters();

  const plantForm = document.querySelector("#plantForm");
  const pointsDisplay = document.querySelector(".points-main span");
  const progressBar = document.querySelector(".progress");
  const fileInput = document.querySelector("#fileUpload");
  const preview = document.querySelector("#preview");
  const progressLabel = document.querySelector(".progress-label");

  const goalPoints = 2000;

  if (fileInput && preview) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.innerHTML = "";
          const img = document.createElement("img");
          img.src = e.target.result;
          img.width = 100;
          img.style.marginTop = "10px";
          img.style.borderRadius = "8px";
          preview.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (plantForm) {
    plantForm.addEventListener("submit", (e) => {
      e.preventDefault();
      userPoints += 100;
      updatePoints();
      plantForm.reset();
      preview.innerHTML = "";
    });
  }

  function updatePoints() {
    if (pointsDisplay) pointsDisplay.textContent = userPoints;
    if (progressBar) {
      let percentage = Math.min((userPoints / goalPoints) * 100, 100);
      progressBar.style.width = percentage + "%";
    }
    if (progressLabel) {
      progressLabel.textContent = `Progress: ${userPoints}/${goalPoints} points`;
    }
  }
  updatePoints();

  // =====================
  const leaderboard = document.querySelector(".leaderboard");
if (leaderboard) {
  let users = [
    { name: "Alice", points: 2400 },
    { name: "Bob", points: 1800 },
    { name: "Charlie", points: 1500 },
    { name: "You", points: userPoints },
  ];

  renderLeaderboard(users);

  plantForm?.addEventListener("submit", () => {
    users = users.map((u) =>
      u.name === "You" ? { ...u, points: userPoints } : u
    );
    renderLeaderboard(users);
  });

  function renderLeaderboard(users) {
    leaderboard.innerHTML = ""; // clear existing
    users.sort((a, b) => b.points - a.points);
    users.forEach((user, index) => {
      const row = document.createElement("div");
      row.classList.add("user-row");
      if (user.name === "You") row.classList.add("current");

      row.innerHTML = `
        <div class="rank">#${index + 1}</div>
        <div class="circle">${user.name.charAt(0)}</div>
        <div class="user-info">
          <p class="name">${user.name} ${
        user.name === "You" ? "<span class='you-tag'>YOU</span>" : ""
      }</p>
          <p class="points">${user.points} points</p>
        </div>
      `;
      leaderboard.appendChild(row);
    });
  }
}
});