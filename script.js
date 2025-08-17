(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 3D tilt effect for elements with .tilt
  if (!prefersReducedMotion) {
    const tiltElements = document.querySelectorAll('.tilt');
    tiltElements.forEach((el) => {
      let rafId = 0;
      const handleMove = (event) => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width; // 0..1
        const y = (event.clientY - rect.top) / rect.height; // 0..1
        const rotateX = (0.5 - y) * 8; // max 8deg
        const rotateY = (x - 0.5) * 10;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
      };
      const reset = () => {
        cancelAnimationFrame(rafId);
        el.style.transform = 'translateZ(0)';
      };
      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', reset);
    });
  }

  // Parallax for orbs in hero
  if (!prefersReducedMotion) {
    const orbs = Array.from(document.querySelectorAll('.orb'));
    const parallax = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      orbs.forEach((orb) => {
        const depth = Number(getComputedStyle(orb).getPropertyValue('--depth')) || 20;
        const translateX = -x * depth * 0.6;
        const translateY = -y * depth * 0.6;
        orb.style.transform = `translate3d(${translateX}px, calc(${translateY}px - 8px), 0)`;
      });
    };
    window.addEventListener('mousemove', parallax);
  }

  // Header solidify on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    const solid = window.scrollY > 24;
    header.style.background = solid ? 'rgba(10, 14, 22, 0.55)' : 'rgba(10, 14, 22, 0.35)';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();