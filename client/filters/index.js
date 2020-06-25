const capitalize = (value) => {
    if (!value) {
        return '';
    }
    return value.toString().charAt(0).toUpperCase() + value.slice(1);
};

const lowercase = (value) => {
    if (!value) {
        return '';
    }
    return value.toString().charAt(0).toLowerCase() + value.slice(1);
};

const all = (value) => {
    if (value > 0) {
        return value;
    }
    return 'All';
};

const day = (value) => {
    if (!value) {
        return '';
    }

    return new Date(value).getDate();
};

const month = (value) => {
    if (!value) {
        return '';
    }

    return new Date(value).toLocaleString('en-us', { month: 'long' });
};

const cctype = (value) => {
    const types = {
        visa: 1,
        'master-card': 2,
        'american-express': 3,
        discover: 4
    };

    if (!value) {
        return 0;
    }
    return types[value];
};

export { capitalize, lowercase, all, day, month, cctype };
