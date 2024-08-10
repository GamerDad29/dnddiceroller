// Add event listeners to dice to toggle selection
document.querySelectorAll('.dice').forEach(die => {
    die.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.button === 0) { // Left-click to add dice
            this.classList.add('selected');
            let count = parseInt(this.getAttribute('data-count')) || 0;
            count++;
            this.setAttribute('data-count', count);
        }
    });

    die.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (event.button === 2) { // Right-click to remove dice
            let count = parseInt(this.getAttribute('data-count')) || 0;
            if (count > 0) {
                count--;
                if (count === 0) {
                    this.classList.remove('selected');
                }
                this.setAttribute('data-count', count);
            }
        }
    });
});

let totalRoll = 0;

// Roll selected dice and display the result
document.getElementById('rollButton').addEventListener('click', function () {
    const selectedDice = document.querySelectorAll('.dice.selected');
    if (selectedDice.length === 0) {
        document.getElementById('result').textContent = "No dice selected!";
        return;
    }

    let resultsHTML = '';
    totalRoll = 0;

    selectedDice.forEach(die => {
        die.classList.add('roll');

        setTimeout(() => {
            die.classList.remove('roll');
        }, 1000);

        const sides = parseInt(die.getAttribute('data-sides'));
        const count = parseInt(die.getAttribute('data-count'));

        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            resultsHTML += `<div class="result-column"><strong>D${sides}:</strong><br>${roll}</div>`;
            totalRoll += roll;
        }
    });

    setTimeout(() => {
        const modal = document.getElementById('resultModal');
        const modalResult = document.getElementById('modalResult');
        modalResult.innerHTML = resultsHTML;
        document.getElementById('totalValue').textContent = totalRoll;
        modal.style.display = "block";
    }, 1000);
});

// Modifier buttons functionality
document.querySelectorAll('.modifier-button').forEach(button => {
    button.addEventListener('click', function() {
        let modifierValue = parseInt(document.getElementById('modifierValue').textContent);
        const buttonValue = parseInt(this.getAttribute('data-value'));
        modifierValue = modifierValue * 10 + buttonValue;
        document.getElementById('modifierValue').textContent = modifierValue;
        updateTotal(modifierValue);
    });
});

// Clear modifier button
document.getElementById('modifierClear').addEventListener('click', function() {
    document.getElementById('modifierValue').textContent = "0";
    updateTotal(0);
});

// Function to update the total display
function updateTotal(modifier) {
    const total = totalRoll + modifier;
    document.getElementById('totalValue').textContent = total;
}

// Close modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('resultModal').style.display = "none";
});

// Clear selections and results
document.getElementById('clearButton').addEventListener('click', function() {
    document.querySelectorAll('.dice').forEach(die => {
        die.classList.remove('selected');
        die.setAttribute('data-count', 0);
    });
    document.getElementById('result').textContent = "";
    document.getElementById('modalResult').textContent = "";
    document.getElementById('resultModal').style.display = "none";
    document.getElementById('modifierValue').textContent = "0";
    document.getElementById('totalValue').textContent = "0";
});

// Close modal if clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('resultModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};