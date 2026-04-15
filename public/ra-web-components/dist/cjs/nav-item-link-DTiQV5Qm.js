'use strict';

function getNavItemLinkRel(target, rel) {
    if (target === '_blank' && (rel === undefined || rel === '')) {
        return 'noopener noreferrer';
    }
    return rel || undefined;
}

exports.getNavItemLinkRel = getNavItemLinkRel;
//# sourceMappingURL=nav-item-link-DTiQV5Qm.js.map

//# sourceMappingURL=nav-item-link-DTiQV5Qm.js.map