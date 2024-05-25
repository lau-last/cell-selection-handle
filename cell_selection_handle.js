export default class CellSelectionHandle {

    /**
     * Initializes a new instance of the CellSelectionHandle class with the specified configuration.
     * @param {Object} config - Configuration options for the cell selection.
     * @param {string} config.tableSelector - CSS selector to identify the table cells.
     * @param {string} [config.className='selected'] - Optional CSS class name to apply to selected cells; defaults to 'selected'.
     */
    constructor(config = {}) {
        // Destructure the config object, providing default values and extracting necessary properties.
        const {
            tableSelector, // Required CSS selector for the table.
            className = 'selected', // Default class name if not provided.
        } = config;

        // Validate tableSelector to ensure it is a string and is provided.
        if (typeof tableSelector !== 'string') {
            throw new Error('tableSelector is required and must be a string');
        }

        // Assign destructured properties to the instance.
        this.tableSelector = tableSelector;
        this.className = className;

        // Initialize instance properties for tracking state.
        this.ctrl = false; // Tracks whether the Control key is pressed.
        this.mouseOnTable = false; // Tracks whether the mouse is over the table.
        this.oldSelection = new Set(); // Stores previously selected cells.

        // Initialize data attributes on table cells and set up event listeners.
        this.generateDataNumbers();
        this.handleEventsListeners();
    }

    /**
     * Sets up event listeners for various actions like keyboard inputs and mouse interactions.
     */
    handleEventsListeners() {
        // Bind event handlers to ensure they maintain the correct context ('this' value).
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        document.addEventListener('keyup', this.handleKeyup.bind(this));
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('selectionchange', this.handleSelectionChange.bind(this));
        document.querySelector(this.tableSelector).addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        document.querySelector(this.tableSelector).addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    /**
     * Event handler for mouse entering the table. Sets the mouseOnTable flag to true.
     */
    handleMouseEnter() {
        this.mouseOnTable = true;
    }

    /**
     * Event handler for mouse leaving the table. Clears the mouseOnTable flag.
     */
    handleMouseLeave() {
        this.mouseOnTable = false;
    }

    /**
     * Event handler for key down. Sets the ctrl flag if Control or Meta (Command on Mac) key is pressed.
     */
    handleKeydown(event) {
        if (event.key === 'Control' || event.key === 'Meta') {
            this.ctrl = true;
        }
    }

    /**
     * Event handler for key up. Clears the ctrl flag if Control or Meta key is released.
     */
    handleKeyup(event) {
        if (event.key === 'Control' || event.key === 'Meta') {
            this.ctrl = false;
        }
    }

    /**
     * Event handler for mouse up. Updates oldSelection to include newly selected cells and clears text selection if the mouse is over the table.
     */
    handleMouseUp() {
        this.oldSelection = new Set([...this.oldSelection, ...this.getSelectedCells()]);
        if (this.mouseOnTable) {
            this.clearTextSelection();
        }
    }

    /**
     * Event handler for mouse down. Clears old selections if the ctrl key is not held down.
     */
    handleMouseDown() {
        if (!this.ctrl) {
            this.oldSelection.clear();
        }
    }

    /**
     * Handles changes in text selection, updating the UI to reflect current selections.
     */
    handleSelectionChange() {
        this.removeSelectedFromElements();
        let cellsSelected = this.getSelectedCells();
        // Apply or remove the selection class to/from each cell based on current selections.
        cellsSelected.forEach((cellNumber) => {
            let cell = document.querySelector(`td[data-number="${cellNumber}"]`);
            if (cell && cell.tagName === 'TD') {
                cell.classList.toggle(this.className);
            }
        });
    }

    /**
     * Retrieves the currently selected cells based on the window's text selection.
     */
    getSelectedCells() {
        let selection = window.getSelection();
        if (!selection || !selection.baseNode || !selection.extentNode) {
            return [];
        }
        let baseNode = selection.baseNode.dataset ? selection.baseNode.dataset.number : null;
        let extentNode = selection.extentNode.dataset ? selection.extentNode.dataset.number : null;
        if (!baseNode || !extentNode) {
            return [];
        }
        return this.getArrayOfSelectedCells(baseNode, extentNode);
    }

    /**
     * Calculates the range of selected cells between two data points.
     */
    getArrayOfSelectedCells(baseNode, extentNode) {
        let [abscissaBaseNode, ordinateBaseNode] = baseNode.split('-').map(Number);
        let [abscissaExtentNode, ordinateExtentNode] = extentNode.split('-').map(Number);
        // Ensure coordinates are in order from smallest to largest.
        if (abscissaBaseNode > abscissaExtentNode) {
            [abscissaBaseNode, abscissaExtentNode] = [abscissaExtentNode, abscissaBaseNode];
        }
        if (ordinateBaseNode > ordinateExtentNode) {
            [ordinateBaseNode, ordinateExtentNode] = [ordinateExtentNode, ordinateBaseNode];
        }
        // Generate a list of all cell numbers within the selected range.
        let cellNumbers = [];
        for (let a = abscissaBaseNode; a <= abscissaExtentNode; a++) {
            for (let o = ordinateBaseNode; o <= ordinateExtentNode; o++) {
                cellNumbers.push(`${a}-${o}`);
            }
        }
        return cellNumbers;
    }

    /**
     * Clears the text selection using the standard method available on the window object.
     */
    clearTextSelection() {
        if (window.getSelection) {
            window.getSelection().empty();
        }
    }

    /**
     * Removes the selection class from elements that are no longer selected.
     */
    removeSelectedFromElements() {
        document.querySelectorAll(`td[data-number]`).forEach(element => {
            if (!this.oldSelection.has(element.dataset.number)) {
                element.classList.remove(this.className);
            }
        });
    }

    /**
     * Assigns a unique data-number attribute to each table cell for tracking and selection purposes.
     */
    generateDataNumbers() {
        const table = document.querySelector(this.tableSelector);
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, rowIndex) => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, cellIndex) => {
                cell.setAttribute('data-number', `${cellIndex + 1}-${rowIndex + 1}`);
            });
        });
    }
}