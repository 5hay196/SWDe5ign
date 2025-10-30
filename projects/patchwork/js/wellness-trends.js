// Wellness Trends Analytics System
class WellnessTrends {
    constructor() {
        this.currentRange = '30d';
        this.data = this.loadWellnessData();
        this.tooltip = document.getElementById('chart-tooltip');
        
        this.initializeData();
        this.renderAllCharts();
        this.updateStats();
        this.generateInsights();
    }

    initializeData() {
        // Initialize with sample data if none exists
        if (!this.data.mood || this.data.mood.length === 0) {
            this.generateSampleData();
        }
    }

    generateSampleData() {
        const now = new Date();
        const days = 90; // Generate 90 days of sample data
        
        this.data = {
            mood: [],
            goals: [],
            habits: [],
            energy: [],
            lastUpdated: now.toISOString()
        };

        for (let i = days; i >= 0; i--) {
            const date = new Date(now - i * 24 * 60 * 60 * 1000);
            const dateStr = date.toISOString().split('T')[0];
            
            // Mood data (1-5 scale with some realistic patterns)
            const baseMood = 3 + Math.sin(i * 0.1) * 0.5; // Weekly cycle
            const moodNoise = (Math.random() - 0.5) * 1.5;
            const mood = Math.max(1, Math.min(5, baseMood + moodNoise));
            
            this.data.mood.push({
                date: dateStr,
                value: Math.round(mood * 10) / 10,
                timestamp: date.getTime()
            });

            // Goals progress (0-100%)
            const baseProgress = Math.min(100, (days - i) / days * 80 + Math.random() * 20);
            this.data.goals.push({
                date: dateStr,
                value: Math.round(baseProgress),
                timestamp: date.getTime()
            });

            // Habits completion rate (0-100%)
            const habitBase = 60 + Math.sin(i * 0.2) * 20;
            const habitNoise = (Math.random() - 0.5) * 30;
            const habitRate = Math.max(0, Math.min(100, habitBase + habitNoise));
            
            this.data.habits.push({
                date: dateStr,
                value: Math.round(habitRate),
                timestamp: date.getTime()
            });

            // Energy levels (1-5 scale, correlated with mood)
            const energyBase = mood * 0.8 + (Math.random() - 0.5) * 0.8;
            const energy = Math.max(1, Math.min(5, energyBase));
            
            this.data.energy.push({
                date: dateStr,
                value: Math.round(energy * 10) / 10,
                timestamp: date.getTime()
            });
        }

        this.saveWellnessData();
    }

    loadWellnessData() {
        try {
            const data = localStorage.getItem('patchwork_wellness_trends');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.warn('Could not load wellness data:', error);
            return {};
        }
    }

    saveWellnessData() {
        try {
            localStorage.setItem('patchwork_wellness_trends', JSON.stringify(this.data));
        } catch (error) {
            console.warn('Could not save wellness data:', error);
        }
    }

    addDataPoint(type, value, date = new Date()) {
        const dateStr = date.toISOString().split('T')[0];
        
        if (!this.data[type]) {
            this.data[type] = [];
        }

        // Remove existing entry for the same date
        this.data[type] = this.data[type].filter(item => item.date !== dateStr);
        
        // Add new entry
        this.data[type].push({
            date: dateStr,
            value: value,
            timestamp: date.getTime()
        });

        // Sort by date
        this.data[type].sort((a, b) => a.timestamp - b.timestamp);
        
        this.data.lastUpdated = new Date().toISOString();
        this.saveWellnessData();
    }

    getDataForRange(type, range) {
        if (!this.data[type]) return [];
        
        const now = new Date();
        let cutoffDate;
        
        switch (range) {
            case '7d': cutoffDate = new Date(now - 7 * 24 * 60 * 60 * 1000); break;
            case '30d': cutoffDate = new Date(now - 30 * 24 * 60 * 60 * 1000); break;
            case '90d': cutoffDate = new Date(now - 90 * 24 * 60 * 60 * 1000); break;
            case '365d': cutoffDate = new Date(now - 365 * 24 * 60 * 60 * 1000); break;
            default: cutoffDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
        }
        
        return this.data[type].filter(item => item.timestamp >= cutoffDate.getTime());
    }

    renderChart(svgId, type, className) {
        const svg = document.getElementById(svgId);
        if (!svg) return;

        // Clear previous chart
        svg.innerHTML = '';
        
        const data = this.getDataForRange(type, this.currentRange);
        if (data.length === 0) return;

        const rect = svg.getBoundingClientRect();
        const width = rect.width || 400;
        const height = rect.height || 250;
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Create scales
        const maxValue = type === 'mood' || type === 'energy' ? 5 : 100;
        const minValue = type === 'mood' || type === 'energy' ? 1 : 0;
        
        const xScale = (index) => margin.left + (index / (data.length - 1)) * chartWidth;
        const yScale = (value) => margin.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

        // Draw grid lines
        for (let i = 0; i <= 5; i++) {
            const y = margin.top + (i / 5) * chartHeight;
            const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            gridLine.setAttribute('x1', margin.left);
            gridLine.setAttribute('y1', y);
            gridLine.setAttribute('x2', width - margin.right);
            gridLine.setAttribute('y2', y);
            gridLine.setAttribute('class', 'chart-grid-line');
            svg.appendChild(gridLine);
        }

        // Draw axes
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', margin.left);
        xAxis.setAttribute('y1', height - margin.bottom);
        xAxis.setAttribute('x2', width - margin.right);
        xAxis.setAttribute('y2', height - margin.bottom);
        xAxis.setAttribute('class', 'chart-axis');
        svg.appendChild(xAxis);

        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', margin.left);
        yAxis.setAttribute('y1', margin.top);
        yAxis.setAttribute('x2', margin.left);
        yAxis.setAttribute('y2', height - margin.bottom);
        yAxis.setAttribute('class', 'chart-axis');
        svg.appendChild(yAxis);

        // Create line path
        let pathData = '';
        data.forEach((point, index) => {
            const x = xScale(index);
            const y = yScale(point.value);
            
            if (index === 0) {
                pathData += `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
        });

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('class', `chart-line ${className}`);
        svg.appendChild(path);

        // Add data points
        data.forEach((point, index) => {
            const x = xScale(index);
            const y = yScale(point.value);
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('class', `chart-dot ${className.replace('-line', '-dot')}`);
            circle.setAttribute('stroke', getComputedStyle(document.documentElement).getPropertyValue(`--${className.split('-')[0]}-color`).trim());
            
            // Add tooltip interaction
            circle.addEventListener('mouseenter', (e) => this.showTooltip(e, point, type));
            circle.addEventListener('mouseleave', () => this.hideTooltip());
            
            svg.appendChild(circle);
        });

        // Add Y-axis labels
        for (let i = 0; i <= 5; i++) {
            const value = minValue + ((maxValue - minValue) * i / 5);
            const y = margin.top + chartHeight - (i / 5) * chartHeight;
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', margin.left - 10);
            label.setAttribute('y', y + 4);
            label.setAttribute('class', 'chart-label');
            label.setAttribute('text-anchor', 'end');
            label.textContent = type === 'mood' || type === 'energy' ? value.toFixed(1) : Math.round(value) + '%';
            svg.appendChild(label);
        }

        // Add X-axis labels (dates)
        const labelInterval = Math.max(1, Math.floor(data.length / 5));
        for (let i = 0; i < data.length; i += labelInterval) {
            const point = data[i];
            const x = xScale(i);
            const y = height - margin.bottom + 20;
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x);
            label.setAttribute('y', y);
            label.setAttribute('class', 'chart-label');
            
            const date = new Date(point.timestamp);
            label.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            svg.appendChild(label);
        }
    }

    showTooltip(event, point, type) {
        const tooltip = this.tooltip;
        const date = new Date(point.timestamp).toLocaleDateString();
        let valueText = point.value;
        
        if (type === 'mood' || type === 'energy') {
            valueText = point.value.toFixed(1) + '/5';
        } else {
            valueText = point.value + '%';
        }
        
        tooltip.innerHTML = `${date}<br>${this.getTypeLabel(type)}: ${valueText}`;
        tooltip.style.opacity = '1';
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY - 10 + 'px';
    }

    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }

    getTypeLabel(type) {
        const labels = {
            mood: 'Mood',
            goals: 'Goals Progress',
            habits: 'Habits Completion',
            energy: 'Energy Level'
        };
        return labels[type] || type;
    }

    renderAllCharts() {
        this.renderChart('mood-chart', 'mood', 'mood-line');
        this.renderChart('goals-chart', 'goals', 'goals-line');
        this.renderChart('habits-chart', 'habits', 'habits-line');
        this.renderChart('energy-chart', 'energy', 'energy-line');
    }

    updateStats() {
        const ranges = {
            current: this.currentRange,
            previous: this.getPreviousRangeKey()
        };

        Object.keys(ranges).forEach(period => {
            const moodData = this.getDataForRange('mood', ranges[period]);
            const goalsData = this.getDataForRange('goals', ranges[period]);
            const habitsData = this.getDataForRange('habits', ranges[period]);
            
            if (period === 'current') {
                // Update current stats
                const avgMood = moodData.length > 0 ? 
                    moodData.reduce((sum, item) => sum + item.value, 0) / moodData.length : 0;
                const avgGoals = goalsData.length > 0 ? 
                    goalsData.reduce((sum, item) => sum + item.value, 0) / goalsData.length : 0;
                const avgHabits = habitsData.length > 0 ? 
                    habitsData.reduce((sum, item) => sum + item.value, 0) / habitsData.length : 0;
                
                document.getElementById('avg-mood').textContent = avgMood.toFixed(1);
                document.getElementById('avg-goals').textContent = Math.round(avgGoals) + '%';
                document.getElementById('habit-rate').textContent = Math.round(avgHabits) + '%';
                
                // Calculate streak
                const streak = this.calculateStreak();
                document.getElementById('streak-count').textContent = streak;
            }
        });

        // Calculate and display changes
        this.updateStatChanges();
    }

    getPreviousRangeKey() {
        const ranges = {
            '7d': '7d',
            '30d': '30d', 
            '90d': '90d',
            '365d': '365d'
        };
        return ranges[this.currentRange] || '30d';
    }

    updateStatChanges() {
        const currentMood = this.getDataForRange('mood', this.currentRange);
        const currentGoals = this.getDataForRange('goals', this.currentRange);
        const currentHabits = this.getDataForRange('habits', this.currentRange);
        
        // Calculate trends (comparing first half vs second half of period)
        const moodTrend = this.calculateTrend(currentMood);
        const goalsTrend = this.calculateTrend(currentGoals);
        const habitsTrend = this.calculateTrend(currentHabits);
        
        this.updateStatDisplay('mood-change', moodTrend);
        this.updateStatDisplay('goals-change', goalsTrend);
        this.updateStatDisplay('habits-change', habitsTrend);
    }

    calculateTrend(data) {
        if (data.length < 4) return { change: 0, type: 'neutral' };
        
        const midPoint = Math.floor(data.length / 2);
        const firstHalf = data.slice(0, midPoint);
        const secondHalf = data.slice(midPoint);
        
        const firstAvg = firstHalf.reduce((sum, item) => sum + item.value, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((sum, item) => sum + item.value, 0) / secondHalf.length;
        
        const change = ((secondAvg - firstAvg) / firstAvg) * 100;
        
        return {
            change: Math.abs(change),
            type: change > 2 ? 'positive' : change < -2 ? 'negative' : 'neutral'
        };
    }

    updateStatDisplay(elementId, trend) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.className = `stat-change ${trend.type}`;
        
        if (trend.type === 'positive') {
            element.textContent = `↗ +${trend.change.toFixed(1)}%`;
        } else if (trend.type === 'negative') {
            element.textContent = `↘ -${trend.change.toFixed(1)}%`;
        } else {
            element.textContent = '→ Stable';
        }
    }

    calculateStreak() {
        const habitsData = this.data.habits || [];
        if (habitsData.length === 0) return 0;
        
        // Sort by date descending
        const sorted = [...habitsData].sort((a, b) => b.timestamp - a.timestamp);
        
        let streak = 0;
        for (const day of sorted) {
            if (day.value >= 75) { // 75% completion rate considered successful
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    generateInsights() {
        const insights = [];
        
        // Mood insights
        const moodData = this.getDataForRange('mood', this.currentRange);
        if (moodData.length > 0) {
            const avgMood = moodData.reduce((sum, item) => sum + item.value, 0) / moodData.length;
            const moodTrend = this.calculateTrend(moodData);
            
            if (moodTrend.type === 'positive') {
                insights.push({
                    icon: '😊',
                    title: 'Mood Improving',
                    description: `Your mood has improved by ${moodTrend.change.toFixed(1)}% recently. Keep up the great work!`
                });
            } else if (avgMood >= 4) {
                insights.push({
                    icon: '🌟',
                    title: 'Excellent Mood',
                    description: `You're maintaining an excellent mood average of ${avgMood.toFixed(1)}/5. You're doing something right!`
                });
            }
        }

        // Goals insights
        const goalsData = this.getDataForRange('goals', this.currentRange);
        if (goalsData.length > 0) {
            const latestGoals = goalsData[goalsData.length - 1]?.value || 0;
            if (latestGoals >= 80) {
                insights.push({
                    icon: '🎯',
                    title: 'Goal Crusher',
                    description: `You're at ${latestGoals}% goal completion! You're on track for amazing results.`
                });
            }
        }

        // Habits insights
        const habitsData = this.getDataForRange('habits', this.currentRange);
        const streak = this.calculateStreak();
        if (streak >= 7) {
            insights.push({
                icon: '🔥',
                title: 'On Fire!',
                description: `${streak} day streak! Consistency is the key to lasting change.`
            });
        }

        // Correlation insights
        if (moodData.length > 0 && habitsData.length > 0) {
            const correlation = this.calculateCorrelation(moodData, habitsData);
            if (correlation > 0.6) {
                insights.push({
                    icon: '🔗',
                    title: 'Strong Connection',
                    description: 'Your mood and habits are strongly connected. Good habits lead to better moods!'
                });
            }
        }

        // Default insight if none generated
        if (insights.length === 0) {
            insights.push({
                icon: '📈',
                title: 'Keep Tracking',
                description: 'Keep logging your wellness data to unlock personalized insights and patterns.'
            });
        }

        this.renderInsights(insights);
    }

    calculateCorrelation(dataA, dataB) {
        if (dataA.length !== dataB.length || dataA.length === 0) return 0;
        
        const n = dataA.length;
        const sumA = dataA.reduce((sum, item) => sum + item.value, 0);
        const sumB = dataB.reduce((sum, item) => sum + item.value, 0);
        const sumAB = dataA.reduce((sum, item, i) => sum + item.value * dataB[i].value, 0);
        const sumA2 = dataA.reduce((sum, item) => sum + item.value * item.value, 0);
        const sumB2 = dataB.reduce((sum, item) => sum + item.value * item.value, 0);
        
        const numerator = n * sumAB - sumA * sumB;
        const denominator = Math.sqrt((n * sumA2 - sumA * sumA) * (n * sumB2 - sumB * sumB));
        
        return denominator === 0 ? 0 : numerator / denominator;
    }

    renderInsights(insights) {
        const container = document.getElementById('insights-grid');
        if (!container) return;
        
        container.innerHTML = insights.map(insight => `
            <div class="insight-card">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${insight.icon}</div>
                <h4 style="margin: 0 0 0.5rem 0;">${insight.title}</h4>
                <p style="margin: 0; line-height: 1.5;">${insight.description}</p>
            </div>
        `).join('');
    }

    setTimeRange(range) {
        this.currentRange = range;
        
        // Update button states
        document.querySelectorAll('.date-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update period labels
        const periodText = {
            '7d': 'Last 7 days',
            '30d': 'Last 30 days', 
            '90d': 'Last 3 months',
            '365d': 'Last year'
        }[range];
        
        document.querySelectorAll('[id$="-period"]').forEach(element => {
            element.textContent = periodText;
        });
        
        // Re-render everything
        this.renderAllCharts();
        this.updateStats();
        this.generateInsights();
    }
}

// Global functions for HTML onclick handlers
function setTimeRange(range) {
    if (window.wellnessTrends) {
        window.wellnessTrends.setTimeRange(range);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wellnessTrends = new WellnessTrends();
    console.log('🧩 Wellness Trends initialized successfully!');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WellnessTrends;
}