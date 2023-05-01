const itemsContainer = document.querySelector('#items');
const categoriesContainer = document.querySelector('#categories');
const allBtn = document.querySelector('#all');
const totalItems = document.querySelector('#total-items');

console.log('Before fetch');

// list of allowed categories
const allowedCategories = ['Warframes', 'Melee', 'Primary', 'Secondary', 'Pets', 'Arch-Gun', 'Arch-Melee', 'Archwing', 'Sentinels', 'SentinelWeapons'];

fetch('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/All.json')
  .then(response => response.json())
  .then(items => {
    console.log('Items:', items);

    const categories = getCategories(items);

    // filter categories to only show allowed categories
    const allowedCategoriesHTML = categories.filter(category => allowedCategories.includes(category)).map(category => `
      <button id="${category}" class="category-btn" data-category="${category}">
        ${category}
      </button>
    `).join('');

    categoriesContainer.innerHTML = `
      <button id="all" class="category-btn" data-category="all">
        All
      </button>
      ${allowedCategoriesHTML}
    `;

    const categoryBtns = categoriesContainer.querySelectorAll('.category-btn');

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        // filter items to only show items from allowed categories
        const filteredItems = category === 'all' ? items.filter(item => allowedCategories.includes(item.category)) : items.filter(item => {
          return item.category === category && allowedCategories.includes(item.category);
        });

        const itemsHTML = filteredItems.map(item => `
          <div>
            <label for="${item.uniqueName}"><h3>${item.name}</h3></label>
			<label for="built">Built:</label> 
			<input type="checkbox" id="${item.uniqueName} name="built">
           
			<p>${item.description}</p>
			<p>Build price: ${item.buildPrice} credits</p>
          </div>
        `).join('');

        itemsContainer.innerHTML = itemsHTML;
        
        // update total items count
        totalItems.textContent = `Total Items: ${filteredItems.length}`;
      });
    });

    allBtn.addEventListener('click', () => {
      // filter items to only show items from allowed categories
      const filteredItems = items.filter(item => allowedCategories.includes(item.category));

      const itemsHTML = filteredItems.map(item => `
        <div>
          <input type="checkbox" id="${item.uniqueName}">
          <label for="${item.uniqueName}">${item.name}</label>
		  <p>Description: ${item.description}</p>
        </div>
      `).join('');

      itemsContainer.innerHTML = itemsHTML;

    });
  })
  .catch(error => console.error(error));

console.log('After fetch');

function getCategories(items) {
  const categories = new Set();
  items.forEach(item => {
    categories.add(item.category);
  });
  return Array.from(categories);
}
