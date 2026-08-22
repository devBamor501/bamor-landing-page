document.addEventListener('DOMContentLoaded', (): void => {
  const navElement = document.getElementById('main-nav') as HTMLElement | null;

  if (!navElement) return;

  const handleScroll = (): void => {
    if (window.scrollY > 20) {
      // Al bajar: Fondo blanco semi-transparente con blur y sombra para legibilidad
      navElement.classList.add('bg-white/20', 'backdrop-blur-md', 'shadow-sm',);
    } else {
      // Arriba del todo: Limpia todo para volver a la transparencia total sobre el Hero
      navElement.classList.remove('bg-white/20', 'backdrop-blur-md', 'shadow-sm',);
    }
  };

  // Evalúa el scroll actual apenas carga la página
  handleScroll();

  // Escucha el evento de scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
});