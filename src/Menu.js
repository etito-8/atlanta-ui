import decode from "jwt-decode";

const token = localStorage.getItem('currData');
const decodedToken = decode(token);
console.log('decodeddddd', decodedToken)


const Menu = [
    {
        heading: 'Options',
        translate: 'sidebar.heading.OPTIONS'
    },

    // ADDED PATHS
    {
        name: 'Manage',
        icon: 'icon-people',
        translate: 'sidebar.nav.MANAGE',
        submenu: [{
            name: 'Manage User',
            path: '/manage-user'
        },
            {
                name: 'Manage Company',
                path: '/manage-company'
            },
        ]
    },

    {
        name: 'Explore',
        icon: 'icon-wrench',
        translate: 'sidebar.nav.EXPLORE',
        submenu: [{
            name: 'Admin Company Detail',
            path: '/admin-company-detail'
        },
            {
                name: 'Explore Movie',
                path: '/explore-movie'
            },
            {
                name: 'Explore Theater',
                path: '/explore-theater'
            }
        ]
    },

    {
        name: 'Create',
        icon: 'icon-cursor',
        translate: 'sidebar.nav.CREATE',
        submenu: [{
            name: 'Create Theater',
            path: '/create-theater'
        },
            {
                name: 'Create Movie',
                path: '/create-movie'
            },
            {
                name: 'Schedule Movie',
                path: '/schedule-movie'
            }
        ]
    },

    {
        name: 'History',
        icon: 'icon-grid',
        translate: 'sidebar.nav.HISTORY',
        submenu: [{
            name: 'View History',
            path: '/view-history'
        },
            {
                name: 'Visit History',
                path: '/visit-history'
            },
        ]
    },

    {
        name: 'Overview',
        icon: 'icon-umbrella',
        translate: 'sidebar.nav.OVERVIEW',
        submenu: [{
            name: 'Theater Overview',
            path: '/theater-overview'
        }]
    },

    // Added Fragment PATHS should be UPDATED
    {
        heading: 'User Functions',
        translate: 'sidebar.heading.USER_FUNCTIONS'
    },

    {
        name: 'Functionality',
        icon: 'icon-note',
        translate: 'sidebar.nav.element.FUNCTIONALITY',

        submenu: [{
            name: 'User',
            path: '/user-func'
        },
            {
            name: 'Admin-Only',
            path: '/admin-only-func',
            translate: 'sidebar.nav.element.ADMIN_ONLY_FUNC'
        },
            {
                name: 'Admin-Customer',
                path: '/admin-customer-func',
                translate: 'sidebar.nav.element.ADMIN_CUSTOMER_FUNC'
            },
            {
                name: 'Manager-Only',
                path: '/manager-only-func'
            },
            {
                name: 'Manager-Customer',
                path: '/manager-customer-func',
                translate: 'sidebar.nav.element.MANAGER_CUSTOMER_FUNC'
            },
            {
                name: 'Customer',
                path: '/customer-func'
            }
        ]
    }
    // Used to be pages

    //ADDED PATH

];

export default Menu;