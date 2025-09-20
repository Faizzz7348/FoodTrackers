// Food Tracker Application - Main JavaScript File

class FoodTracker {
    constructor() {
        this.db = null;
        this.currentDate = new Date();
        this.editingItem = null;
        this.foods = [];
        
        this.init();
    }

    async init() {
        await this.initDB();
        this.setupEventListeners();
        this.loadTheme();
        await this.loadFoods();
        this.renderCalendar();
        this.renderFoodList();
    }

    // IndexedDB Setup and Operations
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('FoodTrackerDB', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create foods store
                if (!db.objectStoreNames.contains('foods')) {
                    const foodStore = db.createObjectStore('foods', { keyPath: 'id', autoIncrement: true });
                    foodStore.createIndex('category', 'category', { unique: false });
                    foodStore.createIndex('expirationDate', 'expirationDate', { unique: false });
                }
                
                // Create settings store
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }
            };
        });
    }

    async addFood(foodData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['foods'], 'readwrite');
            const store = transaction.objectStore('foods');
            const request = store.add({
                ...foodData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async updateFood(id, foodData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['foods'], 'readwrite');
            const store = transaction.objectStore('foods');
            const request = store.put({
                ...foodData,
                id: id,
                updatedAt: new Date().toISOString()
            });
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteFood(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['foods'], 'readwrite');
            const store = transaction.objectStore('foods');
            const request = store.delete(id);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async loadFoods() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['foods'], 'readonly');
            const store = transaction.objectStore('foods');
            const request = store.getAll();
            
            request.onsuccess = () => {
                this.foods = request.result;
                resolve();
            };
            request.onerror = () => reject(request.error);
        });
    }

    async saveSetting(key, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            const request = store.put({ key, value });
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getSetting(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);
            
            request.onsuccess = () => {
                resolve(request.result ? request.result.value : null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Food form submission
        document.getElementById('food-form').addEventListener('submit', (e) => {
            this.handleFoodSubmit(e);
        });

        // Edit form submission
        document.getElementById('edit-form').addEventListener('submit', (e) => {
            this.handleEditSubmit(e);
        });

        // Cancel buttons
        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.cancelEdit();
        });
        document.getElementById('cancel-edit').addEventListener('click', () => {
            this.closeModal();
        });

        // Modal close
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Filter controls
        document.getElementById('category-filter').addEventListener('change', () => {
            this.renderFoodList();
        });
        document.getElementById('status-filter').addEventListener('change', () => {
            this.renderFoodList();
        });

        // Calendar navigation
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        document.getElementById('next-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        // Modal click outside to close
        document.getElementById('edit-modal').addEventListener('click', (e) => {
            if (e.target.id === 'edit-modal') {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.cancelEdit();
            }
        });
    }

    // Theme Management
    async loadTheme() {
        const savedTheme = await this.getSetting('theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    async toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        await this.saveSetting('theme', newTheme);
    }

    // Food Management
    async handleFoodSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const foodData = {
            name: formData.get('name').trim(),
            quantity: parseInt(formData.get('quantity')),
            category: formData.get('category'),
            expirationDate: formData.get('expirationDate')
        };

        try {
            if (this.editingItem) {
                await this.updateFood(this.editingItem.id, foodData);
                this.editingItem = null;
                this.showSubmitButton();
            } else {
                await this.addFood(foodData);
            }
            
            await this.loadFoods();
            this.renderFoodList();
            this.renderCalendar();
            e.target.reset();
            
            this.showNotification('Food item saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving food:', error);
            this.showNotification('Error saving food item. Please try again.', 'error');
        }
    }

    async handleEditSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const foodData = {
            name: formData.get('name').trim(),
            quantity: parseInt(formData.get('quantity')),
            category: formData.get('category'),
            expirationDate: formData.get('expirationDate'),
            createdAt: this.editingItem.createdAt
        };

        try {
            await this.updateFood(this.editingItem.id, foodData);
            await this.loadFoods();
            this.renderFoodList();
            this.renderCalendar();
            this.closeModal();
            
            this.showNotification('Food item updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating food:', error);
            this.showNotification('Error updating food item. Please try again.', 'error');
        }
    }

    editFood(id) {
        const food = this.foods.find(f => f.id === id);
        if (!food) return;

        this.editingItem = food;
        
        // Fill the modal form
        document.getElementById('edit-id').value = food.id;
        document.getElementById('edit-food-name').value = food.name;
        document.getElementById('edit-food-quantity').value = food.quantity;
        document.getElementById('edit-food-category').value = food.category;
        document.getElementById('edit-expiration-date').value = food.expirationDate;
        
        this.showModal();
    }

    async deleteFood(id) {
        if (!confirm('Are you sure you want to delete this food item?')) {
            return;
        }

        try {
            await this.deleteFood(id);
            await this.loadFoods();
            this.renderFoodList();
            this.renderCalendar();
            
            this.showNotification('Food item deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting food:', error);
            this.showNotification('Error deleting food item. Please try again.', 'error');
        }
    }

    cancelEdit() {
        this.editingItem = null;
        this.showSubmitButton();
        document.getElementById('food-form').reset();
    }

    showSubmitButton() {
        document.getElementById('submit-btn').textContent = 'Add Food';
        document.getElementById('cancel-btn').style.display = 'none';
    }

    showUpdateButton() {
        document.getElementById('submit-btn').textContent = 'Update Food';
        document.getElementById('cancel-btn').style.display = 'inline-block';
    }

    // Modal Management
    showModal() {
        document.getElementById('edit-modal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('edit-modal').classList.remove('show');
        document.body.style.overflow = '';
        this.editingItem = null;
    }

    // Food Status Calculation
    getFoodStatus(expirationDate) {
        const today = new Date();
        const expDate = new Date(expirationDate);
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return 'expired';
        } else if (diffDays <= 3) {
            return 'expiring-soon';
        } else {
            return 'fresh';
        }
    }

    // Food List Rendering
    renderFoodList() {
        const foodList = document.getElementById('food-list');
        const categoryFilter = document.getElementById('category-filter').value;
        const statusFilter = document.getElementById('status-filter').value;

        let filteredFoods = this.foods;

        // Apply filters
        if (categoryFilter) {
            filteredFoods = filteredFoods.filter(food => food.category === categoryFilter);
        }

        if (statusFilter) {
            filteredFoods = filteredFoods.filter(food => this.getFoodStatus(food.expirationDate) === statusFilter);
        }

        // Sort by expiration date
        filteredFoods.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

        if (filteredFoods.length === 0) {
            foodList.innerHTML = '<li class="empty-state">No food items found. Add some food to get started!</li>';
            return;
        }

        foodList.innerHTML = filteredFoods.map(food => {
            const status = this.getFoodStatus(food.expirationDate);
            const expirationDate = new Date(food.expirationDate);
            const formattedDate = expirationDate.toLocaleDateString();
            const daysUntilExpiry = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));
            
            let statusText = '';
            if (status === 'expired') {
                statusText = `Expired ${Math.abs(daysUntilExpiry)} day${Math.abs(daysUntilExpiry) !== 1 ? 's' : ''} ago`;
            } else if (status === 'expiring-soon') {
                statusText = `Expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`;
            } else {
                statusText = `Expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`;
            }

            return `
                <li class="food-item ${status}">
                    <div class="food-info">
                        <div class="food-name">${this.escapeHtml(food.name)}</div>
                        <div class="food-details">
                            <span>Qty: ${food.quantity}</span>
                            <span>Category: ${this.capitalizeFirst(food.category)}</span>
                            <span>Expires: ${formattedDate}</span>
                            <span class="status-text">${statusText}</span>
                        </div>
                    </div>
                    <div class="food-actions">
                        <button class="edit-btn" onclick="foodTracker.editFood(${food.id})">
                            Edit
                        </button>
                        <button class="delete-btn" onclick="foodTracker.deleteFood(${food.id})">
                            Delete
                        </button>
                    </div>
                </li>
            `;
        }).join('');
    }

    // Calendar Rendering
    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const monthYear = document.getElementById('current-month-year');
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });

        // Clear calendar
        calendar.innerHTML = '';

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendar.appendChild(header);
        });

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // Generate calendar days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < 42; i++) { // 6 weeks
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Add classes
            if (currentDate.getMonth() !== month) {
                dayElement.classList.add('other-month');
            }
            
            if (currentDate.getTime() === today.getTime()) {
                dayElement.classList.add('today');
            }

            // Day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = currentDate.getDate();
            dayElement.appendChild(dayNumber);

            // Food items for this day
            const dayItems = document.createElement('div');
            dayItems.className = 'day-items';
            
            const itemsForDay = this.foods.filter(food => {
                const foodDate = new Date(food.expirationDate);
                return foodDate.toDateString() === currentDate.toDateString();
            });

            itemsForDay.forEach(food => {
                const status = this.getFoodStatus(food.expirationDate);
                const itemElement = document.createElement('div');
                itemElement.className = `calendar-item ${status}`;
                itemElement.textContent = food.name;
                itemElement.title = `${food.name} (${food.quantity}) - ${this.capitalizeFirst(food.category)}`;
                dayItems.appendChild(itemElement);
            });

            dayElement.appendChild(dayItems);
            calendar.appendChild(dayElement);
        }
    }

    // Utility Functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'});
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.375rem;
            box-shadow: 0 4px 12px var(--shadow);
            z-index: 1000;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Public method for delete (called from HTML)
    async deleteFood(id) {
        if (!confirm('Are you sure you want to delete this food item?')) {
            return;
        }

        try {
            const transaction = this.db.transaction(['foods'], 'readwrite');
            const store = transaction.objectStore('foods');
            await new Promise((resolve, reject) => {
                const request = store.delete(id);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
            
            await this.loadFoods();
            this.renderFoodList();
            this.renderCalendar();
            
            this.showNotification('Food item deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting food:', error);
            this.showNotification('Error deleting food item. Please try again.', 'error');
        }
    }
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the application when DOM is loaded
let foodTracker;

document.addEventListener('DOMContentLoaded', () => {
    foodTracker = new FoodTracker();
});

// Service Worker Registration for PWA (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}