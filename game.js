class MergeTownGame {
    constructor() {
        this.coins = 50;
        this.stars = 0;
        this.mergeBoard = Array(15).fill(null); // 3x5 grid
        this.draggedIndex = null;

        // Game data
        this.machines = [
            { id: 'bread', icon: '🍞', name: 'Bakery', time: 1000, produces: 'bread', locked: false },
            { id: 'milk', icon: '🥛', name: 'Dairy', time: 1000, produces: 'milk', locked: false },
            { id: 'apple', icon: '🍎', name: 'Farm', time: 1000, produces: 'apple', locked: false },
            { id: 'orange', icon: '🍊', name: 'Orange Tree', time: 1200, produces: 'orange', locked: false },
            { id: 'cheese', icon: '🧀', name: 'Cheese Shop', time: 1500, produces: 'cheese', locked: false },
            { id: 'egg', icon: '🥚', name: 'Chicken Coop', time: 800, produces: 'egg', locked: false },
            { id: 'cookie', icon: '🍪', name: 'Cookie Shop', time: 1500, produces: 'cookie', locked: true, unlockItem: 'bread' },
            { id: 'cake', icon: '🍰', name: 'Bakery Pro', time: 2000, produces: 'cake', locked: true, unlockItem: 'milk' },
            { id: 'pizza', icon: '🍕', name: 'Pizzeria', time: 2000, produces: 'pizza', locked: true, unlockItem: 'cheese' },
            { id: 'burger', icon: '🍔', name: 'Burger Joint', time: 1800, produces: 'burger', locked: true, unlockItem: 'egg' },
            { id: 'carrot', icon: '🥕', name: 'Garden', time: 900, produces: 'carrot', locked: true, unlockHouse: 1 },
            { id: 'grape', icon: '🍇', name: 'Vineyard', time: 1100, produces: 'grape', locked: true, unlockHouse: 1 },
            { id: 'icecream', icon: '🍦', name: 'Ice Cream Shop', time: 1600, produces: 'icecream', locked: true, unlockItem: 'cookie' },
            { id: 'donut', icon: '🍩', name: 'Donut Shop', time: 1400, produces: 'donut', locked: true, unlockItem: 'cake' },
            { id: 'taco', icon: '🌮', name: 'Taco Stand', time: 1700, produces: 'taco', locked: true, unlockHouse: 4 },
            { id: 'sushi', icon: '🍣', name: 'Sushi Bar', time: 2200, produces: 'sushi', locked: true, unlockHouse: 5 }
        ];

        this.items = {
            bread: { icon: '🍞', name: 'Bread' },
            milk: { icon: '🥛', name: 'Milk' },
            apple: { icon: '🍎', name: 'Apple' },
            orange: { icon: '🍊', name: 'Orange' },
            cheese: { icon: '🧀', name: 'Cheese' },
            egg: { icon: '🥚', name: 'Egg' },
            cookie: { icon: '🍪', name: 'Cookie' },
            cake: { icon: '🍰', name: 'Cake' },
            sandwich: { icon: '🥪', name: 'Sandwich' },
            pie: { icon: '🥧', name: 'Pie' },
            pizza: { icon: '🍕', name: 'Pizza' },
            burger: { icon: '🍔', name: 'Burger' },
            carrot: { icon: '🥕', name: 'Carrot' },
            grape: { icon: '🍇', name: 'Grape' },
            icecream: { icon: '🍦', name: 'Ice Cream' },
            donut: { icon: '🍩', name: 'Donut' },
            taco: { icon: '🌮', name: 'Taco' },
            sushi: { icon: '🍣', name: 'Sushi' }
        };

        this.orders = [];
        this.houses = [
            { id: 1, icon: '🏚️', status: 'Broken', cost: 100, stars: 1, repaired: false, reward: 'Unlocks new machines!' },
            { id: 2, icon: '🏚️', status: 'Broken', cost: 300, stars: 3, repaired: false, reward: 'Bigger merge board!' },
            { id: 3, icon: '🏚️', status: 'Broken', cost: 500, stars: 5, repaired: false, reward: 'More upgrades!' },
            { id: 4, icon: '🏚️', status: 'Broken', cost: 800, stars: 8, repaired: false, reward: 'Special items!' },
            { id: 5, icon: '🏚️', status: 'Broken', cost: 1200, stars: 12, repaired: false, reward: 'Premium machines!' },
            { id: 6, icon: '🏚️', status: 'Broken', cost: 2000, stars: 20, repaired: false, reward: 'Ultimate upgrade!' }
        ];

        this.upgrades = [
            { id: 'speed1', icon: '⚡', name: 'Faster Production I', description: 'Reduce all machine times by 20%', cost: 150, level: 0, maxLevel: 5, effect: 'speed', value: 0.2 },
            { id: 'coins1', icon: '💰', name: 'Better Deals I', description: 'Earn 25% more coins from orders', cost: 200, level: 0, maxLevel: 5, effect: 'coins', value: 0.25 },
            { id: 'slots1', icon: '📦', name: 'Extra Slots I', description: 'Add 5 more slots to merge board', cost: 300, level: 0, maxLevel: 1, effect: 'slots', value: 5 },
            { id: 'auto1', icon: '🤖', name: 'Auto-Collect', description: 'Machines auto-produce every 5s', cost: 500, level: 0, maxLevel: 1, effect: 'auto', value: 5000 },
            { id: 'slots2', icon: '📦', name: 'Extra Slots II', description: 'Add 10 more slots to merge board', cost: 800, level: 0, maxLevel: 1, effect: 'slots', value: 10, requiresHouse: 2 },
            { id: 'stars1', icon: '⭐', name: 'Star Bonus', description: 'Earn 50% more stars from orders', cost: 600, level: 0, maxLevel: 3, effect: 'stars', value: 0.5, requiresHouse: 3 },
            { id: 'speed2', icon: '⚡', name: 'Faster Production II', description: 'Reduce machine times by 30%', cost: 1000, level: 0, maxLevel: 3, effect: 'speed2', value: 0.3, requiresHouse: 3 },
            { id: 'multimake', icon: '🎯', name: 'Multi-Merge', description: 'Merge creates 2 items instead of 1', cost: 1500, level: 0, maxLevel: 1, effect: 'multimake', value: 1, requiresHouse: 4 },
            { id: 'lucky', icon: '🍀', name: 'Lucky Orders', description: 'Orders give 2x rewards 25% of time', cost: 2000, level: 0, maxLevel: 1, effect: 'lucky', value: 0.25, requiresHouse: 5 }
        ];

        this.machineTimers = {};
        this.autoProduceTimer = null;

        this.init();
    }

    init() {
        this.renderMachines();
        this.renderMergeBoard();
        this.renderOrders();
        this.renderHouses();
        this.renderUpgrades();
        this.updateResources();

        // Generate orders periodically
        this.generateOrder();
        setInterval(() => this.generateOrder(), 15000);
    }

    // Machines
    renderMachines() {
        const machinesArea = document.getElementById('machines-area');
        machinesArea.innerHTML = '';

        this.machines.forEach(machine => {
            const machineEl = document.createElement('div');
            machineEl.className = `machine ${machine.locked ? 'locked' : ''}`;
            machineEl.dataset.id = machine.id;

            machineEl.innerHTML = `
                ${machine.locked ? '<div class="lock-icon">🔒</div>' : ''}
                <div class="machine-icon">${machine.icon}</div>
                <div class="machine-name">${machine.name}</div>
                <div class="machine-timer"></div>
            `;

            if (!machine.locked) {
                machineEl.addEventListener('click', () => this.produceMachine(machine));
            }

            machinesArea.appendChild(machineEl);
        });
    }

    produceMachine(machine) {
        const machineEl = document.querySelector(`.machine[data-id="${machine.id}"]`);
        if (machineEl.classList.contains('producing')) return;

        // Find empty slot on merge board
        const emptyIndex = this.mergeBoard.findIndex(item => item === null);
        if (emptyIndex === -1) {
            alert('Merge board is full! Merge or remove items first.');
            return;
        }

        machineEl.classList.add('producing');
        const timerEl = machineEl.querySelector('.machine-timer');

        // Create unique timer ID for each production
        const timerKey = `${machine.id}_${Date.now()}`;
        const speedMultiplier = this.getSpeedMultiplier ? this.getSpeedMultiplier() : 1;
        let timeLeft = (machine.time * speedMultiplier) / 1000;
        this.machineTimers[timerKey] = setInterval(() => {
            timeLeft -= 0.1;
            if (timeLeft > 0) {
                timerEl.textContent = `${timeLeft.toFixed(1)}s`;
            }

            if (timeLeft <= 0) {
                clearInterval(this.machineTimers[timerKey]);
                delete this.machineTimers[timerKey];
                machineEl.classList.remove('producing');
                timerEl.textContent = '';

                // Add item to merge board
                this.mergeBoard[emptyIndex] = { type: machine.produces, level: 1 };
                this.renderMergeBoard();
                this.renderOrders(); // Update orders to check if we can fulfill any
                this.renderUpgrades(); // Update upgrade buttons
                this.renderHouses(); // Update house repair buttons
            }
        }, 100);
    }

    // Merge Board
    renderMergeBoard() {
        const mergeBoard = document.getElementById('merge-board');
        mergeBoard.innerHTML = '';

        this.mergeBoard.forEach((item, index) => {
            const cell = document.createElement('div');
            cell.className = 'merge-cell';
            cell.dataset.index = index;

            if (item) {
                const itemData = this.items[item.type];
                cell.classList.add('has-item');
                cell.setAttribute('draggable', 'true');
                cell.innerHTML = `
                    <div class="item-icon">${itemData.icon}</div>
                    <div class="item-level">Lv ${item.level}</div>
                `;

                cell.addEventListener('dragstart', (e) => this.handleDragStart(e, index));
                cell.addEventListener('dragend', () => this.handleDragEnd());
            } else {
                cell.innerHTML = '';
            }

            cell.addEventListener('dragover', (e) => this.handleDragOver(e));
            cell.addEventListener('drop', (e) => this.handleDrop(e, index));
            cell.addEventListener('dragenter', (e) => this.handleDragEnter(e, index));
            cell.addEventListener('dragleave', (e) => this.handleDragLeave(e));

            mergeBoard.appendChild(cell);
        });
    }

    handleDragStart(e, index) {
        this.draggedIndex = index;
        e.target.classList.add('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnter(e, index) {
        if (this.draggedIndex === null || this.draggedIndex === index) return;

        const targetCell = e.target.closest('.merge-cell');
        if (!targetCell) return;

        const draggedItem = this.mergeBoard[this.draggedIndex];
        const targetItem = this.mergeBoard[index];

        // Check if can merge
        if (targetItem && draggedItem.type === targetItem.type && draggedItem.level === targetItem.level) {
            targetCell.classList.add('drop-target-valid');
        } else if (!targetItem) {
            targetCell.classList.add('drop-target-valid');
        } else {
            targetCell.classList.add('drop-target-invalid');
        }
    }

    handleDragLeave(e) {
        const targetCell = e.target.closest('.merge-cell');
        if (!targetCell) return;
        targetCell.classList.remove('drop-target-valid', 'drop-target-invalid');
    }

    handleDrop(e, index) {
        e.preventDefault();

        const targetCell = e.target.closest('.merge-cell');
        if (targetCell) {
            targetCell.classList.remove('drop-target-valid', 'drop-target-invalid');
        }

        if (this.draggedIndex === null || this.draggedIndex === index) return;

        const draggedItem = this.mergeBoard[this.draggedIndex];
        const targetItem = this.mergeBoard[index];

        // Try to merge
        if (targetItem && draggedItem.type === targetItem.type && draggedItem.level === targetItem.level) {
            // Merge - level up the target
            this.mergeBoard[index] = { type: targetItem.type, level: targetItem.level + 1 };
            this.mergeBoard[this.draggedIndex] = null;

            // Check if this unlocks a machine
            this.checkUnlocks(draggedItem.type, targetItem.level + 1);

            targetCell.classList.add('pop-animation');
            setTimeout(() => targetCell.classList.remove('pop-animation'), 300);
        }
        // Move to empty cell
        else if (!targetItem) {
            this.mergeBoard[index] = draggedItem;
            this.mergeBoard[this.draggedIndex] = null;
        }

        this.renderMergeBoard();
        this.renderOrders(); // Update orders after moving/merging items
    }

    handleDragEnd() {
        document.querySelectorAll('.merge-cell').forEach(cell => {
            cell.classList.remove('dragging', 'drop-target-valid', 'drop-target-invalid');
        });
        this.draggedIndex = null;
    }

    checkUnlocks(itemType, level) {
        this.machines.forEach(machine => {
            if (machine.locked && machine.unlockItem === itemType && level >= 3) {
                machine.locked = false;
                this.renderMachines();
                alert(`🎉 ${machine.name} unlocked! You can now produce ${this.items[machine.produces].name}!`);
            }
        });
    }

    // Customer Orders
    generateOrder() {
        if (this.orders.length >= 3) return;

        // Get all unlocked items from machines
        const unlockedItems = this.machines
            .filter(m => !m.locked)
            .map(m => m.produces);

        const randomItem = unlockedItems[Math.floor(Math.random() * unlockedItems.length)];
        const level = Math.floor(Math.random() * 3) + 1;
        const reward = level * 30;
        const starReward = level === 3 ? 1 : 0;

        this.orders.push({
            id: Date.now(),
            item: randomItem,
            level: level,
            reward: reward,
            stars: starReward
        });

        this.renderOrders();
    }

    renderOrders() {
        const ordersArea = document.getElementById('orders-area');
        ordersArea.innerHTML = '';

        if (this.orders.length === 0) {
            ordersArea.innerHTML = '<p style="text-align: center; color: #666;">Waiting for customers...</p>';
            return;
        }

        this.orders.forEach(order => {
            const itemData = this.items[order.item];
            const orderEl = document.createElement('div');
            orderEl.className = 'order';

            const hasItem = this.mergeBoard.some(item =>
                item && item.type === order.item && item.level === order.level
            );

            orderEl.innerHTML = `
                <div class="order-content">
                    <div class="order-item">${itemData.icon}</div>
                    <div class="order-details">
                        <div class="order-name">${itemData.name} Lv${order.level}</div>
                        <div class="order-reward">💰 ${order.reward}${order.stars ? ' ⭐ ' + order.stars : ''}</div>
                    </div>
                </div>
                <button class="fulfill-btn" ${!hasItem ? 'disabled' : ''}>
                    ${hasItem ? 'Fulfill' : 'Need Item'}
                </button>
            `;

            const btn = orderEl.querySelector('.fulfill-btn');
            btn.addEventListener('click', () => this.fulfillOrder(order));

            ordersArea.appendChild(orderEl);
        });
    }

    fulfillOrder(order) {
        // Find and remove the item from merge board
        const itemIndex = this.mergeBoard.findIndex(item =>
            item && item.type === order.item && item.level === order.level
        );

        if (itemIndex === -1) return;

        this.mergeBoard[itemIndex] = null;
        const coinMultiplier = this.getCoinMultiplier();
        const starMultiplier = this.getStarMultiplier ? this.getStarMultiplier() : 1;

        // Lucky upgrade - 2x rewards randomly
        const luckyUpgrade = this.upgrades.find(u => u.effect === 'lucky');
        const isLucky = luckyUpgrade && luckyUpgrade.level > 0 && Math.random() < luckyUpgrade.value;
        const luckyMultiplier = isLucky ? 2 : 1;

        this.coins += Math.floor(order.reward * coinMultiplier * luckyMultiplier);
        this.stars += Math.floor(order.stars * starMultiplier * luckyMultiplier);

        if (isLucky) {
            alert('🍀 LUCKY! Double rewards!');
        }

        // Remove order
        this.orders = this.orders.filter(o => o.id !== order.id);

        this.updateResources();
        this.renderMergeBoard();
        this.renderOrders();
        this.renderUpgrades(); // Update upgrade buttons immediately
        this.renderHouses(); // Update house repair buttons immediately

        // Generate new order
        setTimeout(() => this.generateOrder(), 2000);
    }

    // Houses
    renderHouses() {
        const housesArea = document.getElementById('houses-area');
        housesArea.innerHTML = '';

        this.houses.forEach(house => {
            const houseEl = document.createElement('div');
            houseEl.className = `house ${house.repaired ? 'repaired' : ''}`;

            const displayIcon = house.repaired ? '🏡' : house.icon;
            const status = house.repaired ? 'Repaired!' : house.status;

            houseEl.innerHTML = `
                <div class="house-icon">${displayIcon}</div>
                <div class="house-status">${status}</div>
                ${!house.repaired ? `
                    <div class="house-cost">💰 ${house.cost} ⭐ ${house.stars}</div>
                    <button class="repair-btn" ${this.coins < house.cost || this.stars < house.stars ? 'disabled' : ''}>
                        Repair
                    </button>
                ` : '<div style="color: #28a745; font-weight: bold;">✓ Complete</div>'}
            `;

            housesArea.appendChild(houseEl);

            // Add event listener after appending to DOM
            const btn = houseEl.querySelector('.repair-btn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.repairHouse(house);
                });
            }
        });
    }

    repairHouse(house) {
        if (this.coins < house.cost || this.stars < house.stars) return;

        this.coins -= house.cost;
        this.stars -= house.stars;
        house.repaired = true;

        // Unlock machines tied to this house
        this.machines.forEach(machine => {
            if (machine.unlockHouse === house.id) {
                machine.locked = false;
            }
        });

        this.updateResources();
        this.renderHouses();
        this.renderMachines();
        this.renderUpgrades(); // Show newly unlocked upgrades

        alert(`🎉 ${house.reward}`);
    }

    updateResources() {
        document.getElementById('coins').textContent = this.coins;
        document.getElementById('stars').textContent = this.stars;
    }

    // Upgrades
    renderUpgrades() {
        const upgradesArea = document.getElementById('upgrades-area');
        upgradesArea.innerHTML = '';

        this.upgrades.forEach(upgrade => {
            // Check if upgrade requires a house to be repaired
            if (upgrade.requiresHouse) {
                const requiredHouse = this.houses.find(h => h.id === upgrade.requiresHouse);
                if (!requiredHouse || !requiredHouse.repaired) {
                    return; // Skip this upgrade if house not repaired
                }
            }

            const upgradeEl = document.createElement('div');
            upgradeEl.className = `upgrade ${upgrade.level >= upgrade.maxLevel ? 'purchased' : ''}`;

            const currentCost = Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level));
            const canAfford = this.coins >= currentCost;
            const isMaxed = upgrade.level >= upgrade.maxLevel;

            upgradeEl.innerHTML = `
                <div class="upgrade-icon">${upgrade.icon}</div>
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-level">Level ${upgrade.level}/${upgrade.maxLevel}</div>
                ${!isMaxed ? `
                    <div class="upgrade-cost">💰 ${currentCost}</div>
                    <button class="upgrade-btn" ${!canAfford ? 'disabled' : ''}>
                        ${canAfford ? 'Upgrade' : 'Need Coins'}
                    </button>
                ` : '<div style="color: #28a745; font-weight: bold;">✓ MAX LEVEL</div>'}
            `;

            upgradesArea.appendChild(upgradeEl);

            // Add event listener after appending to DOM
            const btn = upgradeEl.querySelector('.upgrade-btn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.purchaseUpgrade(upgrade);
                });
            }
        });
    }

    purchaseUpgrade(upgrade) {
        const currentCost = Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level));

        if (this.coins < currentCost || upgrade.level >= upgrade.maxLevel) return;

        this.coins -= currentCost;
        upgrade.level++;

        // Apply upgrade effects
        this.applyUpgradeEffects(upgrade);

        this.updateResources();
        this.renderUpgrades();
        this.renderHouses(); // Update house repair buttons too
    }

    applyUpgradeEffects(upgrade) {
        if (upgrade.effect === 'slots' && upgrade.level === 1) {
            // Add more slots to merge board
            const newSlots = upgrade.value;
            for (let i = 0; i < newSlots; i++) {
                this.mergeBoard.push(null);
            }
            this.renderMergeBoard();
        }

        if (upgrade.effect === 'auto' && upgrade.level === 1) {
            // Start auto-production
            this.startAutoProduction();
        }
    }

    getSpeedMultiplier() {
        const speedUpgrade = this.upgrades.find(u => u.effect === 'speed');
        const speed2Upgrade = this.upgrades.find(u => u.effect === 'speed2');
        let multiplier = 1;
        if (speedUpgrade) multiplier -= (speedUpgrade.value * speedUpgrade.level);
        if (speed2Upgrade) multiplier -= (speed2Upgrade.value * speed2Upgrade.level);
        return Math.max(0.1, multiplier); // Minimum 10% of original time
    }

    getCoinMultiplier() {
        const coinUpgrade = this.upgrades.find(u => u.effect === 'coins');
        if (!coinUpgrade) return 1;
        return 1 + (coinUpgrade.value * coinUpgrade.level);
    }

    getStarMultiplier() {
        const starUpgrade = this.upgrades.find(u => u.effect === 'stars');
        if (!starUpgrade) return 1;
        return 1 + (starUpgrade.value * starUpgrade.level);
    }

    startAutoProduction() {
        if (this.autoProduceTimer) return;

        this.autoProduceTimer = setInterval(() => {
            // Auto-click all unlocked machines
            this.machines.forEach(machine => {
                if (!machine.locked) {
                    const machineEl = document.querySelector(`.machine[data-id="${machine.id}"]`);
                    if (machineEl && !machineEl.classList.contains('producing')) {
                        this.produceMachine(machine);
                    }
                }
            });
        }, 5000);
    }
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new MergeTownGame();
});
