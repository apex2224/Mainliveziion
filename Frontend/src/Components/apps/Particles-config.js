const particlesConfig = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 120, // Slightly closer links
      enable: true,
      opacity: 0.4, // A bit more visible lines
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce", // Bounce off walls for more lively movement
      },
      random: true, // Randomize movement slightly
      speed: 2.5, // INCREASED SPEED!
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80, // More particles
    },
    opacity: {
      value: 0.5, // A bit more visible particles
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse", // "Repulse" is more dynamic than "grab" for faster particles
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      repulse: {
        distance: 100, // Distance for repulse effect
        duration: 0.4,
      },
      push: {
        quantity: 2,
      },
    },
  },
  detectRetina: true,
};

export default particlesConfig;