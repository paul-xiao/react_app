import {snackbarConstants} from '../constants'
export const enqueueSnackbar = notification => {
    const key = notification.options && notification.options.key;
    return {
        type: snackbarConstants.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = key => ({
    type: snackbarConstants.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: snackbarConstants.REMOVE_SNACKBAR,
    key,
});

const snackbarActions = {
    enqueueSnackbar,
    closeSnackbar,
    removeSnackbar
}

export default snackbarActions