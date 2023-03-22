// Managing the menu - navbar //

const HOST = 'server.com/';

function populateCategories(category) {
    const activeMenuItemName = activeMenuItem.children[0].innerHTML;
    // we call the api and take the results obtained then we iterate through the categories
    // and populate the values inside the list j
    api.get(HOST + 'categories', {category, menuItem: activeMenuItemName}, function(categories) {
        let newCategories = "";
        for (const category of categories) {
            const categoryElement = `
            <li class="menu__sub__categories__item">
                <a href="#" class="menu__sub__categories__item__link">${category}</a>
            </li>
        `;
            newCategories += categoryElement;
        }
        const categoriesElement = document.getElementsByClassName(`menu__sub__categories__items--${category}`)[0];
        categoriesElement.innerHTML = newCategories;
    });
}


// When the menu item is hovered, it toggles back to display block
function showSubmenu() {
    const submenu = document.getElementsByClassName("menu__sub")[0];
    submenu.style.display = "block";

    populateCategories('top');
    populateCategories('additional');
}

// When the menu item is NOT hovered, the submenu is not visible
function hideSubmenu() {
    const submenu = document.getElementsByClassName("menu__sub")[0];
    submenu.style.display = "none";
}

let activeMenuItem = null;

// if a menu main item is hovered it shows the submenu
// if a menu item is NOT hovered it hides this item and hovers only the active item
function onMenuItemMouseEnter(item) {
    if (activeMenuItem) {
        activeMenuItem.classList.remove("menu__main__item--active");
    } 
    activeMenuItem = item;
    item.classList.add("menu__main__item--active");
    showSubmenu();
    
}

// Function to deactivate the MenuItem even when you're note on the menu
function deactivateMenuItem() {
    activeMenuItem.classList.remove("menu__main__item--active");
}

// When the mouse is not over the submenu, it is deactivated
const submenu = document.getElementsByClassName("menu__sub")[0];
submenu.onmouseleave = deactivateMenuItem;

// For every menu Items element hovered I active the onMenuItemMouseEnter function. 
// It is like an extension of the onItemMouseEnter function for childs elements
const menuItems = document.getElementsByClassName("menu__main__item");
for (const menuItem of menuItems) {
    menuItem.onmouseenter = () => onMenuItemMouseEnter(menuItem)
}

const menu = document.getElementsByClassName("menu")[0];
menu.onmouseleave = hideSubmenu;


// Server //

function getCategories(data) {
    if (data.category == 'top') {
      if (data.menuItem == 'Motors') {
        return [
          'Car',
          'Motorcycle',
          'Plane',
          'Trucks',
          'Wheels'
        ];
      }
      if (data.menuItem == 'Fashion') {
        return [
          'Women\'s tops',
          'Men\'s tops',
          'Jeans',
          'Hats'
        ];
      }
      return [
        'Server apple',
        'Server banana',
        'Server pear',
        'Server orange'
      ];
    }
    if (data.category == 'additional') {
      if (data.menuItem == 'Motors') {
        return [
          'Tires',
          'Windshields',
          'Ski racks',
          'Doors',
          'Windows'
        ];
      }
      if (data.menuItem == 'Fashion') {
        return [
          'On sale',
          'Red stuff',
          'Gucci',
          'New Arrivals'
        ];
      }
      return [
        'Server square',
        'Server circle',
        'Server oval',
        'Server diamond'
      ];
    }
    return [];
  }

const endpoints = {
    "/categories": {
        "get": getCategories
    }
}


// API Library //

function getFunction(url, data, callback) {
    const domain = url.substring(0, url.indexOf("/"));
    const endpoint = url.substring(url.indexOf("/"), url.length);

    callback(endpoints[endpoint]["get"](data));
}

const api = {
    get: getFunction
};