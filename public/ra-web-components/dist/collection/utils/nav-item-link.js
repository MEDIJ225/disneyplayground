export function getNavItemLinkRel(target, rel) {
    if (target === '_blank' && (rel === undefined || rel === '')) {
        return 'noopener noreferrer';
    }
    return rel || undefined;
}
//# sourceMappingURL=nav-item-link.js.map
