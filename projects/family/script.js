// Baby Family Website - Interactive Features

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle message form submission
const messageForm = document.getElementById('messageForm');
if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const messageText = document.getElementById('messageText').value;
        const authorName = document.getElementById('authorName').value;
        
        // Create new message card
        const messagesContainer = document.querySelector('.messages-container');
        const newMessage = document.createElement('div');
        newMessage.className = 'message-card';
        newMessage.style.opacity = '0';
        newMessage.style.transform = 'translateY(20px)';
        
        newMessage.innerHTML = `
            <p class="message-text">"${messageText}"</p>
            <p class="message-author">- ${authorName}</p>
        `;
        
        messagesContainer.appendChild(newMessage);
        
        // Animate the new message
        setTimeout(() => {
            newMessage.style.transition = 'all 0.5s ease';
            newMessage.style.opacity = '1';
            newMessage.style.transform = 'translateY(0)';
        }, 100);
        
        // Clear form
        messageForm.reset();
        
        // Show success feedback
        showNotification('Message added successfully! ❤️');
    });
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FFB6C1, #B4D7FF);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Gallery lightbox functionality (optional enhancement)
const galleryItems = document.querySelectorAll('.gallery-item .image-placeholder');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Placeholder for future lightbox implementation
        console.log('Gallery item clicked - can add lightbox here');
    });
});

// Add hover effect to nav items
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Track scroll position for active nav highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        
        if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
});

// Add active class styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    nav a.active {
        background-color: #FFB6C1;
        color: white;
    }
`;
document.head.appendChild(activeStyle);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Baby Family Website loaded successfully! 👶');
    
    // Add entrance animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Image upload placeholder function (for future enhancement)
function handleImageUpload(input) {
    // This is a placeholder for image upload functionality
    // Can be implemented with FileReader API or backend integration
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Display uploaded image
            console.log('Image loaded:', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
