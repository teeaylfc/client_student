export const CHANGE_TAB = 'CHANGE_TAB_NAV';

export function changeTabNavigation(tabId)
{
    return {
        type: CHANGE_TAB,
        payload: tabId
    }
}

