// Patchwork Life Coach Assistant - Main Application
class PatchworkApp {
    constructor() {
        this.currentTab = 'chat';
        this.goals = this.loadFromStorage('goals') || [];
        this.messages = this.loadFromStorage('messages') || [];
        this.currentMood = this.loadFromStorage('currentMood') || null;
        this.habits = this.loadFromStorage('habits') || {};
        
        this.initializeEventListeners();
        this.initializeApp();
        this.loadSampleData();
    }

    initializeApp() {
        this.renderGoals();
        this.renderMessages();
        this.updateMoodDisplay();
        this.loadHabits();
        
        // Initialize wellness tracking
        this.trackGoalsProgress();
    }

    loadSampleData() {
        // Add sample goals if none exist
        if (this.goals.length === 0) {
            this.goals = [
                {
                    id: 'goal-1',
                    title: 'Exercise Regularly',
                    description: 'Work out for 30 minutes, 4 times per week',
                    category: 'health',
                    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    progress: 65,
                    created: new Date().toISOString()
                },
                {
                    id: 'goal-2',
                    title: 'Read More Books',
                    description: 'Read one book per month to expand knowledge',
                    category: 'personal',
                    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    progress: 30,
                    created: new Date().toISOString()
                },
                {
                    id: 'goal-3',
                    title: 'Learn New Skill',
                    description: 'Complete an online course in web development',
                    category: 'career',
                    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    progress: 80,
                    created: new Date().toISOString()
                }
            ];
            this.saveToStorage('goals', this.goals);
        }

        // Initialize sample habits if none exist
        if (Object.keys(this.habits).length === 0) {
            this.habits = {
                'habit-exercise': false,
                'habit-meditation': true,
                'habit-reading': false,
                'habit-water': true
            };
            this.saveToStorage('habits', this.habits);
        }
    }

    initializeEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Chat form
        const chatForm = document.getElementById('chat-form');
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleChatSubmit();
        });

        // Goals
        document.getElementById('add-goal-btn').addEventListener('click', () => {
            this.openGoalModal();
        });

        document.getElementById('close-goal-modal').addEventListener('click', () => {
            this.closeGoalModal();
        });

        document.getElementById('cancel-goal').addEventListener('click', () => {
            this.closeGoalModal();
        });

        const goalForm = document.getElementById('goal-form');
        goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleGoalSubmit();
        });

        // Mood selector
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setMood(e.target.dataset.mood);
            });
        });

        // Habits
        document.querySelectorAll('.habit-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleHabit(e.target.id, e.target.checked);
            });
        });

        // Modal background click
        document.getElementById('goal-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeGoalModal();
            }
        });
    }

    switchTab(tabName) {
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;
    }

    // Chat functionality
    async handleChatSubmit() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        input.value = '';

        // Show loading
        this.showLoading();

        // Simulate AI response
        setTimeout(() => {
            const botResponse = this.generateBotResponse(message);
            this.addMessage('bot', botResponse);
            this.hideLoading();
        }, 1500);
    }

    addMessage(sender, content) {
        const message = {
            id: Date.now(),
            sender,
            content,
            timestamp: new Date().toISOString()
        };

        this.messages.push(message);
        this.saveToStorage('messages', this.messages);
        this.renderMessage(message);
        this.scrollToBottom();
    }

    renderMessages() {
        const container = document.getElementById('chat-messages');
        // Keep the initial welcome message, add any stored messages
        this.messages.forEach(message => {
            this.renderMessage(message);
        });
    }

    renderMessage(message) {
        const container = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender}-message`;
        
        const avatar = message.sender === 'bot' ? '🧩' : '👤';
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${message.content}</p>
            </div>
        `;
        
        container.appendChild(messageDiv);
    }

    scrollToBottom() {
        const container = document.getElementById('chat-messages');
        container.scrollTop = container.scrollHeight;
    }

    generateBotResponse(userMessage) {
        const responses = {
            greetings: [
                "Hello! I'm excited to help you on your journey today. What's on your mind?",
                "Hi there! Great to see you back. How can I support you today?",
                "Welcome! I'm here to help you achieve your goals and feel your best."
            ],
            goals: [
                "Setting goals is fantastic! Remember, the best goals are specific, measurable, and aligned with your values. What goal would you like to work on?",
                "I love that you're thinking about goals! Breaking them down into smaller, manageable steps is key to success. Tell me more about what you want to achieve.",
                "Goal-setting is such a powerful tool for growth. What area of your life would you like to focus on?"
            ],
            motivation: [
                "You're doing great! Remember, progress isn't always linear, but every small step counts toward your bigger vision.",
                "I believe in you! Sometimes the most challenging days are when we grow the most. What's one small thing you can do today?",
                "You've got this! Celebrating small wins along the way is so important. What's one thing you're proud of recently?"
            ],
            wellness: [
                "Your wellbeing is so important. How are you feeling today? Remember, it's okay to have ups and downs.",
                "Taking care of yourself is the foundation for everything else. What's one thing you could do today to nurture your wellbeing?",
                "I'm glad you're thinking about your wellness. Small, consistent actions often lead to the biggest transformations."
            ],
            default: [
                "That's really interesting. Tell me more about how you're feeling about this situation.",
                "I appreciate you sharing that with me. What do you think would be most helpful for you right now?",
                "Thank you for being open with me. How would you like to approach this challenge?",
                "I hear you. Sometimes talking through our thoughts can help us see new possibilities. What feels most important to you right now?"
            ]
        };

        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return this.getRandomResponse(responses.greetings);
        } else if (message.includes('goal') || message.includes('achieve') || message.includes('want to')) {
            return this.getRandomResponse(responses.goals);
        } else if (message.includes('motivated') || message.includes('stuck') || message.includes('difficult')) {
            return this.getRandomResponse(responses.motivation);
        } else if (message.includes('feel') || message.includes('mood') || message.includes('wellness')) {
            return this.getRandomResponse(responses.wellness);
        } else {
            return this.getRandomResponse(responses.default);
        }
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Goals functionality
    openGoalModal() {
        document.getElementById('goal-modal').classList.add('active');
    }

    closeGoalModal() {
        document.getElementById('goal-modal').classList.remove('active');
        document.getElementById('goal-form').reset();
        this.editingGoalId = null;
    }

    handleGoalSubmit() {
        const title = document.getElementById('goal-title').value;
        const description = document.getElementById('goal-description').value;
        const category = document.getElementById('goal-category').value;
        const deadline = document.getElementById('goal-deadline').value;

        if (this.editingGoalId) {
            // Update existing goal
            const goalIndex = this.goals.findIndex(g => g.id === this.editingGoalId);
            if (goalIndex !== -1) {
                this.goals[goalIndex] = {
                    ...this.goals[goalIndex],
                    title,
                    description,
                    category,
                    deadline,
                    updated: new Date().toISOString()
                };
                
                this.addMessage('bot', `Great! I've updated your goal "${title}". Keep working toward your updated objective!`);
            }
            this.editingGoalId = null;
        } else {
            // Create new goal
            const goal = {
                id: 'goal-' + Date.now(),
                title,
                description,
                category,
                deadline,
                progress: 0,
                created: new Date().toISOString()
            };
            
            this.goals.push(goal);
            this.addMessage('bot', `Congratulations on setting a new goal: "${title}"! I'm excited to help you work toward it. Remember, you can track your progress in the Goals tab.`);
        }

        this.saveToStorage('goals', this.goals);
        this.renderGoals();
        this.closeGoalModal();
    }

    renderGoals() {
        const container = document.getElementById('goals-grid');
        container.innerHTML = '';

        this.goals.forEach(goal => {
            const goalCard = this.createGoalCard(goal);
            container.appendChild(goalCard);
        });
    }

    createGoalCard(goal) {
        const card = document.createElement('div');
        card.className = 'goal-card';
        card.dataset.goalId = goal.id;
        
        const categoryColors = {
            health: '#10b981',
            career: '#6366f1',
            relationships: '#f59e0b',
            personal: '#8b5cf6',
            financial: '#059669',
            creative: '#ec4899'
        };

        const daysUntilDeadline = goal.deadline ? 
            Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;

        const milestones = this.getMilestones(goal.progress);

        card.innerHTML = `
            <div class="goal-header">
                <h3 class="goal-title">${goal.title}</h3>
                <div class="goal-actions">
                    <button class="goal-action-btn" onclick="patchworkApp.editGoal('${goal.id}')" title="Edit Goal">
                        ✏️
                    </button>
                    <button class="goal-action-btn" onclick="patchworkApp.deleteGoal('${goal.id}')" title="Delete Goal">
                        🗑️
                    </button>
                </div>
                <span class="goal-category" style="background-color: ${categoryColors[goal.category] || '#6366f1'}">${goal.category}</span>
            </div>
            <p>${goal.description}</p>
            <div class="goal-progress">
                <div class="progress-header">
                    <span>Progress</span>
                    <div class="progress-controls">
                        <button class="progress-btn" onclick="patchworkApp.adjustProgress('${goal.id}', -5)" title="Decrease 5%">-</button>
                        <span class="progress-value" id="progress-${goal.id}">${goal.progress}%</span>
                        <button class="progress-btn" onclick="patchworkApp.adjustProgress('${goal.id}', 5)" title="Increase 5%">+</button>
                    </div>
                </div>
                <div class="progress-bar" onclick="patchworkApp.setProgressFromClick(event, '${goal.id}')">
                    <div class="progress-fill" style="width: ${goal.progress}%" id="fill-${goal.id}"></div>
                </div>
            </div>
            <div class="goal-milestones">
                <div class="milestone-tracker">
                    ${this.createMilestoneHTML(milestones)}
                </div>
                <small style="color: var(--text-secondary); text-align: center; display: block;">
                    ${this.getMilestoneText(goal.progress)}
                </small>
            </div>
            ${goal.deadline ? `<p style="color: #6b7280; font-size: 0.875rem; margin-top: var(--space-3);">
                📅 ${daysUntilDeadline > 0 ? `${daysUntilDeadline} days remaining` : 'Deadline passed'}
            </p>` : ''}
        `;

        return card;
    }

    // Goal management methods
    adjustProgress(goalId, delta) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        const oldProgress = goal.progress;
        goal.progress = Math.max(0, Math.min(100, goal.progress + delta));
        
        // Only update if progress actually changed
        if (goal.progress !== oldProgress) {
            this.saveToStorage('goals', this.goals);
            this.updateGoalProgress(goalId, oldProgress, goal.progress);
            this.checkMilestoneAchievements(goal, oldProgress);
        }
    }

    setProgressFromClick(event, goalId) {
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const newProgress = Math.round((clickX / width) * 100);
        
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;
        
        const oldProgress = goal.progress;
        goal.progress = Math.max(0, Math.min(100, newProgress));
        
        if (goal.progress !== oldProgress) {
            this.saveToStorage('goals', this.goals);
            this.updateGoalProgress(goalId, oldProgress, goal.progress);
            this.checkMilestoneAchievements(goal, oldProgress);
        }
    }

    updateGoalProgress(goalId, oldProgress, newProgress) {
        const progressValue = document.getElementById(`progress-${goalId}`);
        const progressFill = document.getElementById(`fill-${goalId}`);
        const card = document.querySelector(`[data-goal-id="${goalId}"]`);
        
        if (progressValue && progressFill) {
            // Animate the value change
            progressValue.classList.add('updating');
            setTimeout(() => {
                progressValue.textContent = `${newProgress}%`;
                progressValue.classList.remove('updating');
            }, 200);
            
            // Animate the progress bar
            progressFill.style.width = `${newProgress}%`;
            
            // Update milestones
            this.updateMilestones(goalId, newProgress);
            
            // Track goals progress for trends
            this.trackGoalsProgress();
            
            // Add celebration for significant progress
            if (newProgress > oldProgress && (newProgress === 100 || newProgress % 25 === 0)) {
                this.celebrateProgress(card, newProgress);
            }
        }
    }

    editGoal(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;
        
        // Populate the modal with existing goal data
        document.getElementById('goal-title').value = goal.title;
        document.getElementById('goal-description').value = goal.description;
        document.getElementById('goal-category').value = goal.category;
        document.getElementById('goal-deadline').value = goal.deadline;
        
        // Store the editing goal ID
        this.editingGoalId = goalId;
        
        // Open the modal
        this.openGoalModal();
    }

    deleteGoal(goalId) {
        if (confirm('Are you sure you want to delete this goal?')) {
            this.goals = this.goals.filter(g => g.id !== goalId);
            this.saveToStorage('goals', this.goals);
            this.renderGoals();
            
            this.addMessage('bot', 'Goal deleted. Remember, it\'s okay to adjust your goals as you grow and change. What would you like to focus on next?');
        }
    }

    getMilestones(progress) {
        const milestones = [25, 50, 75, 100];
        return milestones.map(milestone => ({
            value: milestone,
            reached: progress >= milestone
        }));
    }

    createMilestoneHTML(milestones) {
        let html = '';
        milestones.forEach((milestone, index) => {
            html += `<div class="milestone ${milestone.reached ? 'reached' : ''}"></div>`;
            if (index < milestones.length - 1) {
                html += `<div class="milestone-line ${milestone.reached && milestones[index + 1].reached ? 'active' : ''}"></div>`;
            }
        });
        return html;
    }

    getMilestoneText(progress) {
        if (progress === 100) return '🎉 Goal Complete! Congratulations!';
        if (progress >= 75) return '🔥 Almost there! Final push!';
        if (progress >= 50) return '💪 Halfway there! Keep it up!';
        if (progress >= 25) return '⭐ Great start! Building momentum!';
        return '🌱 Just getting started. You\'ve got this!';
    }

    updateMilestones(goalId, progress) {
        const card = document.querySelector(`[data-goal-id="${goalId}"]`);
        if (!card) return;
        
        const milestones = card.querySelectorAll('.milestone');
        const milestoneLines = card.querySelectorAll('.milestone-line');
        const milestoneText = card.querySelector('.goal-milestones small');
        
        const milestoneLevels = [25, 50, 75, 100];
        
        milestones.forEach((milestone, index) => {
            const level = milestoneLevels[index];
            if (progress >= level) {
                if (!milestone.classList.contains('reached')) {
                    milestone.classList.add('reached');
                    // Animate the milestone achievement
                    setTimeout(() => {
                        milestone.style.animation = 'milestoneAchieve 0.6s ease-out';
                    }, index * 100);
                }
            } else {
                milestone.classList.remove('reached');
            }
        });
        
        milestoneLines.forEach((line, index) => {
            const currentLevel = milestoneLevels[index];
            const nextLevel = milestoneLevels[index + 1];
            if (progress >= currentLevel && progress >= nextLevel) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });
        
        if (milestoneText) {
            milestoneText.textContent = this.getMilestoneText(progress);
        }
    }

    checkMilestoneAchievements(goal, oldProgress) {
        const milestones = [25, 50, 75, 100];
        const newAchievements = milestones.filter(m => 
            goal.progress >= m && oldProgress < m
        );
        
        newAchievements.forEach(milestone => {
            if (milestone === 100) {
                this.addMessage('bot', `🎉 CONGRATULATIONS! You've completed "${goal.title}"! This is a huge achievement. Take time to celebrate this success!`);
                this.triggerConfetti();
            } else {
                this.addMessage('bot', `🌟 Amazing progress! You've reached ${milestone}% on "${goal.title}". ${this.getMilestoneText(goal.progress)}`);
            }
        });
    }

    celebrateProgress(card, progress) {
        if (!card) return;
        
        // Add celebration animation to the card
        card.classList.add('celebrating');
        setTimeout(() => {
            card.classList.remove('celebrating');
        }, 800);
        
        // Show confetti for 100% completion
        if (progress === 100) {
            this.triggerConfetti();
        }
    }

    triggerConfetti() {
        const overlay = document.createElement('div');
        overlay.className = 'celebration-overlay';
        document.body.appendChild(overlay);
        
        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            overlay.appendChild(confetti);
        }
        
        // Remove the overlay after animation
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 4000);
    }

    // Wellness functionality
    setMood(mood) {
        this.currentMood = parseInt(mood);
        this.saveToStorage('currentMood', this.currentMood);
        this.updateMoodDisplay();

        // Track mood data for trends
        this.trackWellnessData('mood', this.currentMood);

        // Update mood buttons
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mood="${mood}"]`).classList.add('active');

        // Add supportive message based on mood
        const moodMessages = {
            1: "I'm sorry you're feeling down today. Remember, it's okay to have difficult days. Would you like to talk about what's bothering you?",
            2: "I notice you're feeling neutral today. Sometimes that's exactly where we need to be. Is there anything I can help you with?",
            3: "It's good to see you're feeling okay today. What's one small thing that could make today even better?",
            4: "I'm glad you're feeling good today! What's contributing to your positive mood? Let's see how we can build on that.",
            5: "Wonderful! You're feeling great today. I love seeing that energy. What's making today so special for you?"
        };

        this.addMessage('bot', moodMessages[mood]);
    }

    updateMoodDisplay() {
        const statusElement = document.getElementById('mood-status');
        if (this.currentMood) {
            const moodTexts = {
                1: "You're feeling sad today 😞",
                2: "You're feeling neutral today 😐",
                3: "You're feeling okay today 🙂",
                4: "You're feeling happy today 😊",
                5: "You're feeling amazing today 😄"
            };
            statusElement.textContent = moodTexts[this.currentMood];
            
            // Mark the correct button as active
            document.querySelector(`[data-mood="${this.currentMood}"]`)?.classList.add('active');
        }
    }

    toggleHabit(habitId, checked) {
        this.habits[habitId] = checked;
        this.saveToStorage('habits', this.habits);

        // Calculate habit completion rate and track for trends
        const totalHabits = Object.keys(this.habits).length;
        const completedHabits = Object.values(this.habits).filter(h => h).length;
        const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
        this.trackWellnessData('habits', completionRate);

        if (checked) {
            const habitName = document.querySelector(`label[for="${habitId}"]`).textContent;
            this.addMessage('bot', `Great job completing "${habitName}"! Small consistent actions like this add up to big changes over time.`);
        }
    }

    loadHabits() {
        Object.keys(this.habits).forEach(habitId => {
            const checkbox = document.getElementById(habitId);
            if (checkbox) {
                checkbox.checked = this.habits[habitId];
            }
        });
    }

    // Loading states
    showLoading() {
        document.getElementById('loading-indicator').classList.add('active');
    }

    hideLoading() {
        document.getElementById('loading-indicator').classList.remove('active');
    }

    // Storage utilities
    saveToStorage(key, data) {
        try {
            localStorage.setItem(`patchwork_${key}`, JSON.stringify(data));
        } catch (error) {
            console.warn('Could not save to localStorage:', error);
        }
    }

    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(`patchwork_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.warn('Could not load from localStorage:', error);
            return null;
        }
    }

    // Wellness Data Tracking Methods
    trackWellnessData(type, value, date = new Date()) {
        try {
            const trends = JSON.parse(localStorage.getItem('patchwork_wellness_trends') || '{}');
            
            if (!trends[type]) {
                trends[type] = [];
            }

            const dateStr = date.toISOString().split('T')[0];
            
            // Remove existing entry for the same date
            trends[type] = trends[type].filter(item => item.date !== dateStr);
            
            // Add new entry
            trends[type].push({
                date: dateStr,
                value: value,
                timestamp: date.getTime()
            });

            // Sort by date
            trends[type].sort((a, b) => a.timestamp - b.timestamp);
            
            trends.lastUpdated = new Date().toISOString();
            localStorage.setItem('patchwork_wellness_trends', JSON.stringify(trends));
        } catch (error) {
            console.warn('Could not track wellness data:', error);
        }
    }

    trackGoalsProgress() {
        // Calculate average goals progress
        if (this.goals.length === 0) return;
        
        const totalProgress = this.goals.reduce((sum, goal) => sum + goal.progress, 0);
        const avgProgress = Math.round(totalProgress / this.goals.length);
        
        this.trackWellnessData('goals', avgProgress);
    }

    trackEnergyLevel(level) {
        // This can be called when energy level is manually tracked
        this.trackWellnessData('energy', level);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.patchworkApp = new PatchworkApp();
    console.log('🧩 Patchwork Life Coach Assistant loaded successfully!');
});

// Add some helpful console messages for developers
console.log(`
🧩 Welcome to Patchwork Life Coach Assistant!

This is a demo showcasing:
- Conversational AI interface (simulated responses)
- Goal setting and tracking
- Wellness and mood tracking
- Resource library
- Local data persistence

Try interacting with the chat, creating goals, or tracking your mood!
`);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PatchworkApp;
}