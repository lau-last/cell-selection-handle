export default class CellSelectionHandle {

    /**
     * Constructs a new CellSelectionHandle instance.
     *
     * @param {Object} config - Configuration object for the CellSelectionHandle.
     * @param {string} config.elementSelector - CSS selector to identify table cells.
     * @param {string} [config.className='selected'] - CSS class name to be added to selected cells.
     */
    constructor(config = {}) {
        // Validate the elementSelector config parameter and throw an error if it is not a string.
        if (typeof config.elementSelector !== 'string') {
            throw new Error('elementSelector is required and must be a string');
        }
        // Assign elementSelector from config.
        this.elementSelector = config.elementSelector;
        // Assign className from config or default to 'selected'.
        this.className = typeof config.className === 'string' ? config.className : 'selected';
        // Initialize ctrl to false, indicating whether the Control key is pressed.
        this.ctrl = false;
        // Initialize oldSelection as an empty set to store previously selected cells.
        this.oldSelection = new Set();
        // Set up event listeners for various user interactions.
        this.handleEventsListeners();
    }

    /**
     * Sets up event listeners for keydown, keyup, mousedown, mouseup, and selectionchange events.
     */
    handleEventsListeners() {
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        document.addEventListener('keyup', this.handleKeyup.bind(this));
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('selectionchange', this.handleSelectionChange.bind(this));
    }

    /**
     * Handles the keydown event to detect when the Control or Meta key is pressed.
     *
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    handleKeydown(event) {
        if (event.key === 'Control' || event.key === 'Meta') {
            this.ctrl = true;
            this.oldSelection = new Set([...this.oldSelection, ...this.getSelectedCells()]);
        }
    }

    /**
     * Handles the keyup event to detect when the Control or Meta key is released.
     *
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    handleKeyup(event) {
        if (event.key === 'Control' || event.key === 'Meta') {
            this.ctrl = false;
        }
    }

    /**
     * Handles the mousedown event to add currently selected cells to the old selection if Control is pressed.
     */
    handleMouseDown() {
        if (this.ctrl) {
            this.oldSelection = new Set([...this.oldSelection, ...this.getSelectedCells()]);
        }
    }

    /**
     * Handles the mouseup event to clear the old selection if Control is not pressed.
     */
    handleMouseUp() {
        if (!this.ctrl) {
            this.oldSelection.clear();
        }
    }

    /**
     * Handles the selectionchange event to update the cell selection.
     */
    handleSelectionChange() {
        this.removeSelectedFromElements();
        let cellsSelected = this.getSelectedCells();
        if (this.ctrl) {
            cellsSelected = new Set([...this.oldSelection, ...cellsSelected]);
        }
        cellsSelected.forEach((cellNumber) => {
            let cell = document.querySelector(`${this.elementSelector}[data-number="${cellNumber}"]`);
            if (cell && cell.tagName === 'TD') {
                cell.classList.add(this.className);
            }
        });
    }

    /**
     * Retrieves the currently selected cells based on the selection range.
     *
     * @returns {string[]} Array of selected cell identifiers.
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
     * Calculates the range of cells between the base and extent nodes.
     *
     * @param {string} baseNode - The base node identifier (e.g., '1-1').
     * @param {string} extentNode - The extent node identifier (e.g., '3-3').
     * @returns {string[]} Array of cell identifiers within the specified range.
     */
    getArrayOfSelectedCells(baseNode, extentNode) {
        let [abscissaBaseNode, ordinateBaseNode] = baseNode.split('-').map(Number);
        let [abscissaExtentNode, ordinateExtentNode] = extentNode.split('-').map(Number);

        if (abscissaBaseNode > abscissaExtentNode) {
            [abscissaBaseNode, abscissaExtentNode] = [abscissaExtentNode, abscissaBaseNode];
        }
        if (ordinateBaseNode > ordinateExtentNode) {
            [ordinateBaseNode, ordinateExtentNode] = [ordinateExtentNode, ordinateBaseNode];
        }

        let cellNumbers = [];
        for (let a = abscissaBaseNode; a <= abscissaExtentNode; a++) {
            for (let o = ordinateBaseNode; o <= ordinateExtentNode; o++) {
                cellNumbers.push(`${a}-${o}`);
            }
        }
        return cellNumbers;
    }

    /**
     * Removes the selected class from all elements matching the elementSelector.
     */
    removeSelectedFromElements() {
        document.querySelectorAll(`${this.elementSelector}[data-number]`).forEach(element => {
            element.classList.remove(this.className);
        });
    }
}
