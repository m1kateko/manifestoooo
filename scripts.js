document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', function() {
    let boxClass = Array.from(this.classList).find(cls => /^box\d+$/.test(cls));
    if (this.classList.contains('center-box')) boxClass = 'center-box';
    const modalId = `modal-${boxClass}`;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  });
});

// Close modal when clicking the close button
document.querySelectorAll('.modal .close').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const modalId = this.getAttribute('data-modal');
    document.getElementById(modalId).classList.remove('show');
    e.stopPropagation();
  });
});

// Optional: Close modal when clicking outside modal-content
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('show');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const circles = document.querySelectorAll('.manifesto-circles .circle');
  const texts = [
    document.getElementById('circle1'),
    document.getElementById('circle2'),
    document.getElementById('circle3'),
    document.getElementById('circle4'),
    document.getElementById('circle5'),
    document.getElementById('circle6')
  ];

   function showCircle(idx) {
    texts.forEach((el, i) => {
      el.style.display = (i === idx) ? 'block' : 'none';
      circles[i].classList.toggle('active', i === idx);
    });
    // Scroll the content area to the top when switching circles
    const scrollArea = document.querySelector('#modal-box5 .manifesto-content-scroll');
    if (scrollArea) scrollArea.scrollTop = 0;
  }

  circles.forEach((circle, idx) => {
    circle.addEventListener('click', () => showCircle(idx));
  });

  // Initialize: show only the first
  showCircle(0);

  const tooltip = document.getElementById("badgeTooltip");
  const badgeWall = document.getElementById("badgeWall");

  document.querySelectorAll(".badge.earned").forEach(badge => {
    badge.addEventListener("mouseenter", e => {
      tooltip.textContent = badge.dataset.description;
      tooltip.classList.remove("hidden");
    });

    badge.addEventListener("mousemove", e => {
      // Get parent bounds
      const parentRect = badgeWall.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      // Mouse position relative to parent
      let x = e.clientX - parentRect.left + 10;
      let y = e.clientY - parentRect.top + 10;

      // Clamp right edge
      if (x + tooltipRect.width > parentRect.width) {
        x = parentRect.width - tooltipRect.width - 5;
      }
      // Clamp left edge
      if (x < 0) x = 5;
      // Clamp bottom edge
      if (y + tooltipRect.height > parentRect.height) {
        y = parentRect.height - tooltipRect.height - 5;
      }
      // Clamp top edge
      if (y < 0) y = 5;

      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
    });

    badge.addEventListener("mouseleave", () => {
      tooltip.classList.add("hidden");
    });
  });
});