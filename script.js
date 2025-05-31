// Dark mode functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to toggle dark mode
function toggleDarkMode(isDark) {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Check for saved user preference, first in localStorage, then system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    toggleDarkMode(savedTheme === 'dark');
} else {
    toggleDarkMode(prefersDarkScheme.matches);
}

// Listen for toggle button click
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    toggleDarkMode(currentTheme !== 'dark');
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        toggleDarkMode(e.matches);
    }
});

// Navigation shadow effect only
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.boxShadow = window.scrollY > 50 
        ? '0 2px 10px rgba(0, 0, 0, 0.2)'
        : '0 2px 10px rgba(0, 0, 0, 0.1)';
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        
        hamburger.classList.add('active');
    } else {
        navLinks.style.display = 'none';
        hamburger.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (isMenuOpen) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
                isMenuOpen = false;
            }
        }
    });
});

// Only initialize animations for desktop
if (window.matchMedia('(min-width: 769px)').matches) {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Add initial styles and observers only on desktop
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('will-animate');
        observer.observe(section);
    });

    // Add animation styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .will-animate {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Skills animation
document.querySelectorAll('.skill-category').forEach(category => {
    const skills = category.querySelectorAll('li');
    skills.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(10px)';
        skill.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        skill.style.transitionDelay = `${index * 0.05}s`;
    });
});

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skills = entry.target.querySelectorAll('li');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.skill-category').forEach(category => {
    skillsObserver.observe(category);
});

// Project Modal Functionality
const projectDetails = {
    ecg: {
        title: "ECG Analysis System-on-Chip",
        description: "A sophisticated FPGA-based System-on-Programmable Chip designed for real-time ECG signal analysis and cardiac monitoring. This system combines hardware acceleration with advanced signal processing algorithms to provide accurate and efficient heart activity analysis.",
        technicalDetails: "Implemented using Xilinx Vivado for FPGA development, featuring custom VHDL modules for signal processing and Python-based data analysis. The system utilizes parallel processing capabilities of FPGA for real-time performance.",
        features: [
            "Real-time ECG signal acquisition and filtering",
            "Hardware-accelerated R-peak detection algorithm",
            "Automated arrhythmia detection and classification",
            "High-speed data processing with minimal latency",
            "Configurable analysis parameters for different use cases"
        ],
        technologies: ["Python", "C++", "VHDL", "Vivado", "Signal Processing", "FPGA Design", "Digital Filters"],
        githubUrl: "https://github.com/yourusername/ecg-analysis"
    },
    md5: {
        title: "HPS/FPGA MD5 Decryption System",
        description: "A high-performance MD5 hash decryption system leveraging the parallel processing capabilities of FPGA combined with ARM processor control. This hybrid system demonstrates significant speed improvements over traditional CPU-based solutions.",
        technicalDetails: "Built on DE1 SoC platform featuring Cyclone V FPGA and ARM Cortex-A9 processor. The system uses Avalon Memory Map interface for efficient communication between HPS and FPGA components.",
        features: [
            "Parallel hash computation units in FPGA fabric",
            "Efficient HPS-FPGA communication protocol",
            "Dynamic workload distribution system",
            "Real-time performance monitoring",
            "Scalable architecture for different security applications"
        ],
        technologies: ["C", "VHDL", "Quartus", "SoC Design", "ARM Architecture", "Avalon Interface", "Hardware Security"],
        githubUrl: "https://github.com/yourusername/md5-decrypt"
    },
    mcb: {
        title: "MCB1700 Media Center",
        description: "An embedded media center solution built on the MCB1700 ARM Cortex-M3 microcontroller board. This project demonstrates comprehensive embedded systems development, combining multimedia capabilities with real-time operating system management.",
        technicalDetails: "Developed using ARM Keil MDK tools with RTOS implementation. Features custom drivers for LCD display and audio output, with optimized memory management for multimedia handling.",
        features: [
            "Custom LCD driver for high-quality display output",
            "MP3 decoder implementation with audio DAC interface",
            "Real-time task scheduling for smooth operation",
            "Interactive user interface with touch control",
            "Efficient memory management for media storage"
        ],
        technologies: ["C", "RTOS", "ARM", "Embedded Systems", "LCD Programming", "Audio Processing", "Driver Development"],
        githubUrl: "https://github.com/yourusername/mcb1700-media"
    }
};

// Define the project order
const projectOrder = ['ecg', 'md5', 'mcb'];

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');
    const prevButton = document.querySelector('.prev-project');
    const nextButton = document.querySelector('.next-project');
    let currentProjectIndex = 0;

    if (!modal || !closeModal) {
        console.error('Modal elements not found');
        return;
    }

    function updateModal(projectId) {
        const details = projectDetails[projectId];
        if (!details) {
            console.error('Project details not found:', projectId);
            return;
        }

        document.getElementById('modalTitle').textContent = details.title;
        document.getElementById('modalDescription').textContent = details.description;
        document.getElementById('modalTechnicalDetails').textContent = details.technicalDetails;
        
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = details.features
            .map(feature => `<li>${feature}</li>`)
            .join('');
        
        const techStack = document.getElementById('modalTechStack');
        techStack.innerHTML = details.technologies
            .map(tech => `<span>${tech}</span>`)
            .join('');

        // Update GitHub link
        const githubBtn = document.querySelector('.modal-github-btn');
        if (githubBtn) {
            githubBtn.href = details.githubUrl;
        }
    }

    function openModal(project) {
        currentProjectIndex = projectOrder.indexOf(project);
        updateModal(project);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModalHandler() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function navigateProject(direction) {
        currentProjectIndex = (currentProjectIndex + direction + projectOrder.length) % projectOrder.length;
        updateModal(projectOrder[currentProjectIndex]);
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const project = card.getAttribute('data-project');
            if (project) {
                openModal(project);
            }
        });
    });

    // Navigation button click handlers
    prevButton.addEventListener('click', () => navigateProject(-1));
    nextButton.addEventListener('click', () => navigateProject(1));

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'block') {
            switch(event.key) {
                case 'ArrowLeft':
                    navigateProject(-1);
                    break;
                case 'ArrowRight':
                    navigateProject(1);
                    break;
                case 'Escape':
                    closeModalHandler();
                    break;
            }
        }
    });

    closeModal.addEventListener('click', closeModalHandler);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });
}); 