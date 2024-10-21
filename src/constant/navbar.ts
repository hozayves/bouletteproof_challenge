export interface NavMenuItem {
    name: string;
    link: string;
    image: string;
}

export const NavMenu: NavMenuItem[] = [
    { name: 'Home', link: '/stast', image: '/assets/home.svg' },
    { name: 'About', link: '/customer', image: '/assets/users.png' },
];